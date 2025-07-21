import { ITEM_IDS } from './item-constants'
import { getTranslation } from './i18n/translations'

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

// 다국화된 퍼즐 데이터 생성 함수
export const getKeyPuzzleData = (lang: 'ko' | 'ja' | 'en'): PuzzleData => {
  const t = (key: string) => getTranslation(lang, key)
  
  return {
    id: 'key',
    name: t('puzzles.key.name'),
    description: t('puzzles.key.description'),
    startRoom: 'entrance',
    rooms: {
      entrance: {
        id: 'entrance',
        title: t('game.key.entrance.title'),
        description: t('game.key.entrance.description'),
        backgroundImage: '/images/key/entrance.jpg',
        choices: [
          {
            id: 'go_to_door',
            text: t('game.key.entrance.choices.go_to_door'),
            nextRoom: 'door'
          },
          {
            id: 'go_to_bookshelf',
            text: t('game.key.entrance.choices.go_to_bookshelf'),
            nextRoom: 'bookshelf'
          }
        ]
      },
      door: {
        id: 'door',
        title: t('game.key.door.title'),
        description: t('game.key.door.description'),
        backgroundImage: '/images/key/door.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.key.door.choices.go_back'),
            nextRoom: 'entrance'
          },
          {
            id: 'use_key',
            text: t('game.key.door.choices.use_key'),
            nextRoom: 'escape',
            requiredItems: [ITEM_IDS.KEY]
          }
        ]
      },
      bookshelf: {
        id: 'bookshelf',
        title: t('game.key.bookshelf.title'),
        description: t('game.key.bookshelf.description'),
        backgroundImage: '/images/key/bookshelf.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.key.bookshelf.choices.go_back'),
            nextRoom: 'entrance'
          },
          {
            id: 'examine_book',
            text: t('game.key.bookshelf.choices.examine_book'),
            nextRoom: 'bookshelf_detail'
          }
        ]
      },
      bookshelf_detail: {
        id: 'bookshelf_detail',
        title: t('game.key.bookshelf_detail.title'),
        description: t('game.key.bookshelf_detail.description'),
        backgroundImage: '/images/key/bookshelf_detail.jpg',
        choices: [
          {
            id: 'takeKey',
            text: t('game.key.bookshelf_detail.choices.takeKey'),
            nextRoom: 'bookshelf',
            addToInventory: [ITEM_IDS.KEY]
          },
          {
            id: 'takeNumber',
            text: t('game.key.bookshelf_detail.choices.takeNumber'),
            nextRoom: 'bookshelf',
            addToInventory: [ITEM_IDS.BOOK]
          },
          {
            id: 'checkBack',
            text: t('game.key.bookshelf_detail.choices.checkBack'),
            nextRoom: 'bookshelf'
          },
          {
            id: 'go_back',
            text: t('game.key.bookshelf_detail.choices.go_back'),
            nextRoom: 'bookshelf'
          }
        ]
      },
      escape: {
        id: 'escape',
        title: t('game.key.escape.title'),
        description: t('game.key.escape.description'),
        backgroundImage: '/images/key/escape.jpg',
        choices: [
          {
            id: 'goToMain',
            text: t('game.goToMain'),
            nextRoom: '/'
          }
        ]
      }
    }
  }
}

