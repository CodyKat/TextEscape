'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Globe } from 'lucide-react'
import { 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_NAMES, 
  LANGUAGE_FLAGS, 
  getLanguage, 
  changeLanguage 
} from '@/lib/i18n/language'
import { Language } from '@/lib/i18n/translations'
import { getTranslation } from '@/lib/i18n'

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>('ko')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCurrentLang(getLanguage())
    setMounted(true)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    if (lang !== currentLang) {
      setCurrentLang(lang)
      changeLanguage(lang)
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
        <Globe className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
          <Globe className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 border-l border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-white text-xl">{getTranslation(currentLang, 'common.languageSelection')}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <div
              key={lang}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                currentLang === lang 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{LANGUAGE_FLAGS[lang]}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {LANGUAGE_NAMES[lang]}
                  </h3>
                  {currentLang === lang && (
                    <p className="text-sm text-blue-400">{getTranslation(currentLang, 'common.currentlySelected')}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
} 