'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePuzzleStore } from '@/lib/puzzle-store'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface GameExitWarningProps {
  puzzleId: string
}

export function GameExitWarning({ puzzleId }: GameExitWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const router = useRouter()
  const puzzleStore = usePuzzleStore(puzzleId)
  const { inventory, visitedRooms, currentRoom } = puzzleStore

  // 게임 진행 중인지 확인 (시작 방이 아니고 아이템이 있거나 방문한 방이 있으면 진행 중)
  const isGameInProgress = () => {
    const startRooms = {
      'key': 'entrance',
      'number': 'start', 
      'color': 'beginning',
      'piece': 'entrance'
    }
    const startRoom = startRooms[puzzleId as keyof typeof startRooms] || 'entrance'
    
    return currentRoom !== startRoom || inventory.length > 0 || visitedRooms.size > 1
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isGameInProgress()) {
        e.preventDefault()
        e.returnValue = '게임 진행 정보가 손실됩니다. 정말 나가시겠습니까?'
        return '게임 진행 정보가 손실됩니다. 정말 나가시겠습니까?'
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && isGameInProgress()) {
        const href = link.getAttribute('href')
        if (href && !href.startsWith('/game/') && href !== '/') {
          e.preventDefault()
          setPendingUrl(href)
          setShowWarning(true)
        }
      }
    }

    // 게임 URL이 아닌 링크 클릭 감지
    document.addEventListener('click', handleClick)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [puzzleId, inventory, visitedRooms, currentRoom])

  const handleConfirmExit = () => {
    if (pendingUrl) {
      // 게임 정보 초기화
      puzzleStore.resetPuzzle()
      // 원하는 페이지로 이동
      window.location.href = pendingUrl
    }
    setShowWarning(false)
    setPendingUrl(null)
  }

  const handleCancel = () => {
    setShowWarning(false)
    setPendingUrl(null)
  }

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent className="bg-black/95 text-white border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            게임 진행 중
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            현재 게임을 진행 중입니다. 다른 페이지로 이동하면 게임 진행 정보가 모두 사라집니다.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">현재 진행 상황:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 현재 방: {currentRoom}</li>
              <li>• 보유 아이템: {inventory.length}개</li>
              <li>• 방문한 방: {visitedRooms.size}개</li>
            </ul>
          </div>
          
          <p className="text-red-400 text-sm">
            ⚠️ 정말로 게임을 중단하고 다른 페이지로 이동하시겠습니까?
          </p>
        </div>

        <DialogFooter className="space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            게임 계속하기
          </Button>
          <Button
            onClick={handleConfirmExit}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            게임 중단하고 이동
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 