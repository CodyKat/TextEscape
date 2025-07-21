export type Language = 'ko' | 'ja' | 'en'

export interface Translations {
  // 공통
  common: {
    title: string
    description: string
    startGame: string
    goBack: string
    loading: string
    error: string
    notFound: string
    footerDescription: string
    seoTitle: string
    seoDescription: string
    seoKeywords: string
  }
  
  // 메인 페이지
  home: {
    welcome: string
    subtitle: string
    updateNotice: string
    updateDescription: string
    difficulty: string
    difficultyLevels: {
      easy: string
      normal: string
      hard: string
    }
    puzzleDescription: string
    menuInstruction: string
  }
  
  // 퍼즐
  puzzles: {
    key: {
      name: string
      description: string
    }
    number: {
      name: string
      description: string
    }
    color: {
      name: string
      description: string
    }
    piece: {
      name: string
      description: string
    }
    study: {
      name: string
      description: string
    }
  }
  
  // 게임
  game: {
    inventory: string
    progress: string
    reset: string
    resetConfirm: string
    gameOver: string
    escape: string
    restart: string
    roomNotFound: string
    accessDenied: string
    requiredItems: string
    missingRooms: string
    moveToAppropriateRoom: string
    goBackToEntrance: string
    puzzleNotFound: string
    puzzleId: string
    returnToMain: string
    gameStartWarning: string
  }
  
  // 헤더
  header: {
    gameSelection: string
    progressLossWarning: string
  }
}

