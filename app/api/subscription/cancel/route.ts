import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!
  const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
  const baseUrl = environment === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com'

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en_US',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('PayPal OAuth error:', errorText)
    throw new Error('Failed to get PayPal access token')
  }

  const data = await response.json()
  return data.access_token
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'pending'])
      .single()

    if (subError || !subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      )
    }

    if (!subscription.paypal_subscription_id) {
      return NextResponse.json(
        { error: 'No PayPal subscription ID found' },
        { status: 400 }
      )
    }

    // Cancel subscription in PayPal
    const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
    const baseUrl = environment === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com'

    const accessToken = await getPayPalAccessToken()

    // PayPal 구독 취소 요청
    // 참고: 더미 데이터 (DUMMY-PAYPAL-SUB-로 시작)는 실제 PayPal 구독이 아니므로 스킵
    let cancelResponse: Response | null = null
    let paypalCancelSucceeded = false

    if (subscription.paypal_subscription_id && !subscription.paypal_subscription_id.startsWith('DUMMY-PAYPAL-SUB-')) {
      // 실제 PayPal 구독 ID인 경우에만 PayPal API 호출
      // PayPal 구독 취소 API 호출
      // PayPal 구독 취소 API는 body 없이 호출해야 함
      cancelResponse = await fetch(
        `${baseUrl}/v1/billing/subscriptions/${subscription.paypal_subscription_id}/cancel`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          },
          // PayPal 구독 취소는 body가 없어야 함
        }
      )

      if (cancelResponse.ok) {
        paypalCancelSucceeded = true
      } else {
        const errorText = await cancelResponse.text()
        console.error('PayPal cancellation error:', errorText)
        
        let errorMessage = 'Failed to cancel subscription'
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.message || errorMessage
          if (errorJson.details && errorJson.details.length > 0) {
            errorMessage += ': ' + errorJson.details.map((d: any) => d.description || d.issue).join(', ')
          }
        } catch (e) {
          errorMessage = `Cancellation failed: ${errorText.substring(0, 200)}`
        }

        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        )
      }
    } else {
      // 더미 데이터인 경우 PayPal API 호출 스킵
      paypalCancelSucceeded = true
      console.log('Skipping PayPal API call for dummy subscription:', subscription.paypal_subscription_id)
    }

    if (!paypalCancelSucceeded) {
      return NextResponse.json(
        { error: 'Failed to cancel subscription in PayPal' },
        { status: 500 }
      )
    }

    // Update subscription status in Supabase
    // 취소 후 30일간 서비스 유지: 상태를 'canceling'으로 설정하고 current_period_end + 30일까지 서비스 제공
    const currentPeriodEnd = subscription.current_period_end 
      ? new Date(subscription.current_period_end) 
      : new Date()
    
    // 서비스 종료일 = 마지막 결제일(current_period_end) + 30일
    const serviceEndDate = new Date(currentPeriodEnd)
    serviceEndDate.setDate(serviceEndDate.getDate() + 30)

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceling', // 취소 예정 상태 (30일 동안 유지)
        current_period_end: serviceEndDate.toISOString(), // 실제 서비스 종료일로 업데이트
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      // PayPal cancellation succeeded, but DB update failed
      // Return success but log the error
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
    })
  } catch (error: any) {
    console.error('Cancel subscription error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred while cancelling the subscription' },
      { status: 500 }
    )
  }
}

