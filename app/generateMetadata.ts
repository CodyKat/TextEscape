import { Metadata } from 'next'
import { getRoom } from '@/lib/game-data'

export function generateRoomMetadata(roomId: string): Metadata {
  const room = getRoom(roomId)
  
  if (!room) {
    return {
      title: '방탈출 게임 - 텍스트 어드벤처',
      description: '텍스트 기반 방탈출 게임을 즐겨보세요! 다양한 퍼즐과 선택지로 구성된 몰입감 있는 어드벤처 게임입니다.',
      keywords: ['방탈출', '텍스트 게임', '퍼즐', '어드벤처', '한국어 게임'],
      openGraph: {
        title: '방탈출 게임 - 텍스트 어드벤처',
        description: '텍스트 기반 방탈출 게임을 즐겨보세요!',
        type: 'website',
        locale: 'ko_KR',
      },
      twitter: {
        card: 'summary_large_image',
        title: '방탈출 게임 - 텍스트 어드벤처',
        description: '텍스트 기반 방탈출 게임을 즐겨보세요!',
      },
    }
  }

  return {
    title: `${room.title} - 방탈출 게임`,
    description: room.description,
    keywords: ['방탈출', '텍스트 게임', '퍼즐', '어드벤처', room.title, '한국어 게임'],
    openGraph: {
      title: `${room.title} - 방탈출 게임`,
      description: room.description,
      type: 'website',
      locale: 'ko_KR',
      images: [
        {
          url: room.backgroundImage,
          width: 1200,
          height: 800,
          alt: room.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.title} - 방탈출 게임`,
      description: room.description,
      images: [room.backgroundImage],
    },
  }
}

export function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  
  // 모든 방에 대한 sitemap 생성
  const rooms = ['entrance', 'door', 'bookshelf', 'bookshelf_detail', 'escape']
  
  const sitemap = rooms.map((roomId) => ({
    url: `${baseUrl}/room/${roomId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: roomId === 'entrance' ? 1 : 0.8,
  }))
  
  return sitemap
} 