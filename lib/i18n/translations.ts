export type Language = 'ko' | 'ja' | 'en'

export interface Translations {
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
  
  game: {
    inventory: string
    progress: string
    reset: string
    resetConfirm: string
    gameOver: string
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
    puzzle: string
    room: string
    goBackToMain: string
    common: {
        back: string
        continue: string
        go_back: string
      }
    entrance: {
        title: string
        description: string
        choices: {
          go_to_door: string
          go_to_bookshelf: string
          machine: string
          box: string
        }
    }
      door: {
        title: string
        description: string
        choices: {
          useKey: string
          go_back: string
        }
      }
      bookshelf: {
        title: string
        description: string
        choices: {
          examine_book: string
          go_back: string
        }
      }
      bookshelfDetail: {
        title: string
        description: string
        choices: {
          takeKey: string
          takeNumber: string
          checkBack: string
          go_back: string
        }
      }
      escape: {
        title: string
        description: string
        choices: {
          restart: string
        }
      }
      start: {
        title: string
        description: string
        choices: {
          use_calculator: string
        }
      }
      calculator: {
        title: string
        description: string
        choices: {
          takeCode: string
        }
      }
      codeInput: {
        title: string
        description: string
        choices: {
          enterCode: string
        }
      }
  }
  
  items: {
    key: {
      name: string
      description: string
    }
    machineKey: {
      name: string
      description: string
    }
    bookNumber: {
      name: string
      description: string
    }
    flashlight: {
      name: string
      description: string
    }
  }
  
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
      gameStartWarning: '⚠️ 게임을 시작하면 이전 진행 상황이 모두 초기화됩니다.',
      puzzle: '퍼즐',
      room: '방',
      goBackToMain: '메인으로 돌아가기',
      common: {
        back: '돌아간다',
        continue: '계속하기',
        go_back: '돌아간다'
      },
      entrance: {
        title: '어두운 방',
        description: '당신은 어두운 방에 갇혀있습니다. 앞쪽에는 낡은 문이 있고, 오른쪽에는 책장이 있습니다. 왼쪽에는 이상한 기계가 놓여있습니다. 구석에는 상자가 보입니다.',
        choices: {
          go_to_door: '문을 조사한다',
          go_to_bookshelf: '책장을 조사한다',
          machine: '기계를 조사한다',
          box: '상자를 조사한다'
        }
      },
      door: {
        title: '낡은 문',
        description: '문은 잠겨있습니다. 열쇠가 필요한 것 같습니다.',
        choices: {
          useKey: '열쇠를 사용한다',
          go_back: '돌아간다'
        }
      },
      bookshelf: {
        title: '책장',
        description: '책장에는 여러 책들이 꽂혀있습니다. 그 중 하나가 이상하게 보입니다.',
        choices: {
          examine_book: '책들을 자세히 살펴본다',
          go_back: '돌아간다'
        }
      },
      bookshelfDetail: {
        title: '이상한 책',
        description: '책장에서 이상한 책을 발견했습니다. 책 안에서 열쇠와 숫자가 적힌 쪽지가 나왔습니다! 책장 뒤쪽에서도 이상한 소리가 들립니다.',
        choices: {
          takeKey: '열쇠를 가져간다',
          takeNumber: '숫자 쪽지를 가져간다',
          checkBack: '책장 뒤를 확인한다',
          go_back: '돌아간다'
        }
      },
      escape: {
        title: '🎉 탈출 성공! 🎉',
        description: '축하합니다! 당신은 모든 퍼즐을 해결하고 방에서 성공적으로 탈출했습니다! 당신의 탐험 정신과 문제 해결 능력이 빛났습니다.',
        choices: {
          restart: '🎮 다시 시작하기'
        }
      },
      start: {
        title: '숫자 방',
        description: '이 방에는 여러 개의 숫자 패드가 있습니다. 각 패드는 서로 다른 규칙을 가지고 있는 것 같습니다. 정답을 찾아 탈출하세요!',
        choices: {
          use_calculator: '계산기를 사용한다'
        }
      },
      calculator: {
        title: '계산기',
        description: '계산기 뒤에 코드가 적힌 종이가 숨겨져 있습니다.',
        choices: {
          takeCode: '코드 종이 가져가기'
        }
      },
      codeInput: {
        title: '코드 입력',
        description: '숫자 패드가 있습니다. 코드 종이에 적힌 숫자를 입력하세요.',
        choices: {
          enterCode: '코드 입력하기'
        }
      }
    },
    items: {
      key: {
        name: '낡은 열쇠',
        description: '문을 열 수 있을 것 같은 낡은 열쇠입니다.'
      },
      machineKey: {
        name: '기계 열쇠',
        description: '기계에서 나온 특별한 열쇠입니다.'
      },
      bookNumber: {
        name: '숫자 쪽지',
        description: '책에서 나온 쪽지에 "2024"라고 적혀있습니다.'
      },
      flashlight: {
        name: '손전등',
        description: '어두운 곳을 밝혀줄 수 있는 손전등입니다.'
      }
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
      gameStartWarning: '⚠️ ゲームを開始すると、以前の進行状況がすべてリセットされます。',
      puzzle: 'パズル',
      room: '部屋',
      goBackToMain: 'メインに戻る',
      common: {
        back: '戻る',
        continue: '続ける',
        go_back: '戻る'
      },
      entrance: {
        title: '暗い部屋',
        description: 'あなたは暗い部屋に閉じ込められています。前方には古い扉があり、右側には本棚があります。左側には奇妙な機械が置かれています。隅には箱が見えます。',
        choices: {
          go_to_door: '扉を調べる',
          go_to_bookshelf: '本棚を調べる',
          machine: '機械を調べる',
          box: '箱を調べる'
        }
      },
      door: {
        title: '古い扉',
        description: '扉は鍵がかかっています。鍵が必要なようです。',
        choices: {
          useKey: '鍵を使用する',
          go_back: '戻る'
        }
      },
      bookshelf: {
        title: '本棚',
        description: '本棚には多くの本が並んでいます。その中に一つ奇妙な本があります。',
        choices: {
          examine_book: '本を詳しく調べる',
          go_back: '戻る'
        }
      },
      bookshelfDetail: {
        title: '奇妙な本',
        description: '本棚で奇妙な本を発見しました。本の中から鍵と数字が書かれたメモが出てきました！本棚の後ろからも奇妙な音が聞こえます。',
        choices: {
          takeKey: '鍵を取る',
          takeNumber: '数字のメモを取る',
          checkBack: '本棚の後ろを確認する',
          go_back: '戻る'
        }
      },
      escape: {
        title: '🎉 脱出成功！🎉',
        description: 'おめでとうございます！あなたはすべてのパズルを解決し、部屋から無事に脱出しました！あなたの探検精神と問題解決能力が輝きました。',
        choices: {
          restart: '🎮 再開'
        }
      },
      start: {
        title: '数字の部屋',
        description: 'この部屋には複数の数字パッドがあります。各パッドは異なるルールを持っているようです。正解を見つけて脱出してください！',
        choices: {
          use_calculator: '計算機を使用する'
        }
      },
      calculator: {
        title: '計算機',
        description: '計算機の後ろにコードが書かれた紙が隠されています。',
        choices: {
          takeCode: 'コードの紙を取る'
        }
      },
      codeInput: {
        title: 'コード入力',
        description: '数字パッドがあります。コードの紙に書かれた数字を入力してください。',
        choices: {
          enterCode: 'コードを入力する'
        }
      }
    },
    items: {
      key: {
        name: '古い鍵',
        description: '扉を開けることができる古い鍵です。'
      },
      machineKey: {
        name: '機械の鍵',
        description: '機械から出た特別な鍵です。'
      },
      bookNumber: {
        name: '数字のメモ',
        description: '本から出たメモに「2024」と書かれています。'
      },
      flashlight: {
        name: '懐中電灯',
        description: '暗い場所を照らすことができる懐中電灯です。'
      }
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
      gameStartWarning: '⚠️ Starting the game will reset all previous progress.',
      puzzle: 'Puzzle',
      room: 'Room',
      goBackToMain: 'Return to Main',
      common: {
        back: 'Go Back',
        continue: 'Continue',
        go_back: 'Go Back'
      },
      entrance: {
        title: 'Dark Room',
        description: 'You are trapped in a dark room. There is an old door in front, a bookshelf on the right, a strange machine on the left, and a box in the corner.',
        choices: {
          go_to_door: 'Examine the door',
          go_to_bookshelf: 'Examine the bookshelf',
          machine: 'Examine the machine',
          box: 'Examine the box'
        }
      },
      door: {
        title: 'Old Door',
        description: 'The door is locked. It seems to need a key.',
        choices: {
          useKey: 'Use the key',
          go_back: 'Go Back'
        }
      },
      bookshelf: {
        title: 'Bookshelf',
        description: 'There are many books on the bookshelf. One of them looks strange.',
        choices: {
          examine_book: 'Examine the books closely',
          go_back: 'Go Back'
        }
      },
      bookshelfDetail: {
        title: 'Strange Book',
        description: 'You found a strange book on the bookshelf. A key and a note with numbers came out of the book! There is also a strange sound from behind the bookshelf.',
        choices: {
          takeKey: 'Take the key',
          takeNumber: 'Take the number note',
          checkBack: 'Check behind the bookshelf',
          go_back: 'Go Back'
        }
      },
      escape: {
        title: '🎉 Escape Success! 🎉',
        description: 'Congratulations! You have solved all the puzzles and successfully escaped from the room! Your exploration spirit and problem-solving skills have shone.',
        choices: {
          restart: '🎮 Restart'
        }
      },
      start: {
        title: 'Number Room',
        description: 'This room has several number pads. Each pad seems to have different rules. Find the correct answer and escape!',
        choices: {
          use_calculator: 'Use Calculator'
        }
      },
      calculator: {
        title: 'Calculator',
        description: 'There is a piece of paper with a code hidden behind the calculator.',
        choices: {
          takeCode: 'Take the code paper'
        }
      },
      codeInput: {
        title: 'Code Input',
        description: 'There is a number pad. Enter the number written on the code paper.',
        choices: {
          enterCode: 'Enter the code'
        }
      }
    },
    items: {
      key: {
        name: 'Old Key',
        description: 'An old key that might open a door.'
      },
      machineKey: {
        name: 'Machine Key',
        description: 'A special key from the machine.'
      },
      bookNumber: {
        name: 'Number Note',
        description: 'A note from the book that says "2024".'
      },
      flashlight: {
        name: 'Flashlight',
        description: 'A flashlight that can light up dark places.'
      }
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