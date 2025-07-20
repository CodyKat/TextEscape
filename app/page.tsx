import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import { AdSenseAd } from '@/components/google-ads'
import { getAllPuzzles } from '@/lib/puzzle-game-data'

export const metadata: Metadata = {
  title: 'TEXT-ESCAPE - 텍스트 방탈출 게임',
  description: '텍스트 기반 방탈출 게임을 즐겨보세요! 다양한 퍼즐과 선택지로 구성된 몰입감 있는 어드벤처 게임입니다.',
  keywords: ['방탈출', '텍스트 게임', '퍼즐', '어드벤처', '한국어 게임'],
  openGraph: {
    title: 'TEXT-ESCAPE - 텍스트 방탈출 게임',
    description: '텍스트 기반 방탈출 게임을 즐겨보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEXT-ESCAPE - 텍스트 방탈출 게임',
    description: '텍스트 기반 방탈출 게임을 즐겨보세요!',
  },
}

export default function Home() {
  const puzzles = getAllPuzzles()
  const difficultyMap: Record<string, string> = {
    'key': '쉬움',
    'number': '보통',
    'color': '보통',
    'piece': '어려움',
    'study': '어려움'
  }
  const emojiMap: Record<string, string> = {
    'key': '🔑',
    'number': '🔢',
    'color': '🎨',
    'piece': '🧩',
    'study': '📚'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 메인 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 tracking-wider">
            TEXT-ESCAPE
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            텍스트 기반 방탈출 게임의 세계에 오신 것을 환영합니다.
            다양한 퍼즐과 도전을 통해 탈출의 재미를 경험해보세요!
          </p>
        </div>

        {/* 업데이트 중 안내 */}
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center text-yellow-300">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">현재 새로운 퍼즐과 기능들이 업데이트 중입니다!</span>
          </div>
          <p className="text-yellow-200 text-center mt-2 text-sm">
            서재 탈출 퍼즐이 새로 추가되었고, 더 많은 퍼즐이 준비 중입니다.
          </p>
        </div>

        {/* 퍼즐 선택 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {puzzles.map((puzzle) => (
            <Link key={puzzle.id} href={`/game/${puzzle.id}`}>
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{emojiMap[puzzle.id]} {puzzle.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {puzzle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">난이도: {difficultyMap[puzzle.id]}</span>
                    <span className="text-blue-400 hover:text-blue-300 transition-colors">
                      시작하기 →
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
            각 퍼즐은 서로 다른 스토리와 도전을 제공합니다.
          </p>
          <p>
            우측 상단의 메뉴 버튼을 통해 언제든지 다른 퍼즐로 이동할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}
