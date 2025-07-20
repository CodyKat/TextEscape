'use client'

import { useAnalyticsStore } from '@/lib/analytics-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export function AnalyticsDashboard() {
  const {
    getSessionStats,
    getPopularRooms,
    getPopularChoices,
    totalPlayTime,
    totalGamesPlayed,
    averageCompletionTime,
    exportAnalytics,
    startNewSession,
    endCurrentSession,
  } = useAnalyticsStore()

  const [isExpanded, setIsExpanded] = useState(false)

  const sessionStats = getSessionStats()
  const popularRooms = getPopularRooms()
  const popularChoices = getPopularChoices()

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}시간 ${minutes % 60}분`
    } else if (minutes > 0) {
      return `${minutes}분 ${seconds % 60}초`
    } else {
      return `${seconds}초`
    }
  }

  const handleExport = () => {
    const data = exportAnalytics()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `game-analytics-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="bg-black/90 text-white border-gray-600">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xs sm:text-sm font-semibold">통계</CardTitle>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-1 sm:px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            {isExpanded ? '접기' : '펼치기'}
          </button>
        </div>
      </CardHeader>
      <CardContent className="text-xs space-y-2 sm:space-y-3 px-3 sm:px-6">
        {/* 현재 세션 통계 */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2">
          <div className="bg-gray-800 p-1 sm:p-2 rounded">
            <div className="text-gray-400 text-xs">플레이 시간</div>
            <div className="font-mono text-xs">{formatTime(sessionStats.totalPlayTime)}</div>
          </div>
          <div className="bg-gray-800 p-1 sm:p-2 rounded">
            <div className="text-gray-400 text-xs">방문한 방</div>
            <div className="font-mono text-xs">{sessionStats.roomsVisited}개</div>
          </div>
          <div className="bg-gray-800 p-1 sm:p-2 rounded">
            <div className="text-gray-400 text-xs">선택지</div>
            <div className="font-mono text-xs">{sessionStats.choicesMade}개</div>
          </div>
          <div className="bg-gray-800 p-1 sm:p-2 rounded">
            <div className="text-gray-400 text-xs">아이템</div>
            <div className="font-mono text-xs">{sessionStats.itemsCollected}개</div>
          </div>
        </div>

        {isExpanded && (
          <>
            {/* 전체 통계 */}
            <div className="border-t border-gray-700 pt-2">
              <h4 className="font-semibold mb-2">전체 통계</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-gray-400">총 플레이 시간</div>
                  <div className="font-mono">{formatTime(totalPlayTime)}</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-gray-400">총 게임 수</div>
                  <div className="font-mono">{totalGamesPlayed}회</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                  <div className="text-gray-400">평균 클리어 시간</div>
                  <div className="font-mono">
                    {averageCompletionTime > 0 ? formatTime(averageCompletionTime) : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* 인기 방 */}
            <div className="border-t border-gray-700 pt-2">
              <h4 className="font-semibold mb-2">인기 방</h4>
              <div className="space-y-1">
                {popularRooms.slice(0, 3).map((room) => (
                  <div key={room.roomId} className="flex justify-between bg-gray-800 p-1 rounded">
                    <span>{room.roomId}</span>
                    <span className="font-mono">{room.visits}회</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 인기 선택지 */}
            <div className="border-t border-gray-700 pt-2">
              <h4 className="font-semibold mb-2">인기 선택지</h4>
              <div className="space-y-1">
                {popularChoices.slice(0, 3).map((choice) => (
                  <div key={choice.choiceId} className="flex justify-between bg-gray-800 p-1 rounded">
                    <span>{choice.choiceId}</span>
                    <span className="font-mono">{choice.uses}회</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="border-t border-gray-700 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex-1 px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs"
                >
                  데이터 내보내기
                </button>
                <button
                  onClick={startNewSession}
                  className="flex-1 px-2 py-1 bg-green-600 rounded hover:bg-green-700 text-xs"
                >
                  새 세션
                </button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
} 