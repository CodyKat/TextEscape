'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Crown, Check, X, Clock, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: string
  paypal_subscription_id: string | null
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/')
          return
        }
        setUser(user)

        const { data: subscriptionData, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Subscription fetch error:', error)
        } else {
          setSubscription(subscriptionData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, router])

  const handleCancelSubscription = async () => {
    if (!subscription?.paypal_subscription_id) {
      alert('No PayPal subscription found')
      return
    }

    if (!confirm('Are you sure you want to cancel your subscription? This action cannot be undone.')) {
      return
    }

    setCancelling(true)
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      alert('Subscription cancelled successfully. Your subscription will remain active until the end of the current billing period.')
      router.refresh()
      
      // Refresh subscription data
      if (user) {
        const { data: subscriptionData } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()
        setSubscription(subscriptionData)
      }
    } catch (error: any) {
      console.error('Cancel subscription error:', error)
      alert(error.message || 'An error occurred while cancelling the subscription')
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Get subscription information

  // Default to free plan if no subscription
  const planId = subscription?.plan_id || 'free'
  const status = subscription?.status || 'active'
  const currentPeriodEnd = subscription?.current_period_end
  const isPremiumOrPro = planId === 'premium' || planId === 'pro'
  const canCancel = isPremiumOrPro && status === 'active' && subscription?.paypal_subscription_id

  const plans = {
    free: {
      name: 'Free',
      description: 'Basic Plan',
      features: ['Basic Game Play', 'Limited Game Access'],
      color: 'text-gray-600 dark:text-gray-300',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
    premium: {
      name: 'Premium',
      description: 'Premium Plan',
      features: ['All Game Access', 'No Ads', 'Priority Support'],
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    pro: {
      name: 'Pro',
      description: 'Pro Plan',
      features: ['All Game Access', 'No Ads', 'Priority Support', 'Special Features'],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
  }

  const currentPlan = plans[planId as keyof typeof plans] || plans.free

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="w-3 h-3" />
            Active
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case 'canceled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="w-3 h-3" />
            Canceled
          </span>
        )
      case 'past_due':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            <Clock className="w-3 h-3" />
            Past Due
          </span>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Subscription</h1>
        <p className="text-muted-foreground">View your current subscription plan and payment details</p>
      </div>

      <div className="grid gap-6">
        {/* Current Subscription Info */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Current Plan</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            {getStatusBadge()}
          </div>

          <div className={`rounded-lg p-6 ${currentPlan.bgColor} dark:border dark:border-opacity-30 mb-4`}>
            <div className="flex items-center gap-3 mb-2">
              {planId !== 'free' && <Crown className={`w-6 h-6 ${currentPlan.color}`} />}
              <h3 className={`text-2xl font-bold ${currentPlan.color}`}>
                {currentPlan.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground dark:text-foreground mb-4">{currentPlan.description}</p>

            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentPeriodEnd && status === 'active' && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Next Billing Date: {formatDate(currentPeriodEnd)}</span>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            {planId === 'free' && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 text-sm font-medium text-white hover:from-yellow-600 hover:to-orange-600 transition-colors shadow-md"
              >
                <Crown className="w-4 h-4" />
                Upgrade Plan
              </Link>
            )}
            {canCancel && (
              <button
                onClick={handleCancelSubscription}
                disabled={cancelling}
                className="inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    Cancel Subscription
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Subscription Details */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan ID</span>
              <span className="text-sm font-medium">{planId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm font-medium">{status}</span>
            </div>
            {subscription?.paypal_subscription_id && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">PayPal Subscription ID</span>
                <span className="text-xs font-mono">{subscription.paypal_subscription_id}</span>
              </div>
            )}
            {subscription?.created_at && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subscription Start Date</span>
                <span className="text-sm font-medium">{formatDate(subscription.created_at)}</span>
              </div>
            )}
            {currentPeriodEnd && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Period End</span>
                <span className="text-sm font-medium">{formatDate(currentPeriodEnd)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

