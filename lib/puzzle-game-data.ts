import { ITEM_IDS } from './item-constants'

export interface PuzzleChoice {
  id: string
  text: string
  nextRoom: string
  requiredItems?: string[]
  addToInventory?: string[]
  removeFromInventory?: string[]
  condition?: () => boolean
}

export interface PuzzleRoom {
  id: string
  title: string
  description: string
  backgroundImage?: string
  choices: PuzzleChoice[]
}

export interface PuzzleData {
  id: string
  name: string
  description: string
  rooms: Record<string, PuzzleRoom>
  startRoom: string
}

// 열쇠 퍼즐 데이터
export const keyPuzzleData: PuzzleData = {
  id: 'key',
  name: '열쇠 퍼즐',
  description: '열쇠를 찾아 문을 열어보세요',
  startRoom: 'entrance',
  rooms: {
    entrance: {
      id: 'entrance',
      title: '어두운 방',
      description: '당신은 어두운 방에 있습니다. 앞에는 오래된 문이 있고, 오른쪽에는 책장이 보입니다.',
      backgroundImage: '/images/key/entrance.jpg',
      choices: [
        {
          id: 'go_to_door',
          text: '문 앞으로 가기',
          nextRoom: 'door'
        },
        {
          id: 'go_to_bookshelf',
          text: '책장 조사하기',
          nextRoom: 'bookshelf'
        }
      ]
    },
    door: {
      id: 'door',
      title: '문 앞',
      description: '오래된 나무 문입니다. 열쇠 구멍이 보입니다.',
      backgroundImage: '/images/key/door.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'entrance'
        },
        {
          id: 'use_key',
          text: '열쇠로 문 열기',
          nextRoom: 'escape',
          requiredItems: [ITEM_IDS.KEY]
        }
      ]
    },
    bookshelf: {
      id: 'bookshelf',
      title: '책장',
      description: '오래된 책들이 꽂혀있는 책장입니다. 한 책이 튀어나와 있습니다.',
      backgroundImage: '/images/key/bookshelf.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'entrance'
        },
        {
          id: 'examine_book',
          text: '튀어나온 책 자세히 보기',
          nextRoom: 'bookshelf_detail'
        }
      ]
    },
    bookshelf_detail: {
      id: 'bookshelf_detail',
      title: '책장 상세',
      description: '책을 꺼내보니 열쇠가 숨겨져 있었습니다!',
      backgroundImage: '/images/key/bookshelf_detail.jpg',
      choices: [
        {
          id: 'take_key',
          text: '열쇠 가져가기',
          nextRoom: 'bookshelf',
          addToInventory: [ITEM_IDS.KEY]
        }
      ]
    },
    escape: {
      id: 'escape',
      title: '탈출!',
      description: '문을 열고 밖으로 나왔습니다! 축하합니다!',
      backgroundImage: '/images/key/escape.jpg',
      choices: [
        {
          id: 'restart',
          text: '다시 시작하기',
          nextRoom: 'entrance'
        }
      ]
    }
  }
}

// 숫자 퍼즐 데이터
export const numberPuzzleData: PuzzleData = {
  id: 'number',
  name: '숫자 퍼즐',
  description: '숫자 패드의 비밀을 풀어보세요',
  startRoom: 'start',
  rooms: {
    start: {
      id: 'start',
      title: '숫자 방',
      description: '벽에 숫자 패드가 있는 방입니다. 계산기가 놓여있습니다.',
      backgroundImage: '/images/number/start.jpg',
      choices: [
        {
          id: 'use_calculator',
          text: '계산기 사용하기',
          nextRoom: 'calculator'
        }
      ]
    },
    calculator: {
      id: 'calculator',
      title: '계산기',
      description: '계산기 뒤에 코드가 적힌 종이가 숨겨져 있습니다.',
      backgroundImage: '/images/number/calculator.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'start'
        },
        {
          id: 'take_code',
          text: '코드 종이 가져가기',
          nextRoom: 'code_input',
          addToInventory: [ITEM_IDS.CODE_PAPER]
        }
      ]
    },
    code_input: {
      id: 'code_input',
      title: '코드 입력',
      description: '숫자 패드가 있습니다. 코드 종이에 적힌 숫자를 입력하세요.',
      backgroundImage: '/images/number/code_input.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'calculator'
        },
        {
          id: 'enter_code',
          text: '코드 입력하기',
          nextRoom: 'escape',
          requiredItems: [ITEM_IDS.CODE_PAPER]
        }
      ]
    },
    escape: {
      id: 'escape',
      title: '탈출!',
      description: '코드를 입력하니 문이 열렸습니다! 축하합니다!',
      backgroundImage: '/images/number/escape.jpg',
      choices: [
        {
          id: 'restart',
          text: '다시 시작하기',
          nextRoom: 'start'
        }
      ]
    }
  }
}

