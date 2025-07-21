'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { LanguageSelector } from '@/components/language-selector'
import { getLanguage, getTranslation } from '@/lib/i18n'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const lang = getLanguage()

  const puzzles = [
    {
      id: 'key',
      name: getTranslation(lang, 'puzzles.key.name'),
      description: getTranslation(lang, 'puzzles.key.description'),
      path: '/game/key'
    },
    {
      id: 'number',
      name: getTranslation(lang, 'puzzles.number.name'),
      description: getTranslation(lang, 'puzzles.number.description'),
      path: '/game/number'
    },
    {
      id: 'color',
      name: getTranslation(lang, 'puzzles.color.name'),
      description: getTranslation(lang, 'puzzles.color.description'),
      path: '/game/color'
    },
    {
      id: 'piece',
      name: getTranslation(lang, 'puzzles.piece.name'),
      description: getTranslation(lang, 'puzzles.piece.description'),
      path: '/game/piece'
    },
    {
      id: 'study',
      name: getTranslation(lang, 'puzzles.study.name'),
      description: getTranslation(lang, 'puzzles.study.description'),
      path: '/game/study'
    }
  ]

  const handlePuzzleSelect = (path: string) => {
    // 현재 URL이 게임 페이지이고, 다른 퍼즐로 이동하는 경우 경고 표시
    if (window.location.pathname.startsWith('/game/') && window.location.pathname !== path) {
      const confirmed = window.confirm(getTranslation(lang, 'game.resetConfirm'))
      if (confirmed) {
        router.push(path)
        setIsOpen(false)
      }
    } else {
      router.push(path)
      setIsOpen(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // 현재 URL이 게임 페이지인지 확인
    if (window.location.pathname.startsWith('/game/')) {
      const confirmed = window.confirm(getTranslation(lang, 'header.progressLossWarning'))
      if (confirmed) {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* 로고 */}
        <div className="flex-1" />
        <div className="flex-1 flex justify-center">
          <button
            onClick={handleLogoClick}
            className="text-2xl sm:text-3xl font-bold text-white tracking-wider hover:text-gray-300 transition-colors cursor-pointer"
          >
            TEXT-ESCAPE
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-2">
          {/* 언어 선택기 */}
          <LanguageSelector />
          
          {/* 햄버거 메뉴 */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-l border-gray-800">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle className="text-white text-xl">{getTranslation(lang, 'header.gameSelection')}</SheetTitle>
                <SheetClose className="text-white hover:text-gray-300 transition-colors">
                  <X className="h-6 w-6" />
                </SheetClose>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {puzzles.map((puzzle) => (
                  <div
                    key={puzzle.id}
                    className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => handlePuzzleSelect(puzzle.path)}
                  >
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {puzzle.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {puzzle.description}
                    </p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
              </div>
      </header>
  )
} 