// 숫자 퍼즐 데이터 생성 함수
export const getNumberPuzzleData = (lang: 'ko' | 'ja' | 'en'): PuzzleData => {
  const t = (key: string) => getTranslation(lang, key)
  
  return {
    id: 'number',
    name: t('puzzles.number.name'),
    description: t('puzzles.number.description'),
    startRoom: 'start',
    rooms: {
      start: {
        id: 'start',
        title: t('game.number.start.title'),
        description: t('game.number.start.description'),
        backgroundImage: '/images/number/start.jpg',
        choices: [
          {
            id: 'use_calculator',
            text: t('game.number.start.choices.use_calculator'),
            nextRoom: 'calculator'
          }
        ]
      },
      calculator: {
        id: 'calculator',
        title: t('game.number.calculator.title'),
        description: t('game.number.calculator.description'),
        backgroundImage: '/images/number/calculator.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.number.calculator.choices.go_back'),
            nextRoom: 'start'
          },
          {
            id: 'take_code',
            text: t('game.number.calculator.choices.take_code'),
            nextRoom: 'code_input',
            addToInventory: [ITEM_IDS.CODE_PAPER]
          }
        ]
      },
      code_input: {
        id: 'code_input',
        title: t('game.number.code_input.title'),
        description: t('game.number.code_input.description'),
        backgroundImage: '/images/number/code_input.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.number.code_input.choices.go_back'),
            nextRoom: 'calculator'
          },
          {
            id: 'enter_code',
            text: t('game.number.code_input.choices.enter_code'),
            nextRoom: 'escape',
            requiredItems: [ITEM_IDS.CODE_PAPER]
          }
        ]
      },
      escape: {
        id: 'escape',
        title: t('game.number.escape.title'),
        description: t('game.number.escape.description'),
        backgroundImage: '/images/number/escape.jpg',
        choices: [
          {
            id: 'goToMain',
            text: t('game.goToMain'),
            nextRoom: '/'
          }
        ]
      }
    }
  }
}

// 색상 퍼즐 데이터 생성 함수
export const getColorPuzzleData = (lang: 'ko' | 'ja' | 'en'): PuzzleData => {
  const t = (key: string) => getTranslation(lang, key)
  
  return {
    id: 'color',
    name: t('puzzles.color.name'),
    description: t('puzzles.color.description'),
    startRoom: 'beginning',
    rooms: {
      beginning: {
        id: 'beginning',
        title: t('game.color.beginning.title'),
        description: t('game.color.beginning.description'),
        backgroundImage: '/images/color/beginning.jpg',
        choices: [
          {
            id: 'collect_gems',
            text: t('game.color.beginning.choices.collect_gems'),
            nextRoom: 'gem_collection'
          }
        ]
      },
      gem_collection: {
        id: 'gem_collection',
        title: t('game.color.gem_collection.title'),
        description: t('game.color.gem_collection.description'),
        backgroundImage: '/images/color/gem_collection.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.color.gem_collection.choices.go_back'),
            nextRoom: 'beginning'
          },
          {
            id: 'arrange_colors',
            text: t('game.color.gem_collection.choices.arrange_colors'),
            nextRoom: 'color_order',
            addToInventory: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM]
          }
        ]
      },
      color_order: {
        id: 'color_order',
        title: t('game.color.color_order.title'),
        description: t('game.color.color_order.description'),
        backgroundImage: '/images/color/color_order.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.color.color_order.choices.go_back'),
            nextRoom: 'gem_collection'
          },
          {
            id: 'complete_order',
            text: t('game.color.color_order.choices.complete_order'),
            nextRoom: 'escape',
            requiredItems: [ITEM_IDS.RED_GEM, ITEM_IDS.BLUE_GEM, ITEM_IDS.GREEN_GEM, ITEM_IDS.YELLOW_GEM]
          }
        ]
      },
      escape: {
        id: 'escape',
        title: t('game.color.escape.title'),
        description: t('game.color.escape.description'),
        backgroundImage: '/images/color/escape.jpg',
        choices: [
          {
            id: 'goToMain',
            text: t('game.goToMain'),
            nextRoom: '/'
          }
        ]
      }
    }
  }
}

