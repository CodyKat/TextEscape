import { GameScreen } from '@/components/game-screen'
import { getPuzzleRoom } from '@/lib/puzzle-game-data'
import { Metadata } from 'next'
import { generatePuzzleMetadata } from '@/app/generateMetadata'

interface PuzzleRoomPageProps {
  params: Promise<{
    puzzleId: string
    roomId: string
  }>
}

export async function generateMetadata({ params }: PuzzleRoomPageProps): Promise<Metadata> {
  const { puzzleId, roomId } = await params
  return generatePuzzleMetadata(puzzleId, roomId)
}

export async function generateStaticParams() {
  // 모든 퍼즐과 방에 대한 정적 페이지 생성
  const puzzles = ['key', 'number', 'color', 'piece', 'study']
  const rooms = {
    key: ['entrance', 'door', 'bookshelf', 'bookshelf_detail', 'escape'],
    number: ['start', 'calculator', 'code_input', 'escape'],
    color: ['beginning', 'gem_collection', 'color_order', 'escape'],
    piece: ['entrance', 'piece_search', 'puzzle_assembly', 'escape'],
    study: [
      'study_room',
      'bookshelf_detail',
      'secret_compartment_bookshelf',
      'desk_detail',
      'drawer_open_diary',
      'window_view',
      'window_vines_cleared',
      'fireplace_detail',
      'corridor_entrance',
      'dark_corridor',
      'corridor_box',
      'corridor_box_open',
      'reception_room_entrance',
      'reception_fireplace_detail',
      'reception_window',
      'stone_wall_detail',
      'pantry_room',
      'garden_path',
      'dry_well',
      'well_clue_revealed',
      'garden_shed_entrance',
      'shed_open',
      'escape'
    ]
  }
  
  const params = []
  for (const puzzleId of puzzles) {
    const puzzleRooms = rooms[puzzleId as keyof typeof rooms] || []
    for (const roomId of puzzleRooms) {
      params.push({ puzzleId, roomId })
    }
  }
  
  return params
}

export default async function PuzzleRoomPage({ params }: PuzzleRoomPageProps) {
  const { puzzleId, roomId } = await params
  const room = getPuzzleRoom(puzzleId, roomId)
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">방을 찾을 수 없습니다</h1>
          <p className="text-gray-400 mb-4">퍼즐: {puzzleId}, 방: {roomId}</p>
          <a href="/" className="text-blue-500 hover:underline">
            메인으로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  return <GameScreen puzzleId={puzzleId} initialRoom={roomId} />
} 