'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock, Loader2, CheckCircle2, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  // 세션 확인 - 비밀번호 재설정 링크를 통해 리다이렉트되면 이미 세션이 설정되어 있어야 함
  // 참고: https://supabase.com/docs/guides/auth/passwords
  useEffect(() => {
    // onAuthStateChange를 사용하여 PASSWORD_RECOVERY 이벤트 감지 (선택적)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, { session: !!session })
      
      // PASSWORD_RECOVERY 이벤트가 발생하면 세션 확인 완료
      if (event === 'PASSWORD_RECOVERY' && session) {
        console.log('PASSWORD_RECOVERY event received')
        setCheckingSession(false)
      }
    })

    // 초기 세션 확인
    const checkSession = async () => {
      try {
        // URL의 hash fragment와 query string 확인
        const hash = window.location.hash
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code')
        
        console.log('Session check - Hash:', hash, 'Code:', code)
        
        // Hash fragment 처리 (Implicit flow)
        // 문서: "The implicit flow only works for client-only apps. Your site directly receives the access token"
        if (hash) {
          const hashParams = new URLSearchParams(hash.substring(1))
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          const type = hashParams.get('type')
          
          // Implicit flow: hash fragment에 토큰이 있으면 직접 세션 설정
          if (accessToken && refreshToken) {
            console.log('Setting session from hash...')
            
            // URL 정리
            window.history.replaceState(null, '', window.location.pathname)
            
            // 토큰으로 세션 설정
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            
            if (sessionError) {
              console.error('SetSession error:', sessionError)
              setError('The password reset link is invalid or has expired.')
              setCheckingSession(false)
              return
            }
            
            if (data?.session) {
              console.log('Session set from hash successfully')
              setCheckingSession(false)
              return
            }
          }
        }
        
        // Code parameter processing
        // Note: Password reset cannot use PKCE flow as it starts via email link
        // If code parameter exists, wait for Supabase to auto-process
        // But error may occur if code_verifier is missing
        if (code) {
          console.log('Code found, waiting for Supabase to auto-process...')
          // Wait for Supabase to auto-process hash fragment
          // Or wait until onAuthStateChange fires PASSWORD_RECOVERY event
          // Wait until timeout (see timeout setting below)
        }
        
        // Wait briefly for Supabase to auto-process hash
        // Session may already be set after redirect
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check session with getSession()
        // Reference: https://supabase.com/docs/reference/javascript/auth-getsession
        // Session should already be set when redirected via password reset link
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        console.log('Session check result:', { session: !!session, error: sessionError })
        
        if (session) {
          // If session exists, complete (logged in via password reset link)
          // Clean up URL
          if (hash) {
            window.history.replaceState(null, '', window.location.pathname)
          }
          setCheckingSession(false)
        } else {
          // If no session, error
          // If code parameter exists, may be PKCE error
          if (code) {
            setError('The password reset link uses PKCE flow and cannot be processed. Please configure Implicit flow in Supabase dashboard, or request a new link.')
          } else {
            setError('The password reset link is invalid or has expired. Please request a new one.')
          }
          setCheckingSession(false)
        }
      } catch (err) {
        console.error('Session check error:', err)
        setError('An error occurred while checking the session.')
        setCheckingSession(false)
      }
    }

    checkSession()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!password || !confirmPassword) {
      setError('Please enter your password.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      setSuccess(true)
      
      // 2초 후 홈으로 리다이렉트
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (err) {
      setError('An error occurred while resetting your password.')
      console.error('Password update error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Checking...</p>
        </div>
      </div>
    )
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
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">
            Please enter your new password.
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
                <h2 className="text-xl font-semibold">Password Changed Successfully</h2>
                <p className="text-sm text-muted-foreground">
                  You can now log in with your new password.
                  <br />
                  Redirecting to home shortly...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password (minimum 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                    Changing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-primary hover:underline"
                >
                  Back to Home
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