// 조각 퍼즐 데이터 생성 함수
export const getPiecePuzzleData = (lang: 'ko' | 'ja' | 'en'): PuzzleData => {
  const t = (key: string) => getTranslation(lang, key)
  
  return {
    id: 'piece',
    name: t('puzzles.piece.name'),
    description: t('puzzles.piece.description'),
    startRoom: 'entrance',
    rooms: {
      entrance: {
        id: 'entrance',
        title: t('game.piece.entrance.title'),
        description: t('game.piece.entrance.description'),
        backgroundImage: '/images/piece/entrance.jpg',
        choices: [
          {
            id: 'search_pieces',
            text: t('game.piece.entrance.choices.search_pieces'),
            nextRoom: 'piece_search'
          }
        ]
      },
      piece_search: {
        id: 'piece_search',
        title: t('game.piece.piece_search.title'),
        description: t('game.piece.piece_search.description'),
        backgroundImage: '/images/piece/piece_search.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.piece.piece_search.choices.go_back'),
            nextRoom: 'entrance'
          },
          {
            id: 'assemble_puzzle',
            text: t('game.piece.piece_search.choices.assemble_puzzle'),
            nextRoom: 'puzzle_assembly',
            addToInventory: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4]
          }
        ]
      },
      puzzle_assembly: {
        id: 'puzzle_assembly',
        title: t('game.piece.puzzle_assembly.title'),
        description: t('game.piece.puzzle_assembly.description'),
        backgroundImage: '/images/piece/puzzle_assembly.jpg',
        choices: [
          {
            id: 'go_back',
            text: t('game.piece.puzzle_assembly.choices.go_back'),
            nextRoom: 'piece_search'
          },
          {
            id: 'complete_puzzle',
            text: t('game.piece.puzzle_assembly.choices.complete_puzzle'),
            nextRoom: 'escape',
            requiredItems: [ITEM_IDS.PUZZLE_PIECE_1, ITEM_IDS.PUZZLE_PIECE_2, ITEM_IDS.PUZZLE_PIECE_3, ITEM_IDS.PUZZLE_PIECE_4]
          }
        ]
      },
      escape: {
        id: 'escape',
        title: t('game.piece.escape.title'),
        description: t('game.piece.escape.description'),
        backgroundImage: '/images/piece/escape.jpg',
        choices: [
          {
            id: 'goToMain',
            text: t('game.goToMain'),
            nextRoom: '/'
          }
        ]
      }
    }
  }
}

