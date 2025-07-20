'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const puzzles = [
    {
      id: 'key-puzzle',
      name: '🔑 열쇠 퍼즐',
      description: '열쇠를 찾아 문을 열어보세요',
      path: '/puzzle/key'
    },
    {
      id: 'number-puzzle',
      name: '🔢 숫자 퍼즐',
      description: '숫자 패드의 비밀을 풀어보세요',
      path: '/puzzle/number'
    },
    {
      id: 'color-puzzle',
      name: '🎨 색상 퍼즐',
      description: '색상 순서를 맞춰보세요',
      path: '/puzzle/color'
    },
    {
      id: 'piece-puzzle',
      name: '🧩 조각 퍼즐',
      description: '퍼즐 조각을 모아 완성해보세요',
      path: '/puzzle/piece'
    }
  ]

  const handlePuzzleSelect = (path: string) => {
    // 현재 URL이 퍼즐 페이지이고, 다른 퍼즐로 이동하는 경우 경고 표시
    if (window.location.pathname.startsWith('/puzzle/') && window.location.pathname !== path) {
      const confirmed = window.confirm('게임 진행 정보가 손실됩니다. 정말 다른 퍼즐로 이동하시겠습니까?')
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
    // 현재 URL이 퍼즐 페이지인지 확인
    if (window.location.pathname.startsWith('/puzzle/')) {
      const confirmed = window.confirm('게임 진행 정보가 손실됩니다. 정말 홈으로 이동하시겠습니까?')
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
        <div className="flex-1 flex justify-end">
          {/* 햄버거 메뉴 */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-l border-gray-800">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle className="text-white text-xl">게임 선택</SheetTitle>
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