// 색상 퍼즐 데이터
export const colorPuzzleData: PuzzleData = {
  id: 'color',
  name: '색상 퍼즐',
  description: '색상 순서를 맞춰보세요',
  startRoom: 'beginning',
  rooms: {
    beginning: {
      id: 'beginning',
      title: '색상 방',
      description: '다양한 색상의 보석들이 있는 방입니다.',
      backgroundImage: '/images/color/beginning.jpg',
      choices: [
        {
          id: 'collect_gems',
          text: '보석 수집하기',
          nextRoom: 'gem_collection'
        }
      ]
    },
    gem_collection: {
      id: 'gem_collection',
      title: '보석 수집',
      description: '빨간, 파란, 초록, 노란 보석들을 모두 수집했습니다.',
      backgroundImage: '/images/color/gem_collection.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'beginning'
        },
        {
          id: 'arrange_colors',
          text: '색상 순서 맞추기',
          nextRoom: 'color_order',
          addToInventory: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM]
        }
      ]
    },
    color_order: {
      id: 'color_order',
      title: '색상 순서',
      description: '보석들을 올바른 순서로 배치해야 합니다.',
      backgroundImage: '/images/color/color_order.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'gem_collection'
        },
        {
          id: 'complete_order',
          text: '순서 완성하기',
          nextRoom: 'escape',
          requiredItems: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM]
        }
      ]
    },
    escape: {
      id: 'escape',
      title: '탈출!',
      description: '색상 순서를 맞추니 문이 열렸습니다! 축하합니다!',
      backgroundImage: '/images/color/escape.jpg',
      choices: [
        {
          id: 'restart',
          text: '다시 시작하기',
          nextRoom: 'beginning'
        }
      ]
    }
  }
}

// 조각 퍼즐 데이터
export const piecePuzzleData: PuzzleData = {
  id: 'piece',
  name: '조각 퍼즐',
  description: '퍼즐 조각을 모아 완성해보세요',
  startRoom: 'entrance',
  rooms: {
    entrance: {
      id: 'entrance',
      title: '퍼즐 방',
      description: '퍼즐 조각들이 흩어져 있는 방입니다.',
      backgroundImage: '/images/piece/entrance.jpg',
      choices: [
        {
          id: 'search_pieces',
          text: '퍼즐 조각 찾기',
          nextRoom: 'piece_search'
        }
      ]
    },
    piece_search: {
      id: 'piece_search',
      title: '조각 수집',
      description: '모든 퍼즐 조각을 찾았습니다.',
      backgroundImage: '/images/piece/piece_search.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'entrance'
        },
        {
          id: 'assemble_puzzle',
          text: '퍼즐 조립하기',
          nextRoom: 'puzzle_assembly',
          addToInventory: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4]
        }
      ]
    },
    puzzle_assembly: {
      id: 'puzzle_assembly',
      title: '퍼즐 조립',
      description: '퍼즐을 완성해야 합니다.',
      backgroundImage: '/images/piece/puzzle_assembly.jpg',
      choices: [
        {
          id: 'go_back',
          text: '돌아가기',
          nextRoom: 'piece_search'
        },
        {
          id: 'complete_puzzle',
          text: '퍼즐 완성하기',
          nextRoom: 'escape',
          requiredItems: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4]
        }
      ]
    },
    escape: {
      id: 'escape',
      title: '탈출!',
      description: '퍼즐을 완성하니 문이 열렸습니다! 축하합니다!',
      backgroundImage: '/images/piece/escape.jpg',
      choices: [
        {
          id: 'restart',
          text: '다시 시작하기',
          nextRoom: 'entrance'
        }
      ]
    }
  }
}

