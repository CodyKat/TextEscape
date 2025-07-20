'use client'

import { useGameStore } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'

export function ProgressBar() {
  const { visitedRooms, gameProgress } = useGameStore()
  
  // 전체 방 수 (현재 게임 데이터 기준)
  const totalRooms = 35 // 모든 퍼즐 방 포함
  const visitedCount = visitedRooms.size
  const progressPercentage = Math.round((visitedCount / totalRooms) * 100)
  
  return (
    <Card className="bg-black/80 text-white border-gray-600">
      <CardContent className="p-2 sm:p-3">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-xs font-semibold">진행도</span>
          <span className="text-xs font-mono">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">방: {visitedCount}/{totalRooms}</span>
          <span className="text-xs text-gray-400">{gameProgress}%</span>
        </div>
      </CardContent>
    </Card>
  )
} 