// 서재 퍼즐 데이터 생성 함수
export const getStudyPuzzleData = (lang: 'ko' | 'ja' | 'en'): PuzzleData => {
  const t = (key: string) => getTranslation(lang, key)
  
  return {
    id: 'study',
    name: t('puzzles.study.name'),
    description: t('puzzles.study.description'),
    startRoom: 'entrance',
    rooms: {
      entrance: {
        id: 'entrance',
        title: t('game.study.entrance.title'),
        description: t('game.study.entrance.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'enter_study',
            text: t('game.study.entrance.choices.enter_study'),
            nextRoom: 'study_room'
          }
        ]
      },
      study_room: {
        id: 'study_room',
        title: t('game.study.study_room.title'),
        description: t('game.study.study_room.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'explore_bookshelf',
            text: t('game.study.study_room.choices.explore_bookshelf'),
            nextRoom: 'bookshelf_detail'
          },
          {
            id: 'explore_desk',
            text: t('game.study.study_room.choices.explore_desk'),
            nextRoom: 'desk_detail'
          },
          {
            id: 'look_window',
            text: t('game.study.study_room.choices.look_window'),
            nextRoom: 'window_view'
          },
          {
            id: 'explore_fireplace',
            text: t('game.study.study_room.choices.explore_fireplace'),
            nextRoom: 'fireplace_detail'
          },
          {
            id: 'inspect_door_to_corridor',
            text: t('game.study.study_room.choices.inspect_door_to_corridor'),
            nextRoom: 'corridor_entrance'
          }
        ]
      },
      bookshelf_detail: {
        id: 'bookshelf_detail',
        title: t('game.study.bookshelf_detail.title'),
        description: t('game.study.bookshelf_detail.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'pull_dusty_book',
            text: t('game.study.bookshelf_detail.choices.pull_dusty_book'),
            nextRoom: 'bookshelf_detail',
            addToInventory: [ITEM_IDS.DUSTY_BOOK]
          },
          {
            id: 'push_protruding_book',
            text: t('game.study.bookshelf_detail.choices.push_protruding_book'),
            nextRoom: 'secret_compartment_bookshelf'
          },
          {
            id: 'back_to_study',
            text: t('game.study.bookshelf_detail.choices.back_to_study'),
            nextRoom: 'study_room'
          }
        ]
      },
      secret_compartment_bookshelf: {
        id: 'secret_compartment_bookshelf',
        title: t('game.study.secret_compartment_bookshelf.title'),
        description: t('game.study.secret_compartment_bookshelf.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1510511459019-5da7094ed22f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_faded_photograph',
            text: t('game.study.secret_compartment_bookshelf.choices.get_faded_photograph'),
            nextRoom: 'secret_compartment_bookshelf',
            addToInventory: [ITEM_IDS.FADED_PHOTOGRAPH]
          },
          {
            id: 'back_to_bookshelf',
            text: t('game.study.secret_compartment_bookshelf.choices.back_to_bookshelf'),
            nextRoom: 'bookshelf_detail'
          }
        ]
      },
      desk_detail: {
        id: 'desk_detail',
        title: t('game.study.desk_detail.title'),
        description: t('game.study.desk_detail.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1563221949-a681335b2e9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'examine_locked_drawer',
            text: t('game.study.desk_detail.choices.examine_locked_drawer'),
            nextRoom: 'drawer_open_diary',
            requiredItems: [ITEM_IDS.STUDY_KEY]
          },
          {
            id: 'get_map_piece_a',
            text: t('game.study.desk_detail.choices.get_map_piece_a'),
            nextRoom: 'desk_detail',
            addToInventory: [ITEM_IDS.TORN_MAP_PIECE_A]
          },
          {
            id: 'back_to_study',
            text: t('game.study.desk_detail.choices.back_to_study'),
            nextRoom: 'study_room'
          }
        ]
      },
      drawer_open_diary: {
        id: 'drawer_open_diary',
        title: t('game.study.drawer_open_diary.title'),
        description: t('game.study.drawer_open_diary.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1549419194-d4b99824ae4d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'take_old_diary',
            text: t('game.study.drawer_open_diary.choices.take_old_diary'),
            nextRoom: 'drawer_open_diary',
            addToInventory: [ITEM_IDS.OLD_DIARY]
          },
          {
            id: 'back_to_desk_from_open',
            text: t('game.study.drawer_open_diary.choices.back_to_desk_from_open'),
            nextRoom: 'desk_detail'
          }
        ]
      },
      window_view: {
        id: 'window_view',
        title: t('game.study.window_view.title'),
        description: t('game.study.window_view.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'use_gardening_shears_on_vines',
            text: t('game.study.window_view.choices.use_gardening_shears_on_vines'),
            nextRoom: 'window_vines_cleared',
            requiredItems: [ITEM_IDS.GARDENING_SHEARS]
          },
          {
            id: 'back_to_study',
            text: t('game.study.window_view.choices.back_to_study'),
            nextRoom: 'study_room'
          }
        ]
      },
      window_vines_cleared: {
        id: 'window_vines_cleared',
        title: t('game.study.window_vines_cleared.title'),
        description: t('game.study.window_vines_cleared.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_corridor_key',
            text: t('game.study.window_vines_cleared.choices.get_corridor_key'),
            nextRoom: 'window_vines_cleared',
            addToInventory: [ITEM_IDS.CORRIDOR_KEY]
          },
          {
            id: 'back_to_window_from_cleared',
            text: t('game.study.window_vines_cleared.choices.back_to_window_from_cleared'),
            nextRoom: 'window_view'
          }
        ]
      },
      fireplace_detail: {
        id: 'fireplace_detail',
        title: t('game.study.fireplace_detail.title'),
        description: t('game.study.fireplace_detail.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1550212379-317f25979803?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'reach_into_fireplace',
            text: t('game.study.fireplace_detail.choices.reach_into_fireplace'),
            nextRoom: 'fireplace_detail',
            addToInventory: [ITEM_IDS.STUDY_KEY]
          },
          {
            id: 'back_to_study',
            text: t('game.study.fireplace_detail.choices.back_to_study'),
            nextRoom: 'study_room'
          }
        ]
      },
      corridor_entrance: {
        id: 'corridor_entrance',
        title: t('game.study.corridor_entrance.title'),
        description: t('game.study.corridor_entrance.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1594877717466-fdc94bb2e811?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'try_to_open_main_door',
            text: t('game.study.corridor_entrance.choices.try_to_open_main_door'),
            nextRoom: 'dark_corridor',
            requiredItems: [ITEM_IDS.STUDY_KEY]
          },
          {
            id: 'back_to_study_from_door',
            text: t('game.study.corridor_entrance.choices.back_to_study_from_door'),
            nextRoom: 'study_room'
          }
        ]
      },
      dark_corridor: {
        id: 'dark_corridor',
        title: t('game.study.dark_corridor.title'),
        description: t('game.study.dark_corridor.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1563221949-a681335b2e9e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'examine_end_door',
            text: t('game.study.dark_corridor.choices.examine_end_door'),
            nextRoom: 'reception_room_entrance'
          },
          {
            id: 'examine_wooden_box',
            text: t('game.study.dark_corridor.choices.examine_wooden_box'),
            nextRoom: 'corridor_box'
          },
          {
            id: 'examine_garden_door',
            text: t('game.study.dark_corridor.choices.examine_garden_door'),
            nextRoom: 'garden_path',
            requiredItems: [ITEM_IDS.CORRIDOR_KEY]
          },
          {
            id: 'back_to_study_from_corridor',
            text: t('game.study.dark_corridor.choices.back_to_study_from_corridor'),
            nextRoom: 'study_room'
          }
        ]
      },
      corridor_box: {
        id: 'corridor_box',
        title: t('game.study.corridor_box.title'),
        description: t('game.study.corridor_box.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'input_code_corridor_box',
            text: t('game.study.corridor_box.choices.input_code_corridor_box'),
            nextRoom: 'corridor_box_open'
          },
          {
            id: 'back_to_corridor_from_box',
            text: t('game.study.corridor_box.choices.back_to_corridor_from_box'),
            nextRoom: 'dark_corridor'
          }
        ]
      },
      corridor_box_open: {
        id: 'corridor_box_open',
        title: t('game.study.corridor_box_open.title'),
        description: t('game.study.corridor_box_open.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1507842217343-583fd70fd153?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_empty_bottle',
            text: t('game.study.corridor_box_open.choices.get_empty_bottle'),
            nextRoom: 'corridor_box_open',
            addToInventory: [ITEM_IDS.EMPTY_BOTTLE]
          },
          {
            id: 'back_to_corridor_from_box_open',
            text: t('game.study.corridor_box_open.choices.back_to_corridor_from_box_open'),
            nextRoom: 'dark_corridor'
          }
        ]
      },
      reception_room_entrance: {
        id: 'reception_room_entrance',
        title: t('game.study.reception_room_entrance.title'),
        description: t('game.study.reception_room_entrance.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1565313936353-ed11df68157e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'examine_fireplace_reception',
            text: t('game.study.reception_room_entrance.choices.examine_fireplace_reception'),
            nextRoom: 'reception_fireplace_detail'
          },
          {
            id: 'open_small_door',
            text: t('game.study.reception_room_entrance.choices.open_small_door'),
            nextRoom: 'pantry_room'
          },
          {
            id: 'open_curtains',
            text: t('game.study.reception_room_entrance.choices.open_curtains'),
            nextRoom: 'reception_window'
          },
          {
            id: 'back_to_corridor_from_reception',
            text: t('game.study.reception_room_entrance.choices.back_to_corridor_from_reception'),
            nextRoom: 'dark_corridor'
          }
        ]
      },
      reception_fireplace_detail: {
        id: 'reception_fireplace_detail',
        title: t('game.study.reception_fireplace_detail.title'),
        description: t('game.study.reception_fireplace_detail.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1550212379-317f25979803?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_gardening_shears',
            text: t('game.study.reception_fireplace_detail.choices.get_gardening_shears'),
            nextRoom: 'reception_fireplace_detail',
            addToInventory: [ITEM_IDS.GARDENING_SHEARS]
          },
          {
            id: 'back_to_reception',
            text: t('game.study.reception_fireplace_detail.choices.back_to_reception'),
            nextRoom: 'reception_room_entrance'
          }
        ]
      },
      reception_window: {
        id: 'reception_window',
        title: t('game.study.reception_window.title'),
        description: t('game.study.reception_window.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'investigate_stone_wall',
            text: t('game.study.reception_window.choices.investigate_stone_wall'),
            nextRoom: 'stone_wall_detail'
          },
          {
            id: 'back_to_reception_from_window',
            text: t('game.study.reception_window.choices.back_to_reception_from_window'),
            nextRoom: 'reception_room_entrance'
          }
        ]
      },
      stone_wall_detail: {
        id: 'stone_wall_detail',
        title: t('game.study.stone_wall_detail.title'),
        description: t('game.study.stone_wall_detail.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_stained_glass_shard',
            text: t('game.study.stone_wall_detail.choices.get_stained_glass_shard'),
            nextRoom: 'stone_wall_detail',
            addToInventory: [ITEM_IDS.STAINED_GLASS_SHARD]
          },
          {
            id: 'back_to_reception_window',
            text: t('game.study.stone_wall_detail.choices.back_to_reception_window'),
            nextRoom: 'reception_window'
          }
        ]
      },
      pantry_room: {
        id: 'pantry_room',
        title: t('game.study.pantry_room.title'),
        description: t('game.study.pantry_room.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1587588358485-783b9f3900b9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'search_map_spot',
            text: t('game.study.pantry_room.choices.search_map_spot'),
            nextRoom: 'pantry_room',
            addToInventory: [ITEM_IDS.TORN_MAP_PIECE_B]
          },
          {
            id: 'back_to_reception_from_pantry',
            text: t('game.study.pantry_room.choices.back_to_reception_from_pantry'),
            nextRoom: 'reception_room_entrance'
          }
        ]
      },
      garden_path: {
        id: 'garden_path',
        title: t('game.study.garden_path.title'),
        description: t('game.study.garden_path.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1534063228945-8ed1b11b7d5a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'go_to_shed',
            text: t('game.study.garden_path.choices.go_to_shed'),
            nextRoom: 'garden_shed_entrance'
          },
          {
            id: 'examine_well',
            text: t('game.study.garden_path.choices.examine_well'),
            nextRoom: 'dry_well'
          },
          {
            id: 'back_to_corridor_from_garden',
            text: t('game.study.garden_path.choices.back_to_corridor_from_garden'),
            nextRoom: 'dark_corridor'
          }
        ]
      },
      dry_well: {
        id: 'dry_well',
        title: t('game.study.dry_well.title'),
        description: t('game.study.dry_well.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1629858273618-97c41eb4e5ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'use_empty_bottle_on_bar',
            text: t('game.study.dry_well.choices.use_empty_bottle_on_bar'),
            nextRoom: 'well_clue_revealed',
            requiredItems: [ITEM_IDS.EMPTY_BOTTLE]
          },
          {
            id: 'back_to_garden_from_well',
            text: t('game.study.dry_well.choices.back_to_garden_from_well'),
            nextRoom: 'garden_path'
          }
        ]
      },
      well_clue_revealed: {
        id: 'well_clue_revealed',
        title: t('game.study.well_clue_revealed.title'),
        description: t('game.study.well_clue_revealed.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1629858273618-97c41eb4e5ce?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'get_torn_map_piece_b_well',
            text: t('game.study.well_clue_revealed.choices.get_torn_map_piece_b_well'),
            nextRoom: 'well_clue_revealed',
            addToInventory: [ITEM_IDS.TORN_MAP_PIECE_B]
          },
          {
            id: 'back_to_well_from_clue',
            text: t('game.study.well_clue_revealed.choices.back_to_well_from_clue'),
            nextRoom: 'dry_well'
          }
        ]
      },
      garden_shed_entrance: {
        id: 'garden_shed_entrance',
        title: t('game.study.garden_shed_entrance.title'),
        description: t('game.study.garden_shed_entrance.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'insert_map_pieces',
            text: t('game.study.garden_shed_entrance.choices.insert_map_pieces'),
            nextRoom: 'shed_open',
            requiredItems: [ITEM_IDS.TORN_MAP_PIECE_A, ITEM_IDS.TORN_MAP_PIECE_B]
          },
          {
            id: 'back_to_garden_from_shed',
            text: t('game.study.garden_shed_entrance.choices.back_to_garden_from_shed'),
            nextRoom: 'garden_path'
          }
        ]
      },
      shed_open: {
        id: 'shed_open',
        title: t('game.study.shed_open.title'),
        description: t('game.study.shed_open.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1596495578051-a92c81a5c68f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'enter_light',
            text: t('game.study.shed_open.choices.enter_light'),
            nextRoom: 'escape'
          },
          {
            id: 'back_to_shed_from_open',
            text: t('game.study.shed_open.choices.back_to_shed_from_open'),
            nextRoom: 'garden_shed_entrance'
          }
        ]
      },
      escape: {
        id: 'escape',
        title: t('game.study.escape.title'),
        description: t('game.study.escape.description'),
        backgroundImage: 'https://images.unsplash.com/photo-1517726488737-f076b668f447?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        choices: [
          {
            id: 'goToMain',
            text: t('game.goToMain'),
            nextRoom: '/'
          }
        ]
      }
    }
  }
}

