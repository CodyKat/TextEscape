'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Crown, Zap } from 'lucide-react'

interface GameState {
  concept: string
  currentText: string
  history: Array<{
    userInput: string
    aiResponse: string
    escaped?: boolean
  }>
  escaped: boolean
}

const INITIAL_CONCEPTS: Record<string, { concept: string; firstText: string }> = {
  '1': {
    concept: 'Dark Room',
    firstText: 'You are trapped in a dark room. There is an old door ahead and a bookshelf to your right. The choice is yours. What will you do?'
  },
  '2': {
    concept: 'Maze Escape',
    firstText: 'You must find your way through a complex maze. Each choice determines your fate. Time is running out. What will you do?'
  },
  '3': {
    concept: 'Space Base',
    firstText: 'Escape from an alien base. The spaceship systems are malfunctioning. Make choices for survival.'
  },
  '4': {
    concept: 'Ancient Temple',
    firstText: 'An evil spirit that was sleeping deep in the ancient temple has awakened. You must escape the temple. What will you do?'
  },
  '5': {
    concept: 'Middle of the Ocean',
    firstText: 'The ship has wrecked and you are stranded on a small island. Water and food are scarce. Make choices for survival.'
  },
  '6': {
    concept: 'Future City',
    firstText: 'You are being chased by someone in the cyberpunk city of 2077. You must find a place to hide. What will you do?'
  }
}

export default function GamePlayPage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.id as string
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [canRetry, setCanRetry] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 게임 초기화
  useEffect(() => {
    const initial = INITIAL_CONCEPTS[gameId]
    if (!initial) {
      router.push('/game')
      return
    }

    setGameState({
      concept: initial.concept,
      currentText: initial.firstText,
      history: [],
      escaped: false
    })
  }, [gameId, router])

  // 메시지 끝으로 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [gameState?.history])

  // 입력 포커스
  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading || !gameState || gameState.escaped) return

    const userInput = input.trim()
    setInput('')
    setLoading(true)
    setCanRetry(false)
    setRetryCount(0)

    try {
      const response = await fetch(`/api/game/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userInput,
          history: gameState.history,
          concept: gameState.concept,
          currentText: gameState.currentText
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (errorData.error === 'TOKEN_LIMIT_EXCEEDED') {
          setShowUpgradeModal(true)
          setLoading(false)
          return
        }
        throw new Error('API request failed')
      }

      const data = await response.json()
      if (data.error === 'TOKEN_LIMIT_EXCEEDED') {
        setShowUpgradeModal(true)
        setLoading(false)
        return
      }
      const escaped = data.escaped === true

      setGameState(prev => {
        if (!prev) return null
        return {
          ...prev,
          currentText: data.response,
          history: [...prev.history, {
            userInput,
            aiResponse: data.response,
            escaped
          }],
          escaped
        }
      })

      setCanRetry(true)
    } catch (error) {
      console.error('Game API error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async () => {
    if (!gameState || !canRetry || retryCount >= 3 || loading || gameState.escaped) return

    const lastHistory = gameState.history[gameState.history.length - 1]
    if (!lastHistory) return

    setLoading(true)

    try {
      const response = await fetch(`/api/game/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userInput: lastHistory.userInput,
          history: gameState.history.slice(0, -1), // 마지막 항목 제외
          concept: gameState.concept,
          currentText: gameState.history.length > 1 
            ? gameState.history[gameState.history.length - 2].aiResponse 
            : INITIAL_CONCEPTS[gameId].firstText,
          isRetry: true
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (errorData.error === 'TOKEN_LIMIT_EXCEEDED') {
          setShowUpgradeModal(true)
          setLoading(false)
          return
        }
        throw new Error('API request failed')
      }

      const data = await response.json()
      if (data.error === 'TOKEN_LIMIT_EXCEEDED') {
        setShowUpgradeModal(true)
        setLoading(false)
        return
      }
      const escaped = data.escaped === true

      setGameState(prev => {
        if (!prev) return null
        const newHistory = [...prev.history]
        newHistory[newHistory.length - 1] = {
          ...newHistory[newHistory.length - 1],
          aiResponse: data.response,
          escaped
        }
        return {
          ...prev,
          currentText: data.response,
          history: newHistory,
          escaped
        }
      })

      setRetryCount(prev => prev + 1)
      if (retryCount + 1 >= 3) {
        setCanRetry(false)
      }
    } catch (error) {
      console.error('Retry API error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/game"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Game List
            </Link>
            <div className="flex items-center gap-4">
              {canRetry && retryCount < 3 && !gameState.escaped && (
                <button
                  onClick={handleRetry}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry ({retryCount}/3)
                </button>
              )}
              <h1 className="text-lg font-semibold">{gameState.concept}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Situation */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {gameState.currentText}
              </p>
            </div>
          </div>
        </div>

        {/* History */}
        {gameState.history.length > 0 && (
          <div className="space-y-6 mb-8">
            {gameState.history.map((entry, index) => (
              <div key={index} className="space-y-4">
                {/* User Input */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="text-sm font-medium text-primary mb-2">Your Choice</div>
                  <p className="text-sm whitespace-pre-wrap">{entry.userInput}</p>
                </div>

                {/* AI Response */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {entry.aiResponse}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Escape Success */}
        {gameState.escaped && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-green-500">Escape Successful!</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Congratulations! You have successfully escaped from the room.
            </p>
            <div className="flex gap-3">
              <Link
                href="/game"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Play Another Game
              </Link>
              <button
                onClick={() => {
                  const initial = INITIAL_CONCEPTS[gameId]
                  setGameState({
                    concept: initial.concept,
                    currentText: initial.firstText,
                    history: [],
                    escaped: false
                  })
                  setRetryCount(0)
                  setCanRetry(false)
                }}
                className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                Restart
              </button>
            </div>
          </div>
        )}

        {/* Input Form */}
        {!gameState.escaped && (
          <form onSubmit={handleSubmit} className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      setInput(e.target.value)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                  placeholder="Enter your choice... (Enter to submit, Shift+Enter for new line)"
                  className="w-full min-h-[80px] max-h-[200px] px-4 py-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  disabled={loading}
                  maxLength={200}
                />
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                  {input.length}/200
                </div>
              </div>
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Upgrade Modal */}
      <Dialog.Root open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-6 border border-border bg-card p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-bold flex items-center gap-2">
                  <Crown className="w-6 h-6 text-primary" />
                  Token Limit Reached
                </Dialog.Title>
                <Dialog.Close className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-sm text-muted-foreground">
                The game context has reached 2000 tokens. Upgrade your plan to play more games.
              </Dialog.Description>

              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Crown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Premium Plan</h3>
                    <p className="text-sm text-muted-foreground">₩9,900/month</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Unlimited token game play</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Ad removal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Premium game access</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 justify-end">
                <Dialog.Close className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Later
                </Dialog.Close>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  <Crown className="w-4 h-4" />
                  Upgrade Now
                </Link>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

