import { Metadata } from 'next'
import { getRoom } from '@/lib/game-data'
import { getPuzzleRoom, getPuzzleData } from '@/lib/puzzle-game-data'
import { getTranslation } from '@/lib/i18n'
import { getLanguage } from '@/lib/i18n/language'

// 언어 감지 함수 (서버 사이드)
function detectLanguageFromHeaders(): 'ko' | 'ja' | 'en' {
  // 서버 사이드에서는 기본값 반환
  // 실제 언어는 클라이언트에서 결정됨
  return 'ko'
}

export function generatePuzzleMetadata(puzzleId: string, roomId: string, lang?: 'ko' | 'ja' | 'en'): Metadata {
  const detectedLang = lang || detectLanguageFromHeaders()
  const puzzleData = getPuzzleData(puzzleId)
  const room = getPuzzleRoom(puzzleId, roomId)
  
  if (!puzzleData || !room) {
    return {
      title: getTranslation(detectedLang, 'common.seoTitle'),
      description: getTranslation(detectedLang, 'common.seoDescription'),
      keywords: getTranslation(detectedLang, 'common.seoKeywords').split(', '),
      openGraph: {
        title: getTranslation(detectedLang, 'common.seoTitle'),
        description: getTranslation(detectedLang, 'common.seoDescription'),
        type: 'website',
        locale: detectedLang === 'ko' ? 'ko_KR' : detectedLang === 'ja' ? 'ja_JP' : 'en_US',
        alternateLocale: ['ko_KR', 'ja_JP', 'en_US'],
      },
      twitter: {
        card: 'summary_large_image',
        title: getTranslation(detectedLang, 'common.seoTitle'),
        description: getTranslation(detectedLang, 'common.seoDescription'),
      },
      // 다국어 대안 URL 추가
      alternates: {
        canonical: `/game/${puzzleId}/${roomId}`,
        languages: {
          'ko': `/game/${puzzleId}/${roomId}`,
          'ja': `/game/${puzzleId}/${roomId}`,
          'en': `/game/${puzzleId}/${roomId}`,
        },
      },
    }
  }

  const puzzleName = getTranslation(detectedLang, `puzzles.${puzzleId}.name`)
  const puzzleDesc = getTranslation(detectedLang, `puzzles.${puzzleId}.description`)
  
  // 모든 언어의 키워드 수집
  const allKeywords = [
    ...getTranslation('ko', 'common.seoKeywords').split(', '),
    ...getTranslation('ja', 'common.seoKeywords').split(', '),
    ...getTranslation('en', 'common.seoKeywords').split(', '),
    puzzleName,
    room.title
  ]
  
  return {
    title: `${room.title} - ${puzzleName} - TEXT-ESCAPE`,
    description: room.description,
    keywords: allKeywords,
    openGraph: {
      title: `${room.title} - ${puzzleName} - TEXT-ESCAPE`,
      description: room.description,
      type: 'website',
      locale: detectedLang === 'ko' ? 'ko_KR' : detectedLang === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: ['ko_KR', 'ja_JP', 'en_US'],
      images: room.backgroundImage ? [
        {
          url: room.backgroundImage,
          width: 1200,
          height: 800,
          alt: room.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.title} - ${puzzleName} - TEXT-ESCAPE`,
      description: room.description,
      images: room.backgroundImage ? [room.backgroundImage] : undefined,
    },
    // 다국어 대안 URL 추가
    alternates: {
      canonical: `/game/${puzzleId}/${roomId}`,
      languages: {
        'ko': `/game/${puzzleId}/${roomId}`,
        'ja': `/game/${puzzleId}/${roomId}`,
        'en': `/game/${puzzleId}/${roomId}`,
      },
    },
  }
}

export function generateRoomMetadata(roomId: string, lang?: 'ko' | 'ja' | 'en'): Metadata {
  const detectedLang = lang || detectLanguageFromHeaders()
  const room = getRoom(roomId)
  
  if (!room) {
    return {
      title: getTranslation(detectedLang, 'common.seoTitle'),
      description: getTranslation(detectedLang, 'common.seoDescription'),
      keywords: getTranslation(detectedLang, 'common.seoKeywords').split(', '),
      openGraph: {
        title: getTranslation(detectedLang, 'common.seoTitle'),
        description: getTranslation(detectedLang, 'common.seoDescription'),
        type: 'website',
        locale: detectedLang === 'ko' ? 'ko_KR' : detectedLang === 'ja' ? 'ja_JP' : 'en_US',
        alternateLocale: ['ko_KR', 'ja_JP', 'en_US'],
      },
      twitter: {
        card: 'summary_large_image',
        title: getTranslation(detectedLang, 'common.seoTitle'),
        description: getTranslation(detectedLang, 'common.seoDescription'),
      },
      // 다국어 대안 URL 추가
      alternates: {
        canonical: `/room/${roomId}`,
        languages: {
          'ko': `/room/${roomId}`,
          'ja': `/room/${roomId}`,
          'en': `/room/${roomId}`,
        },
      },
    }
  }

  // 모든 언어의 키워드 수집
  const allKeywords = [
    ...getTranslation('ko', 'common.seoKeywords').split(', '),
    ...getTranslation('ja', 'common.seoKeywords').split(', '),
    ...getTranslation('en', 'common.seoKeywords').split(', '),
    room.title
  ]

  return {
    title: `${room.title} - ${getTranslation(detectedLang, 'common.seoTitle')}`,
    description: room.description,
    keywords: allKeywords,
    openGraph: {
      title: `${room.title} - ${getTranslation(detectedLang, 'common.seoTitle')}`,
      description: room.description,
      type: 'website',
      locale: detectedLang === 'ko' ? 'ko_KR' : detectedLang === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: ['ko_KR', 'ja_JP', 'en_US'],
      images: room.backgroundImage ? [
        {
          url: room.backgroundImage,
          width: 1200,
          height: 800,
          alt: room.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${room.title} - ${getTranslation(detectedLang, 'common.seoTitle')}`,
      description: room.description,
      images: room.backgroundImage ? [room.backgroundImage] : undefined,
    },
    // 다국어 대안 URL 추가
    alternates: {
      canonical: `/room/${roomId}`,
      languages: {
        'ko': `/room/${roomId}`,
        'ja': `/room/${roomId}`,
        'en': `/room/${roomId}`,
      },
    },
  }
}

export function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://textescape.com'
  
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