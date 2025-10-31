import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// PayPal OAuth 토큰 가져오기
async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
  const baseUrl = environment === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com'

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`PayPal OAuth 실패: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

// 플랜 가격 정보 (환경과 구독 기간에 따라)
const getPlanPrices = (environment: string, billingPeriod: 'monthly' | 'yearly') => {
  if (environment === 'sandbox') {
    // Sandbox: USD
    if (billingPeriod === 'yearly') {
      return {
        premium: 8.90,  // 월당 8.9USD (12개월)
        pro: 25.90,     // 월당 25.9USD (12개월)
      }
    }
    return {
      premium: 9.90,   // 월간 9.9USD
      pro: 29.90,      // 월간 29.9USD
    }
  }
  // Live 환경: 원화 (추후 설정 가능)
  if (billingPeriod === 'yearly') {
    return {
      premium: 8900,   // 월당 (12개월)
      pro: 25900,      // 월당 (12개월)
    }
  }
  return {
    premium: 9900,
    pro: 29900,
  }
}

const getCurrencyCode = (environment: string) => {
  return environment === 'sandbox' ? 'USD' : 'KRW'
}

export async function POST(req: Request) {
  try {
    // Base URL 가져오기 (환경 변수 또는 요청 헤더에서)
    const baseUrlFromEnv = process.env.NEXT_PUBLIC_BASE_URL
    const requestUrl = new URL(req.url)
    const origin = requestUrl.origin
    const returnBaseUrl = baseUrlFromEnv || origin || 'http://localhost:3000'

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const { planId, billingPeriod = 'monthly' } = await req.json()
    
    if (!planId || planId === 'free') {
      return NextResponse.json(
        { error: '유효한 플랜을 선택해주세요' },
        { status: 400 }
      )
    }

    if (billingPeriod !== 'monthly' && billingPeriod !== 'yearly') {
      return NextResponse.json(
        { error: '유효한 구독 기간을 선택해주세요' },
        { status: 400 }
      )
    }

    const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
    const baseUrl = environment === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com'
    
    const planPrices = getPlanPrices(environment, billingPeriod as 'monthly' | 'yearly')
    const currencyCode = getCurrencyCode(environment)
    
    // premium 또는 pro 플랜만 허용
    if (planId !== 'premium' && planId !== 'pro') {
      return NextResponse.json(
        { error: '유효한 플랜을 선택해주세요 (premium 또는 pro)' },
        { status: 400 }
      )
    }
    
    const price = planPrices[planId as keyof typeof planPrices]
    
    if (!price) {
      return NextResponse.json(
        { error: '플랜을 찾을 수 없습니다' },
        { status: 400 }
      )
    }
    
    const accessToken = await getPayPalAccessToken()

    // Product ID 가져오기 또는 생성
    let productId = process.env.PAYPAL_PRODUCT_ID
    
    if (!productId) {
      // Product ID가 없으면 자동 생성
      const productResponse = await fetch(`${baseUrl}/v1/catalogs/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `product-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        },
        body: JSON.stringify({
          name: 'TextEscape Subscription',
          description: 'TextEscape 멤버십 구독',
          type: 'SERVICE',
          category: 'SOFTWARE',
        }),
      })

      if (!productResponse.ok) {
        const errorText = await productResponse.text()
        console.error('❌ Product creation error:', errorText)
        let errorMessage = 'Product 생성 실패'
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.message || errorMessage
        } catch (e) {
          errorMessage = `${errorMessage}: ${errorText.substring(0, 200)}`
        }
        throw new Error(`${errorMessage} - PAYPAL_PRODUCT_ID 환경 변수를 설정하거나 Product를 먼저 생성해주세요`)
      }

      const productData = await productResponse.json()
      productId = productData.id
      console.log(`✅ Created Product ID: ${productId}`)
      console.log(`📦 Product Data:`, JSON.stringify(productData, null, 2))
      console.log(`💡 .env.local에 PAYPAL_PRODUCT_ID=${productId} 추가를 권장합니다`)
      
      // Product가 생성되면 약간의 대기 (PayPal이 내부적으로 처리하는 시간)
      await new Promise(resolve => setTimeout(resolve, 2000))
    } else {
      console.log(`📋 Using existing Product ID from env: ${productId}`)
    }

    if (!productId) {
      throw new Error('Product ID가 없습니다. PAYPAL_PRODUCT_ID 환경 변수를 설정해주세요.')
    }

    console.log(`🔍 Using Product ID: ${productId}`)

    // PayPal 구독 플랜 생성 (REST API 직접 호출)
    const planResponse = await fetch(`${baseUrl}/v1/billing/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `plan-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        },
        body: JSON.stringify({
          product_id: productId,
          name: billingPeriod === 'yearly' 
            ? (planId === 'premium' ? 'Premium Plan (Yearly)' : 'Pro Plan (Yearly)')
            : (planId === 'premium' ? 'Premium Plan (Monthly)' : 'Pro Plan (Monthly)'),
          description: billingPeriod === 'yearly'
            ? (planId === 'premium' 
                ? `프리미엄 플랜 (연간) - 20000 토큰 게임 플레이 - 월 ${price}${currencyCode}씩 12개월` 
                : `프로 플랜 (연간) - 무제한 토큰 게임 플레이 - 월 ${price}${currencyCode}씩 12개월`)
            : (planId === 'premium' 
                ? '프리미엄 플랜 (월간) - 20000 토큰 게임 플레이' 
                : '프로 플랜 (월간) - 무제한 토큰 게임 플레이'),
          status: 'ACTIVE',
          billing_cycles: [
            {
              frequency: {
                interval_unit: 'MONTH',
                interval_count: 1,
              },
              tenure_type: 'REGULAR',
              sequence: 1,
              total_cycles: 0,
              pricing_scheme: {
                fixed_price: {
                  value: price.toString(),
                  currency_code: currencyCode,
                },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee_failure_action: 'CONTINUE',
            payment_failure_threshold: 3,
          },
        }),
      }
    )

    if (!planResponse.ok) {
      const errorText = await planResponse.text()
      console.error('❌ Plan creation error:', errorText)
      
      let errorMessage = '구독 플랜 생성 실패'
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.details && errorJson.details.length > 0) {
          errorMessage = `${errorJson.message}: ${errorJson.details[0].description}`
        } else {
          errorMessage = errorJson.message || errorMessage
        }
      } catch (e) {
        // JSON 파싱 실패 시 원본 텍스트 사용
        errorMessage = `구독 플랜 생성 실패: ${errorText.substring(0, 200)}`
      }
      
      throw new Error(errorMessage)
    }

    const planData = await planResponse.json()
    const planId_paypal = planData.id

    // 구독 생성
    const subscriptionResponse = await fetch(`${baseUrl}/v1/billing/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `sub-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        },
        body: JSON.stringify({
          plan_id: planId_paypal,
          start_time: new Date(Date.now() + 60000).toISOString(),
          subscriber: {
            email_address: user.email!,
          },
          application_context: {
            brand_name: 'TextEscape',
            locale: 'ko-KR',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'SUBSCRIBE_NOW',
            payment_method: {
              payer_selected: 'PAYPAL',
              payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
            },
            return_url: `${returnBaseUrl}/pricing?success=true`,
            cancel_url: `${returnBaseUrl}/pricing?canceled=true`,
          },
          custom_id: JSON.stringify({
            userId: user.id,
            planId,
            billingPeriod,
          }),
        }),
      }
    )

    if (!subscriptionResponse.ok) {
      const errorText = await subscriptionResponse.text()
      console.error('❌ Subscription creation error:', errorText)
      
      let errorMessage = '구독 생성 실패'
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.details && errorJson.details.length > 0) {
          errorMessage = `${errorJson.message}: ${errorJson.details.map((d: any) => d.description).join(', ')}`
        } else {
          errorMessage = errorJson.message || errorMessage
        }
      } catch (e) {
        errorMessage = `구독 생성 실패: ${errorText.substring(0, 200)}`
      }
      
      throw new Error(errorMessage)
    }

    const subscription = await subscriptionResponse.json()

    // 구독 정보를 Supabase에 임시 저장 (승인 대기 상태)
    await supabase.from('subscriptions').upsert({
      user_id: user.id,
      paypal_subscription_id: subscription.id,
      plan_id: planId,
      status: 'pending',
      current_period_end: null,
    }, {
      onConflict: 'user_id',
    })

    // 승인 URL 찾기
    const approvalUrl = subscription.links?.find(
      (link: any) => link.rel === 'approve'
    )?.href

    if (!approvalUrl) {
      return NextResponse.json(
        { error: '결제 승인 URL을 생성할 수 없습니다' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: approvalUrl })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message || '결제 세션 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}