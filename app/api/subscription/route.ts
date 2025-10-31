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

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116은 "no rows returned" 에러 (구독이 없는 경우)
      throw error
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
