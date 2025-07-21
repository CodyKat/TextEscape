import { GameScreenClient } from './game-screen-client'

interface GameScreenProps {
  puzzleId?: string
  initialRoom?: string
}

export function GameScreen({ puzzleId = 'key', initialRoom }: GameScreenProps) {
  return <GameScreenClient puzzleId={puzzleId} initialRoom={initialRoom} />
} 