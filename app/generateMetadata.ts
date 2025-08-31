import { Metadata } from 'next'
import { getPuzzleRoom, getPuzzleData } from '@/lib/puzzle-game-data'
import { getTranslation } from '@/lib/i18n'
import { getLanguage } from '@/lib/i18n/language'
import { headers } from 'next/headers'

// 언어 감지 함수 (서버 사이드)
async function detectLanguageFromHeaders(): Promise<'ko' | 'ja' | 'en'> {
  try {
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language') || ''
    
    // accept-language 파싱 (예: "ko-KR,ko;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang: string) => lang.split(';')[0].trim().toLowerCase())
    
    for (const lang of languages) {
      if (lang.startsWith('ko')) return 'ko'
      if (lang.startsWith('ja')) return 'ja'
      if (lang.startsWith('en')) return 'en'
    }
  } catch (error) {
    // 서버 사이드에서 headers() 사용 시 에러 처리
  }
  
  return 'en' // 기본값
}

export async function generatePuzzleMetadata(puzzleId: string, roomId: string, lang?: 'ko' | 'ja' | 'en'): Promise<Metadata> {
  const detectedLang = lang || await detectLanguageFromHeaders()
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

export function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://textescape.com'
  
  // 모든 퍼즐에 대한 sitemap 생성
  const puzzles = ['key', 'number', 'color', 'piece', 'study']
  
  const sitemap = puzzles.map((puzzleId) => ({
    url: `${baseUrl}/game/${puzzleId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))
  
  return sitemap
} 