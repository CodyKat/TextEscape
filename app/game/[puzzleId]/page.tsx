import Link from 'next/link'
import { getPuzzleData, getAllPuzzles } from '@/lib/puzzle-game-data'
import { getPuzzleStartRoom } from '@/lib/puzzle-progress-guard'
import { Metadata } from 'next'
import { generatePuzzleMetadata } from '@/app/generateMetadata'
import GameStartClient from './game-start-client'

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

  return <GameStartClient puzzleId={puzzleId} puzzleData={puzzleData} startRoom={startRoom} />
} 