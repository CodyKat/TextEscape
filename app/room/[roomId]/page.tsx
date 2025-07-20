import { Metadata } from 'next'
import { GameScreen } from '@/components/game-screen'
import { generateRoomMetadata } from '@/app/generateMetadata'
import { getRoom } from '@/lib/game-data'

interface RoomPageProps {
  params: Promise<{
    roomId: string
  }>
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { roomId } = await params
  return generateRoomMetadata(roomId)
}

export async function generateStaticParams() {
  // 모든 방에 대한 정적 페이지 생성
  const rooms = ['entrance', 'door', 'bookshelf', 'bookshelf_detail', 'escape']
  
  return rooms.map((roomId) => ({
    roomId,
  }))
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = await params
  const room = getRoom(roomId)
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">방을 찾을 수 없습니다</h1>
          <a href="/" className="text-blue-500 hover:underline">
            메인으로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  return <GameScreen initialRoom={roomId} />
} 