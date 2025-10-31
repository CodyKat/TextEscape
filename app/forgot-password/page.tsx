'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, KeyRound, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()
  const searchParams = useSearchParams()

  // URL에서 에러 파라미터 읽기
  useEffect(() => {
    const urlError = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    
    if (urlError) {
      // error_description이 있으면 더 자세한 메시지 표시
      const errorMessage = errorDescription 
          ? decodeURIComponent(errorDescription)
        : urlError === 'access_denied' 
          ? 'The password reset link has expired or is invalid. Please request a new one.'
          : decodeURIComponent(urlError)
      
      setError(errorMessage)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!email) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    try {
      // 비밀번호 재설정 이메일 요청
      // flowType을 'implicit'로 설정하여 PKCE 비활성화 (이메일 링크는 PKCE를 사용할 수 없음)
      // 참고: https://supabase.com/docs/guides/auth/passwords
      // Implicit flow는 hash fragment에 access_token을 직접 받음
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      // 주의: 비밀번호 재설정은 이메일 링크를 통해 시작되므로 PKCE flow를 사용할 수 없습니다.
      // Supabase 대시보드에서 설정을 확인하세요:
      // 1. Authentication > URL Configuration > Site URL과 Redirect URLs 확인
      // 2. 비밀번호 재설정 링크가 hash fragment (#access_token=...) 형식으로 오도록 설정되어 있는지 확인
      // 3. 만약 code 파라미터로 오고 있다면, Supabase 설정에서 Implicit flow를 사용하도록 변경 필요

      if (resetError) {
        setError(resetError.message)
        return
      }

      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError('An error occurred while requesting password reset.')
      console.error('Password reset error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Forgot Password</h1>
          <p className="text-muted-foreground">
            Please enter the email address you registered with.
            <br />
            We will send you a password reset link.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {success ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Check Your Email</h2>
                <p className="text-sm text-muted-foreground">
                  We have sent a password reset link to your email.
                  <br />
                  Please check your email and click the link to reset your password.
                </p>
              </div>
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Password Reset Link
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-primary hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Additional Info */}
        {!success && (
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Didn't receive the email?
              <br />
              Check your spam folder or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