// 모든 퍼즐 데이터
export const allPuzzleData: Record<string, PuzzleData> = {
  key: getKeyPuzzleData('ko'), // 기본값으로 한국어 사용
  number: getNumberPuzzleData('ko'), // 기본값으로 한국어 사용
  color: getColorPuzzleData('ko'), // 기본값으로 한국어 사용
  piece: getPiecePuzzleData('ko'), // 기본값으로 한국어 사용
  study: getStudyPuzzleData('ko') // 기본값으로 한국어 사용
}

// 퍼즐별 방 데이터 가져오기
export function getPuzzleRoom(puzzleId: string, roomId: string, lang: 'ko' | 'ja' | 'en' = 'ko'): PuzzleRoom | null {
  if (puzzleId === 'key') {
    const puzzleData = getKeyPuzzleData(lang)
    const room = puzzleData.rooms[roomId] || null
    return room
  }
  
  if (puzzleId === 'number') {
    const puzzleData = getNumberPuzzleData(lang)
    const room = puzzleData.rooms[roomId] || null
    return room
  }
  
  if (puzzleId === 'color') {
    const puzzleData = getColorPuzzleData(lang)
    const room = puzzleData.rooms[roomId] || null
    return room
  }

  if (puzzleId === 'piece') {
    const puzzleData = getPiecePuzzleData(lang)
    const room = puzzleData.rooms[roomId] || null
    return room
  }

  if (puzzleId === 'study') {
    const puzzleData = getStudyPuzzleData(lang)
    const room = puzzleData.rooms[roomId] || null
    return room
  }

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