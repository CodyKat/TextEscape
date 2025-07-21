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
    title: 'Puzzle Selection',
    description: 'Choose a puzzle to play. Each puzzle offers different stories and challenges.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'puzzle_1',
        text: '🔑 Key Puzzle',
        nextRoom: 'entrance',
      },
      {
        id: 'puzzle_2',
        text: '🔢 Number Puzzle',
        nextRoom: 'number_puzzle_entrance',
      },
      {
        id: 'puzzle_3',
        text: '🎨 Color Puzzle',
        nextRoom: 'color_puzzle_entrance',
      },
      {
        id: 'puzzle_4',
        text: '🧩 Piece Puzzle',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  // 퍼즐 1: 열쇠 퍼즐
  entrance: {
    id: 'entrance',
    title: 'Dark Room',
    description: 'You are trapped in a dark room. There is an old door in front, a bookshelf on the right, and a strange machine on the left. A box can be seen in the corner.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'door',
        text: 'Examine the door',
        nextRoom: 'door',
      },
      {
        id: 'bookshelf',
        text: 'Examine the bookshelf',
        nextRoom: 'bookshelf',
      },
      {
        id: 'machine',
        text: 'Examine the machine',
        nextRoom: 'machine',
      },
      {
        id: 'box',
        text: 'Examine the box',
        nextRoom: 'box',
      },
    ],
  },
  
  door: {
    id: 'door',
    title: 'Old Door',
    description: 'The door is locked. It seems to need a key.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_key',
        text: 'Use the key',
        nextRoom: 'escape',
        requiredItems: ['key'],
        removeFromInventory: ['key'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
    isLocked: true,
  },
  
  bookshelf: {
    id: 'bookshelf',
    title: 'Bookshelf',
    description: 'There are several books on the bookshelf. One of them looks strange.',
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'examine_books',
        text: 'Examine the books carefully',
        nextRoom: 'bookshelf_detail',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },
  
  bookshelf_detail: {
    id: 'bookshelf_detail',
    title: 'Strange Book',
    description: 'You found a strange book on the bookshelf. A key and a note with numbers came out of the book! You also hear strange sounds from behind the bookshelf.',
    backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_key',
        text: 'Take the key',
        nextRoom: 'entrance',
        addToInventory: ['key'],
      },
      {
        id: 'take_number',
        text: 'Take the number note',
        nextRoom: 'entrance',
        addToInventory: ['book_number'],
      },
      {
        id: 'check_back',
        text: 'Check behind the bookshelf',
        nextRoom: 'secret_passage',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },
  
  escape: {
    id: 'escape',
    title: '🎉 Escape Success! 🎉',
    description: 'Congratulations! You have solved all the puzzles and successfully escaped from the room! Your spirit of exploration and problem-solving skills have shone.',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 Start Over',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine: {
    id: 'machine',
    title: 'Strange Machine',
    description: 'There is a complex machine. The screen displays "Enter password". It seems you need to enter a 4-digit number.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'input_password',
        text: 'Enter password',
        nextRoom: 'machine_password',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box: {
    id: 'box',
    title: 'Box',
    description: 'There is an old box. Something glowing can be seen inside.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_box',
        text: 'Open the box',
        nextRoom: 'box_open',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box_open: {
    id: 'box_open',
    title: 'Opened Box',
    description: 'You found a flashlight inside the box!',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_flashlight',
        text: 'Take the flashlight',
        nextRoom: 'entrance',
        addToInventory: ['flashlight'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },

  // 퍼즐 2: 숫자 퍼즐
  number_puzzle_entrance: {
    id: 'number_puzzle_entrance',
    title: 'Number Puzzle Room',
    description: 'This room has several number pads. Each pad seems to have different rules. Find the answer and escape!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'pad_1',
        text: 'First pad (1-9)',
        nextRoom: 'number_pad_1',
      },
      {
        id: 'pad_2',
        text: 'Second pad (color rules)',
        nextRoom: 'number_pad_2',
      },
      {
        id: 'pad_3',
        text: 'Third pad (order rules)',
        nextRoom: 'number_pad_3',
      },
    ],
  },

  number_pad_1: {
    id: 'number_pad_1',
    title: 'Number Pad 1',
    description: 'There are numbers from 1 to 9. Hint: "Sum of the largest odd number and smallest even number"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_1',
        text: 'Answer: 9 (9+0=9)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_2',
        text: 'Answer: 10 (9+1=10)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_3',
        text: 'Answer: 11 (9+2=11)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_1_success: {
    id: 'number_pad_1_success',
    title: 'First Pad Success!',
    description: 'Correct! You have obtained the first code.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2: {
    id: 'number_pad_2',
    title: 'Number Pad 2',
    description: 'There are colored numbers. Hint: "Sum of red numbers"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_red_1',
        text: 'Answer: 15 (Red: 3,5,7)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'answer_red_2',
        text: 'Answer: 12 (Red: 2,4,6)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2_success: {
    id: 'number_pad_2_success',
    title: 'Second Pad Success!',
    description: 'Correct! You have obtained the second code.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3: {
    id: 'number_pad_3',
    title: 'Number Pad 3',
    description: 'There are numbers where order is important. Hint: "Last number of ascending sorted numbers"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_order_1',
        text: 'Answer: 9 (1,3,5,7,9)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'answer_order_2',
        text: 'Answer: 8 (2,4,6,8)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3_success: {
    id: 'number_pad_3_success',
    title: 'Third Pad Success!',
    description: 'Correct! You have obtained the third code.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_final: {
    id: 'number_puzzle_final',
    title: 'Final Number Puzzle',
    description: 'You have obtained all codes! Now enter the final password. Hint: "Add the first digit of each code"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'final_answer_1',
        text: 'Answer: 6 (1+2+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'final_answer_2',
        text: 'Answer: 9 (3+3+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_escape: {
    id: 'number_puzzle_escape',
    title: '🎉 Number Puzzle Complete! 🎉',
    description: 'Congratulations! You have solved all number puzzles! Your mathematical thinking has shone.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 Start Over',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 3: 색상 퍼즐
  color_puzzle_entrance: {
    id: 'color_puzzle_entrance',
    title: 'Color Puzzle Room',
    description: 'This room has several color buttons. Each button must be pressed in a specific order. Solve the secret of colors!',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'color_sequence_1',
        text: 'First color sequence',
        nextRoom: 'color_sequence_1',
      },
      {
        id: 'color_sequence_2',
        text: 'Second color sequence',
        nextRoom: 'color_sequence_2',
      },
      {
        id: 'color_final',
        text: 'Final color puzzle',
        nextRoom: 'color_final',
      },
    ],
  },

  color_sequence_1: {
    id: 'color_sequence_1',
    title: 'Color Sequence 1',
    description: 'Press the buttons in red, blue, yellow order.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'red_blue_yellow',
        text: 'Red → Blue → Yellow',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'blue_red_yellow',
        text: 'Blue → Red → Yellow',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_1_success: {
    id: 'color_sequence_1_success',
    title: 'First Color Success!',
    description: 'Correct order! You have obtained the first color code.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2: {
    id: 'color_sequence_2',
    title: 'Color Sequence 2',
    description: 'Press the buttons in green, purple, orange order.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'green_purple_orange',
        text: 'Green → Purple → Orange',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'purple_green_orange',
        text: 'Purple → Green → Orange',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2_success: {
    id: 'color_sequence_2_success',
    title: 'Second Color Success!',
    description: 'Correct order! You have obtained the second color code.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_final: {
    id: 'color_final',
    title: 'Final Color Puzzle',
    description: 'You have obtained all color codes! Now match the final color combination. Hint: "Rainbow order"',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'rainbow_order',
        text: 'Red → Orange → Yellow → Green → Blue → Purple',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'reverse_rainbow',
        text: 'Purple → Blue → Green → Yellow → Orange → Red',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_puzzle_escape: {
    id: 'color_puzzle_escape',
    title: '🎉 Color Puzzle Complete! 🎉',
    description: 'Congratulations! You have solved all color puzzles! Your color sense has shone.',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 Start Over',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 4: 조각 퍼즐
  piece_puzzle_entrance: {
    id: 'piece_puzzle_entrance',
    title: 'Piece Puzzle Room',
    description: 'This room has several puzzle pieces scattered around. Match the pieces in the correct order!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'piece_1',
        text: 'Find first piece',
        nextRoom: 'piece_1',
      },
      {
        id: 'piece_2',
        text: 'Find second piece',
        nextRoom: 'piece_2',
      },
      {
        id: 'piece_3',
        text: 'Find third piece',
        nextRoom: 'piece_3',
      },
      {
        id: 'piece_final',
        text: 'Complete puzzle',
        nextRoom: 'piece_final',
      },
    ],
  },

  piece_1: {
    id: 'piece_1',
    title: 'First Piece',
    description: 'You found the first puzzle piece behind the bookshelf!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_1',
        text: 'Take the piece',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_1'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_2: {
    id: 'piece_2',
    title: 'Second Piece',
    description: 'You found the second puzzle piece inside the box!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_2',
        text: 'Take the piece',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_2'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_3: {
    id: 'piece_3',
    title: 'Third Piece',
    description: 'You found the third puzzle piece behind the machine!',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_3',
        text: 'Take the piece',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_3'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_final: {
    id: 'piece_final',
    title: 'Puzzle Completion',
    description: 'You have obtained all pieces! Now complete the puzzle. Hint: "Place the pieces clockwise"',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'complete_puzzle',
        text: 'Complete puzzle',
        nextRoom: 'piece_puzzle_escape',
        requiredItems: ['puzzle_piece_1', 'puzzle_piece_2', 'puzzle_piece_3'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_puzzle_escape: {
    id: 'piece_puzzle_escape',
    title: '🎉 Piece Puzzle Complete! 🎉',
    description: 'Congratulations! You have solved all piece puzzles! Your spatial perception has shone.',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 Start Over',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine_password: {
    id: 'machine_password',
    title: 'Password Input',
    description: 'The machine keypad is activated. Hint: "Number found in the bookshelf"',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'try_1234',
        text: 'Enter 1234',
        nextRoom: 'machine',
      },
      {
        id: 'try_5678',
        text: 'Enter 5678',
        nextRoom: 'machine',
      },
      {
        id: 'try_2024',
        text: 'Enter 2024',
        nextRoom: 'machine_success',
        requiredItems: ['book_number'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'machine',
      },
    ],
  },
  
  machine_success: {
    id: 'machine_success',
    title: 'Machine Unlocked!',
    description: 'The password was correct! A key came out of the machine.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_machine_key',
        text: 'Take the key',
        nextRoom: 'entrance',
        addToInventory: ['machine_key'],
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'entrance',
      },
    ],
  },
  
  secret_passage: {
    id: 'secret_passage',
    title: 'Secret Passage',
    description: 'You found a secret passage behind the bookshelf! But it\'s dark and you can\'t see ahead.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_flashlight',
        text: 'Use flashlight',
        nextRoom: 'passage_lit',
        requiredItems: ['flashlight'],
      },
      {
        id: 'go_dark',
        text: 'Go into the darkness',
        nextRoom: 'passage_dark',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'bookshelf_detail',
      },
    ],
  },
  
  passage_lit: {
    id: 'passage_lit',
    title: 'Lit Passage',
    description: 'The passage is lit by the flashlight. You can see a strange door on the wall.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_secret_door',
        text: 'Open the secret door',
        nextRoom: 'escape',
      },
      {
        id: 'back',
        text: 'Go back',
        nextRoom: 'secret_passage',
      },
    ],
  },
  
  passage_dark: {
    id: 'passage_dark',
    title: 'In the Darkness',
    description: 'You tripped over something in the darkness. You need to start over.',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart_from_dark',
        text: 'Start over',
        nextRoom: 'entrance',
      },
    ],
  },
}

export const GAME_ITEMS: Record<string, Item> = {
  key: {
    id: 'key',
    name: 'Old Key',
    description: 'An old key that might open a door.',
  },
  machine_key: {
    id: 'machine_key',
    name: 'Machine Key',
    description: 'A special key that came out of the machine.',
  },
  book_number: {
    id: 'book_number',
    name: 'Number Note',
    description: 'A note from the book says "2024".',
  },
  flashlight: {
    id: 'flashlight',
    name: 'Flashlight',
    description: 'A flashlight that can light up dark places.',
  },
}

export const getRoom = (roomId: string): Room | null => {
  return GAME_ROOMS[roomId] || null
}

export const getItem = (itemId: string): Item | null => {
  return GAME_ITEMS[itemId] || null
} 