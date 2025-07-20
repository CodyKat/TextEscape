import { create } from 'zustand'

export interface GameState {
  currentRoom: string
  inventory: string[]
  visitedRooms: Set<string>
  gameProgress: number
  isGameComplete: boolean
}

export interface GameActions {
  setCurrentRoom: (room: string) => void
  addToInventory: (item: string) => void
  removeFromInventory: (item: string) => void
  markRoomVisited: (room: string) => void
  updateProgress: (progress: number) => void
  completeGame: () => void
  resetGame: () => void
}

const initialState: GameState = {
  currentRoom: 'entrance',
  inventory: [],
  visitedRooms: new Set(),
  gameProgress: 0,
  isGameComplete: false,
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,
  
  setCurrentRoom: (room: string) => {
    set({ currentRoom: room })
    get().markRoomVisited(room)
    
    // 광고 스토어도 업데이트 (동적 import로 순환 참조 방지)
    if (typeof window !== 'undefined') {
      import('./ads-store').then(({ useAdsStore }) => {
        useAdsStore.getState().setCurrentRoom(room)
      })
      
      // 분석 스토어 업데이트
      import('./analytics-store').then(({ useAnalyticsStore }) => {
        useAnalyticsStore.getState().recordRoomVisit(room)
      })
    }
  },
  
  addToInventory: (item: string) => {
    const { inventory } = get()
    if (!inventory.includes(item)) {
      set({ inventory: [...inventory, item] })
      
      // 분석 스토어 업데이트
      if (typeof window !== 'undefined') {
        import('./analytics-store').then(({ useAnalyticsStore }) => {
          useAnalyticsStore.getState().recordItemCollection(item)
        })
      }
    }
  },
  
  removeFromInventory: (item: string) => {
    const { inventory } = get()
    set({ inventory: inventory.filter(i => i !== item) })
    
    // 분석 스토어 업데이트
    if (typeof window !== 'undefined') {
      import('./analytics-store').then(({ useAnalyticsStore }) => {
        useAnalyticsStore.getState().recordItemUsage(item)
      })
    }
  },
  
  markRoomVisited: (room: string) => {
    const { visitedRooms } = get()
    const newVisitedRooms = new Set(visitedRooms)
    newVisitedRooms.add(room)
    
    // 게임 진행도 계산 (방문한 방 수 기반)
    const totalRooms = 35 // 모든 퍼즐 방 포함
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
  
  resetGame: () => {
    // currentRoom은 제외하고 나머지만 초기화
    set({
      inventory: [],
      visitedRooms: new Set(),
      gameProgress: 0,
      isGameComplete: false,
    })
    
    // 분석 스토어 업데이트
    if (typeof window !== 'undefined') {
      import('./analytics-store').then(({ useAnalyticsStore }) => {
        useAnalyticsStore.getState().recordRestart()
      })
    }
  },
})) 