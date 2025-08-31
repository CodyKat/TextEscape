'use client'

import { getTranslation } from '@/lib/i18n'
import { getLanguage } from '@/lib/i18n/language'
import { useEffect, useState } from 'react'

export function Footer() {
  const [lang, setLang] = useState<'ko' | 'ja' | 'en'>('en')

  useEffect(() => {
    // 언어 설정
    setLang(getLanguage())

    // 언어 변경 이벤트 리스너
    const handleLanguageChange = () => {
      setLang(getLanguage())
    }

    window.addEventListener('storage', handleLanguageChange)
    return () => {
      window.removeEventListener('storage', handleLanguageChange)
    }
  }, [])

  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">TEXT-ESCAPE</h3>
          <p className="text-gray-400 text-sm">
            {getTranslation(lang, 'common.footerDescription')}
          </p>
        </div>
        
        <div className="border-t border-gray-800 pt-4">
          <p className="text-gray-300">
            Contact: <a 
              href="mailto:textescape42@gmail.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              textescape42@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
} 