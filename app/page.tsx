import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Metadata } from 'next'
import { AdSenseAd } from '@/components/google-ads'

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
  const puzzles = [
    {
      id: 'key-puzzle',
      name: '🔑 열쇠 퍼즐',
      description: '열쇠를 찾아 문을 열어보세요',
      path: '/puzzle/key',
      difficulty: '쉬움'
    },
    {
      id: 'number-puzzle',
      name: '🔢 숫자 퍼즐',
      description: '숫자 패드의 비밀을 풀어보세요',
      path: '/puzzle/number',
      difficulty: '보통'
    },
    {
      id: 'color-puzzle',
      name: '🎨 색상 퍼즐',
      description: '색상 순서를 맞춰보세요',
      path: '/puzzle/color',
      difficulty: '보통'
    },
    {
      id: 'piece-puzzle',
      name: '🧩 조각 퍼즐',
      description: '퍼즐 조각을 모아 완성해보세요',
      path: '/puzzle/piece',
      difficulty: '어려움'
    }
  ]

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

        {/* 퍼즐 선택 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {puzzles.map((puzzle) => (
            <Link key={puzzle.id} href={puzzle.path}>
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{puzzle.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {puzzle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">난이도: {puzzle.difficulty}</span>
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
