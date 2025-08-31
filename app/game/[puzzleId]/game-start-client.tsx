'use client'

import Link from 'next/link'
import { getTranslation } from '@/lib/i18n'
import { getLanguage } from '@/lib/i18n/language'
import { useEffect, useState } from 'react'

interface GameStartClientProps {
  puzzleId: string
  puzzleData: any
  startRoom: string
}

export default function GameStartClient({ puzzleId, puzzleData, startRoom }: GameStartClientProps) {
  const [lang, setLang] = useState<'ko' | 'ja' | 'en'>('en')

  useEffect(() => {
    // 언어 설정
    setLang(getLanguage())

    // 언어 변경 이벤트 리스너
    const handleLanguageChange = () => {
      setLang(getLanguage())
    }

    window.addEventListener('storage', handleLanguageChange)
    return () => {
      window.removeEventListener('storage', handleLanguageChange)
    }
  }, [])

  if (!puzzleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{getTranslation(lang, 'game.puzzleNotFound')}</h1>
          <p className="text-gray-400 mb-4">{getTranslation(lang, 'game.puzzleId')}: {puzzleId}</p>
          <Link href="/" className="text-blue-500 hover:underline">
            {getTranslation(lang, 'game.returnToMain')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-black/95 text-white border border-gray-600 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">{getTranslation(lang, `puzzles.${puzzleId}.name`)}</h1>
          <p className="text-gray-300 mb-6">{getTranslation(lang, `puzzles.${puzzleId}.description`)}</p>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              {getTranslation(lang, 'game.gameStartWarning')}
            </p>
            <Link
              href={`/game/${puzzleId}/${startRoom}?start=true`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              {getTranslation(lang, 'common.startGame')}
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              {getTranslation(lang, 'common.goBack')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 