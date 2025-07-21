'use client'

import { usePuzzleStore } from '@/lib/puzzle-store'
import { getPuzzleRoom } from '@/lib/puzzle-game-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { canAccessPuzzleRoom, getPuzzleRedirectRoom, getPuzzleStartRoom } from '@/lib/puzzle-progress-guard'
import { useRouter } from 'next/navigation'
import { getItemName } from '@/lib/item-constants'
import { GameExitWarning } from '@/components/game-exit-warning'
import { getLanguage, getTranslation } from '@/lib/i18n'

interface GameScreenClientProps {
  puzzleId?: string
  initialRoom?: string
}

export function GameScreenClient({ puzzleId = 'key', initialRoom }: GameScreenClientProps) {
  const puzzleStore = usePuzzleStore(puzzleId)
  const { currentRoom, inventory, visitedRooms, gameProgress, setCurrentRoom, addToInventory, removeFromInventory } = puzzleStore
  const [room, setRoom] = useState(() => getPuzzleRoom(puzzleId, currentRoom, 'ko'))
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()
  const [lang, setLang] = useState<'ko' | 'ja' | 'en'>('ko')
  const [mounted, setMounted] = useState(false)

  // 마운트 후 언어 설정
  useEffect(() => {
    setMounted(true)
    setLang(getLanguage())
  }, [])

  // 언어 감지 및 변경 이벤트 리스너
  useEffect(() => {
    if (!mounted) return

    const updateLanguage = () => {
      setLang(getLanguage())
    }

    // 언어 변경 이벤트 리스너
    const handleLanguageChange = () => {
      updateLanguage()
    }

    // storage 이벤트 리스너
    window.addEventListener('storage', handleLanguageChange)
    
    // 주기적으로 언어 확인 (SSG 환경에서 안전을 위해)
    const interval = setInterval(updateLanguage, 1000)
    
    return () => {
      window.removeEventListener('storage', handleLanguageChange)
      clearInterval(interval)
    }
  }, [mounted])

  // 초기 방 설정 및 접근 제어
  useEffect(() => {
    if (initialRoom) {
      // 게임 시작 페이지에서 온 경우에만 상태 리셋
      const isFromGameStart = initialRoom === getPuzzleStartRoom(puzzleId) && 
                             typeof window !== 'undefined' && 
                             window.location.search.includes('start=true')
      
      if (isFromGameStart) {
        puzzleStore.resetPuzzle()
        // 리셋 후 바로 시작 방으로 설정
        setCurrentRoom(initialRoom)
        return
      }
      
      if (initialRoom !== currentRoom) {
        // 현재 방을 먼저 방문 기록에 추가
        const updatedVisitedRooms = new Set(visitedRooms)
        updatedVisitedRooms.add(currentRoom)
        
        // 접근 권한 확인
        const accessCheck = canAccessPuzzleRoom(puzzleId, initialRoom, inventory, updatedVisitedRooms, gameProgress)
        
        if (!accessCheck.canAccess) {
          // 접근 불가 시 적절한 방으로 리다이렉트
          const redirectRoom = getPuzzleRedirectRoom(puzzleId, initialRoom)
          router.push(`/game/${puzzleId}/${redirectRoom}`)
          return
        }
        
        setCurrentRoom(initialRoom)
      }
    }
  }, [initialRoom, puzzleId, router, currentRoom])

  // 분석 세션 시작
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../lib/analytics-store').then(({ useAnalyticsStore }) => {
        const analyticsStore = useAnalyticsStore.getState()
        if (!analyticsStore.currentSession) {
          analyticsStore.startNewSession()
        }
      })
    }
  }, [])

  // 페이지 이탈 감지 및 경고 (브라우저 기본 다이얼로그 사용)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 게임이 진행 중일 때만 경고 표시 (새로고침, 브라우저 닫기 등)
      const startRoom = getPuzzleStartRoom(puzzleId)
      if (currentRoom && currentRoom !== startRoom) {
        e.preventDefault()
        const warningMessage = getTranslation(lang, 'game.resetConfirm')
        e.returnValue = warningMessage
        return warningMessage
      }
    }

    // 페이지를 떠나려고 할 때 경고
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [currentRoom, puzzleId, lang])

  // 방 데이터 업데이트
  useEffect(() => {
    if (mounted && currentRoom) {
      const newRoom = getPuzzleRoom(puzzleId, currentRoom, lang)
      if (newRoom) {
        setRoom(newRoom)
      }
    }
  }, [currentRoom, puzzleId, lang, mounted])

  // 방 방문 기록 업데이트 (setCurrentRoom에서 이미 markRoomVisited를 호출하므로 제거)

  // 이미지 로딩 상태 초기화
  useEffect(() => {
    if (room?.backgroundImage) {
      setImageLoaded(false)
    }
  }, [room?.backgroundImage])

  // 게임 종료 시 경고
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (inventory.length > 0 || visitedRooms.size > 1) {
        e.preventDefault()
        e.returnValue = getTranslation(lang, 'header.progressLossWarning')
        return getTranslation(lang, 'header.progressLossWarning')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [inventory.length, visitedRooms.size, lang])

  // 접근 제어 확인
  useEffect(() => {
    if (!mounted || !room) return

    const accessCheck = canAccessPuzzleRoom(puzzleId, room.id, inventory, visitedRooms, gameProgress)
    
    if (!accessCheck.canAccess) {
      // 접근 불가 시 적절한 방으로 리다이렉트
      const redirectRoom = getPuzzleRedirectRoom(puzzleId, room.id)
      if (redirectRoom !== room.id) {
        router.push(`/game/${puzzleId}/${redirectRoom}`)
      }
    }
  }, [room, puzzleId, inventory, visitedRooms, gameProgress, router, mounted])

  if (!mounted || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">{getTranslation(lang, 'common.loading')}</p>
        </div>
      </div>
    )
  }

  const handleChoice = (choice: any) => {
    // 아이템 추가
    if (choice.addToInventory) {
      choice.addToInventory.forEach((itemId: string) => {
        addToInventory(itemId)
      })
    }

    // 아이템 제거
    if (choice.removeFromInventory) {
      choice.removeFromInventory.forEach((itemId: string) => {
        removeFromInventory(itemId)
      })
    }

    // goToMain 선택지 처리
    if (choice.id === 'goToMain') {
      router.push('/')
      return
    }

    // 다음 방으로 이동
    if (choice.nextRoom) {
      setCurrentRoom(choice.nextRoom)
      router.push(`/game/${puzzleId}/${choice.nextRoom}`)
    }
  }

  const getItemName = (itemId: string): string => {
    // 먼저 번역 시스템에서 찾기
    const puzzleItemKey = `${puzzleId}.${itemId}`
    const translation = getTranslation(lang, `items.${puzzleItemKey}.name`)
    if (translation !== `items.${puzzleItemKey}.name`) {
      return translation
    }
    
    // 번역에서 찾지 못하면 ITEM_INFO에서 찾기
    const { getItemName: getItemNameFromConstants } = require('@/lib/item-constants')
    return getItemNameFromConstants(itemId, lang)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 배경 이미지 */}
      {room.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
            style={{
              backgroundImage: `url(${room.backgroundImage})`,
              opacity: imageLoaded ? 1 : 0
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <img
            src={room.backgroundImage}
            alt=""
            className="hidden"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* 게임 UI */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* 상단 정보 바 */}
        <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-sm text-gray-400">{getTranslation(lang, 'game.puzzle')}: </span>
                <span className="font-semibold">{getTranslation(lang, `puzzles.${puzzleId}.name`)}</span>
              </div>
              <div className="text-white">
                <span className="text-sm text-gray-400">{getTranslation(lang, 'game.room')}: </span>
                <span className="font-semibold">{getTranslation(lang, `game.${puzzleId}.${room.id}.title`) || room.title}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-sm text-gray-400">{getTranslation(lang, 'game.progress')}: </span>
                <span className="font-semibold">{Math.round(gameProgress)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 게임 영역 */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-black/90 backdrop-blur-sm border-gray-800 text-white">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                {getTranslation(lang, `game.${puzzleId}.${room.id}.title`) || room.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6" style={{ color: 'white' }}>
              <div className="text-base sm:text-lg leading-relaxed text-center text-white game-text" style={{ color: 'white' }}>
                {getTranslation(lang, `game.${puzzleId}.${room.id}.description`) || room.description}
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {room.choices.map((choice) => {
                  const hasRequiredItems = choice.requiredItems 
                    ? choice.requiredItems.every((item: string) => inventory.includes(item))
                    : true
                  
                  return (
                    <Button
                      key={choice.id}
                      variant="outline"
                      className={`w-full h-12 sm:h-14 text-base sm:text-lg border-gray-400 bg-transparent text-white hover:bg-gray-700 hover:text-white hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed game-text transition-all duration-200 ${
                        !hasRequiredItems ? 'border-red-500 text-red-400' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (hasRequiredItems) {
                          handleChoice(choice)
                        }
                      }}
                      disabled={!hasRequiredItems}
                    >
                      {getTranslation(lang, `game.${puzzleId}.${room.id}.choices.${choice.id}`) || choice.text}
                      {!hasRequiredItems && choice.requiredItems && (
                        <span className="text-xs text-red-400 ml-2">
                          ({getTranslation(lang, 'game.requiredItems')}: {choice.requiredItems.map(id => getItemName(id)).join(', ')})
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
              
              {/* 인벤토리 표시 */}
              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="text-center mb-3">
                  <span className="text-sm text-gray-400">{getTranslation(lang, 'game.inventory')}: </span>
                  <span className="font-semibold text-white">{inventory.length}</span>
                </div>
                {inventory.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {inventory.map((itemId) => (
                      <span key={itemId} className="inline-block bg-gray-700 px-3 py-2 rounded-lg text-sm text-white border border-gray-600">
                        {getItemName(itemId)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 하단 정보 바 */}
        <div className="bg-black/80 backdrop-blur-sm border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-gray-300">
              <span>{getTranslation(lang, 'common.footerDescription')}</span>
              <span>•</span>
              <span>{getTranslation(lang, 'game.puzzle')}: {getTranslation(lang, `puzzles.${puzzleId}.name`)}</span>
              <span>•</span>
              <span>{getTranslation(lang, 'game.room')}: {getTranslation(lang, `game.${puzzleId}.${room.id}.title`) || room.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 게임 종료 경고 */}
      <GameExitWarning puzzleId={puzzleId} />
    </div>
  )
} 