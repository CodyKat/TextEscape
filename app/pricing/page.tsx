'use client'

import Link from 'next/link'
import { Check, Crown, Zap, Sparkles, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthModal } from '@/components/auth-modal'

interface Subscription {
  id: string
  plan_id: string
  status: string
}

export default function PricingPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  // 구독 정보 가져오기
  const fetchSubscription = useCallback(async () => {
    try {
      const res = await fetch('/api/subscription')
      const data = await res.json()
      setSubscription(data.subscription)
    } catch (error) {
      console.error('Subscription fetch error:', error)
    }
  }, [])

  // 결제 성공/취소 확인 및 인증 모달 열기
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')
    const authOpen = searchParams.get('auth')
    
    if (success) {
      // 결제 성공 시 페이지 새로고침하여 구독 정보 갱신
      router.replace('/pricing')
      setTimeout(() => {
        fetchSubscription()
      }, 2000)
    }
    
    if (authOpen === 'open') {
      setIsAuthModalOpen(true)
      router.replace('/pricing')
    }
  }, [searchParams, router, fetchSubscription])

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          fetchSubscription()
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchSubscription()
        } else {
          setSubscription(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchSubscription])

  // 결제 시작
  const handleCheckout = async (planId: string) => {
    setCheckoutLoading(planId)

    try {
      // 실제 사용자 인증 상태 확인
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser()
      
      if (!currentUser || authError) {
        setCheckoutLoading(null)
        setIsAuthModalOpen(true)
        return
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, billingPeriod }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'An error occurred while creating the checkout session')
        setCheckoutLoading(null)
        return
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutLoading(null)
        alert('결제 URL을 받을 수 없습니다')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred while creating the checkout session')
      setCheckoutLoading(null)
    }
  }

  const getPlanPrice = (planId: string) => {
    if (planId === 'free') return { monthly: '$0', yearly: '$0', monthlyKRW: '₩0', yearlyKRW: '₩0' }
    
    if (billingPeriod === 'yearly') {
      return planId === 'premium' 
        ? { monthly: '$8.90', yearly: '$106.80', monthlyKRW: '₩8,900', yearlyKRW: '₩106,800' }
        : { monthly: '$25.90', yearly: '$358.80', monthlyKRW: '₩25,900', yearlyKRW: '₩358,800' }
    }
    
    return planId === 'premium'
      ? { monthly: '$9.90', yearly: '$118.80', monthlyKRW: '₩9,900', yearlyKRW: '₩118,800' }
      : { monthly: '$29.90', yearly: '$358.80', monthlyKRW: '₩29,900', yearlyKRW: '₩358,800' }
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₩0',
      period: 'month',
      description: 'Use basic features freely',
      icon: Sparkles,
      features: [
        '2000 token game play',
        'Basic game list',
      ],
      cta: 'Get Started Free',
      popular: false,
      href: '/game'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Play all games with increased tokens',
      icon: Crown,
      features: [
        'All features of Free plan',
        '20000 token game play',
      ],
      cta: 'Start Premium',
      popular: true,
      href: '/game'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'All features for the ultimate experience',
      icon: Zap,
      features: [
        'All features of Premium plan',
        'Unlimited token game play'
      ],
      cta: 'Start Pro',
      popular: false,
      href: '/game'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Choose Your Membership
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Select the plan that works for you
          </p>
          <p className="text-base text-muted-foreground">
            You can upgrade or downgrade at any time
          </p>
        </div>
      </section>

      {/* Billing Period Toggle */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="inline-flex items-center gap-4 bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingPeriod === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              {billingPeriod === 'yearly' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Discount
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.id}
                  className={`relative bg-card border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
                    plan.popular
                      ? 'border-primary shadow-lg scale-105 md:scale-110'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      Popular Plan
                    </div>
                  )}
                  <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${plan.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Icon className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      {plan.id === 'free' ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">₩0</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold">
                              {billingPeriod === 'yearly' 
                                ? getPlanPrice(plan.id).yearly 
                                : getPlanPrice(plan.id).monthly}
                            </span>
                            <span className="text-muted-foreground">
                              {billingPeriod === 'yearly' ? '/year' : '/month'}
                            </span>
                          </div>
                          {billingPeriod === 'yearly' && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="line-through">
                                {plan.id === 'premium' ? '$118.80' : '$358.80'}
                              </span>
                              {' '}
                              <span className="text-green-600 font-medium">
                                Billed {getPlanPrice(plan.id).monthly} per month
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {plan.id === 'free' ? (
                      <Link
                        href={plan.href}
                        className={`w-full mb-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-base font-semibold transition-all ${
                          plan.popular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-lg'
                            : 'bg-muted text-foreground hover:bg-muted/80 hover:scale-[1.02]'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleCheckout(plan.id)}
                        disabled={checkoutLoading === plan.id || loading}
                        className={`w-full mb-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-base font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          plan.popular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-lg'
                            : 'bg-muted text-foreground hover:bg-muted/80 hover:scale-[1.02]'
                        } ${subscription?.plan_id === plan.id ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      >
                        {checkoutLoading === plan.id ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : subscription?.plan_id === plan.id ? (
                          'Current Plan'
                        ) : (
                          plan.cta
                        )}
                      </button>
                    )}

                    <div className="space-y-4">
                      <div className="text-sm font-medium mb-3">Features included:</div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately.'
              },
              {
                q: 'How does billing work?',
                a: 'We support various payment methods including credit cards, debit cards, and PayPal. All payments are processed securely.'
              },
              {
                q: 'What is the difference between free and paid plans?',
                a: 'The free plan provides 2000 token game play, the premium plan provides 20000 token game play, and the pro plan provides unlimited token game play.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </div>
  )
}


