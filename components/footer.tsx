'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">TEXT-ESCAPE</h3>
            <p className="text-sm text-muted-foreground">
              Text-based escape room game platform
            </p>
            <p className="text-sm text-muted-foreground">contact: textescape42@gmail.com</p>
          </div>

          {/* Links */}
          {/* <div className="space-y-4">
            <h4 className="text-sm font-semibold">Games</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/discover" className="hover:text-foreground transition-colors">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/discover?category=popular" className="hover:text-foreground transition-colors">
                  Popular Games
                </Link>
              </li>
              <li>
                <Link href="/discover?category=new" className="hover:text-foreground transition-colors">
                  New Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          {/* <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Legal */}
          {/* <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TEXT-ESCAPE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

