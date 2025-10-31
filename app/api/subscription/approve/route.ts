import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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

async function approveSubscription(subscriptionId: string, userId: string) {
  const supabase = await createClient()
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
  const baseUrl = environment === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com'
  
  const accessToken = await getPayPalAccessToken()

  // PayPal에서 구독 정보 조회
  const subscriptionResponse = await fetch(`${baseUrl}/v1/billing/subscriptions/${subscriptionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })

  if (!subscriptionResponse.ok) {
    const errorText = await subscriptionResponse.text()
    console.error('PayPal 구독 조회 실패:', errorText)
    throw new Error('PayPal 구독 정보를 조회할 수 없습니다')
  }

  const subscription = await subscriptionResponse.json()

  // 구독이 활성화되었는지 확인
  if (subscription.status !== 'ACTIVE' && subscription.status !== 'APPROVAL_PENDING') {
    throw new Error(`구독 상태가 유효하지 않습니다: ${subscription.status}`)
  }

  // custom_id에서 planId 추출
  let planId = 'premium'
  let billingPeriod = 'monthly'
  
  if (subscription.custom_id) {
    try {
      const customData = JSON.parse(subscription.custom_id)
      planId = customData.planId || planId
      billingPeriod = customData.billingPeriod || billingPeriod
    } catch (e) {
      console.error('custom_id 파싱 실패:', e)
    }
  }

  // 사용자 ID 확인 (현재 사용자 또는 custom_id의 userId)
  let subscriptionUserId = userId
  if (subscription.custom_id) {
    try {
      const customData = JSON.parse(subscription.custom_id)
      if (customData.userId && customData.userId !== userId) {
        // custom_id의 userId와 현재 사용자가 다르면 에러
        throw new Error('구독 소유자와 일치하지 않습니다')
      }
      if (customData.userId) {
        subscriptionUserId = customData.userId
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('구독 소유자')) {
        throw e
      }
      // 파싱 실패해도 계속 진행
    }
  }

  // 구독 상태 업데이트 (승인 처리)
  const updateData: any = {
    user_id: subscriptionUserId,
    paypal_subscription_id: subscriptionId,
    plan_id: planId,
    status: subscription.status === 'ACTIVE' ? 'active' : 'pending',
  }

  // 다음 결제일 설정
  if (subscription.billing_info?.next_billing_time) {
    updateData.current_period_end = new Date(subscription.billing_info.next_billing_time).toISOString()
  }

  const { error: updateError } = await supabase
    .from('subscriptions')
    .upsert(updateData, {
      onConflict: 'paypal_subscription_id',
    })

  if (updateError) {
    console.error('구독 승인 업데이트 실패:', updateError)
    throw new Error('구독 승인 처리 중 오류가 발생했습니다')
  }

  return {
    id: subscriptionId,
    status: updateData.status,
    plan_id: planId,
  }
}

export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      // 인증되지 않은 경우 pricing 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/pricing?auth=open', req.url))
    }

    const requestUrl = new URL(req.url)
    const subscriptionId = requestUrl.searchParams.get('subscription_id') || requestUrl.searchParams.get('token')
    
    if (!subscriptionId) {
      return NextResponse.redirect(new URL('/pricing?error=missing_subscription_id', req.url))
    }

    const subscription = await approveSubscription(subscriptionId, user.id)

    // 성공 시 pricing 페이지로 리다이렉트
    return NextResponse.redirect(new URL(`/pricing?success=true&approved=true`, req.url))
  } catch (error: any) {
    console.error('구독 승인 처리 오류:', error)
    const requestUrl = new URL(req.url)
    return NextResponse.redirect(new URL(`/pricing?error=${encodeURIComponent(error.message || '구독 승인 처리 중 오류가 발생했습니다')}`, req.url))
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const { subscription_id } = await req.json()
    
    if (!subscription_id) {
      return NextResponse.json(
        { error: 'subscription_id가 필요합니다' },
        { status: 400 }
      )
    }

    const subscription = await approveSubscription(subscription_id, user.id)

    return NextResponse.json({
      success: true,
      subscription,
    })
  } catch (error: any) {
    console.error('구독 승인 처리 오류:', error)
    return NextResponse.json(
      { error: error.message || '구독 승인 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

