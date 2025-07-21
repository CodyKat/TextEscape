export interface Room {
  id: string
  title: string
  description: string
  backgroundImage: string
  choices: Choice[]
  requiredItems?: string[]
  isLocked?: boolean
}

export interface Choice {
  id: string
  text: string
  nextRoom: string
  requiredItems?: string[]
  addToInventory?: string[]
  removeFromInventory?: string[]
  condition?: (inventory: string[]) => boolean
}

export interface Item {
  id: string
  name: string
  description: string
  image?: string
}

export const GAME_ROOMS: Record<string, Room> = {
  // 퍼즐 선택 화면
  puzzle_select: {
    id: 'puzzle_select',
    title: '퍼즐 선택',
    description: '플레이할 퍼즐을 선택하세요. 각 퍼즐은 서로 다른 스토리와 도전을 제공합니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'puzzle_1',
        text: '🔑 열쇠 퍼즐',
        nextRoom: 'entrance',
      },
      {
        id: 'puzzle_2',
        text: '🔢 숫자 퍼즐',
        nextRoom: 'number_puzzle_entrance',
      },
      {
        id: 'puzzle_3',
        text: '🎨 색상 퍼즐',
        nextRoom: 'color_puzzle_entrance',
      },
      {
        id: 'puzzle_4',
        text: '🧩 조각 퍼즐',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  // 퍼즐 1: 열쇠 퍼즐
  entrance: {
    id: 'entrance',
    title: '어두운 방',
    description: '당신은 어두운 방에 갇혀있습니다. 앞쪽에는 낡은 문이 있고, 오른쪽에는 책장이 있습니다. 왼쪽에는 이상한 기계가 놓여있습니다. 구석에는 상자가 보입니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'door',
        text: '문을 조사한다',
        nextRoom: 'door',
      },
      {
        id: 'bookshelf',
        text: '책장을 조사한다',
        nextRoom: 'bookshelf',
      },
      {
        id: 'machine',
        text: '기계를 조사한다',
        nextRoom: 'machine',
      },
      {
        id: 'box',
        text: '상자를 조사한다',
        nextRoom: 'box',
      },
    ],
  },
  
  door: {
    id: 'door',
    title: '낡은 문',
    description: '문은 잠겨있습니다. 열쇠가 필요한 것 같습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_key',
        text: '열쇠를 사용한다',
        nextRoom: 'escape',
        requiredItems: ['key'],
        removeFromInventory: ['key'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
    isLocked: true,
  },
  
  bookshelf: {
    id: 'bookshelf',
    title: '책장',
    description: '책장에는 여러 책들이 꽂혀있습니다. 그 중 하나가 이상하게 보입니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'examine_books',
        text: '책들을 자세히 살펴본다',
        nextRoom: 'bookshelf_detail',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },
  
  bookshelf_detail: {
    id: 'bookshelf_detail',
    title: '이상한 책',
    description: '책장에서 이상한 책을 발견했습니다. 책 안에서 열쇠와 숫자가 적힌 쪽지가 나왔습니다! 책장 뒤쪽에서도 이상한 소리가 들립니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_key',
        text: '열쇠를 가져간다',
        nextRoom: 'entrance',
        addToInventory: ['key'],
      },
      {
        id: 'take_number',
        text: '숫자 쪽지를 가져간다',
        nextRoom: 'entrance',
        addToInventory: ['book_number'],
      },
      {
        id: 'check_back',
        text: '책장 뒤를 확인한다',
        nextRoom: 'secret_passage',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },
  
  escape: {
    id: 'escape',
    title: '🎉 탈출 성공! 🎉',
    description: '축하합니다! 당신은 모든 퍼즐을 해결하고 방에서 성공적으로 탈출했습니다! 당신의 탐험 정신과 문제 해결 능력이 빛났습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 다시 시작하기',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine: {
    id: 'machine',
    title: '이상한 기계',
    description: '복잡한 기계가 있습니다. 화면에는 "비밀번호를 입력하세요"라고 표시되어 있습니다. 4자리 숫자를 입력해야 할 것 같습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'input_password',
        text: '비밀번호를 입력한다',
        nextRoom: 'machine_password',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box: {
    id: 'box',
    title: '상자',
    description: '낡은 상자가 있습니다. 안에서 무엇인가 빛나는 것이 보입니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_box',
        text: '상자를 연다',
        nextRoom: 'box_open',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box_open: {
    id: 'box_open',
    title: '열린 상자',
    description: '상자 안에서 손전등을 발견했습니다!',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_flashlight',
        text: '손전등을 가져간다',
        nextRoom: 'entrance',
        addToInventory: ['flashlight'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },

  // 퍼즐 2: 숫자 퍼즐
  number_puzzle_entrance: {
    id: 'number_puzzle_entrance',
    title: '숫자 퍼즐 방',
    description: '이 방에는 여러 개의 숫자 패드가 있습니다. 각 패드는 서로 다른 규칙을 가지고 있는 것 같습니다. 정답을 찾아 탈출하세요!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'pad_1',
        text: '첫 번째 패드 (1-9)',
        nextRoom: 'number_pad_1',
      },
      {
        id: 'pad_2',
        text: '두 번째 패드 (색상 규칙)',
        nextRoom: 'number_pad_2',
      },
      {
        id: 'pad_3',
        text: '세 번째 패드 (순서 규칙)',
        nextRoom: 'number_pad_3',
      },
    ],
  },

  number_pad_1: {
    id: 'number_pad_1',
    title: '숫자 패드 1',
    description: '1부터 9까지의 숫자가 있습니다. 힌트: "가장 큰 홀수와 가장 작은 짝수의 합"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_1',
        text: '정답: 9 (9+0=9)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_2',
        text: '정답: 10 (9+1=10)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_3',
        text: '정답: 11 (9+2=11)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_1_success: {
    id: 'number_pad_1_success',
    title: '첫 번째 패드 성공!',
    description: '정답입니다! 첫 번째 코드를 획득했습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '계속하기',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2: {
    id: 'number_pad_2',
    title: '숫자 패드 2',
    description: '색상이 있는 숫자들이 있습니다. 힌트: "빨간색 숫자들의 합"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_red_1',
        text: '정답: 15 (빨간색: 3,5,7)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'answer_red_2',
        text: '정답: 12 (빨간색: 2,4,6)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2_success: {
    id: 'number_pad_2_success',
    title: '두 번째 패드 성공!',
    description: '정답입니다! 두 번째 코드를 획득했습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '계속하기',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3: {
    id: 'number_pad_3',
    title: '숫자 패드 3',
    description: '순서가 중요한 숫자들이 있습니다. 힌트: "오름차순으로 정렬된 숫자들의 마지막 숫자"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_order_1',
        text: '정답: 9 (1,3,5,7,9)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'answer_order_2',
        text: '정답: 8 (2,4,6,8)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3_success: {
    id: 'number_pad_3_success',
    title: '세 번째 패드 성공!',
    description: '정답입니다! 세 번째 코드를 획득했습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '계속하기',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_final: {
    id: 'number_puzzle_final',
    title: '최종 숫자 퍼즐',
    description: '모든 코드를 획득했습니다! 이제 최종 비밀번호를 입력하세요. 힌트: "각 코드의 첫 번째 숫자를 더하세요"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'final_answer_1',
        text: '정답: 6 (1+2+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'final_answer_2',
        text: '정답: 9 (3+3+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_escape: {
    id: 'number_puzzle_escape',
    title: '🎉 숫자 퍼즐 완료! 🎉',
    description: '축하합니다! 모든 숫자 퍼즐을 해결했습니다! 당신의 수학적 사고력이 빛났습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 다시 시작하기',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 3: 색상 퍼즐
  color_puzzle_entrance: {
    id: 'color_puzzle_entrance',
    title: '색상 퍼즐 방',
    description: '이 방에는 여러 개의 색상 버튼이 있습니다. 각 버튼은 특정 순서로 눌러야 합니다. 색상의 비밀을 풀어보세요!',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'color_sequence_1',
        text: '첫 번째 색상 순서',
        nextRoom: 'color_sequence_1',
      },
      {
        id: 'color_sequence_2',
        text: '두 번째 색상 순서',
        nextRoom: 'color_sequence_2',
      },
      {
        id: 'color_final',
        text: '최종 색상 퍼즐',
        nextRoom: 'color_final',
      },
    ],
  },

  color_sequence_1: {
    id: 'color_sequence_1',
    title: '색상 순서 1',
    description: '빨강, 파랑, 노랑 순서로 버튼을 눌러보세요.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'red_blue_yellow',
        text: '빨강 → 파랑 → 노랑',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'blue_red_yellow',
        text: '파랑 → 빨강 → 노랑',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_1_success: {
    id: 'color_sequence_1_success',
    title: '첫 번째 색상 성공!',
    description: '정확한 순서입니다! 첫 번째 색상 코드를 획득했습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '계속하기',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2: {
    id: 'color_sequence_2',
    title: '색상 순서 2',
    description: '초록, 보라, 주황 순서로 버튼을 눌러보세요.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'green_purple_orange',
        text: '초록 → 보라 → 주황',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'purple_green_orange',
        text: '보라 → 초록 → 주황',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2_success: {
    id: 'color_sequence_2_success',
    title: '두 번째 색상 성공!',
    description: '정확한 순서입니다! 두 번째 색상 코드를 획득했습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '계속하기',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_final: {
    id: 'color_final',
    title: '최종 색상 퍼즐',
    description: '모든 색상 코드를 획득했습니다! 이제 최종 색상 조합을 맞춰보세요. 힌트: "무지개 순서"',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'rainbow_order',
        text: '빨강 → 주황 → 노랑 → 초록 → 파랑 → 보라',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'reverse_rainbow',
        text: '보라 → 파랑 → 초록 → 노랑 → 주황 → 빨강',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_puzzle_escape: {
    id: 'color_puzzle_escape',
    title: '🎉 색상 퍼즐 완료! 🎉',
    description: '축하합니다! 모든 색상 퍼즐을 해결했습니다! 당신의 색상 감각이 빛났습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 다시 시작하기',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 4: 조각 퍼즐
  piece_puzzle_entrance: {
    id: 'piece_puzzle_entrance',
    title: '조각 퍼즐 방',
    description: '이 방에는 여러 개의 퍼즐 조각들이 흩어져 있습니다. 조각들을 올바른 순서로 맞춰보세요!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'piece_1',
        text: '첫 번째 조각 찾기',
        nextRoom: 'piece_1',
      },
      {
        id: 'piece_2',
        text: '두 번째 조각 찾기',
        nextRoom: 'piece_2',
      },
      {
        id: 'piece_3',
        text: '세 번째 조각 찾기',
        nextRoom: 'piece_3',
      },
      {
        id: 'piece_final',
        text: '퍼즐 완성하기',
        nextRoom: 'piece_final',
      },
    ],
  },

  piece_1: {
    id: 'piece_1',
    title: '첫 번째 조각',
    description: '책장 뒤에서 첫 번째 퍼즐 조각을 발견했습니다!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_1',
        text: '조각을 가져간다',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_1'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_2: {
    id: 'piece_2',
    title: '두 번째 조각',
    description: '상자 안에서 두 번째 퍼즐 조각을 발견했습니다!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_2',
        text: '조각을 가져간다',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_2'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_3: {
    id: 'piece_3',
    title: '세 번째 조각',
    description: '기계 뒤에서 세 번째 퍼즐 조각을 발견했습니다!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_3',
        text: '조각을 가져간다',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_3'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_final: {
    id: 'piece_final',
    title: '퍼즐 완성',
    description: '모든 조각을 획득했습니다! 이제 퍼즐을 완성해보세요. 힌트: "조각들을 시계 방향으로 배치하세요"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'complete_puzzle',
        text: '퍼즐 완성하기',
        nextRoom: 'piece_puzzle_escape',
        requiredItems: ['puzzle_piece_1', 'puzzle_piece_2', 'puzzle_piece_3'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_puzzle_escape: {
    id: 'piece_puzzle_escape',
    title: '🎉 조각 퍼즐 완료! 🎉',
    description: '축하합니다! 모든 조각 퍼즐을 해결했습니다! 당신의 공간 지각력이 빛났습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 다시 시작하기',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine_password: {
    id: 'machine_password',
    title: '비밀번호 입력',
    description: '기계의 키패드가 활성화되었습니다. 힌트: "책장에서 찾을 수 있는 숫자"',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'try_1234',
        text: '1234를 입력한다',
        nextRoom: 'machine',
      },
      {
        id: 'try_5678',
        text: '5678를 입력한다',
        nextRoom: 'machine',
      },
      {
        id: 'try_2024',
        text: '2024를 입력한다',
        nextRoom: 'machine_success',
        requiredItems: ['book_number'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'machine',
      },
    ],
  },
  
  machine_success: {
    id: 'machine_success',
    title: '기계 해제!',
    description: '비밀번호가 맞았습니다! 기계에서 열쇠가 나왔습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_machine_key',
        text: '열쇠를 가져간다',
        nextRoom: 'entrance',
        addToInventory: ['machine_key'],
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'entrance',
      },
    ],
  },
  
  secret_passage: {
    id: 'secret_passage',
    title: '비밀 통로',
    description: '책장 뒤에서 비밀 통로를 발견했습니다! 하지만 어두워서 앞이 보이지 않습니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_flashlight',
        text: '손전등을 사용한다',
        nextRoom: 'passage_lit',
        requiredItems: ['flashlight'],
      },
      {
        id: 'go_dark',
        text: '어둠 속으로 들어간다',
        nextRoom: 'passage_dark',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'bookshelf_detail',
      },
    ],
  },
  
  passage_lit: {
    id: 'passage_lit',
    title: '밝혀진 통로',
    description: '손전등으로 통로가 밝혀졌습니다. 벽에 이상한 문이 보입니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_secret_door',
        text: '비밀 문을 연다',
        nextRoom: 'escape',
      },
      {
        id: 'back',
        text: '돌아간다',
        nextRoom: 'secret_passage',
      },
    ],
  },
  
  passage_dark: {
    id: 'passage_dark',
    title: '어둠 속',
    description: '어둠 속에서 무엇인가에 걸려 넘어졌습니다. 다시 시작해야 합니다.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart_from_dark',
        text: '다시 시작하기',
        nextRoom: 'entrance',
      },
    ],
  },
}

export const GAME_ITEMS: Record<string, Item> = {
  key: {
    id: 'key',
    name: '낡은 열쇠',
    description: '문을 열 수 있을 것 같은 낡은 열쇠입니다.',
  },
  machine_key: {
    id: 'machine_key',
    name: '기계 열쇠',
    description: '기계에서 나온 특별한 열쇠입니다.',
  },
  book_number: {
    id: 'book_number',
    name: '숫자 쪽지',
    description: '책에서 나온 쪽지에 "2024"라고 적혀있습니다.',
  },
  flashlight: {
    id: 'flashlight',
    name: '손전등',
    description: '어두운 곳을 밝혀줄 수 있는 손전등입니다.',
  },
}

export const getRoom = (roomId: string): Room | null => {
  return GAME_ROOMS[roomId] || null
}

export const getItem = (itemId: string): Item | null => {
  return GAME_ITEMS[itemId] || null
} 