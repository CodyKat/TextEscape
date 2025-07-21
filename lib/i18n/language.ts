import { Language } from './translations'

// 지원하는 언어 목록
export const SUPPORTED_LANGUAGES: Language[] = ['ko', 'ja', 'en']

// 언어별 표시 이름
export const LANGUAGE_NAMES: Record<Language, string> = {
  ko: '한국어',
  ja: '日本語',
  en: 'English'
}

// 언어별 플래그 이모지
export const LANGUAGE_FLAGS: Record<Language, string> = {
  ko: '🇰🇷',
  ja: '🇯🇵',
  en: '🇺🇸'
}

// 브라우저 언어 감지
export function detectLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ko' // 서버 사이드에서는 기본값
  }

  const browserLang = navigator.language.toLowerCase()
  
  // 한국어 감지
  if (browserLang.startsWith('ko')) {
    return 'ko'
  }
  
  // 일본어 감지
  if (browserLang.startsWith('ja')) {
    return 'ja'
  }
  
  // 영어 감지 (기본값)
  return 'en'
}

// 언어 설정 저장
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('preferred-language', lang)
}

// 언어 설정 불러오기
export function getLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ko'
  }

  const saved = localStorage.getItem('preferred-language') as Language
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
    return saved
  }

  return detectLanguage()
}

// 언어 변경 함수
export function changeLanguage(lang: Language): void {
  setLanguage(lang)
  // localStorage 이벤트를 발생시켜 다른 컴포넌트들이 언어 변경을 감지할 수 있도록 함
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'preferred-language',
    newValue: lang
  }))
} 