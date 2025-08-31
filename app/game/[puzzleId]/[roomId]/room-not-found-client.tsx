'use client'

import { getTranslation } from '@/lib/i18n'
import { getLanguage } from '@/lib/i18n/language'
import { useEffect, useState } from 'react'

interface RoomNotFoundClientProps {
  puzzleId: string
  roomId: string
}

export default function RoomNotFoundClient({ puzzleId, roomId }: RoomNotFoundClientProps) {
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{getTranslation(lang, 'game.roomNotFound')}</h1>
        <p className="text-gray-400 mb-4">{getTranslation(lang, 'game.puzzle')}: {puzzleId}, {getTranslation(lang, 'game.room')}: {roomId}</p>
        <a href="/" className="text-blue-500 hover:underline">
          {getTranslation(lang, 'game.goBackToMain')}
        </a>
      </div>
    </div>
  )
} 