export const translations: Record<Language, Translations> = {
  ko: {
    common: {
      title: 'TEXT-ESCAPE - 텍스트 방탈출 게임',
      description: '텍스트 기반 방탈출 게임을 즐겨보세요! 다양한 퍼즐과 선택지로 구성된 몰입감 있는 어드벤처 게임입니다.',
      startGame: '게임 시작하기',
      goBack: '돌아가기',
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      notFound: '페이지를 찾을 수 없습니다',
      footerDescription: '텍스트 기반 방탈출 게임의 세계에 오신 것을 환영합니다',
      seoTitle: 'TEXT-ESCAPE - 텍스트 방탈출 게임',
      seoDescription: '텍스트 기반 방탈출 게임을 즐겨보세요! 다양한 퍼즐과 선택지로 구성된 몰입감 있는 어드벤처 게임입니다.',
      seoKeywords: '방탈출, 텍스트 게임, 퍼즐, 어드벤처, 한국어 게임, 온라인 게임'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: '텍스트 기반 방탈출 게임의 세계에 오신 것을 환영합니다. 다양한 퍼즐과 도전을 통해 탈출의 재미를 경험해보세요!',
      updateNotice: '현재 새로운 퍼즐과 기능들이 업데이트 중입니다!',
      updateDescription: '서재 탈출 퍼즐이 새로 추가되었고, 더 많은 퍼즐이 준비 중입니다.',
      difficulty: '난이도',
      difficultyLevels: {
        easy: '쉬움',
        normal: '보통',
        hard: '어려움'
      },
      puzzleDescription: '각 퍼즐은 서로 다른 스토리와 도전을 제공합니다.',
      menuInstruction: '우측 상단의 메뉴 버튼을 통해 언제든지 다른 퍼즐로 이동할 수 있습니다.'
    },
    puzzles: {
      key: {
        name: '🔑 열쇠 퍼즐',
        description: '열쇠를 찾아 문을 열어보세요'
      },
      number: {
        name: '🔢 숫자 퍼즐',
        description: '숫자 패드의 비밀을 풀어보세요'
      },
      color: {
        name: '🎨 색상 퍼즐',
        description: '색상 순서를 맞춰보세요'
      },
      piece: {
        name: '🧩 조각 퍼즐',
        description: '퍼즐 조각을 모아 완성해보세요'
      },
      study: {
        name: '📚 서재 탈출',
        description: '낡은 서재에서 탈출하세요'
      }
    },
    game: {
      inventory: '인벤토리',
      progress: '진행률',
      reset: '초기화',
      resetConfirm: '게임 진행 정보가 손실됩니다. 정말 다른 퍼즐로 이동하시겠습니까?',
      gameOver: '게임 오버',
      escape: '탈출 성공!',
      restart: '다시 시작하기',
      roomNotFound: '방을 찾을 수 없습니다',
      accessDenied: '🚫 접근 제한',
      requiredItems: '필요한 아이템:',
      missingRooms: '먼저 방문해야 할 방:',
      moveToAppropriateRoom: '적절한 방으로 이동',
      goBackToEntrance: '입구로 돌아가기',
      puzzleNotFound: '퍼즐을 찾을 수 없습니다',
      puzzleId: '퍼즐 ID',
      returnToMain: '메인으로 돌아가기',
      gameStartWarning: '⚠️ 게임을 시작하면 이전 진행 상황이 모두 초기화됩니다.'
    },
    header: {
      gameSelection: '게임 선택',
      progressLossWarning: '게임 진행 정보가 손실됩니다. 정말 홈으로 이동하시겠습니까?'
    }
  },
  ja: {
    common: {
      title: 'TEXT-ESCAPE - テキスト脱出ゲーム',
      description: 'テキストベースの脱出ゲームをお楽しみください！様々なパズルと選択肢で構成された没入感のあるアドベンチャーゲームです。',
      startGame: 'ゲーム開始',
      goBack: '戻る',
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      notFound: 'ページが見つかりません',
      footerDescription: 'テキストベースの脱出ゲームの世界へようこそ',
      seoTitle: 'TEXT-ESCAPE - テキスト脱出ゲーム',
      seoDescription: 'テキストベースの脱出ゲームをお楽しみください！様々なパズルと選択肢で構成された没入感のあるアドベンチャーゲームです。',
      seoKeywords: '脱出ゲーム, テキストゲーム, パズル, アドベンチャー, 日本語ゲーム, オンラインゲーム'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: 'テキストベースの脱出ゲームの世界へようこそ。様々なパズルと挑戦を通じて脱出の楽しさを体験してください！',
      updateNotice: '現在、新しいパズルと機能がアップデート中です！',
      updateDescription: '書斎脱出パズルが新しく追加され、さらに多くのパズルが準備中です。',
      difficulty: '難易度',
      difficultyLevels: {
        easy: '簡単',
        normal: '普通',
        hard: '難しい'
      },
      puzzleDescription: '各パズルは異なるストーリーと挑戦を提供します。',
      menuInstruction: '右上のメニューボタンからいつでも他のパズルに移動できます。'
    },
    puzzles: {
      key: {
        name: '🔑 鍵パズル',
        description: '鍵を見つけて扉を開けてください'
      },
      number: {
        name: '🔢 数字パズル',
        description: '数字パッドの秘密を解いてください'
      },
      color: {
        name: '🎨 色パズル',
        description: '色の順序を合わせてください'
      },
      piece: {
        name: '🧩 ピースパズル',
        description: 'パズルのピースを集めて完成させてください'
      },
      study: {
        name: '📚 書斎脱出',
        description: '古い書斎から脱出してください'
      }
    },
    game: {
      inventory: 'インベントリ',
      progress: '進捗',
      reset: 'リセット',
      resetConfirm: 'ゲーム進行情報が失われます。本当に別のパズルに移動しますか？',
      gameOver: 'ゲームオーバー',
      escape: '脱出成功！',
      restart: '再開',
      roomNotFound: '部屋が見つかりません',
      accessDenied: '🚫 アクセス拒否',
      requiredItems: '必要なアイテム:',
      missingRooms: '先に訪れるべき部屋:',
      moveToAppropriateRoom: '適切な部屋に移動',
      goBackToEntrance: '入口に戻る',
      puzzleNotFound: 'パズルが見つかりません',
      puzzleId: 'パズルID',
      returnToMain: 'メインに戻る',
      gameStartWarning: '⚠️ ゲームを開始すると、以前の進行状況がすべてリセットされます。'
    },
    header: {
      gameSelection: 'ゲーム選択',
      progressLossWarning: 'ゲーム進行情報が失われます。本当にホームに移動しますか？'
    }
  },
  en: {
    common: {
      title: 'TEXT-ESCAPE - Text Escape Room Game',
      description: 'Enjoy text-based escape room games! An immersive adventure game with various puzzles and choices.',
      startGame: 'Start Game',
      goBack: 'Go Back',
      loading: 'Loading...',
      error: 'An error occurred',
      notFound: 'Page not found',
      footerDescription: 'Welcome to the world of text-based escape room games',
      seoTitle: 'TEXT-ESCAPE - Text Escape Room Game',
      seoDescription: 'Enjoy text-based escape room games! An immersive adventure game with various puzzles and choices.',
      seoKeywords: 'escape room, text game, puzzle, adventure, online game, browser game'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: 'Welcome to the world of text-based escape room games. Experience the thrill of escape through various puzzles and challenges!',
      updateNotice: 'New puzzles and features are currently being updated!',
      updateDescription: 'Study Room Escape puzzle has been newly added, and more puzzles are in preparation.',
      difficulty: 'Difficulty',
      difficultyLevels: {
        easy: 'Easy',
        normal: 'Normal',
        hard: 'Hard'
      },
      puzzleDescription: 'Each puzzle offers different stories and challenges.',
      menuInstruction: 'You can move to other puzzles anytime through the menu button in the upper right corner.'
    },
    puzzles: {
      key: {
        name: '🔑 Key Puzzle',
        description: 'Find the key to open the door'
      },
      number: {
        name: '🔢 Number Puzzle',
        description: 'Solve the secret of the number pad'
      },
      color: {
        name: '🎨 Color Puzzle',
        description: 'Match the color order'
      },
      piece: {
        name: '🧩 Piece Puzzle',
        description: 'Collect puzzle pieces to complete'
      },
      study: {
        name: '📚 Study Room Escape',
        description: 'Escape from the old study room'
      }
    },
    game: {
      inventory: 'Inventory',
      progress: 'Progress',
      reset: 'Reset',
      resetConfirm: 'Game progress will be lost. Are you sure you want to move to another puzzle?',
      gameOver: 'Game Over',
      escape: 'Escape Success!',
      restart: 'Restart',
      roomNotFound: 'Room not found',
      accessDenied: '🚫 Access Denied',
      requiredItems: 'Required items:',
      missingRooms: 'Rooms to visit first:',
      moveToAppropriateRoom: 'Move to appropriate room',
      goBackToEntrance: 'Go back to entrance',
      puzzleNotFound: 'Puzzle not found',
      puzzleId: 'Puzzle ID',
      returnToMain: 'Return to Main',
      gameStartWarning: '⚠️ Starting the game will reset all previous progress.'
    },
    header: {
      gameSelection: 'Game Selection',
      progressLossWarning: 'Game progress will be lost. Are you sure you want to go to home?'
    }
  }
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // 번역을 찾을 수 없으면 키를 반환
    }
  }
  
  return typeof value === 'string' ? value : key
} 