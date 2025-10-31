'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, User, Play } from 'lucide-react'
import { AuthModal } from '@/components/auth-modal'

export function Header() {
  const pathname = usePathname()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
          <span>TEXT-ESCAPE</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'text-foreground bg-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/game"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/game'
                ? 'text-foreground bg-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <Play className="w-4 h-4" />
            Games
          </Link>
          <Link
            href="/pricing"
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/pricing'
                ? 'text-foreground bg-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search - Mobile */}
          <button className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Play Button */}
          {/* <Link
            href="/game"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Play</span>
          </Link> */}

          {/* User */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  )
}

