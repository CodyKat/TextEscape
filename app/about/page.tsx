'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLanguage, getTranslation } from '@/lib/i18n'
import { useEffect, useState } from 'react'
import { Language } from '@/lib/i18n'

export default function About() {
  const [lang, setLang] = useState<Language>('ko')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setLang(getLanguage())
    setMounted(true)
  }, [])

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
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-wider">
            {getTranslation(lang, 'about.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {getTranslation(lang, 'about.subtitle')}
          </p>
        </div>

        {/* 방탈출이란? 섹션 */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <span className="text-3xl">🚪</span>
              {getTranslation(lang, 'about.whatIsEscapeRoom.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed mb-4">
              {getTranslation(lang, 'about.whatIsEscapeRoom.description')}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {getTranslation(lang, 'about.whatIsEscapeRoom.evolution')}
            </p>
          </CardContent>
        </Card>

        {/* 텍스트 방탈출 컨셉 섹션 */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <span className="text-3xl">📝</span>
              {getTranslation(lang, 'about.textEscapeRoom.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed mb-4">
              {getTranslation(lang, 'about.textEscapeRoom.description')}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {getTranslation(lang, 'about.textEscapeRoom.concept')}
            </p>
          </CardContent>
        </Card>

        {/* 주요 특징 섹션 */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <span className="text-3xl">✨</span>
              {getTranslation(lang, 'about.keyFeatures.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">📖</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.storytelling.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.storytelling.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">🎯</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.choices.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.choices.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">🧩</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.puzzles.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.puzzles.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 text-lg">🎒</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.inventory.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.inventory.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-lg">🌿</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.branching.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.branching.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg">🎭</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.keyFeatures.genres.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.keyFeatures.genres.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 장점 섹션 */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <span className="text-3xl">🌟</span>
              {getTranslation(lang, 'about.advantages.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-lg">🧠</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.advantages.imagination.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.advantages.imagination.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-400 text-lg">⚡</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.advantages.development.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.advantages.development.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">📱</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.advantages.accessibility.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.advantages.accessibility.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 text-lg">📚</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.advantages.story.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.advantages.story.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 text-lg">🎨</span>
                  <div>
                    <h4 className="text-white font-semibold">{getTranslation(lang, 'about.advantages.versatility.title')}</h4>
                    <p className="text-gray-300 text-sm">{getTranslation(lang, 'about.advantages.versatility.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 게임 구조 섹션 */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <span className="text-3xl">🏗️</span>
              {getTranslation(lang, 'about.gameStructure.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold text-lg mb-3">{getTranslation(lang, 'about.gameStructure.basic.title')}</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.basic.gameScreen')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.basic.choices')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.basic.inventory')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.basic.memo')}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-3">{getTranslation(lang, 'about.gameStructure.progression.title')}</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.progression.situation')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.progression.actions')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.progression.conditions')}
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-3">{getTranslation(lang, 'about.gameStructure.puzzleTypes.title')}</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.puzzleTypes.cipher')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-orange-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.puzzleTypes.combination')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.puzzleTypes.matching')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.puzzleTypes.clues')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">•</span>
                    {getTranslation(lang, 'about.gameStructure.puzzleTypes.sequence')}
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 돌아가기 버튼 */}
        <div className="text-center mb-8">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              {getTranslation(lang, 'common.goBack')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
} 