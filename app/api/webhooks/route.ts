import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Webhook 라우트는 body parser를 비활성화해야 함
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = req.headers
  
  const webhookId = process.env.PAYPAL_WEBHOOK_ID!
  const webhookSecret = process.env.PAYPAL_WEBHOOK_SECRET!

  // PayPal 웹훅 서명 검증
  const transmissionId = headersList.get('PAYPAL-TRANSMISSION-ID')
  const transmissionTime = headersList.get('PAYPAL-TRANSMISSION-TIME')
  const certUrl = headersList.get('PAYPAL-CERT-URL')
  const transmissionSig = headersList.get('PAYPAL-TRANSMISSION-SIG')
  const authAlgo = headersList.get('PAYPAL-AUTH-ALGO')

  if (!transmissionId || !transmissionTime || !certUrl || !transmissionSig || !authAlgo) {
    return NextResponse.json(
      { error: 'Missing webhook headers' },
      { status: 400 }
    )
  }

  // 웹훅 이벤트 파싱
  let event: any
  try {
    event = JSON.parse(body)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  try {
    const eventType = event.event_type
    const resource = event.resource

    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
      case 'BILLING.SUBSCRIPTION.CREATED': {
        const subscriptionId = resource.id
        const customId = resource.custom_id
        
        let customData: { userId: string; planId: string } | null = null
        try {
          customData = JSON.parse(customId || '{}')
        } catch (e) {
          console.error('Failed to parse custom_id:', e)
        }

        if (customData?.userId) {
          await supabase
            .from('subscriptions')
            .upsert({
              user_id: customData.userId,
              paypal_subscription_id: subscriptionId,
              plan_id: customData.planId || 'premium',
              status: 'active',
              current_period_end: resource.billing_info?.next_billing_time 
                ? new Date(resource.billing_info.next_billing_time).toISOString()
                : null,
            }, {
              onConflict: 'paypal_subscription_id',
            })
        }
        break
      }

      case 'BILLING.SUBSCRIPTION.UPDATED': {
        const subscriptionId = resource.id

        await supabase
          .from('subscriptions')
          .update({
            status: resource.status === 'ACTIVE' ? 'active' : 'canceled',
            current_period_end: resource.billing_info?.next_billing_time
              ? new Date(resource.billing_info.next_billing_time).toISOString()
              : null,
          })
          .eq('paypal_subscription_id', subscriptionId)
        break
      }

      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.EXPIRED': {
        const subscriptionId = resource.id

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
          })
          .eq('paypal_subscription_id', subscriptionId)
        break
      }

      case 'PAYMENT.SALE.COMPLETED': {
        // 구독 결제 완료 시 상태 업데이트
        if (resource.billing_agreement_id) {
          const subscriptionId = resource.billing_agreement_id
          
          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
            })
            .eq('paypal_subscription_id', subscriptionId)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}