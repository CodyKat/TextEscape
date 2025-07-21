'use client'

import { usePuzzleStore } from '@/lib/puzzle-store'
import { getRoom } from '@/lib/i18n/game-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { canAccessPuzzleRoom, getPuzzleRedirectRoom, getPuzzleStartRoom } from '@/lib/puzzle-progress-guard'
import { useRouter } from 'next/navigation'
import { getItemName } from '@/lib/item-constants'
import { GameExitWarning } from '@/components/game-exit-warning'
import { getLanguage, getTranslation } from '@/lib/i18n'
// import { GoogleAds } from '@/components/google-ads'
// import { AdsStats } from '@/components/ads-stats'
// import { AnalyticsDashboard } from '@/components/analytics-dashboard'
// import { ProgressBar } from '@/components/progress-bar'

interface GameScreenProps {
  puzzleId?: string
  initialRoom?: string
}

export function GameScreen({ puzzleId = 'key', initialRoom }: GameScreenProps) {
  const puzzleStore = usePuzzleStore(puzzleId)
  const { currentRoom, inventory, visitedRooms, gameProgress, setCurrentRoom, addToInventory, removeFromInventory } = puzzleStore
  const [room, setRoom] = useState(getRoom(currentRoom))
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()
  const lang = getLanguage()

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
      if (currentRoom && currentRoom !== 'entrance') {
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
  }, [currentRoom])



  // 방 변경 시 room 상태 업데이트
  useEffect(() => {
    const newRoom = getRoom(currentRoom)
    if (newRoom) {
      setRoom(newRoom)
      setImageLoaded(false) // 이미지 로드 상태 초기화
    }
  }, [currentRoom])

  useEffect(() => {
    if (room?.backgroundImage) {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.src = room.backgroundImage
    }
  }, [room?.backgroundImage])

  // 접근 제어 확인
  const accessCheck = canAccessPuzzleRoom(puzzleId, currentRoom, inventory, visitedRooms, gameProgress)
  
  if (!room) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">{getTranslation(lang, 'game.roomNotFound')}</h1>
          <p className="text-gray-400">현재 방: {currentRoom}</p>
          <button 
            onClick={() => setCurrentRoom('entrance')}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            {getTranslation(lang, 'game.goBackToEntrance')}
          </button>
        </div>
      </div>
    )
  }

  // 접근 불가 시 표시
  if (!accessCheck.canAccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">{getTranslation(lang, 'game.accessDenied')}</h1>
          <p className="text-gray-300 mb-4">{accessCheck.reason}</p>
          
          {accessCheck.missingItems && (
            <div className="mb-4 p-3 bg-red-900/50 rounded border border-red-700">
              <p className="text-red-300 text-sm">{getTranslation(lang, 'game.requiredItems')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {accessCheck.missingItems.map(item => (
                  <span key={item} className="px-2 py-1 bg-red-800 rounded text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {accessCheck.missingRooms && (
            <div className="mb-4 p-3 bg-yellow-900/50 rounded border border-yellow-700">
              <p className="text-yellow-300 text-sm">{getTranslation(lang, 'game.missingRooms')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {accessCheck.missingRooms.map(room => (
                  <span key={room} className="px-2 py-1 bg-yellow-800 rounded text-xs">
                    {room}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => {
              const redirectRoom = getPuzzleRedirectRoom(puzzleId, currentRoom)
              router.push(`/game/${puzzleId}/${redirectRoom}`)
            }}
            className="mt-4 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            {getTranslation(lang, 'game.moveToAppropriateRoom')}
          </button>
        </div>
      </div>
    )
  }



  const handleChoice = (choice: any) => {
    // 아이템 조건 확인
    if (choice.requiredItems) {
      const hasAllItems = choice.requiredItems.every((item: string) => inventory.includes(item))
      if (!hasAllItems) {
        return // 아이템이 없으면 선택 불가
      }
    }
    

    
    // 선택지 기록
    if (typeof window !== 'undefined') {
      import('../lib/analytics-store').then(({ useAnalyticsStore }) => {
        useAnalyticsStore.getState().recordChoice(currentRoom, choice.id)
      })
    }
    
    // 아이템 추가/제거 처리
    if (choice.addToInventory) {
      choice.addToInventory.forEach((item: string) => addToInventory(item))
    }
    if (choice.removeFromInventory) {
      choice.removeFromInventory.forEach((item: string) => removeFromInventory(item))
    }
    
    // 게임 재시작 처리 (escape 방에서만)
    if (choice.nextRoom === 'entrance' && currentRoom === 'escape') {
      // 게임 상태 초기화 (currentRoom 제외)
      puzzleStore.resetPuzzle()
      // entrance로 이동
      setCurrentRoom('entrance')
      // URL 업데이트
      router.push(`/game/${puzzleId}/entrance`)
      return
    }
    
    // 다음 방으로 이동
    setCurrentRoom(choice.nextRoom)
    // URL 업데이트
    router.push(`/game/${puzzleId}/${choice.nextRoom}`)
  }

  return (
    <>
      <GameExitWarning puzzleId={puzzleId} />
      <div className="game-screen min-h-screen bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-500 pt-16"
        style={{ 
          backgroundImage: imageLoaded ? `url(${room.backgroundImage})` : 'none',
          backgroundColor: imageLoaded ? 'transparent' : '#1a1a1a'
        }}
      >
      {/* 상단 광고 */}
      {/* <div className="w-full bg-gray-100/90 p-2 text-center">
        <GoogleAds 
          adSlot={`top-banner-${currentRoom}`}
          adFormat="banner"
          className="min-h-[90px]"
        />
      </div> */}
      
      {/* 메인 게임 영역 */}
      <div className="flex items-center justify-center p-4 flex-1">
        <div className="w-full max-w-2xl mx-auto relative px-4 sm:px-0">
          {/* 광고 통계 (우상단) */}
          {/* <div className="absolute top-2 right-2 z-10 space-y-2 max-w-[120px] sm:max-w-none">
            <ProgressBar />
            {/* <AdsStats /> */}
            {/* <AnalyticsDashboard /> */}
          {/* </div> */}
          <Card className="bg-black/95 text-white border-gray-600 shadow-2xl card-text backdrop-blur-sm" style={{ color: 'white' }}>
            <CardHeader className="pb-4 px-4 sm:px-6" style={{ color: 'white' }}>
              <CardTitle className="text-xl sm:text-2xl font-bold text-center text-white game-text" style={{ color: 'white' }}>
                {room.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6" style={{ color: 'white' }}>
              <div className="text-base sm:text-lg leading-relaxed text-center text-white game-text" style={{ color: 'white' }}>
                {room.description}
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
                      {choice.text}
                      {!hasRequiredItems && choice.requiredItems && (
                        <span className="text-xs text-red-400 ml-2">
                          (필요: {choice.requiredItems.map(id => getItemName(id)).join(', ')})
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
              
              {inventory.length > 0 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/80 rounded-lg border border-gray-600" style={{ color: 'white' }}>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white game-text" style={{ color: 'white' }}>{getTranslation(lang, 'game.inventory')}</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {inventory.map((item) => (
                      <span
                        key={item}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-700/80 rounded-full text-xs sm:text-sm text-white game-text border border-gray-600"
                        style={{ color: 'white' }}
                      >
                        {getItemName(item)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 하단 광고 */}
      {/* <div className="w-full bg-gray-100/90 p-2 text-center">
        <GoogleAds 
          adSlot={`bottom-banner-${currentRoom}`}
          adFormat="banner"
          className="min-h-[90px]"
        />
      </div> */}
      </div>
    </>
  )
} 