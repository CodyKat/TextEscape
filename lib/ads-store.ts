import { create } from 'zustand'

export interface AdsState {
  adViews: Record<string, number>
  currentRoom: string
  lastAdRefresh: number
}

export interface AdsActions {
  incrementAdView: (adSlot: string) => void
  setCurrentRoom: (room: string) => void
  refreshAds: () => void
  getAdViews: (adSlot: string) => number
  getTotalAdViews: () => number
}

export const useAdsStore = create<AdsState & AdsActions>((set, get) => ({
  adViews: {},
  currentRoom: 'entrance',
  lastAdRefresh: Date.now(),
  
  incrementAdView: (adSlot: string) => {
    const { adViews } = get()
    set({
      adViews: {
        ...adViews,
        [adSlot]: (adViews[adSlot] || 0) + 1
      }
    })
  },
  
  setCurrentRoom: (room: string) => {
    set({ 
      currentRoom: room,
      lastAdRefresh: Date.now() // 방 변경 시 광고 새로고침
    })
  },
  
  refreshAds: () => {
    set({ lastAdRefresh: Date.now() })
  },
  
  getAdViews: (adSlot: string) => {
    return get().adViews[adSlot] || 0
  },
  
  getTotalAdViews: () => {
    const { adViews } = get()
    return Object.values(adViews).reduce((sum, count) => sum + count, 0)
  },
})) 