import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const origin = requestUrl.origin

  // URL에 에러나 오류가 있는지 먼저 확인
  const error = requestUrl.searchParams.get('error')
  const errorCode = requestUrl.searchParams.get('error_code')
  const errorDescription = requestUrl.searchParams.get('error_description')

  if (error) {
    // recovery 타입이면 forgot-password 페이지로 리다이렉트
    if (type === 'recovery') {
      const errorParams = new URLSearchParams({
        error: error,
      })
      if (errorCode) errorParams.set('error_code', errorCode)
      if (errorDescription) errorParams.set('error_description', errorDescription)
      return NextResponse.redirect(`${origin}/forgot-password?${errorParams.toString()}`)
    }
    // 일반 에러는 홈으로
    return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error)}`)
  }

  // recovery 타입 처리
  // 주의: 비밀번호 재설정은 이메일 링크를 통해 시작되므로 PKCE를 사용할 수 없음
  // 따라서 recovery 타입은 서버에서 처리하지 않고 클라이언트에서 직접 처리하도록 함
  // (실제로는 Implicit flow를 사용해야 함)
  if (type === 'recovery' && code) {
    // Recovery flow는 PKCE를 사용하지 않아야 하는데, 
    // 이메일 링크를 통해 code가 전달되면 code_verifier가 없어서 PKCE 에러 발생
    // 따라서 서버에서 처리하지 않고 클라이언트로 다시 리다이렉트
    // 클라이언트에서 hash fragment 형식으로 받거나, 
    // Supabase 설정에서 Implicit flow를 사용하도록 변경 필요
    console.log('Recovery type detected, but cannot handle PKCE flow server-side')
    
    // 클라이언트로 리다이렉트 (hash fragment가 있을 수 있음)
    // 또는 에러 메시지 표시
    const errorParams = new URLSearchParams({
      error: '비밀번호 재설정 링크는 PKCE flow를 사용할 수 없습니다. Supabase 설정에서 Implicit flow를 사용하도록 설정해주세요.',
    })
    return NextResponse.redirect(`${origin}/forgot-password?${errorParams.toString()}`)
  }

  // 일반 인증 코드 처리
  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}`)
}