// 새로운 서재 퍼즐 데이터
export const studyPuzzleData: PuzzleData = {
  id: 'study',
  name: '서재 탈출',
  description: '낡은 서재에서 탈출하세요. 다양한 아이템을 찾고 퍼즐을 풀어야 합니다.',
  startRoom: 'entrance',
  rooms: {
    entrance: {
      id: 'entrance',
      title: '서재 입구',
      description: '당신은 낡은 서재의 입구에 서 있습니다. 앞으로 나아가면 본격적인 서재가 펼쳐집니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'enter_study',
          text: '서재로 들어간다',
          nextRoom: 'study_room'
        }
      ]
    },
    study_room: {
      id: 'study_room',
      title: '낡은 서재',
      description: '당신은 낡고 먼지 가득한 서재에 갇혀있습니다. 삐걱거리는 마루, 천장까지 닿는 거대한 책장, 오래된 지도가 덮인 책상, 그리고 굳게 닫힌 창문이 눈에 들어옵니다. 한쪽 벽에는 재가 가득한 벽난로가 있습니다. 방을 나가는 낡은 나무 문이 정면에 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'explore_bookshelf',
          text: '거대한 책장을 자세히 살펴본다',
          nextRoom: 'bookshelf_detail'
        },
        {
          id: 'explore_desk',
          text: '오래된 책상을 살펴본다',
          nextRoom: 'desk_detail'
        },
        {
          id: 'look_window',
          text: '창문을 확인한다',
          nextRoom: 'window_view'
        },
        {
          id: 'explore_fireplace',
          text: '재가 쌓인 벽난로를 조사한다',
          nextRoom: 'fireplace_detail'
        },
        {
          id: 'inspect_door_to_corridor',
          text: '낡은 나무 문을 조사한다',
          nextRoom: 'corridor_entrance'
        }
      ]
    },
    bookshelf_detail: {
      id: 'bookshelf_detail',
      title: '빼곡한 책장',
      description: '수많은 고서와 잡동사니가 뒤섞여 있습니다. 책들을 일일이 살펴보니, 유난히 손때 묻은 한 권이 눈에 띕니다. 그리고 한쪽에 이상하게 튀어나온 책이 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'pull_dusty_book',
          text: '손때 묻은 책을 꺼내본다',
          nextRoom: 'bookshelf_detail',
          addToInventory: [ITEM_IDS.DUSTY_BOOK]
        },
        {
          id: 'push_protruding_book',
          text: '튀어나온 책을 밀어 넣는다',
          nextRoom: 'secret_compartment_bookshelf'
        },
        {
          id: 'back_to_study',
          text: '돌아가기',
          nextRoom: 'study_room'
        }
      ]
    },
    secret_compartment_bookshelf: {
      id: 'secret_compartment_bookshelf',
      title: '책장의 비밀 칸',
      description: '책을 밀어 넣자 책장 뒤에서 덜컥이는 소리가 나며 작은 비밀 공간이 나타났습니다. 안에는 빛바랜 사진 한 장이 놓여 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1510511459019-5da7094ed22f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_faded_photograph',
          text: '사진을 챙긴다',
          nextRoom: 'secret_compartment_bookshelf',
          addToInventory: [ITEM_IDS.FADED_PHOTOGRAPH]
        },
        {
          id: 'back_to_bookshelf',
          text: '돌아가기',
          nextRoom: 'bookshelf_detail'
        }
      ]
    },
    desk_detail: {
      id: 'desk_detail',
      title: '오래된 책상',
      description: '책상 위에는 잉크병과 깃털 펜이 놓여있고, 한쪽 구석에는 잠긴 서랍이 있습니다. 서랍 옆에는 찢어진 지도 조각이 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1563221949-a681335b2e9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'examine_locked_drawer',
          text: '잠긴 서랍을 열어본다',
          nextRoom: 'drawer_open_diary',
          requiredItems: [ITEM_IDS.STUDY_KEY]
        },
        {
          id: 'get_map_piece_a',
          text: '찢어진 지도 조각 A를 챙긴다',
          nextRoom: 'desk_detail',
          addToInventory: [ITEM_IDS.TORN_MAP_PIECE_A]
        },
        {
          id: 'back_to_study',
          text: '돌아가기',
          nextRoom: 'study_room'
        }
      ]
    },
    drawer_open_diary: {
      id: 'drawer_open_diary',
      title: '열린 서랍',
      description: '열쇠를 사용하여 서랍을 열자, 낡은 일기장이 나옵니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1549419194-d4b99824ae4d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'take_old_diary',
          text: '일기장을 챙긴다',
          nextRoom: 'drawer_open_diary',
          addToInventory: [ITEM_IDS.OLD_DIARY]
        },
        {
          id: 'back_to_desk_from_open',
          text: '돌아가기',
          nextRoom: 'desk_detail'
        }
      ]
    },
    window_view: {
      id: 'window_view',
      title: '창밖 풍경',
      description: '굳게 닫힌 창문 밖으로는 무성한 정원이 보입니다. 멀리서는 안개가 자욱하게 깔려있어 아무것도 보이지 않습니다. 창문에는 얇은 틈이 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'use_gardening_shears_on_vines',
          text: '창밖 덩굴에 원예 가위를 사용한다',
          nextRoom: 'window_vines_cleared',
          requiredItems: [ITEM_IDS.GARDENING_SHEARS]
        },
        {
          id: 'back_to_study',
          text: '돌아가기',
          nextRoom: 'study_room'
        }
      ]
    },
    window_vines_cleared: {
      id: 'window_vines_cleared',
      title: '덩굴이 제거된 창문',
      description: '원예 가위로 창문을 뒤덮은 덩굴을 잘라내자, 덩굴 사이에 숨겨져 있던 녹슨 복도 열쇠가 보입니다!',
      backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_corridor_key',
          text: '복도 열쇠를 챙긴다',
          nextRoom: 'window_vines_cleared',
          addToInventory: [ITEM_IDS.CORRIDOR_KEY]
        },
        {
          id: 'back_to_window_from_cleared',
          text: '돌아가기',
          nextRoom: 'window_view'
        }
      ]
    },
    fireplace_detail: {
      id: 'fireplace_detail',
      title: '재가 쌓인 벽난로',
      description: '오랫동안 사용하지 않은 듯 재가 가득합니다. 그을음이 묻어있고, 안쪽에는 희미하게 빛나는 작은 물체가 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1550212379-317f25979803?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'reach_into_fireplace',
          text: '손을 넣어 물체를 꺼낸다',
          nextRoom: 'fireplace_detail',
          addToInventory: [ITEM_IDS.STUDY_KEY]
        },
        {
          id: 'back_to_study',
          text: '돌아가기',
          nextRoom: 'study_room'
        }
      ]
    },
    corridor_entrance: {
      id: 'corridor_entrance',
      title: '낡은 나무 문',
      description: '이 방을 나갈 수 있는 유일한 문입니다. 굳게 잠겨있습니다. 옆에는 낡은 자물쇠가 달려있습니다. 문 너머 어둡고 긴 복도가 어렴풋이 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1594877717466-fdc94bb2e811?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'try_to_open_main_door',
          text: '문을 열려고 시도한다',
          nextRoom: 'dark_corridor',
          requiredItems: [ITEM_IDS.STUDY_KEY]
        },
        {
          id: 'back_to_study_from_door',
          text: '돌아가기',
          nextRoom: 'study_room'
        }
      ]
    },
    dark_corridor: {
      id: 'dark_corridor',
      title: '어두운 복도',
      description: '낡은 문을 열고 나오자, 빛 한 줄기 없는 어두운 복도가 눈앞에 펼쳐집니다. 공기가 차갑고 음산합니다. 복도 끝에는 굳게 닫힌 또 다른 문이 보입니다. 오른쪽에는 작은 나무 상자가, 왼쪽에는 정원으로 나가는 듯한 낡은 문이 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1563221949-a681335b2e9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'examine_end_door',
          text: '복도 끝 문을 조사한다 (응접실)',
          nextRoom: 'reception_room_entrance'
        },
        {
          id: 'examine_wooden_box',
          text: '오른쪽 나무 상자를 살펴본다',
          nextRoom: 'corridor_box'
        },
        {
          id: 'examine_garden_door',
          text: '왼쪽 낡은 문을 살펴본다 (정원)',
          nextRoom: 'garden_path',
          requiredItems: [ITEM_IDS.CORRIDOR_KEY]
        },
        {
          id: 'back_to_study_from_corridor',
          text: '서재로 돌아간다',
          nextRoom: 'study_room'
        }
      ]
    },
    corridor_box: {
      id: 'corridor_box',
      title: '복도 나무 상자',
      description: '작은 나무 상자입니다. 뚜껑에는 숫자를 입력하는 자물쇠가 달려있습니다. 세 자리 숫자가 필요해 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'input_code_corridor_box',
          text: '숫자 입력하기 (472)',
          nextRoom: 'corridor_box_open'
        },
        {
          id: 'back_to_corridor_from_box',
          text: '돌아가기',
          nextRoom: 'dark_corridor'
        }
      ]
    },
    corridor_box_open: {
      id: 'corridor_box_open',
      title: '열린 나무 상자',
      description: '정답을 입력하자 상자가 열립니다. 안에는 비어있는 작은 유리병이 들어있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_empty_bottle',
          text: '유리병을 챙긴다',
          nextRoom: 'corridor_box_open',
          addToInventory: [ITEM_IDS.EMPTY_BOTTLE]
        },
        {
          id: 'back_to_corridor_from_box_open',
          text: '돌아가기',
          nextRoom: 'dark_corridor'
        }
      ]
    },
    reception_room_entrance: {
      id: 'reception_room_entrance',
      title: '응접실 입구',
      description: '복도 끝의 문을 열자 넓은 응접실이 나타납니다. 먼지가 쌓인 소파와 촛대가 놓인 탁자, 그리고 큼직한 벽난로가 눈에 띕니다. 한쪽에는 닫힌 커튼이 쳐진 창문이, 다른 쪽에는 작은 문이 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1565313936353-ed11df68157e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'examine_fireplace_reception',
          text: '응접실 벽난로를 조사한다',
          nextRoom: 'reception_fireplace_detail'
        },
        {
          id: 'open_small_door',
          text: '작은 문을 열어본다 (식료품 저장고)',
          nextRoom: 'pantry_room'
        },
        {
          id: 'open_curtains',
          text: '커튼을 걷어본다',
          nextRoom: 'reception_window'
        },
        {
          id: 'back_to_corridor_from_reception',
          text: '복도로 돌아간다',
          nextRoom: 'dark_corridor'
        }
      ]
    },
    reception_fireplace_detail: {
      id: 'reception_fireplace_detail',
      title: '응접실 벽난로',
      description: '이곳 역시 재가 쌓여있지만, 무언가 반짝이는 것이 보입니다. 재를 걷어보니 낡은 원예 가위가 나옵니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1550212379-317f25979803?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_gardening_shears',
          text: '원예 가위를 챙긴다',
          nextRoom: 'reception_fireplace_detail',
          addToInventory: [ITEM_IDS.GARDENING_SHEARS]
        },
        {
          id: 'back_to_reception',
          text: '돌아가기',
          nextRoom: 'reception_room_entrance'
        }
      ]
    },
    reception_window: {
      id: 'reception_window',
      title: '응접실 창문',
      description: '커튼을 걷어내자 바깥의 무성한 정원이 보입니다. 이끼 낀 돌담이 눈에 들어오는데, 틈새에 무언가 끼어있는 듯합니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'investigate_stone_wall',
          text: '돌담 틈새를 조사한다',
          nextRoom: 'stone_wall_detail'
        },
        {
          id: 'back_to_reception_from_window',
          text: '돌아가기',
          nextRoom: 'reception_room_entrance'
        }
      ]
    },
    stone_wall_detail: {
      id: 'stone_wall_detail',
      title: '이끼 낀 돌담',
      description: '돌담의 틈새를 자세히 보니, 빛바랜 스테인드 글라스 조각이 박혀 있습니다. 조심스럽게 꺼낼 수 있을 것 같습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_stained_glass_shard',
          text: '스테인드 글라스 조각을 챙긴다',
          nextRoom: 'stone_wall_detail',
          addToInventory: [ITEM_IDS.STAINED_GLASS_SHARD]
        },
        {
          id: 'back_to_reception_window',
          text: '돌아가기',
          nextRoom: 'reception_window'
        }
      ]
    },
    pantry_room: {
      id: 'pantry_room',
      title: '식료품 저장고',
      description: '좁고 어두운 방입니다. 선반에는 텅 빈 병들과 곰팡이 핀 음식들이 놓여 있습니다. 한쪽 벽에 걸린 낡은 달력이 눈에 들어옵니다. 그 옆에는 지도가 찢겨나간 자리가 있습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1587588358485-783b9f3900b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'search_map_spot',
          text: '지도가 찢겨나간 자리를 검색한다',
          nextRoom: 'pantry_room',
          addToInventory: [ITEM_IDS.TORN_MAP_PIECE_B]
        },
        {
          id: 'back_to_reception_from_pantry',
          text: '돌아가기',
          nextRoom: 'reception_room_entrance'
        }
      ]
    },
    garden_path: {
      id: 'garden_path',
      title: '황량한 정원 길',
      description: '문을 열고 나오자, 관리가 전혀 안 된 황량한 정원이 펼쳐집니다. 엉성하게 이어진 흙길이 저 멀리 닫힌 작은 오두막으로 이어집니다. 길 중간에는 마른 우물이 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1534063228945-8ed1b11b7d5a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'go_to_shed',
          text: '오두막으로 향한다',
          nextRoom: 'garden_shed_entrance'
        },
        {
          id: 'examine_well',
          text: '마른 우물을 살펴본다',
          nextRoom: 'dry_well'
        },
        {
          id: 'back_to_corridor_from_garden',
          text: '복도로 돌아간다',
          nextRoom: 'dark_corridor'
        }
      ]
    },
    dry_well: {
      id: 'dry_well',
      title: '마른 우물',
      description: '우물 안은 완전히 말라 있습니다. 바닥에는 아무것도 없지만, 우물 안쪽에 돌출된 쇠막대가 있습니다. 물건을 걸어둘 수 있을 것 같습니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1629858273618-97c41eb4e5ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'use_empty_bottle_on_bar',
          text: '쇠막대에 빈 유리병을 걸어둔다',
          nextRoom: 'well_clue_revealed',
          requiredItems: [ITEM_IDS.EMPTY_BOTTLE]
        },
        {
          id: 'back_to_garden_from_well',
          text: '돌아가기',
          nextRoom: 'garden_path'
        }
      ]
    },
    well_clue_revealed: {
      id: 'well_clue_revealed',
      title: '우물 속 힌트',
      description: '유리병을 쇠막대에 걸어두자, 유리병이 매달린 반동으로 쇠막대 아래의 숨겨진 부분이 열리면서 찢어진 지도 조각이 나타납니다!',
      backgroundImage: 'https://images.unsplash.com/photo-1629858273618-97c41eb4e5ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'get_torn_map_piece_b_well',
          text: '찢어진 지도 조각 B를 챙긴다',
          nextRoom: 'well_clue_revealed',
          addToInventory: [ITEM_IDS.TORN_MAP_PIECE_B]
        },
        {
          id: 'back_to_well_from_clue',
          text: '돌아가기',
          nextRoom: 'dry_well'
        }
      ]
    },
    garden_shed_entrance: {
      id: 'garden_shed_entrance',
      title: '낡은 오두막',
      description: '황량한 정원 끝에 낡은 나무 오두막이 서 있습니다. 문은 자물쇠로 굳게 잠겨있습니다. 자물쇠에는 지도를 넣을 수 있는 홈이 보입니다.',
      backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'insert_map_pieces',
          text: '지도 조각을 자물쇠 홈에 넣는다',
          nextRoom: 'shed_open',
          requiredItems: [ITEM_IDS.TORN_MAP_PIECE_A, ITEM_IDS.TORN_MAP_PIECE_B]
        },
        {
          id: 'back_to_garden_from_shed',
          text: '돌아가기',
          nextRoom: 'garden_path'
        }
      ]
    },
    shed_open: {
      id: 'shed_open',
      title: '열린 오두막',
      description: '지도 조각을 맞추자, 자물쇠가 풀리는 소리와 함께 오두막 문이 열립니다. 오두막 안쪽에는 작은 문이 있고, 그 문 너머로 밝은 빛이 새어 나옵니다!',
      backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'enter_light',
          text: '밝은 빛 속으로 들어간다',
          nextRoom: 'escape'
        },
        {
          id: 'back_to_shed_from_open',
          text: '돌아가기',
          nextRoom: 'garden_shed_entrance'
        }
      ]
    },
    escape: {
      id: 'escape',
      title: '탈출 성공!',
      description: '밝은 빛 속으로 들어가자, 당신은 마침내 오두막을 빠져나왔습니다! 축하합니다! 당신은 성공적으로 탈출했습니다!',
      backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      choices: [
        {
          id: 'restart',
          text: '다시 시작하기',
          nextRoom: 'study_room'
        }
      ]
    }
  }
}

// 모든 퍼즐 데이터
export const allPuzzleData: Record<string, PuzzleData> = {
  key: keyPuzzleData,
  number: numberPuzzleData,
  color: colorPuzzleData,
  piece: piecePuzzleData,
  study: studyPuzzleData
}

// 퍼즐별 방 데이터 가져오기
export function getPuzzleRoom(puzzleId: string, roomId: string): PuzzleRoom | null {
  const puzzleData = allPuzzleData[puzzleId]
  if (!puzzleData) return null
  
  return puzzleData.rooms[roomId] || null
}

// 퍼즐 데이터 가져오기
export function getPuzzleData(puzzleId: string): PuzzleData | null {
  return allPuzzleData[puzzleId] || null
}

// 모든 퍼즐 목록 가져오기
export function getAllPuzzles(): PuzzleData[] {
  return Object.values(allPuzzleData)
} 