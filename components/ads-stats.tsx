'use client'

import { useAdsStore } from '@/lib/ads-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AdsStats() {
  const { getTotalAdViews, getAdViews, currentRoom } = useAdsStore()
  
  const totalViews = getTotalAdViews()
  const currentRoomViews = getAdViews(`top-banner-${currentRoom}`) + getAdViews(`bottom-banner-${currentRoom}`)
  
  // 개발 환경에서는 광고 통계를 표시하지 않음
  if (process.env.NODE_ENV === 'development' || 
      (typeof window !== 'undefined' && 
       (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))) {
    return null
  }
  
  return (
    <Card className="bg-black/80 text-white border-gray-600">
      <CardHeader className="pb-2 px-2 sm:px-3">
        <CardTitle className="text-xs sm:text-sm font-semibold text-center">광고</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1 px-2 sm:px-3">
        <div className="flex justify-between">
          <span>총 조회수:</span>
          <span className="font-mono">{totalViews}</span>
        </div>
        <div className="flex justify-between">
          <span>현재 방 조회수:</span>
          <span className="font-mono">{currentRoomViews}</span>
        </div>
        <div className="flex justify-between">
          <span>현재 방:</span>
          <span className="font-mono">{currentRoom}</span>
        </div>
      </CardContent>
    </Card>
  )
} 