import { useGameStore } from './store'

// 각 방의 접근 조건 정의
export interface RoomAccess {
  roomId: string
  requiredItems?: string[]
  requiredRooms?: string[]
  requiredProgress?: number
  description: string
}

// 방별 접근 조건 설정
export const roomAccessRules: Record<string, RoomAccess> = {
  'entrance': {
    roomId: 'entrance',
    description: '게임 시작점'
  },
  'door': {
    roomId: 'door',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  'bookshelf': {
    roomId: 'bookshelf',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  'bookshelf_detail': {
    roomId: 'bookshelf_detail',
    requiredRooms: ['bookshelf'],
    description: '책장을 조사한 후 접근 가능'
  },
  'escape': {
    roomId: 'escape',
    requiredItems: ['key'],
    requiredRooms: ['door', 'bookshelf_detail'],
    requiredProgress: 80,
    description: '열쇠를 얻고 모든 단서를 찾은 후 접근 가능'
  },
  // 퍼즐 방들
  'key-puzzle': {
    roomId: 'key-puzzle',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  'number-puzzle': {
    roomId: 'number-puzzle',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  'color-puzzle': {
    roomId: 'color-puzzle',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  'piece-puzzle': {
    roomId: 'piece-puzzle',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  }
}

// 방 접근 가능 여부 확인
export function canAccessRoom(roomId: string): { 
  canAccess: boolean
  reason?: string
  missingItems?: string[]
  missingRooms?: string[]
} {
  const { inventory, visitedRooms, gameProgress } = useGameStore.getState()
  const rule = roomAccessRules[roomId]
  
  if (!rule) {
    return { canAccess: true } // 규칙이 없으면 접근 가능
  }
  
  // 필수 아이템 확인
  if (rule.requiredItems) {
    const missingItems = rule.requiredItems.filter(item => !inventory.includes(item))
    if (missingItems.length > 0) {
      return {
        canAccess: false,
        reason: `필요한 아이템: ${missingItems.join(', ')}`,
        missingItems
      }
    }
  }
  
  // 필수 방 방문 확인
  if (rule.requiredRooms) {
    const missingRooms = rule.requiredRooms.filter(room => !visitedRooms.has(room))
    if (missingRooms.length > 0) {
      return {
        canAccess: false,
        reason: `먼저 방문해야 할 방: ${missingRooms.join(', ')}`,
        missingRooms
      }
    }
  }
  
  // 진행도 확인
  if (rule.requiredProgress && gameProgress < rule.requiredProgress) {
    return {
      canAccess: false,
      reason: `게임 진행도 ${rule.requiredProgress}% 이상 필요 (현재: ${gameProgress}%)`
    }
  }
  
  return { canAccess: true }
}

// 접근 불가 시 리다이렉트할 방 결정
export function getRedirectRoom(roomId: string): string {
  const rule = roomAccessRules[roomId]
  
  if (!rule) return 'entrance'
  
  // 가장 먼저 방문해야 할 방 반환
  if (rule.requiredRooms && rule.requiredRooms.length > 0) {
    return rule.requiredRooms[0]
  }
  
  return 'entrance'
} 