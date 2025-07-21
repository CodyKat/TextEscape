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
    title: 'パズル選択',
    description: 'プレイするパズルを選択してください。各パズルは異なるストーリーと挑戦を提供します。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'puzzle_1',
        text: '🔑 鍵パズル',
        nextRoom: 'entrance',
      },
      {
        id: 'puzzle_2',
        text: '🔢 数字パズル',
        nextRoom: 'number_puzzle_entrance',
      },
      {
        id: 'puzzle_3',
        text: '🎨 色パズル',
        nextRoom: 'color_puzzle_entrance',
      },
      {
        id: 'puzzle_4',
        text: '🧩 ピースパズル',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  // 퍼즐 1: 열쇠 퍼즐
  entrance: {
    id: 'entrance',
    title: '暗い部屋',
    description: 'あなたは暗い部屋に閉じ込められています。前方には古い扉があり、右側には本棚があります。左側には奇妙な機械が置かれています。隅には箱が見えます。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'door',
        text: '扉を調べる',
        nextRoom: 'door',
      },
      {
        id: 'bookshelf',
        text: '本棚を調べる',
        nextRoom: 'bookshelf',
      },
      {
        id: 'machine',
        text: '機械を調べる',
        nextRoom: 'machine',
      },
      {
        id: 'box',
        text: '箱を調べる',
        nextRoom: 'box',
      },
    ],
  },
  
  door: {
    id: 'door',
    title: '古い扉',
    description: '扉は鍵がかかっています。鍵が必要なようです。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_key',
        text: '鍵を使用する',
        nextRoom: 'escape',
        requiredItems: ['key'],
        removeFromInventory: ['key'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
    isLocked: true,
  },
  
  bookshelf: {
    id: 'bookshelf',
    title: '本棚',
    description: '本棚には複数の本が並んでいます。その中の一つが奇妙に見えます。',
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'examine_books',
        text: '本を詳しく調べる',
        nextRoom: 'bookshelf_detail',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },
  
  bookshelf_detail: {
    id: 'bookshelf_detail',
    title: '奇妙な本',
    description: '本棚で奇妙な本を発見しました。本の中から鍵と数字が書かれたメモが出てきました！本棚の後ろからも奇妙な音が聞こえます。',
    backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_key',
        text: '鍵を取る',
        nextRoom: 'entrance',
        addToInventory: ['key'],
      },
      {
        id: 'take_number',
        text: '数字のメモを取る',
        nextRoom: 'entrance',
        addToInventory: ['book_number'],
      },
      {
        id: 'check_back',
        text: '本棚の後ろを確認する',
        nextRoom: 'secret_passage',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },
  
  escape: {
    id: 'escape',
    title: '🎉 脱出成功！🎉',
    description: 'おめでとうございます！あなたはすべてのパズルを解決し、部屋から無事に脱出しました！あなたの探検精神と問題解決能力が輝きました。',
    backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 再開する',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine: {
    id: 'machine',
    title: '奇妙な機械',
    description: '複雑な機械があります。画面には「パスワードを入力してください」と表示されています。4桁の数字を入力する必要があるようです。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'input_password',
        text: 'パスワードを入力する',
        nextRoom: 'machine_password',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box: {
    id: 'box',
    title: '箱',
    description: '古い箱があります。中で何かが光っているのが見えます。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_box',
        text: '箱を開ける',
        nextRoom: 'box_open',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },
  
  box_open: {
    id: 'box_open',
    title: '開いた箱',
    description: '箱の中から懐中電灯を発見しました！',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_flashlight',
        text: '懐中電灯を取る',
        nextRoom: 'entrance',
        addToInventory: ['flashlight'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },

  // 퍼즐 2: 숫자 퍼즐
  number_puzzle_entrance: {
    id: 'number_puzzle_entrance',
    title: '数字パズル部屋',
    description: 'この部屋には複数の数字パッドがあります。各パッドは異なるルールを持っているようです。正解を見つけて脱出してください！',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'pad_1',
        text: '最初のパッド (1-9)',
        nextRoom: 'number_pad_1',
      },
      {
        id: 'pad_2',
        text: '2番目のパッド (色のルール)',
        nextRoom: 'number_pad_2',
      },
      {
        id: 'pad_3',
        text: '3番目のパッド (順序のルール)',
        nextRoom: 'number_pad_3',
      },
    ],
  },

  number_pad_1: {
    id: 'number_pad_1',
    title: '数字パッド 1',
    description: '1から9までの数字があります。ヒント：「最大の奇数と最小の偶数の和」',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_1',
        text: '正解: 9 (9+0=9)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_2',
        text: '正解: 10 (9+1=10)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'answer_3',
        text: '正解: 11 (9+2=11)',
        nextRoom: 'number_pad_1_success',
        addToInventory: ['number_code_1'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_1_success: {
    id: 'number_pad_1_success',
    title: '最初のパッド成功！',
    description: '正解です！最初のコードを獲得しました。',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '続ける',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2: {
    id: 'number_pad_2',
    title: '数字パッド 2',
    description: '色付きの数字があります。ヒント：「赤い数字の合計」',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_red_1',
        text: '正解: 15 (赤: 3,5,7)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'answer_red_2',
        text: '正解: 12 (赤: 2,4,6)',
        nextRoom: 'number_pad_2_success',
        addToInventory: ['number_code_2'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_2_success: {
    id: 'number_pad_2_success',
    title: '2番目のパッド成功！',
    description: '正解です！2番目のコードを獲得しました。',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '続ける',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3: {
    id: 'number_pad_3',
    title: '数字パッド 3',
    description: '順序が重要な数字があります。ヒント：「昇順に並べられた数字の最後の数字」',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'answer_order_1',
        text: '正解: 9 (1,3,5,7,9)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'answer_order_2',
        text: '正解: 8 (2,4,6,8)',
        nextRoom: 'number_pad_3_success',
        addToInventory: ['number_code_3'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_pad_3_success: {
    id: 'number_pad_3_success',
    title: '3番目のパッド成功！',
    description: '正解です！3番目のコードを獲得しました。',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '続ける',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_final: {
    id: 'number_puzzle_final',
    title: '最終数字パズル',
    description: 'すべてのコードを獲得しました！今度は最終パスワードを入力してください。ヒント：「各コードの最初の数字を足してください」',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'final_answer_1',
        text: '正解: 6 (1+2+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'final_answer_2',
        text: '正解: 9 (3+3+3)',
        nextRoom: 'number_puzzle_escape',
        requiredItems: ['number_code_1', 'number_code_2', 'number_code_3'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'number_puzzle_entrance',
      },
    ],
  },

  number_puzzle_escape: {
    id: 'number_puzzle_escape',
    title: '🎉 数字パズル完了！🎉',
    description: 'おめでとうございます！すべての数字パズルを解決しました！あなたの数学的思考力が輝きました。',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 再開する',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 3: 색상 퍼즐
  color_puzzle_entrance: {
    id: 'color_puzzle_entrance',
    title: '色パズル部屋',
    description: 'この部屋には複数の色ボタンがあります。各ボタンは特定の順序で押す必要があります。色の秘密を解いてみてください！',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'color_sequence_1',
        text: '最初の色の順序',
        nextRoom: 'color_sequence_1',
      },
      {
        id: 'color_sequence_2',
        text: '2番目の色の順序',
        nextRoom: 'color_sequence_2',
      },
      {
        id: 'color_final',
        text: '最終色パズル',
        nextRoom: 'color_final',
      },
    ],
  },

  color_sequence_1: {
    id: 'color_sequence_1',
    title: '色の順序 1',
    description: '赤、青、黄の順序でボタンを押してみてください。',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'red_blue_yellow',
        text: '赤 → 青 → 黄',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'blue_red_yellow',
        text: '青 → 赤 → 黄',
        nextRoom: 'color_sequence_1_success',
        addToInventory: ['color_code_1'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_1_success: {
    id: 'color_sequence_1_success',
    title: '最初の色成功！',
    description: '正確な順序です！最初の色コードを獲得しました。',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '続ける',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2: {
    id: 'color_sequence_2',
    title: '色の順序 2',
    description: '緑、紫、オレンジの順序でボタンを押してみてください。',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'green_purple_orange',
        text: '緑 → 紫 → オレンジ',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'purple_green_orange',
        text: '紫 → 緑 → オレンジ',
        nextRoom: 'color_sequence_2_success',
        addToInventory: ['color_code_2'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_sequence_2_success: {
    id: 'color_sequence_2_success',
    title: '2番目の色成功！',
    description: '正確な順序です！2番目の色コードを獲得しました。',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'continue',
        text: '続ける',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_final: {
    id: 'color_final',
    title: '最終色パズル',
    description: 'すべての色コードを獲得しました！今度は最終色の組み合わせを合わせてみてください。ヒント：「虹の順序」',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'rainbow_order',
        text: '赤 → オレンジ → 黄 → 緑 → 青 → 紫',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'reverse_rainbow',
        text: '紫 → 青 → 緑 → 黄 → オレンジ → 赤',
        nextRoom: 'color_puzzle_escape',
        requiredItems: ['color_code_1', 'color_code_2'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'color_puzzle_entrance',
      },
    ],
  },

  color_puzzle_escape: {
    id: 'color_puzzle_escape',
    title: '🎉 色パズル完了！🎉',
    description: 'おめでとうございます！すべての色パズルを解決しました！あなたの色感覚が輝きました。',
    backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 再開する',
        nextRoom: 'puzzle_select',
      },
    ],
  },

  // 퍼즐 4: 조각 퍼즐
  piece_puzzle_entrance: {
    id: 'piece_puzzle_entrance',
    title: 'ピースパズル部屋',
    description: 'この部屋には複数のパズルピースが散らばっています。ピースを正しい順序で合わせてみてください！',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'piece_1',
        text: '最初のピースを探す',
        nextRoom: 'piece_1',
      },
      {
        id: 'piece_2',
        text: '2番目のピースを探す',
        nextRoom: 'piece_2',
      },
      {
        id: 'piece_3',
        text: '3番目のピースを探す',
        nextRoom: 'piece_3',
      },
      {
        id: 'piece_final',
        text: 'パズルを完成する',
        nextRoom: 'piece_final',
      },
    ],
  },

  piece_1: {
    id: 'piece_1',
    title: '最初のピース',
    description: '本棚の後ろで最初のパズルピースを発見しました！',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_1',
        text: 'ピースを取る',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_1'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_2: {
    id: 'piece_2',
    title: '2番目のピース',
    description: '箱の中から2番目のパズルピースを発見しました！',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_2',
        text: 'ピースを取る',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_2'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_3: {
    id: 'piece_3',
    title: '3番目のピース',
    description: '機械の後ろから3番目のパズルピースを発見しました！',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_piece_3',
        text: 'ピースを取る',
        nextRoom: 'piece_puzzle_entrance',
        addToInventory: ['puzzle_piece_3'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_final: {
    id: 'piece_final',
    title: 'パズル完成',
    description: 'すべてのピースを獲得しました！今度はパズルを完成させてみてください。ヒント：「ピースを時計回りに配置してください」',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'complete_puzzle',
        text: 'パズルを完成する',
        nextRoom: 'piece_puzzle_escape',
        requiredItems: ['puzzle_piece_1', 'puzzle_piece_2', 'puzzle_piece_3'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'piece_puzzle_entrance',
      },
    ],
  },

  piece_puzzle_escape: {
    id: 'piece_puzzle_escape',
    title: '🎉 ピースパズル完了！🎉',
    description: 'おめでとうございます！すべてのピースパズルを解決しました！あなたの空間認識能力が輝きました。',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart',
        text: '🎮 再開する',
        nextRoom: 'puzzle_select',
      },
    ],
  },
  
  machine_password: {
    id: 'machine_password',
    title: 'パスワード入力',
    description: '機械のキーパッドがアクティブになりました。ヒント：「本棚で見つけられる数字」',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'try_1234',
        text: '1234を入力する',
        nextRoom: 'machine',
      },
      {
        id: 'try_5678',
        text: '5678を入力する',
        nextRoom: 'machine',
      },
      {
        id: 'try_2024',
        text: '2024を入力する',
        nextRoom: 'machine_success',
        requiredItems: ['book_number'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'machine',
      },
    ],
  },
  
  machine_success: {
    id: 'machine_success',
    title: '機械解除！',
    description: 'パスワードが正しかったです！機械から鍵が出てきました。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'take_machine_key',
        text: '鍵を取る',
        nextRoom: 'entrance',
        addToInventory: ['machine_key'],
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'entrance',
      },
    ],
  },
  
  secret_passage: {
    id: 'secret_passage',
    title: '秘密の通路',
    description: '本棚の後ろで秘密の通路を発見しました！しかし暗くて先が見えません。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'use_flashlight',
        text: '懐中電灯を使用する',
        nextRoom: 'passage_lit',
        requiredItems: ['flashlight'],
      },
      {
        id: 'go_dark',
        text: '暗闇の中に入る',
        nextRoom: 'passage_dark',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'bookshelf_detail',
      },
    ],
  },
  
  passage_lit: {
    id: 'passage_lit',
    title: '照らされた通路',
    description: '懐中電灯で通路が照らされました。壁に奇妙な扉が見えます。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'open_secret_door',
        text: '秘密の扉を開ける',
        nextRoom: 'escape',
      },
      {
        id: 'back',
        text: '戻る',
        nextRoom: 'secret_passage',
      },
    ],
  },
  
  passage_dark: {
    id: 'passage_dark',
    title: '暗闇の中',
    description: '暗闇の中で何かに躓いて転びました。再開する必要があります。',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    choices: [
      {
        id: 'restart_from_dark',
        text: '再開する',
        nextRoom: 'entrance',
      },
    ],
  },
}

export const GAME_ITEMS: Record<string, Item> = {
  key: {
    id: 'key',
    name: '古い鍵',
    description: '扉を開けられそうな古い鍵です。',
  },
  machine_key: {
    id: 'machine_key',
    name: '機械の鍵',
    description: '機械から出てきた特別な鍵です。',
  },
  book_number: {
    id: 'book_number',
    name: '数字のメモ',
    description: '本から出てきたメモに「2024」と書かれています。',
  },
  flashlight: {
    id: 'flashlight',
    name: '懐中電灯',
    description: '暗い場所を照らすことができる懐中電灯です。',
  },
}

export const getRoom = (roomId: string): Room | null => {
  return GAME_ROOMS[roomId] || null
}

export const getItem = (itemId: string): Item | null => {
  return GAME_ITEMS[itemId] || null
} 