// 아이템 고유번호 상수
export const ITEM_IDS = {
  // 열쇠 관련
  KEY: 'ITEM_001',
  OLD_KEY: 'ITEM_002',
  GOLDEN_KEY: 'ITEM_003',
  
  // 문서 관련
  NOTE: 'ITEM_004',
  DIARY: 'ITEM_005',
  MAP: 'ITEM_006',
  INSTRUCTION: 'ITEM_007',
  
  // 도구 관련
  SCREWDRIVER: 'ITEM_008',
  HAMMER: 'ITEM_009',
  FLASHLIGHT: 'ITEM_010',
  
  // 퍼즐 조각
  PUZZLE_PIECE_1: 'ITEM_011',
  PUZZLE_PIECE_2: 'ITEM_012',
  PUZZLE_PIECE_3: 'ITEM_013',
  PUZZLE_PIECE_4: 'ITEM_014',
  
  // 색상 관련
  RED_GEM: 'ITEM_015',
  BLUE_GEM: 'ITEM_016',
  GREEN_GEM: 'ITEM_017',
  YELLOW_GEM: 'ITEM_018',
  
  // 숫자 관련
  CODE_PAPER: 'ITEM_019',
  CALCULATOR: 'ITEM_020',
  
  // 기타
  BOOK: 'ITEM_021',
  CANDLE: 'ITEM_022',
  MATCHES: 'ITEM_023',
  
  // 새로운 퍼즐 아이템들
  STUDY_KEY: 'ITEM_024',
  OLD_DIARY: 'ITEM_025',
  TORN_MAP_PIECE_A: 'ITEM_026',
  DUSTY_BOOK: 'ITEM_027',
  CORRIDOR_KEY: 'ITEM_028',
  FADED_PHOTOGRAPH: 'ITEM_029',
  EMPTY_BOTTLE: 'ITEM_030',
  STAINED_GLASS_SHARD: 'ITEM_031',
  GARDENING_SHEARS: 'ITEM_032',
  TORN_MAP_PIECE_B: 'ITEM_033',
} as const

