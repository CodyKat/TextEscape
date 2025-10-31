import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { subscription: null },
        { status: 200 }
      )
    }

    // 활성 구독 또는 취소 예정(canceling) 상태인 구독 조회
    // canceling 상태는 30일 동안 서비스를 제공하므로 활성으로 간주
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['active', 'canceling'])
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러 (구독이 없는 경우)
      throw error
    }
    
    // canceling 상태이고 서비스 종료일이 지났으면 null 반환
    if (subscription && subscription.status === 'canceling') {
      const serviceEndDate = subscription.current_period_end 
        ? new Date(subscription.current_period_end) 
        : null
      if (serviceEndDate && serviceEndDate < new Date()) {
        // 서비스 종료일이 지났으면 null 반환
        return NextResponse.json({
          subscription: null,
        })
      }
    }

    return NextResponse.json({
      subscription: subscription || null,
    })
  } catch (error: any) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: error.message || '구독 정보를 가져오는 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
