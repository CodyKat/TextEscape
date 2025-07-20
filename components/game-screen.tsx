'use client'

import { useGameStore } from '@/lib/store'
import { getRoom } from '@/lib/game-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
// import { GoogleAds } from '@/components/google-ads'
// import { AdsStats } from '@/components/ads-stats'
// import { AnalyticsDashboard } from '@/components/analytics-dashboard'
// import { ProgressBar } from '@/components/progress-bar'

interface GameScreenProps {
  initialRoom?: string
}

export function GameScreen({ initialRoom }: GameScreenProps) {
  const { currentRoom, inventory, setCurrentRoom, addToInventory, removeFromInventory } = useGameStore()
  const [room, setRoom] = useState(getRoom(currentRoom))
  const [imageLoaded, setImageLoaded] = useState(false)

  // 초기 방 설정
  useEffect(() => {
    if (initialRoom && initialRoom !== currentRoom) {
      setCurrentRoom(initialRoom)
    }
  }, [initialRoom])

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
        e.returnValue = '게임 진행 정보가 손실됩니다. 정말 나가시겠습니까?'
        return '게임 진행 정보가 손실됩니다. 정말 나가시겠습니까?'
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

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">방을 찾을 수 없습니다</h1>
          <p className="text-gray-400">현재 방: {currentRoom}</p>
          <button 
            onClick={() => setCurrentRoom('entrance')}
            className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            입구로 돌아가기
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
      useGameStore.getState().resetGame()
      // entrance로 이동
      setCurrentRoom('entrance')
      return
    }
    
    // 다음 방으로 이동
    setCurrentRoom(choice.nextRoom)
  }

  return (
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
                          (필요: {choice.requiredItems.join(', ')})
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
              
              {inventory.length > 0 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800/80 rounded-lg border border-gray-600" style={{ color: 'white' }}>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white game-text" style={{ color: 'white' }}>인벤토리</h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {inventory.map((item) => (
                      <span
                        key={item}
                        className="px-2 sm:px-3 py-1 sm:py-2 bg-gray-700/80 rounded-full text-xs sm:text-sm text-white game-text border border-gray-600"
                        style={{ color: 'white' }}
                      >
                        {item}
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
  )
} 