// 아이템 정보 매핑
export const ITEM_INFO: Record<string, { name: string; description: string }> = {
  [ITEM_IDS.KEY]: {
    name: '열쇠',
    description: '문을 열 수 있는 열쇠입니다.'
  },
  [ITEM_IDS.OLD_KEY]: {
    name: '낡은 열쇠',
    description: '오래된 문을 열 수 있는 열쇠입니다.'
  },
  [ITEM_IDS.GOLDEN_KEY]: {
    name: '황금 열쇠',
    description: '특별한 문을 열 수 있는 황금 열쇠입니다.'
  },
  [ITEM_IDS.NOTE]: {
    name: '메모지',
    description: '누군가 남긴 메모가 있습니다.'
  },
  [ITEM_IDS.DIARY]: {
    name: '일기장',
    description: '누군가의 일기장입니다.'
  },
  [ITEM_IDS.MAP]: {
    name: '지도',
    description: '방의 구조를 보여주는 지도입니다.'
  },
  [ITEM_IDS.INSTRUCTION]: {
    name: '설명서',
    description: '무언가를 사용하는 방법이 적혀있습니다.'
  },
  [ITEM_IDS.SCREWDRIVER]: {
    name: '드라이버',
    description: '나사를 풀 수 있는 도구입니다.'
  },
  [ITEM_IDS.HAMMER]: {
    name: '망치',
    description: '무언가를 부술 수 있는 도구입니다.'
  },
  [ITEM_IDS.FLASHLIGHT]: {
    name: '손전등',
    description: '어두운 곳을 밝힐 수 있습니다.'
  },
  [ITEM_IDS.PUZZLE_PIECE_1]: {
    name: '퍼즐 조각 1',
    description: '퍼즐의 첫 번째 조각입니다.'
  },
  [ITEM_IDS.PUZZLE_PIECE_2]: {
    name: '퍼즐 조각 2',
    description: '퍼즐의 두 번째 조각입니다.'
  },
  [ITEM_IDS.PUZZLE_PIECE_3]: {
    name: '퍼즐 조각 3',
    description: '퍼즐의 세 번째 조각입니다.'
  },
  [ITEM_IDS.PUZZLE_PIECE_4]: {
    name: '퍼즐 조각 4',
    description: '퍼즐의 네 번째 조각입니다.'
  },
  [ITEM_IDS.RED_GEM]: {
    name: '빨간 보석',
    description: '빨간색 보석입니다.'
  },
  [ITEM_IDS.BLUE_GEM]: {
    name: '파란 보석',
    description: '파란색 보석입니다.'
  },
  [ITEM_IDS.GREEN_GEM]: {
    name: '초록 보석',
    description: '초록색 보석입니다.'
  },
  [ITEM_IDS.YELLOW_GEM]: {
    name: '노란 보석',
    description: '노란색 보석입니다.'
  },
  [ITEM_IDS.CODE_PAPER]: {
    name: '코드 종이',
    description: '숫자 코드가 적혀있는 종이입니다.'
  },
  [ITEM_IDS.CALCULATOR]: {
    name: '계산기',
    description: '숫자 계산을 할 수 있는 도구입니다.'
  },
  [ITEM_IDS.BOOK]: {
    name: '책',
    description: '오래된 책입니다.'
  },
  [ITEM_IDS.CANDLE]: {
    name: '양초',
    description: '불을 밝힐 수 있는 양초입니다.'
  },
  [ITEM_IDS.MATCHES]: {
    name: '성냥',
    description: '불을 붙일 수 있는 성냥입니다.'
  },
  [ITEM_IDS.STUDY_KEY]: {
    name: '서재 열쇠',
    description: '오래되고 녹이 슬어있는 작은 열쇠입니다. 서재에 있는 잠긴 서랍이나 문을 여는데 사용될 것 같습니다.'
  },
  [ITEM_IDS.OLD_DIARY]: {
    name: '낡은 일기장',
    description: '오래된 가죽 표지의 일기장입니다. 마지막 페이지에 이상한 암호문이 적혀 있습니다. "4-7-2"'
  },
  [ITEM_IDS.TORN_MAP_PIECE_A]: {
    name: '찢어진 지도 조각 A',
    description: '어떤 장소를 나타내는 듯한 찢어진 지도 조각입니다. 한쪽 모서리가 뜯겨나가 있습니다.'
  },
  [ITEM_IDS.DUSTY_BOOK]: {
    name: '먼지 쌓인 고서',
    description: '표지에 아무런 제목도 없는 오래된 책입니다. 특별한 내용 없는 고서처럼 보이지만, 특정 페이지가 접혀 있습니다.'
  },
  [ITEM_IDS.CORRIDOR_KEY]: {
    name: '복도 열쇠',
    description: '낡았지만 비교적 최근에 사용된 듯한 열쇠입니다. 복도 어딘가에 쓰일 것 같습니다.'
  },
  [ITEM_IDS.FADED_PHOTOGRAPH]: {
    name: '빛바랜 사진',
    description: '한 가족의 오래된 사진입니다. 뒷면에 희미하게 숫자가 적혀 있습니다: "913"'
  },
  [ITEM_IDS.EMPTY_BOTTLE]: {
    name: '빈 유리병',
    description: '아무것도 들어있지 않은 작은 유리병입니다. 손잡이가 달려있어 어디 걸어두기 좋을 것 같습니다.'
  },
  [ITEM_IDS.STAINED_GLASS_SHARD]: {
    name: '스테인드 글라스 조각',
    description: '깨진 스테인드 글라스 창에서 떨어져 나온 조각입니다. 햇빛에 비치면 무지개색을 띕니다.'
  },
  [ITEM_IDS.GARDENING_SHEARS]: {
    name: '낡은 원예 가위',
    description: '정원에서 식물들을 정리할 때 쓰는 낡은 가위입니다. 날이 꽤 날카롭습니다.'
  },
  [ITEM_IDS.TORN_MAP_PIECE_B]: {
    name: '찢어진 지도 조각 B',
    description: '또 다른 지도 조각입니다. 조각 A와 합쳐보면 전체 지도가 완성될 것 같습니다.'
  },
}

