import { Metadata } from 'next'
import Link from 'next/link'
import { getPuzzleData, getAllPuzzles } from '@/lib/puzzle-game-data'
import { getPuzzleStartRoom } from '@/lib/puzzle-progress-guard'
import { generatePuzzleMetadata } from '@/app/generateMetadata'

interface GameStartPageProps {
  params: Promise<{
    puzzleId: string
  }>
}

export async function generateMetadata({ params }: GameStartPageProps): Promise<Metadata> {
  const { puzzleId } = await params
  return generatePuzzleMetadata(puzzleId, 'start')
}

export async function generateStaticParams() {
  const puzzles = getAllPuzzles()
  return puzzles.map((puzzle) => ({
    puzzleId: puzzle.id,
  }))
}

export default async function GameStartPage({ params }: GameStartPageProps) {
  const { puzzleId } = await params
  const puzzleData = getPuzzleData(puzzleId)
  const startRoom = getPuzzleStartRoom(puzzleId)

  if (!puzzleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">퍼즐을 찾을 수 없습니다</h1>
          <p className="text-gray-400 mb-4">퍼즐 ID: {puzzleId}</p>
          <Link href="/" className="text-blue-500 hover:underline">
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-black/95 text-white border border-gray-600 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">{puzzleData.name}</h1>
          <p className="text-gray-300 mb-6">{puzzleData.description}</p>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              ⚠️ 게임을 시작하면 이전 진행 상황이 모두 초기화됩니다.
            </p>
            <Link
              href={`/game/${puzzleId}/${startRoom}?start=true`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              게임 시작하기
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 