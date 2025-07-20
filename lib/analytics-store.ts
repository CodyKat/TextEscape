import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GameAnalytics {
  sessionId: string
  startTime: number
  endTime?: number
  totalPlayTime: number
  roomsVisited: string[]
  choicesMade: Array<{
    roomId: string
    choiceId: string
    timestamp: number
  }>
  itemsCollected: string[]
  itemsUsed: string[]
  gameCompleted: boolean
  completionTime?: number
  restartCount: number
  errors: Array<{
    type: string
    message: string
    timestamp: number
  }>
}

export interface AnalyticsState {
  currentSession: GameAnalytics | null
  allSessions: GameAnalytics[]
  totalPlayTime: number
  totalGamesPlayed: number
  averageCompletionTime: number
  mostVisitedRooms: Record<string, number>
  mostUsedChoices: Record<string, number>
}

export interface AnalyticsActions {
  startNewSession: () => void
  endCurrentSession: () => void
  recordRoomVisit: (roomId: string) => void
  recordChoice: (roomId: string, choiceId: string) => void
  recordItemCollection: (itemId: string) => void
  recordItemUsage: (itemId: string) => void
  recordGameCompletion: () => void
  recordError: (type: string, message: string) => void
  recordRestart: () => void
  getSessionStats: () => {
    totalPlayTime: number
    roomsVisited: number
    choicesMade: number
    itemsCollected: number
  }
  getPopularRooms: () => Array<{ roomId: string; visits: number }>
  getPopularChoices: () => Array<{ choiceId: string; uses: number }>
  updateStatistics: () => void
  exportAnalytics: () => string
}

const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>()(
  persist(
    (set, get) => ({
      currentSession: null,
      allSessions: [],
      totalPlayTime: 0,
      totalGamesPlayed: 0,
      averageCompletionTime: 0,
      mostVisitedRooms: {},
      mostUsedChoices: {},

      startNewSession: () => {
        const sessionId = generateSessionId()
        const newSession: GameAnalytics = {
          sessionId,
          startTime: Date.now(),
          totalPlayTime: 0,
          roomsVisited: [],
          choicesMade: [],
          itemsCollected: [],
          itemsUsed: [],
          gameCompleted: false,
          restartCount: 0,
          errors: [],
        }

        set({ currentSession: newSession })
      },

      endCurrentSession: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const endTime = Date.now()
        const totalPlayTime = endTime - currentSession.startTime

        const completedSession: GameAnalytics = {
          ...currentSession,
          endTime,
          totalPlayTime,
        }

        set((state) => ({
          currentSession: null,
          allSessions: [...state.allSessions, completedSession],
          totalPlayTime: state.totalPlayTime + totalPlayTime,
          totalGamesPlayed: state.totalGamesPlayed + 1,
        }))

        // 통계 업데이트
        get().updateStatistics()
      },

      recordRoomVisit: (roomId: string) => {
        const { currentSession } = get()
        if (!currentSession) return

        set((state) => ({
          currentSession: {
            ...currentSession,
            roomsVisited: [...new Set([...currentSession.roomsVisited, roomId])],
          },
          mostVisitedRooms: {
            ...state.mostVisitedRooms,
            [roomId]: (state.mostVisitedRooms[roomId] || 0) + 1,
          },
        }))
      },

      recordChoice: (roomId: string, choiceId: string) => {
        const { currentSession } = get()
        if (!currentSession) return

        const choice = {
          roomId,
          choiceId,
          timestamp: Date.now(),
        }

        set((state) => ({
          currentSession: {
            ...currentSession,
            choicesMade: [...currentSession.choicesMade, choice],
          },
          mostUsedChoices: {
            ...state.mostUsedChoices,
            [choiceId]: (state.mostUsedChoices[choiceId] || 0) + 1,
          },
        }))
      },

      recordItemCollection: (itemId: string) => {
        const { currentSession } = get()
        if (!currentSession) return

        set({
          currentSession: {
            ...currentSession,
            itemsCollected: [...new Set([...currentSession.itemsCollected, itemId])],
          },
        })
      },

      recordItemUsage: (itemId: string) => {
        const { currentSession } = get()
        if (!currentSession) return

        set({
          currentSession: {
            ...currentSession,
            itemsUsed: [...new Set([...currentSession.itemsUsed, itemId])],
          },
        })
      },

      recordGameCompletion: () => {
        const { currentSession } = get()
        if (!currentSession) return

        const completionTime = Date.now() - currentSession.startTime

        set({
          currentSession: {
            ...currentSession,
            gameCompleted: true,
            completionTime,
          },
        })
      },

      recordError: (type: string, message: string) => {
        const { currentSession } = get()
        if (!currentSession) return

        const error = {
          type,
          message,
          timestamp: Date.now(),
        }

        set({
          currentSession: {
            ...currentSession,
            errors: [...currentSession.errors, error],
          },
        })
      },

      recordRestart: () => {
        const { currentSession } = get()
        if (!currentSession) return

        set({
          currentSession: {
            ...currentSession,
            restartCount: currentSession.restartCount + 1,
          },
        })
      },

      getSessionStats: () => {
        const { currentSession } = get()
        if (!currentSession) {
          return {
            totalPlayTime: 0,
            roomsVisited: 0,
            choicesMade: 0,
            itemsCollected: 0,
          }
        }

        return {
          totalPlayTime: Date.now() - currentSession.startTime,
          roomsVisited: currentSession.roomsVisited.length,
          choicesMade: currentSession.choicesMade.length,
          itemsCollected: currentSession.itemsCollected.length,
        }
      },

      getPopularRooms: () => {
        const { mostVisitedRooms } = get()
        return Object.entries(mostVisitedRooms)
          .map(([roomId, visits]) => ({ roomId, visits }))
          .sort((a, b) => b.visits - a.visits)
      },

      getPopularChoices: () => {
        const { mostUsedChoices } = get()
        return Object.entries(mostUsedChoices)
          .map(([choiceId, uses]) => ({ choiceId, uses }))
          .sort((a, b) => b.uses - a.uses)
      },

      updateStatistics: () => {
        const { allSessions } = get()
        const completedSessions = allSessions.filter(s => s.gameCompleted && s.completionTime)
        
        if (completedSessions.length > 0) {
          const avgCompletionTime = completedSessions.reduce((sum, session) => 
            sum + (session.completionTime || 0), 0) / completedSessions.length

          set({ averageCompletionTime: avgCompletionTime })
        }
      },

      exportAnalytics: () => {
        const state = get()
        return JSON.stringify(state, null, 2)
      },
    }),
    {
      name: 'game-analytics',
      partialize: (state) => ({
        allSessions: state.allSessions,
        totalPlayTime: state.totalPlayTime,
        totalGamesPlayed: state.totalGamesPlayed,
        averageCompletionTime: state.averageCompletionTime,
        mostVisitedRooms: state.mostVisitedRooms,
        mostUsedChoices: state.mostUsedChoices,
      }),
    }
  )
) 