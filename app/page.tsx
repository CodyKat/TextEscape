'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AdSenseAd } from '@/components/google-ads'
import { getAllPuzzles } from '@/lib/puzzle-game-data'
import { getLanguage, getTranslation } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Language } from '@/lib/i18n'

export default function Home() {
  const puzzles = getAllPuzzles()
  const [lang, setLang] = useState<Language>('ko')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLang(getLanguage())
    setMounted(true)
  }, [])
  
  const difficultyMap: Record<string, string> = {
    'key': getTranslation(lang, 'home.difficultyLevels.easy'),
    'number': getTranslation(lang, 'home.difficultyLevels.normal'),
    'color': getTranslation(lang, 'home.difficultyLevels.normal'),
    'piece': getTranslation(lang, 'home.difficultyLevels.hard'),
    'study': getTranslation(lang, 'home.difficultyLevels.hard')
  }
  
  const puzzleNameMap: Record<string, string> = {
    'key': getTranslation(lang, 'puzzles.key.name'),
    'number': getTranslation(lang, 'puzzles.number.name'),
    'color': getTranslation(lang, 'puzzles.color.name'),
    'piece': getTranslation(lang, 'puzzles.piece.name'),
    'study': getTranslation(lang, 'puzzles.study.name')
  }
  
  const puzzleDescMap: Record<string, string> = {
    'key': getTranslation(lang, 'puzzles.key.description'),
    'number': getTranslation(lang, 'puzzles.number.description'),
    'color': getTranslation(lang, 'puzzles.color.description'),
    'piece': getTranslation(lang, 'puzzles.piece.description'),
    'study': getTranslation(lang, 'puzzles.study.description')
  }
  
  const emojiMap: Record<string, string> = {
    'key': '🔑',
    'number': '🔢',
    'color': '🎨',
    'piece': '🧩',
    'study': '📚'
  }

  // 언어 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      setLang(getLanguage())
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 메인 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-wider">
            {getTranslation(lang, 'home.welcome')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {getTranslation(lang, 'home.subtitle')}
          </p>
        </div>

        {/* 업데이트 중 안내 */}
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center text-yellow-300">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">{getTranslation(lang, 'home.updateNotice')}</span>
          </div>
          <p className="text-yellow-200 text-center mt-2 text-sm">
            {getTranslation(lang, 'home.updateDescription')}
          </p>
        </div>

        {/* 퍼즐 선택 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {puzzles.map((puzzle) => (
            <Link key={puzzle.id} href={`/game/${puzzle.id}`}>
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{puzzleNameMap[puzzle.id]}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {puzzleDescMap[puzzle.id]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{getTranslation(lang, 'home.difficulty')}: {difficultyMap[puzzle.id]}</span>
                    <span className="text-blue-400 hover:text-blue-300 transition-colors">
                      {getTranslation(lang, 'common.startGame')} →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 광고 */}
        <AdSenseAd adSlot="1234567890" adFormat="banner" />

        {/* 게임 설명 */}
        <div className="text-center text-gray-400">
          <p className="mb-4">
            {getTranslation(lang, 'home.puzzleDescription')}
          </p>
          <p>
            {getTranslation(lang, 'home.menuInstruction')}
          </p>
        </div>
      </div>
    </div>
  )
}