// 아이템 ID로 이름 가져오기
export function getItemName(itemId: string, lang: 'ko' | 'ja' | 'en' = 'ko'): string {
  // 언어별 아이템 이름 매핑
  const itemNames: Record<string, Record<'ko' | 'ja' | 'en', string>> = {
    [ITEM_IDS.KEY]: {
      ko: '열쇠',
      ja: '鍵',
      en: 'Key'
    },
    [ITEM_IDS.OLD_KEY]: {
      ko: '낡은 열쇠',
      ja: '古い鍵',
      en: 'Old Key'
    },
    [ITEM_IDS.GOLDEN_KEY]: {
      ko: '황금 열쇠',
      ja: '金の鍵',
      en: 'Golden Key'
    },
    [ITEM_IDS.NOTE]: {
      ko: '메모지',
      ja: 'メモ',
      en: 'Note'
    },
    [ITEM_IDS.DIARY]: {
      ko: '일기장',
      ja: '日記',
      en: 'Diary'
    },
    [ITEM_IDS.MAP]: {
      ko: '지도',
      ja: '地図',
      en: 'Map'
    },
    [ITEM_IDS.INSTRUCTION]: {
      ko: '설명서',
      ja: '説明書',
      en: 'Instruction'
    },
    [ITEM_IDS.SCREWDRIVER]: {
      ko: '드라이버',
      ja: 'ドライバー',
      en: 'Screwdriver'
    },
    [ITEM_IDS.HAMMER]: {
      ko: '망치',
      ja: 'ハンマー',
      en: 'Hammer'
    },
    [ITEM_IDS.FLASHLIGHT]: {
      ko: '손전등',
      ja: '懐中電灯',
      en: 'Flashlight'
    },
    [ITEM_IDS.PUZZLE_PIECE_1]: {
      ko: '퍼즐 조각 1',
      ja: 'パズルピース1',
      en: 'Puzzle Piece 1'
    },
    [ITEM_IDS.PUZZLE_PIECE_2]: {
      ko: '퍼즐 조각 2',
      ja: 'パズルピース2',
      en: 'Puzzle Piece 2'
    },
    [ITEM_IDS.PUZZLE_PIECE_3]: {
      ko: '퍼즐 조각 3',
      ja: 'パズルピース3',
      en: 'Puzzle Piece 3'
    },
    [ITEM_IDS.PUZZLE_PIECE_4]: {
      ko: '퍼즐 조각 4',
      ja: 'パズルピース4',
      en: 'Puzzle Piece 4'
    },
    [ITEM_IDS.RED_GEM]: {
      ko: '빨간 보석',
      ja: '赤い宝石',
      en: 'Red Gem'
    },
    [ITEM_IDS.BLUE_GEM]: {
      ko: '파란 보석',
      ja: '青い宝石',
      en: 'Blue Gem'
    },
    [ITEM_IDS.GREEN_GEM]: {
      ko: '초록 보석',
      ja: '緑の宝石',
      en: 'Green Gem'
    },
    [ITEM_IDS.YELLOW_GEM]: {
      ko: '노란 보석',
      ja: '黄色い宝石',
      en: 'Yellow Gem'
    },
    [ITEM_IDS.CODE_PAPER]: {
      ko: '코드 종이',
      ja: 'コード用紙',
      en: 'Code Paper'
    },
    [ITEM_IDS.CALCULATOR]: {
      ko: '계산기',
      ja: '計算機',
      en: 'Calculator'
    },
    [ITEM_IDS.BOOK]: {
      ko: '책',
      ja: '本',
      en: 'Book'
    },
    [ITEM_IDS.CANDLE]: {
      ko: '양초',
      ja: 'ろうそく',
      en: 'Candle'
    },
    [ITEM_IDS.MATCHES]: {
      ko: '성냥',
      ja: 'マッチ',
      en: 'Matches'
    },
    [ITEM_IDS.STUDY_KEY]: {
      ko: '서재 열쇠',
      ja: '書斎の鍵',
      en: 'Study Key'
    },
    [ITEM_IDS.OLD_DIARY]: {
      ko: '낡은 일기장',
      ja: '古い日記',
      en: 'Old Diary'
    },
    [ITEM_IDS.TORN_MAP_PIECE_A]: {
      ko: '찢어진 지도 조각 A',
      ja: '破れた地図の断片A',
      en: 'Torn Map Piece A'
    },
    [ITEM_IDS.DUSTY_BOOK]: {
      ko: '먼지 쌓인 고서',
      ja: '埃っぽい古書',
      en: 'Dusty Book'
    },
    [ITEM_IDS.CORRIDOR_KEY]: {
      ko: '복도 열쇠',
      ja: '廊下の鍵',
      en: 'Corridor Key'
    },
    [ITEM_IDS.FADED_PHOTOGRAPH]: {
      ko: '빛바랜 사진',
      ja: '色褪せた写真',
      en: 'Faded Photograph'
    },
    [ITEM_IDS.EMPTY_BOTTLE]: {
      ko: '빈 유리병',
      ja: '空の瓶',
      en: 'Empty Bottle'
    },
    [ITEM_IDS.STAINED_GLASS_SHARD]: {
      ko: '스테인드 글라스 조각',
      ja: 'ステンドグラスの破片',
      en: 'Stained Glass Shard'
    },
    [ITEM_IDS.GARDENING_SHEARS]: {
      ko: '낡은 원예 가위',
      ja: '古い園芸用はさみ',
      en: 'Gardening Shears'
    },
    [ITEM_IDS.TORN_MAP_PIECE_B]: {
      ko: '찢어진 지도 조각 B',
      ja: '破れた地図の断片B',
      en: 'Torn Map Piece B'
    }
  }

  return itemNames[itemId]?.[lang] || ITEM_INFO[itemId]?.name || itemId
}

// 아이템 ID로 설명 가져오기
export function getItemDescription(itemId: string): string {
  return ITEM_INFO[itemId]?.description || '알 수 없는 아이템입니다.'
} 