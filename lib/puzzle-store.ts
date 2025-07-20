import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ITEM_IDS } from './item-constants'

export interface PuzzleState {
  puzzleId: string
  currentRoom: string
  inventory: string[]
  visitedRooms: Set<string>
  gameProgress: number
  isGameComplete: boolean
  lastVisitTime: number
}

export interface PuzzleActions {
  setCurrentRoom: (room: string) => void
  addToInventory: (itemId: string) => void
  removeFromInventory: (itemId: string) => void
  markRoomVisited: (room: string) => void
  updateProgress: (progress: number) => void
  completeGame: () => void
  resetPuzzle: () => void
  setPuzzleId: (puzzleId: string) => void
  isExternalAccess: () => boolean
}

// 퍼즐별 상태 저장소
const createPuzzleStore = (puzzleId: string) => create<PuzzleState & PuzzleActions>()(
  persist(
    (set, get) => ({
      puzzleId,
      currentRoom: 'entrance',
      inventory: [],
      visitedRooms: new Set(),
      gameProgress: 0,
      isGameComplete: false,
      lastVisitTime: Date.now(),
      
      setCurrentRoom: (room: string) => {
        set({ currentRoom: room })
        get().markRoomVisited(room)
        
        // 분석 스토어 업데이트
        if (typeof window !== 'undefined') {
          import('./analytics-store').then(({ useAnalyticsStore }) => {
            useAnalyticsStore.getState().recordRoomVisit(`${puzzleId}/${room}`)
          })
        }
      },
      
      addToInventory: (itemId: string) => {
        const { inventory } = get()
        if (!inventory.includes(itemId)) {
          set({ inventory: [...inventory, itemId] })
          
          // 분석 스토어 업데이트
          if (typeof window !== 'undefined') {
            import('./analytics-store').then(({ useAnalyticsStore }) => {
              useAnalyticsStore.getState().recordItemCollection(itemId)
            })
          }
        }
      },
      
      removeFromInventory: (itemId: string) => {
        const { inventory } = get()
        set({ inventory: inventory.filter(i => i !== itemId) })
        
        // 분석 스토어 업데이트
        if (typeof window !== 'undefined') {
          import('./analytics-store').then(({ useAnalyticsStore }) => {
            useAnalyticsStore.getState().recordItemUsage(itemId)
          })
        }
      },
      
      markRoomVisited: (room: string) => {
        const { visitedRooms } = get()
        const newVisitedRooms = new Set(visitedRooms)
        newVisitedRooms.add(room)
        
        // 게임 진행도 계산
        const totalRooms = 10 // 퍼즐별 방 개수
        const progress = Math.round((newVisitedRooms.size / totalRooms) * 100)
        
        set({ 
          visitedRooms: newVisitedRooms,
          gameProgress: Math.max(get().gameProgress, progress)
        })
      },
      
      updateProgress: (progress: number) => {
        set({ gameProgress: Math.max(get().gameProgress, progress) })
      },
      
      completeGame: () => {
        set({ isGameComplete: true, gameProgress: 100 })
        
        // 분석 스토어 업데이트
        if (typeof window !== 'undefined') {
          import('./analytics-store').then(({ useAnalyticsStore }) => {
            useAnalyticsStore.getState().recordGameCompletion()
          })
        }
      },
      
      resetPuzzle: () => {
        set({
          currentRoom: 'entrance',
          inventory: [],
          visitedRooms: new Set(),
          gameProgress: 0,
          isGameComplete: false,
          lastVisitTime: Date.now(),
        })
        
        // 분석 스토어 업데이트
        if (typeof window !== 'undefined') {
          import('./analytics-store').then(({ useAnalyticsStore }) => {
            useAnalyticsStore.getState().recordRestart()
          })
        }
      },
      
      setPuzzleId: (newPuzzleId: string) => {
        set({ puzzleId: newPuzzleId })
      },
      
      isExternalAccess: () => {
        const { lastVisitTime } = get()
        const now = Date.now()
        const timeDiff = now - lastVisitTime
        
        // 5분 이상 지났으면 외부 접근으로 간주
        return timeDiff > 5 * 60 * 1000
      }
    }),
    {
      name: `puzzle-${puzzleId}-state`,
      partialize: (state) => ({
        currentRoom: state.currentRoom,
        inventory: state.inventory,
        visitedRooms: Array.from(state.visitedRooms as unknown as Set<string>),
        gameProgress: state.gameProgress,
        isGameComplete: state.isGameComplete,
        lastVisitTime: state.lastVisitTime,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Set 객체 복원
          state.visitedRooms = new Set(state.visitedRooms as unknown as string[])
        }
      },
    }
  )
)

// 퍼즐별 스토어 인스턴스 관리
const puzzleStores: Record<string, ReturnType<typeof createPuzzleStore>> = {}

export function usePuzzleStore(puzzleId: string) {
  if (!puzzleStores[puzzleId]) {
    puzzleStores[puzzleId] = createPuzzleStore(puzzleId)
  }
  return puzzleStores[puzzleId]()
}

// 특정 퍼즐 스토어 초기화
export function resetPuzzleStore(puzzleId: string) {
  if (puzzleStores[puzzleId]) {
    puzzleStores[puzzleId].getState().resetPuzzle()
  }
}

// 모든 퍼즐 스토어 초기화
export function resetAllPuzzleStores() {
  Object.values(puzzleStores).forEach(store => {
    store.getState().resetPuzzle()
  })
} 