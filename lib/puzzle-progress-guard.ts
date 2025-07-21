import { usePuzzleStore } from './puzzle-store'
import { ITEM_IDS } from './item-constants'

// 각 퍼즐의 방별 접근 조건 정의
export interface PuzzleRoomAccess {
  puzzleId: string
  roomId: string
  requiredItems?: string[]
  requiredRooms?: string[]
  requiredProgress?: number
  description: string
}

// 퍼즐별 방 접근 조건 설정
export const puzzleRoomAccessRules: PuzzleRoomAccess[] = [
  // 열쇠 퍼즐
  {
    puzzleId: 'key',
    roomId: 'entrance',
    description: '게임 시작점'
  },
  {
    puzzleId: 'key',
    roomId: 'door',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  {
    puzzleId: 'key',
    roomId: 'bookshelf',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  {
    puzzleId: 'key',
    roomId: 'bookshelf_detail',
    requiredRooms: ['bookshelf'],
    description: '책장을 조사한 후 접근 가능'
  },
  {
    puzzleId: 'key',
    roomId: 'escape',
    requiredItems: [ITEM_IDS.KEY],
    description: '열쇠를 얻은 후 접근 가능'
  },
  
  // 숫자 퍼즐
  {
    puzzleId: 'number',
    roomId: 'start',
    description: '게임 시작점'
  },
  {
    puzzleId: 'number',
    roomId: 'calculator',
    requiredRooms: ['start'],
    description: '시작점에서 접근 가능'
  },
  {
    puzzleId: 'number',
    roomId: 'code_input',
    requiredItems: [ITEM_IDS.CODE_PAPER],
    requiredRooms: ['calculator'],
    description: '코드 종이를 얻은 후 접근 가능'
  },
  {
    puzzleId: 'number',
    roomId: 'escape',
    requiredItems: [ITEM_IDS.CODE_PAPER],
    requiredRooms: ['code_input'],
    description: '코드를 입력한 후 접근 가능'
  },
  
  // 색상 퍼즐
  {
    puzzleId: 'color',
    roomId: 'beginning',
    description: '게임 시작점'
  },
  {
    puzzleId: 'color',
    roomId: 'gem_collection',
    requiredRooms: ['beginning'],
    description: '시작점에서 접근 가능'
  },
  {
    puzzleId: 'color',
    roomId: 'color_order',
    requiredItems: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM],
    requiredRooms: ['gem_collection'],
    description: '모든 보석을 수집한 후 접근 가능'
  },
  {
    puzzleId: 'color',
    roomId: 'escape',
    requiredItems: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM],
    requiredRooms: ['color_order'],
    description: '색상 순서를 맞춘 후 접근 가능'
  },
  
  // 조각 퍼즐
  {
    puzzleId: 'piece',
    roomId: 'entrance',
    description: '게임 시작점'
  },
  {
    puzzleId: 'piece',
    roomId: 'piece_search',
    requiredRooms: ['entrance'],
    description: '입구에서 접근 가능'
  },
  {
    puzzleId: 'piece',
    roomId: 'puzzle_assembly',
    requiredItems: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4],
    requiredRooms: ['piece_search'],
    description: '모든 퍼즐 조각을 찾은 후 접근 가능'
  },
  {
    puzzleId: 'piece',
    roomId: 'escape',
    requiredItems: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4],
    requiredRooms: ['puzzle_assembly'],
    description: '퍼즐을 완성한 후 접근 가능'
  },
  
  // 서재 퍼즐
  {
    puzzleId: 'study',
    roomId: 'study_room',
    description: '게임 시작점'
  }
]

// 특정 퍼즐의 방 접근 가능 여부 확인
export function canAccessPuzzleRoom(
  puzzleId: string, 
  roomId: string, 
  inventory: string[] = [], 
  visitedRooms: Set<string> = new Set(), 
  gameProgress: number = 0
): { 
  canAccess: boolean
  reason?: string
  missingItems?: string[]
  missingRooms?: string[]
} {
  const rule = puzzleRoomAccessRules.find(r => r.puzzleId === puzzleId && r.roomId === roomId)
  
  if (!rule) {
    return { canAccess: true } // 규칙이 없으면 접근 가능
  }
  

  
  // 필수 아이템 확인
  if (rule.requiredItems) {
    const missingItems = rule.requiredItems.filter(item => !inventory.includes(item))
    if (missingItems.length > 0) {
      return {
        canAccess: false,
        reason: `필요한 아이템: ${missingItems.map(id => getItemName(id)).join(', ')}`,
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
export function getPuzzleRedirectRoom(puzzleId: string, roomId: string): string {
  const rule = puzzleRoomAccessRules.find(r => r.puzzleId === puzzleId && r.roomId === roomId)
  
  if (!rule) return getPuzzleStartRoom(puzzleId)
  
  // 가장 먼저 방문해야 할 방 반환
  if (rule.requiredRooms && rule.requiredRooms.length > 0) {
    return rule.requiredRooms[0]
  }
  
  return getPuzzleStartRoom(puzzleId)
}

// 퍼즐별 시작 방 반환
export function getPuzzleStartRoom(puzzleId: string): string {
  const startRooms: Record<string, string> = {
    'key': 'entrance',
    'number': 'start',
    'color': 'beginning',
    'piece': 'entrance',
    'study': 'study_room'
  }
  
  return startRooms[puzzleId] || 'entrance'
}

// 아이템 이름 가져오기 (임시 함수)
function getItemName(itemId: string): string {
  const itemNames: Record<string, string> = {
    [ITEM_IDS.KEY]: '열쇠',
    [ITEM_IDS.CODE_PAPER]: '코드 종이',
    [ITEM_IDS.RED_GEM]: '빨간 보석',
    [ITEM_IDS.BLUE_GEM]: '파란 보석',
    [ITEM_IDS.GREEN_GEM]: '초록 보석',
    [ITEM_IDS.YELLOW_GEM]: '노란 보석',
    [ITEM_IDS.PUZZLE_PIECE_1]: '퍼즐 조각 1',
    [ITEM_IDS.PUZZLE_PIECE_2]: '퍼즐 조각 2',
    [ITEM_IDS.PUZZLE_PIECE_3]: '퍼즐 조각 3',
    [ITEM_IDS.PUZZLE_PIECE_4]: '퍼즐 조각 4',
  }
  
  return itemNames[itemId] || itemId
} 