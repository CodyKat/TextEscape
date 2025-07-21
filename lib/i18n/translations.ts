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
    languageSelection: string
    currentlySelected: string
    learnMore: string
  }
  
  home: {
    welcome: string
    subtitle: string
    aboutEscapeRoom: {
      title: string
      description: string
      learnMore: string
    }
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
    goToMain: string
    common: {
        back: string
        continue: string
        go_back: string
      }
    // 퍼즐별 방 데이터
    key: {
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
          use_key: string
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
      bookshelf_detail: {
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
          goToMain: string
        }
      }
    }
    number: {
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
          go_back: string
          take_code: string
        }
      }
      code_input: {
        title: string
        description: string
        choices: {
          go_back: string
          enter_code: string
        }
      }
      escape: {
        title: string
        description: string
        choices: {
          goToMain: string
        }
      }
    }
    color: {
      beginning: {
        title: string
        description: string
        choices: {
          collect_gems: string
        }
      }
      gem_collection: {
        title: string
        description: string
        choices: {
          go_back: string
          arrange_colors: string
        }
      }
      color_order: {
        title: string
        description: string
        choices: {
          go_back: string
          complete_order: string
        }
      }
      escape: {
        title: string
        description: string
        choices: {
          goToMain: string
        }
      }
    }
    piece: {
      entrance: {
        title: string
        description: string
        choices: {
          search_pieces: string
        }
      }
      piece_search: {
        title: string
        description: string
        choices: {
          go_back: string
          assemble_puzzle: string
        }
      }
      puzzle_assembly: {
        title: string
        description: string
        choices: {
          go_back: string
          complete_puzzle: string
        }
      }
      escape: {
        title: string
        description: string
        choices: {
          goToMain: string
        }
      }
    }
    study: {
      entrance: {
        title: string
        description: string
        choices: {
          enter_study: string
        }
      }
      study_room: {
        title: string
        description: string
        choices: {
          explore_bookshelf: string
          explore_desk: string
          look_window: string
          explore_fireplace: string
          inspect_door_to_corridor: string
        }
      }
      bookshelf_detail: {
        title: string
        description: string
        choices: {
          pull_dusty_book: string
          push_protruding_book: string
          back_to_study: string
        }
      }
      secret_compartment_bookshelf: {
        title: string
        description: string
        choices: {
          get_faded_photograph: string
          back_to_bookshelf: string
        }
      }
      desk_detail: {
        title: string
        description: string
        choices: {
          examine_locked_drawer: string
          get_map_piece_a: string
          back_to_study: string
        }
      }
      drawer_open_diary: {
        title: string
        description: string
        choices: {
          take_old_diary: string
          back_to_desk_from_open: string
        }
      }
      window_view: {
        title: string
        description: string
        choices: {
          use_gardening_shears_on_vines: string
          back_to_study: string
        }
      }
      window_vines_cleared: {
        title: string
        description: string
        choices: {
          get_corridor_key: string
          back_to_window_from_cleared: string
        }
      }
      fireplace_detail: {
        title: string
        description: string
        choices: {
          reach_into_fireplace: string
          back_to_study: string
        }
      }
      corridor_entrance: {
        title: string
        description: string
        choices: {
          try_to_open_main_door: string
          back_to_study_from_door: string
        }
      }
      dark_corridor: {
        title: string
        description: string
        choices: {
          examine_end_door: string
          examine_wooden_box: string
          examine_garden_door: string
          back_to_study_from_corridor: string
        }
      }
      corridor_box: {
        title: string
        description: string
        choices: {
          input_code_corridor_box: string
          back_to_corridor_from_box: string
        }
      }
      corridor_box_open: {
        title: string
        description: string
        choices: {
          get_empty_bottle: string
          back_to_corridor_from_box_open: string
        }
      }
      reception_room_entrance: {
        title: string
        description: string
        choices: {
          examine_fireplace_reception: string
          open_small_door: string
          open_curtains: string
          back_to_corridor_from_reception: string
        }
      }
      reception_fireplace_detail: {
        title: string
        description: string
        choices: {
          get_gardening_shears: string
          back_to_reception: string
        }
      }
      reception_window: {
        title: string
        description: string
        choices: {
          investigate_stone_wall: string
          back_to_reception_from_window: string
        }
      }
      stone_wall_detail: {
        title: string
        description: string
        choices: {
          get_stained_glass_shard: string
          back_to_reception_window: string
        }
      }
      pantry_room: {
        title: string
        description: string
        choices: {
          search_map_spot: string
          back_to_reception_from_pantry: string
        }
      }
      garden_path: {
        title: string
        description: string
        choices: {
          go_to_shed: string
          examine_well: string
          back_to_corridor_from_garden: string
        }
      }
      dry_well: {
        title: string
        description: string
        choices: {
          use_empty_bottle_on_bar: string
          back_to_garden_from_well: string
        }
      }
      well_clue_revealed: {
        title: string
        description: string
        choices: {
          get_torn_map_piece_b_well: string
          back_to_well_from_clue: string
        }
      }
      garden_shed_entrance: {
        title: string
        description: string
        choices: {
          insert_map_pieces: string
          back_to_garden_from_shed: string
        }
      }
      shed_open: {
        title: string
        description: string
        choices: {
          enter_light: string
          back_to_shed_from_open: string
        }
      }
      escape: {
        title: string
        description: string
        choices: {
          goToMain: string
        }
        }
      }
  }
  
  items: {
    key: {
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
    number: {
      codePaper: {
        name: string
        description: string
      }
    }
    color: {
      redGem: {
        name: string
        description: string
      }
      blueGem: {
        name: string
        description: string
      }
      greenGem: {
        name: string
        description: string
      }
      yellowGem: {
        name: string
        description: string
      }
    }
    piece: {
      puzzlePiece1: {
        name: string
        description: string
      }
      puzzlePiece2: {
        name: string
        description: string
      }
      puzzlePiece3: {
        name: string
        description: string
      }
      puzzlePiece4: {
        name: string
        description: string
      }
    }
    study: {
      dustyBook: {
        name: string
        description: string
      }
      fadedPhotograph: {
        name: string
        description: string
      }
      studyKey: {
        name: string
        description: string
      }
      tornMapPieceA: {
        name: string
        description: string
      }
      oldDiary: {
        name: string
        description: string
      }
      corridorKey: {
        name: string
        description: string
      }
      emptyBottle: {
        name: string
        description: string
      }
      gardeningShears: {
        name: string
        description: string
      }
      stainedGlassShard: {
        name: string
        description: string
      }
      tornMapPieceB: {
        name: string
        description: string
      }
    }
  }
  
  header: {
    gameSelection: string
    progressLossWarning: string
  }
  about: {
    title: string
    subtitle: string
    whatIsEscapeRoom: {
      title: string
      description: string
      evolution: string
    }
    textEscapeRoom: {
      title: string
      description: string
      concept: string
    }
    keyFeatures: {
      title: string
      storytelling: {
        title: string
        description: string
      }
      choices: {
        title: string
        description: string
      }
      puzzles: {
        title: string
        description: string
      }
      inventory: {
        title: string
        description: string
      }
      branching: {
        title: string
        description: string
      }
      genres: {
        title: string
        description: string
      }
    }
    advantages: {
      title: string
      imagination: {
        title: string
        description: string
      }
      development: {
        title: string
        description: string
      }
      accessibility: {
        title: string
        description: string
      }
      story: {
        title: string
        description: string
      }
      versatility: {
        title: string
        description: string
      }
    }
    gameStructure: {
      title: string
      basic: {
        title: string
        gameScreen: string
        choices: string
        inventory: string
        memo: string
      }
      progression: {
        title: string
        situation: string
        actions: string
        conditions: string
      }
      puzzleTypes: {
        title: string
        cipher: string
        combination: string
        matching: string
        clues: string
        sequence: string
      }
    }
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
      seoKeywords: '방탈출, 텍스트 게임, 퍼즐, 어드벤처, 한국어 게임, 온라인 게임',
      languageSelection: '언어 선택',
      currentlySelected: '현재 선택됨',
      learnMore: '자세히 보기'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: '텍스트 기반 방탈출 게임의 세계에 오신 것을 환영합니다. 다양한 퍼즐과 도전을 통해 탈출의 재미를 경험해보세요!',
      aboutEscapeRoom: {
        title: '방탈출이란?',
        description: '텍스트 기반 방탈출 게임의 개념과 서비스에 대해 자세히 알아보세요.',
        learnMore: '자세히 알아보기'
      },
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
    goToMain: '메인으로 이동',
      common: {
        back: '돌아간다',
        continue: '계속하기',
        go_back: '돌아간다'
      },
      key: {
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
            use_key: '열쇠를 사용한다',
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
      bookshelf_detail: {
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
          goToMain: '메인으로 이동'
          }
        }
      },
      number: {
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
              go_back: '돌아가기',
              take_code: '코드 종이 가져가기'
        }
      },
        code_input: {
        title: '코드 입력',
        description: '숫자 패드가 있습니다. 코드 종이에 적힌 숫자를 입력하세요.',
        choices: {
            go_back: '돌아가기',
            enter_code: '코드 입력하기'
          }
        },
        escape: {
          title: '🎉 탈출 성공! 🎉',
          description: '축하합니다! 당신은 모든 퍼즐을 해결하고 방에서 성공적으로 탈출했습니다! 당신의 탐험 정신과 문제 해결 능력이 빛났습니다.',
          choices: {
            goToMain: '메인으로 이동'
          }
        }
      },
      color: {
        beginning: {
          title: '색상 방',
          description: '다양한 색상의 보석들이 있는 방입니다.',
          choices: {
            collect_gems: '보석 수집하기'
          }
        },
        gem_collection: {
          title: '보석 수집',
          description: '빨간, 파란, 초록, 노란 보석들을 모두 수집했습니다.',
          choices: {
            go_back: '돌아가기',
            arrange_colors: '색상 순서 맞추기'
          }
        },
        color_order: {
          title: '색상 순서',
          description: '보석들을 올바른 순서로 배치해야 합니다.',
          choices: {
            go_back: '돌아가기',
            complete_order: '순서 완성하기'
          }
        },
        escape: {
          title: '🎉 탈출 성공! 🎉',
          description: '축하합니다! 당신은 모든 퍼즐을 해결하고 방에서 성공적으로 탈출했습니다! 당신의 탐험 정신과 문제 해결 능력이 빛났습니다.',
          choices: {
            goToMain: '메인으로 이동'
          }
        }
      },
      piece: {
        entrance: {
          title: '퍼즐 방',
          description: '퍼즐 조각들이 흩어져 있는 방입니다.',
          choices: {
            search_pieces: '퍼즐 조각 찾기'
          }
        },
        piece_search: {
          title: '조각 수집',
          description: '모든 퍼즐 조각을 찾았습니다.',
          choices: {
            go_back: '돌아가기',
            assemble_puzzle: '퍼즐 조립하기'
          }
        },
        puzzle_assembly: {
          title: '퍼즐 조립',
          description: '퍼즐을 완성해야 합니다.',
          choices: {
            go_back: '돌아가기',
            complete_puzzle: '퍼즐 완성하기'
          }
        },
        escape: {
          title: '🎉 탈출 성공! 🎉',
          description: '축하합니다! 당신은 모든 퍼즐을 해결하고 방에서 성공적으로 탈출했습니다! 당신의 탐험 정신과 문제 해결 능력이 빛났습니다.',
          choices: {
            goToMain: '메인으로 이동'
          }
        }
      },
      study: {
        entrance: {
          title: '서재 입구',
          description: '당신은 낡은 서재의 입구에 서 있습니다. 앞으로 나아가면 본격적인 서재가 펼쳐집니다.',
          choices: {
            enter_study: '서재로 들어간다'
          }
        },
        study_room: {
          title: '낡은 서재',
          description: '당신은 낡고 먼지 가득한 서재에 갇혀있습니다. 삐걱거리는 마루, 천장까지 닿는 거대한 책장, 오래된 지도가 덮인 책상, 그리고 굳게 닫힌 창문이 눈에 들어옵니다. 한쪽 벽에는 재가 가득한 벽난로가 있습니다. 방을 나가는 낡은 나무 문이 정면에 보입니다.',
          choices: {
            explore_bookshelf: '거대한 책장을 자세히 살펴본다',
            explore_desk: '오래된 책상을 살펴본다',
            look_window: '창문을 확인한다',
            explore_fireplace: '재가 쌓인 벽난로를 조사한다',
            inspect_door_to_corridor: '낡은 나무 문을 조사한다'
          }
        },
        bookshelf_detail: {
          title: '빼곡한 책장',
          description: '수많은 고서와 잡동사니가 뒤섞여 있습니다. 책들을 일일이 살펴보니, 유난히 손때 묻은 한 권이 눈에 띕니다. 그리고 한쪽에 이상하게 튀어나온 책이 있습니다.',
          choices: {
            pull_dusty_book: '손때 묻은 책을 꺼내본다',
            push_protruding_book: '튀어나온 책을 밀어 넣는다',
            back_to_study: '돌아가기'
          }
        },
        secret_compartment_bookshelf: {
          title: '책장의 비밀 칸',
          description: '책을 밀어 넣자 책장 뒤에서 덜컥이는 소리가 나며 작은 비밀 공간이 나타났습니다. 안에는 빛바랜 사진 한 장이 놓여 있습니다.',
          choices: {
            get_faded_photograph: '사진을 챙긴다',
            back_to_bookshelf: '돌아가기'
          }
        },
        desk_detail: {
          title: '오래된 책상',
          description: '책상 위에는 잉크병과 깃털 펜이 놓여있고, 한쪽 구석에는 잠긴 서랍이 있습니다. 서랍 옆에는 찢어진 지도 조각이 보입니다.',
          choices: {
            examine_locked_drawer: '잠긴 서랍을 열어본다',
            get_map_piece_a: '찢어진 지도 조각 A를 챙긴다',
            back_to_study: '돌아가기'
          }
        },
        drawer_open_diary: {
          title: '열린 서랍',
          description: '열쇠를 사용하여 서랍을 열자, 낡은 일기장이 나옵니다.',
          choices: {
            take_old_diary: '일기장을 챙긴다',
            back_to_desk_from_open: '돌아가기'
          }
        },
        window_view: {
          title: '창밖 풍경',
          description: '굳게 닫힌 창문 밖으로는 무성한 정원이 보입니다. 멀리서는 안개가 자욱하게 깔려있어 아무것도 보이지 않습니다. 창문에는 얇은 틈이 있습니다.',
          choices: {
            use_gardening_shears_on_vines: '창밖 덩굴에 원예 가위를 사용한다',
            back_to_study: '돌아가기'
          }
        },
        window_vines_cleared: {
          title: '덩굴이 제거된 창문',
          description: '원예 가위로 창문을 뒤덮은 덩굴을 잘라내자, 덩굴 사이에 숨겨져 있던 녹슨 복도 열쇠가 보입니다!',
          choices: {
            get_corridor_key: '복도 열쇠를 챙긴다',
            back_to_window_from_cleared: '돌아가기'
          }
        },
        fireplace_detail: {
          title: '재가 쌓인 벽난로',
          description: '오랫동안 사용하지 않은 듯 재가 가득합니다. 그을음이 묻어있고, 안쪽에는 희미하게 빛나는 작은 물체가 보입니다.',
          choices: {
            reach_into_fireplace: '손을 넣어 물체를 꺼낸다',
            back_to_study: '돌아가기'
          }
        },
        corridor_entrance: {
          title: '낡은 나무 문',
          description: '이 방을 나갈 수 있는 유일한 문입니다. 굳게 잠겨있습니다. 옆에는 낡은 자물쇠가 달려있습니다. 문 너머 어둡고 긴 복도가 어렴풋이 보입니다.',
          choices: {
            try_to_open_main_door: '문을 열려고 시도한다',
            back_to_study_from_door: '돌아가기'
          }
        },
        dark_corridor: {
          title: '어두운 복도',
          description: '낡은 문을 열고 나오자, 빛 한 줄기 없는 어두운 복도가 눈앞에 펼쳐집니다. 공기가 차갑고 음산합니다. 복도 끝에는 굳게 닫힌 또 다른 문이 보입니다. 오른쪽에는 작은 나무 상자가, 왼쪽에는 정원으로 나가는 듯한 낡은 문이 있습니다.',
          choices: {
            examine_end_door: '복도 끝 문을 조사한다 (응접실)',
            examine_wooden_box: '오른쪽 나무 상자를 살펴본다',
            examine_garden_door: '왼쪽 낡은 문을 살펴본다 (정원)',
            back_to_study_from_corridor: '서재로 돌아간다'
          }
        },
        corridor_box: {
          title: '복도 나무 상자',
          description: '작은 나무 상자입니다. 뚜껑에는 숫자를 입력하는 자물쇠가 달려있습니다. 세 자리 숫자가 필요해 보입니다.',
          choices: {
            input_code_corridor_box: '숫자 입력하기 (472)',
            back_to_corridor_from_box: '돌아가기'
          }
        },
        corridor_box_open: {
          title: '열린 나무 상자',
          description: '정답을 입력하자 상자가 열립니다. 안에는 비어있는 작은 유리병이 들어있습니다.',
          choices: {
            get_empty_bottle: '유리병을 챙긴다',
            back_to_corridor_from_box_open: '돌아가기'
          }
        },
        reception_room_entrance: {
          title: '응접실 입구',
          description: '복도 끝의 문을 열자 넓은 응접실이 나타납니다. 먼지가 쌓인 소파와 촛대가 놓인 탁자, 그리고 큼직한 벽난로가 눈에 띕니다. 한쪽에는 닫힌 커튼이 쳐진 창문이, 다른 쪽에는 작은 문이 있습니다.',
          choices: {
            examine_fireplace_reception: '응접실 벽난로를 조사한다',
            open_small_door: '작은 문을 열어본다 (식료품 저장고)',
            open_curtains: '커튼을 걷어본다',
            back_to_corridor_from_reception: '복도로 돌아간다'
          }
        },
        reception_fireplace_detail: {
          title: '응접실 벽난로',
          description: '이곳 역시 재가 쌓여있지만, 무언가 반짝이는 것이 보입니다. 재를 걷어보니 낡은 원예 가위가 나옵니다.',
          choices: {
            get_gardening_shears: '원예 가위를 챙긴다',
            back_to_reception: '돌아가기'
          }
        },
        reception_window: {
          title: '응접실 창문',
          description: '커튼을 걷어내자 바깥의 무성한 정원이 보입니다. 이끼 낀 돌담이 눈에 들어오는데, 틈새에 무언가 끼어있는 듯합니다.',
          choices: {
            investigate_stone_wall: '돌담 틈새를 조사한다',
            back_to_reception_from_window: '돌아가기'
          }
        },
        stone_wall_detail: {
          title: '이끼 낀 돌담',
          description: '돌담의 틈새를 자세히 보니, 빛바랜 스테인드 글라스 조각이 박혀 있습니다. 조심스럽게 꺼낼 수 있을 것 같습니다.',
          choices: {
            get_stained_glass_shard: '스테인드 글라스 조각을 챙긴다',
            back_to_reception_window: '돌아가기'
          }
        },
        pantry_room: {
          title: '식료품 저장고',
          description: '좁고 어두운 방입니다. 선반에는 텅 빈 병들과 곰팡이 핀 음식들이 놓여 있습니다. 한쪽 벽에 걸린 낡은 달력이 눈에 들어옵니다. 그 옆에는 지도가 찢겨나간 자리가 있습니다.',
          choices: {
            search_map_spot: '지도가 찢겨나간 자리를 검색한다',
            back_to_reception_from_pantry: '돌아가기'
          }
        },
        garden_path: {
          title: '황량한 정원 길',
          description: '문을 열고 나오자, 관리가 전혀 안 된 황량한 정원이 펼쳐집니다. 엉성하게 이어진 흙길이 저 멀리 닫힌 작은 오두막으로 이어집니다. 길 중간에는 마른 우물이 보입니다.',
          choices: {
            go_to_shed: '오두막으로 향한다',
            examine_well: '마른 우물을 살펴본다',
            back_to_corridor_from_garden: '복도로 돌아간다'
          }
        },
        dry_well: {
          title: '마른 우물',
          description: '우물 안은 완전히 말라 있습니다. 바닥에는 아무것도 없지만, 우물 안쪽에 돌출된 쇠막대가 있습니다. 물건을 걸어둘 수 있을 것 같습니다.',
          choices: {
            use_empty_bottle_on_bar: '쇠막대에 빈 유리병을 걸어둔다',
            back_to_garden_from_well: '돌아가기'
          }
        },
        well_clue_revealed: {
          title: '우물 속 힌트',
          description: '유리병을 쇠막대에 걸어두자, 유리병이 매달린 반동으로 쇠막대 아래의 숨겨진 부분이 열리면서 찢어진 지도 조각이 나타납니다!',
          choices: {
            get_torn_map_piece_b_well: '찢어진 지도 조각 B를 챙긴다',
            back_to_well_from_clue: '돌아가기'
          }
        },
        garden_shed_entrance: {
          title: '낡은 오두막',
          description: '황량한 정원 끝에 낡은 나무 오두막이 서 있습니다. 문은 자물쇠로 굳게 잠겨있습니다. 자물쇠에는 지도를 넣을 수 있는 홈이 보입니다.',
          choices: {
            insert_map_pieces: '지도 조각을 자물쇠 홈에 넣는다',
            back_to_garden_from_shed: '돌아가기'
          }
        },
        shed_open: {
          title: '열린 오두막',
          description: '지도 조각을 맞추자, 자물쇠가 풀리는 소리와 함께 오두막 문이 열립니다. 오두막 안쪽에는 작은 문이 있고, 그 문 너머로 밝은 빛이 새어 나옵니다!',
          choices: {
            enter_light: '밝은 빛 속으로 들어간다',
            back_to_shed_from_open: '돌아가기'
          }
        },
        escape: {
          title: '탈출 성공!',
          description: '밝은 빛 속으로 들어가자, 당신은 마침내 오두막을 빠져나왔습니다! 축하합니다! 당신은 성공적으로 탈출했습니다!',
          choices: {
            goToMain: '메인으로 이동'
          }
        }
      }
    },
    items: {
      key: {
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
      number: {
        codePaper: {
          name: '코드 종이',
          description: '계산기 뒤에서 발견한 코드가 적힌 종이입니다.'
        }
      },
      color: {
        redGem: {
          name: '빨간 보석',
          description: '빨간색 보석입니다.'
        },
        blueGem: {
          name: '파란 보석',
          description: '파란색 보석입니다.'
        },
        greenGem: {
          name: '초록 보석',
          description: '초록색 보석입니다.'
        },
        yellowGem: {
          name: '노란 보석',
          description: '노란색 보석입니다.'
        }
      },
      piece: {
        puzzlePiece1: {
          name: '퍼즐 조각 1',
          description: '퍼즐의 첫 번째 조각입니다.'
        },
        puzzlePiece2: {
          name: '퍼즐 조각 2',
          description: '퍼즐의 두 번째 조각입니다.'
        },
        puzzlePiece3: {
          name: '퍼즐 조각 3',
          description: '퍼즐의 세 번째 조각입니다.'
        },
        puzzlePiece4: {
          name: '퍼즐 조각 4',
          description: '퍼즐의 네 번째 조각입니다.'
        }
      },
      study: {
        dustyBook: {
          name: '먼지 묻은 책',
          description: '오랫동안 읽지 않은 듯 먼지가 묻은 책입니다.'
        },
        fadedPhotograph: {
          name: '빛바랜 사진',
          description: '오래되어 빛이 바랜 사진입니다.'
        },
        studyKey: {
          name: '서재 열쇠',
          description: '서재의 서랍을 열 수 있는 열쇠입니다.'
        },
        tornMapPieceA: {
          name: '찢어진 지도 조각 A',
          description: '지도의 일부분이 찢어진 조각입니다.'
        },
        oldDiary: {
          name: '낡은 일기장',
          description: '오래된 일기장입니다.'
        },
        corridorKey: {
          name: '복도 열쇠',
          description: '복도로 나가는 문을 열 수 있는 열쇠입니다.'
        },
        emptyBottle: {
          name: '빈 유리병',
          description: '비어있는 작은 유리병입니다.'
        },
        gardeningShears: {
          name: '원예 가위',
          description: '식물을 자르는 데 사용하는 가위입니다.'
        },
        stainedGlassShard: {
          name: '스테인드 글라스 조각',
          description: '빛바랜 스테인드 글라스 조각입니다.'
        },
        tornMapPieceB: {
          name: '찢어진 지도 조각 B',
          description: '지도의 다른 부분이 찢어진 조각입니다.'
        }
      }
    },
    header: {
      gameSelection: '게임 선택',
      progressLossWarning: '게임 진행 정보가 손실됩니다. 정말 홈으로 이동하시겠습니까?'
    },
    about: {
      title: '방탈출이란?',
      subtitle: '텍스트 기반 방탈출 게임의 개념과 특징에 대해 자세히 알아보세요',
      whatIsEscapeRoom: {
        title: '방탈출이란?',
        description: '방탈출은 참가자들이 특정 공간에 갇힌 상황에서 주어진 단서와 퍼즐을 해결하여 제한 시간 내에 탈출하는 게임입니다.',
        evolution: '원래는 오프라인 공간에서 실제로 방에 갇혀 탈출하는 형태로 시작되었지만, 이제는 보드게임, 디지털 게임, 텍스트 기반 게임 등 다양한 형태로 발전했습니다.'
      },
      textEscapeRoom: {
        title: '텍스트 방탈출 게임의 컨셉',
        description: '텍스트 방탈출은 방탈출 게임의 한 형태로, 모든 상황과 단서가 텍스트로 제공되는 게임입니다.',
        concept: '플레이어는 글로 묘사된 환경을 상상하며 퍼즐을 풀고 탈출해야 합니다.'
      },
      keyFeatures: {
        title: '주요 특징',
        storytelling: {
          title: '텍스트 기반 스토리텔링',
          description: '모든 상황과 공간이 텍스트로 묘사됨'
        },
        choices: {
          title: '선택지 기반 진행',
          description: '플레이어는 제시된 선택지 중에서 행동을 선택'
        },
        puzzles: {
          title: '퍼즐 해결',
          description: '암호 해독, 아이템 조합, 단서 수집 등 다양한 퍼즐 요소'
        },
        inventory: {
          title: '아이템 수집과 활용',
          description: '게임 내에서 획득한 아이템을 적절한 상황에 사용'
        },
        branching: {
          title: '분기 스토리',
          description: '플레이어의 선택에 따라 다른 결과로 이어지는 구조'
        },
        genres: {
          title: '다양한 장르 적용',
          description: 'SF, 호러, 판타지 등 다양한 장르와 결합 가능'
        }
      },
      advantages: {
        title: '텍스트 방탈출의 장점',
        imagination: {
          title: '상상력 자극',
          description: '텍스트만으로 상황을 묘사하기 때문에 플레이어의 상상력을 자극'
        },
        development: {
          title: '개발 용이성',
          description: '그래픽이 필요 없어 개발 비용과 시간이 적게 소요'
        },
        accessibility: {
          title: '접근성',
          description: '고사양 기기가 필요 없이 대부분의 디바이스에서 구동 가능'
        },
        story: {
          title: '스토리 중심',
          description: '텍스트 기반이기 때문에 깊이 있는 스토리텔링에 집중 가능'
        },
        versatility: {
          title: '다양한 장르 적용',
          description: 'SF, 호러, 판타지 등 다양한 장르와 결합 가능'
        }
      },
      gameStructure: {
        title: '텍스트 방탈출 게임의 구조',
        basic: {
          title: '1. 기본 게임 화면 구성',
          gameScreen: '게임 화면 (상황 묘사 텍스트)',
          choices: '선택지 목록',
          inventory: '인벤토리 창',
          memo: '메모장 (선택적)'
        },
        progression: {
          title: '2. 게임 진행 방식',
          situation: '상황은 텍스트로 주어짐',
          actions: '행동은 선택지를 통해 수행',
          conditions: '선택지는 진행 상황, 아이템 유무에 따라 다르게 제공'
        },
        puzzleTypes: {
          title: '3. 퍼즐 유형',
          cipher: '암호 해독 퍼즐',
          combination: '아이템 조합 퍼즐',
          matching: '숫자/색상 맞추기',
          clues: '단서 수집 및 연결',
          sequence: '시퀀스 퍼즐 (특정 순서대로 행동)'
        }
      }
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
      seoKeywords: '脱出ゲーム, テキストゲーム, パズル, アドベンチャー, 日本語ゲーム, オンラインゲーム',
      languageSelection: '言語選択',
      currentlySelected: '現在選択中',
      learnMore: '詳しく見る'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: 'テキストベースの脱出ゲームの世界へようこそ。様々なパズルと挑戦を通じて脱出の楽しさを体験してください！',
      aboutEscapeRoom: {
        title: '脱出ゲームとは？',
        description: 'テキストベースの脱出ゲームのコンセプトとサービスについて詳しく学びましょう。',
        learnMore: '詳しく見る'
      },
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
    goToMain: 'メインに移動',
      common: {
        back: '戻る',
        continue: '続ける',
        go_back: '戻る'
      },
      key: {
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
            use_key: '鍵を使用する',
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
      bookshelf_detail: {
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
          goToMain: 'メインに移動'
          }
        }
      },
      number: {
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
              go_back: '戻る',
              take_code: 'コードの紙を取る'
        }
      },
        code_input: {
        title: 'コード入力',
        description: '数字パッドがあります。コードの紙に書かれた数字を入力してください。',
        choices: {
            go_back: '戻る',
            enter_code: 'コードを入力する'
          }
        },
        escape: {
          title: '🎉 脱出成功！🎉',
          description: 'おめでとうございます！あなたはすべてのパズルを解決し、部屋から無事に脱出しました！あなたの探検精神と問題解決能力が輝きました。',
          choices: {
            goToMain: 'メインに移動'
          }
        }
      },
      color: {
        beginning: {
          title: '色の部屋',
          description: '様々な色の宝石がある部屋です。',
          choices: {
            collect_gems: '宝石を集める'
          }
        },
        gem_collection: {
          title: '宝石収集',
          description: '赤、青、緑、黄の宝石をすべて集めました。',
          choices: {
            go_back: '戻る',
            arrange_colors: '色の順序を合わせる'
          }
        },
        color_order: {
          title: '色の順序',
          description: '宝石を正しい順序で配置する必要があります。',
          choices: {
            go_back: '戻る',
            complete_order: '順序を完成させる'
          }
        },
        escape: {
          title: '🎉 脱出成功！🎉',
          description: 'おめでとうございます！あなたはすべてのパズルを解決し、部屋から無事に脱出しました！あなたの探検精神と問題解決能力が輝きました。',
          choices: {
            goToMain: 'メインに移動'
          }
        }
      },
      piece: {
        entrance: {
          title: 'パズル部屋',
          description: 'パズルのピースが散らばっている部屋です。',
          choices: {
            search_pieces: 'パズルのピースを探す'
          }
        },
        piece_search: {
          title: 'ピース収集',
          description: 'すべてのパズルのピースを見つけました。',
          choices: {
            go_back: '戻る',
            assemble_puzzle: 'パズルを組み立てる'
          }
        },
        puzzle_assembly: {
          title: 'パズル組み立て',
          description: 'パズルを完成させる必要があります。',
          choices: {
            go_back: '戻る',
            complete_puzzle: 'パズルを完成させる'
          }
        },
        escape: {
          title: '🎉 脱出成功！🎉',
          description: 'おめでとうございます！あなたはすべてのパズルを解決し、部屋から無事に脱出しました！あなたの探検精神と問題解決能力が輝きました。',
          choices: {
            goToMain: 'メインに移動'
          }
        }
      },
      study: {
        entrance: {
          title: '書斎の入口',
          description: 'あなたは古い書斎の入口に立っています。前に進むと本格的な書斎が広がります。',
          choices: {
            enter_study: '書斎に入る'
          }
        },
        study_room: {
          title: '古い書斎',
          description: 'あなたは古くて埃だらけの書斎に閉じ込められています。きしむ床、天井まで届く巨大な本棚、古い地図が覆われた机、そして固く閉じられた窓が見えます。片側の壁には灰が積もった暖炉があります。部屋を出る古い木の扉が正面に見えます。',
          choices: {
            explore_bookshelf: '巨大な本棚を詳しく調べる',
            explore_desk: '古い机を調べる',
            look_window: '窓を確認する',
            explore_fireplace: '灰が積もった暖炉を調べる',
            inspect_door_to_corridor: '古い木の扉を調べる'
          }
        },
        bookshelf_detail: {
          title: 'びっしり並んだ本棚',
          description: '数多くの古書と雑多なものが混在しています。本を一つずつ調べると、特に手垢のついた一冊が目立ちます。そして片側に奇妙に突き出た本があります。',
          choices: {
            pull_dusty_book: '埃のついた本を取り出す',
            push_protruding_book: '突き出た本を押し込む',
            back_to_study: '戻る'
          }
        },
        secret_compartment_bookshelf: {
          title: '本棚の秘密の区画',
          description: '本を押し込むと、本棚の後ろからガチャッという音がして小さな秘密の空間が現れました。中には色褪せた写真が一枚置かれています。',
          choices: {
            get_faded_photograph: '写真を取る',
            back_to_bookshelf: '戻る'
          }
        },
        desk_detail: {
          title: '古い机',
          description: '机の上にはインク瓶と羽ペンが置かれており、片隅には鍵のかかった引き出しがあります。引き出しの横には破れた地図の断片が見えます。',
          choices: {
            examine_locked_drawer: '鍵のかかった引き出しを開ける',
            get_map_piece_a: '破れた地図の断片Aを取る',
            back_to_study: '戻る'
          }
        },
        drawer_open_diary: {
          title: '開いた引き出し',
          description: '鍵を使って引き出しを開けると、古い日記帳が出てきます。',
          choices: {
            take_old_diary: '日記帳を取る',
            back_to_desk_from_open: '戻る'
          }
        },
        window_view: {
          title: '窓の外の景色',
          description: '固く閉じられた窓の外には茂った庭が見えます。遠くには霧が立ち込めて何も見えません。窓には薄い隙間があります。',
          choices: {
            use_gardening_shears_on_vines: '窓の外の蔦に園芸用はさみを使う',
            back_to_study: '戻る'
          }
        },
        window_vines_cleared: {
          title: '蔦が除去された窓',
          description: '園芸用はさみで窓を覆った蔦を切り取ると、蔦の間に隠されていた錆びた廊下の鍵が見えます！',
          choices: {
            get_corridor_key: '廊下の鍵を取る',
            back_to_window_from_cleared: '戻る'
          }
        },
        fireplace_detail: {
          title: '灰が積もった暖炉',
          description: '長い間使われていないようで灰が積もっています。すすが付いており、奥にはかすかに光る小さな物体が見えます。',
          choices: {
            reach_into_fireplace: '手を入れて物体を取り出す',
            back_to_study: '戻る'
          }
        },
        corridor_entrance: {
          title: '古い木の扉',
          description: 'この部屋を出る唯一の扉です。固く鍵がかかっています。横には古い錠前が付いています。扉の向こうには暗くて長い廊下がぼんやりと見えます。',
          choices: {
            try_to_open_main_door: '扉を開けようとする',
            back_to_study_from_door: '戻る'
          }
        },
        dark_corridor: {
          title: '暗い廊下',
          description: '古い扉を開けて出ると、光が一切ない暗い廊下が目の前に広がります。空気が冷たく陰気です。廊下の端には固く閉じられた別の扉が見えます。右側には小さな木箱が、左側には庭に出るような古い扉があります。',
          choices: {
            examine_end_door: '廊下の端の扉を調べる（応接室）',
            examine_wooden_box: '右側の木箱を調べる',
            examine_garden_door: '左側の古い扉を調べる（庭）',
            back_to_study_from_corridor: '書斎に戻る'
          }
        },
        corridor_box: {
          title: '廊下の木箱',
          description: '小さな木箱です。蓋には数字を入力する錠前が付いています。3桁の数字が必要そうです。',
          choices: {
            input_code_corridor_box: '数字を入力する（472）',
            back_to_corridor_from_box: '戻る'
          }
        },
        corridor_box_open: {
          title: '開いた木箱',
          description: '正解を入力すると箱が開きます。中には空の小さなガラス瓶が入っています。',
          choices: {
            get_empty_bottle: 'ガラス瓶を取る',
            back_to_corridor_from_box_open: '戻る'
          }
        },
        reception_room_entrance: {
          title: '応接室の入口',
          description: '廊下の端の扉を開けると広い応接室が現れます。埃の積もったソファと燭台が置かれたテーブル、そして大きな暖炉が目立ちます。片側には閉じられたカーテンがかかった窓が、もう片側には小さな扉があります。',
          choices: {
            examine_fireplace_reception: '応接室の暖炉を調べる',
            open_small_door: '小さな扉を開ける（食料品貯蔵庫）',
            open_curtains: 'カーテンを開ける',
            back_to_corridor_from_reception: '廊下に戻る'
          }
        },
        reception_fireplace_detail: {
          title: '応接室の暖炉',
          description: 'ここも灰が積もっていますが、何かがきらめいているのが見えます。灰を払うと古い園芸用はさみが出てきます。',
          choices: {
            get_gardening_shears: '園芸用はさみを取る',
            back_to_reception: '戻る'
          }
        },
        reception_window: {
          title: '応接室の窓',
          description: 'カーテンを開けると外の茂った庭が見えます。苔むした石垣が目に入り、隙間に何かが挟まっているようです。',
          choices: {
            investigate_stone_wall: '石垣の隙間を調べる',
            back_to_reception_from_window: '戻る'
          }
        },
        stone_wall_detail: {
          title: '苔むした石垣',
          description: '石垣の隙間を詳しく見ると、色褪せたステンドグラスの破片が埋まっています。慎重に取り出すことができそうです。',
          choices: {
            get_stained_glass_shard: 'ステンドグラスの破片を取る',
            back_to_reception_window: '戻る'
          }
        },
        pantry_room: {
          title: '食料品貯蔵庫',
          description: '狭くて暗い部屋です。棚には空の瓶とカビの生えた食べ物が置かれています。片側の壁に古いカレンダーが掛かっています。その横には地図が破れた跡があります。',
          choices: {
            search_map_spot: '地図が破れた跡を検索する',
            back_to_reception_from_pantry: '戻る'
          }
        },
        garden_path: {
          title: '荒れた庭の道',
          description: '扉を開けて出ると、全く手入れされていない荒れた庭が広がります。だらしなく続く土の道が遠くの閉じられた小さな小屋につながっています。道の途中には乾いた井戸が見えます。',
          choices: {
            go_to_shed: '小屋に向かう',
            examine_well: '乾いた井戸を調べる',
            back_to_corridor_from_garden: '廊下に戻る'
          }
        },
        dry_well: {
          title: '乾いた井戸',
          description: '井戸の中は完全に乾いています。底には何もありませんが、井戸の内側に突き出た鉄の棒があります。物を掛けることができそうです。',
          choices: {
            use_empty_bottle_on_bar: '鉄の棒に空のガラス瓶を掛ける',
            back_to_garden_from_well: '戻る'
          }
        },
        well_clue_revealed: {
          title: '井戸の中のヒント',
          description: 'ガラス瓶を鉄の棒に掛けると、ガラス瓶がぶら下がった反動で鉄の棒の下の隠された部分が開き、破れた地図の断片が現れます！',
          choices: {
            get_torn_map_piece_b_well: '破れた地図の断片Bを取る',
            back_to_well_from_clue: '戻る'
          }
        },
        garden_shed_entrance: {
          title: '古い小屋',
          description: '荒れた庭の端に古い木の小屋が立っています。扉は錠前で固く閉じられています。錠前には地図を入れることができる溝が見えます。',
          choices: {
            insert_map_pieces: '地図の断片を錠前の溝に入れる',
            back_to_garden_from_shed: '戻る'
          }
        },
        shed_open: {
          title: '開いた小屋',
          description: '地図の断片を合わせると、錠前が外れる音とともに小屋の扉が開きます。小屋の中には小さな扉があり、その扉の向こうから明るい光が漏れています！',
          choices: {
            enter_light: '明るい光の中に入る',
            back_to_shed_from_open: '戻る'
          }
        },
        escape: {
          title: '脱出成功！',
          description: '明るい光の中に入ると、あなたはついに小屋から抜け出しました！おめでとうございます！あなたは無事に脱出しました！',
          choices: {
            goToMain: 'メインに移動'
          }
        }
      }
    },
    items: {
      key: {
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
      number: {
        codePaper: {
          name: 'コードの紙',
          description: '計算機の後ろで発見したコードが書かれた紙です。'
        }
      },
      color: {
        redGem: {
          name: '赤い宝石',
          description: '赤い宝石です。'
        },
        blueGem: {
          name: '青い宝石',
          description: '青い宝石です。'
        },
        greenGem: {
          name: '緑の宝石',
          description: '緑の宝石です。'
        },
        yellowGem: {
          name: '黄色い宝石',
          description: '黄色い宝石です。'
        }
      },
      piece: {
        puzzlePiece1: {
          name: 'パズルのピース1',
          description: 'パズルの最初のピースです。'
        },
        puzzlePiece2: {
          name: 'パズルのピース2',
          description: 'パズルの2番目のピースです。'
        },
        puzzlePiece3: {
          name: 'パズルのピース3',
          description: 'パズルの3番目のピースです。'
        },
        puzzlePiece4: {
          name: 'パズルのピース4',
          description: 'パズルの4番目のピースです。'
        }
      },
      study: {
        dustyBook: {
          name: '埃のついた本',
          description: '長い間読まれていないようで埃がついた本です。'
        },
        fadedPhotograph: {
          name: '色褪せた写真',
          description: '古くなって色が褪せた写真です。'
        },
        studyKey: {
          name: '書斎の鍵',
          description: '書斎の引き出しを開けることができる鍵です。'
        },
        tornMapPieceA: {
          name: '破れた地図の断片A',
          description: '地図の一部が破れた断片です。'
        },
        oldDiary: {
          name: '古い日記帳',
          description: '古い日記帳です。'
        },
        corridorKey: {
          name: '廊下の鍵',
          description: '廊下に出る扉を開けることができる鍵です。'
        },
        emptyBottle: {
          name: '空のガラス瓶',
          description: '空の小さなガラス瓶です。'
        },
        gardeningShears: {
          name: '園芸用はさみ',
          description: '植物を切るのに使用するはさみです。'
        },
        stainedGlassShard: {
          name: 'ステンドグラスの破片',
          description: '色褪せたステンドグラスの破片です。'
        },
        tornMapPieceB: {
          name: '破れた地図の断片B',
          description: '地図の別の部分が破れた断片です。'
        }
      }
    },
    header: {
      gameSelection: 'ゲーム選択',
      progressLossWarning: 'ゲーム進行情報が失われます。本当にホームに移動しますか？'
    },
    about: {
      title: '脱出ゲームとは？',
      subtitle: 'テキストベースの脱出ゲームのコンセプトと特徴について詳しく学びましょう',
      whatIsEscapeRoom: {
        title: '脱出ゲームとは？',
        description: '脱出ゲームは参加者が特定の空間に閉じ込められた状況で、与えられた手がかりとパズルを解決して制限時間内に脱出するゲームです。',
        evolution: '元々はオフライン空間で実際に部屋に閉じ込められて脱出する形で始まりましたが、今ではボードゲーム、デジタルゲーム、テキストベースのゲームなど様々な形で発展しました。'
      },
      textEscapeRoom: {
        title: 'テキスト脱出ゲームのコンセプト',
        description: 'テキスト脱出ゲームは脱出ゲームの一形態で、すべての状況と手がかりがテキストで提供されるゲームです。',
        concept: 'プレイヤーは文章で描写された環境を想像しながらパズルを解いて脱出しなければなりません。'
      },
      keyFeatures: {
        title: '主な特徴',
        storytelling: {
          title: 'テキストベースのストーリーテリング',
          description: 'すべての状況と空間がテキストで描写される'
        },
        choices: {
          title: '選択肢ベースの進行',
          description: 'プレイヤーは提示された選択肢の中から行動を選択'
        },
        puzzles: {
          title: 'パズル解決',
          description: '暗号解読、アイテム組み合わせ、手がかり収集など様々なパズル要素'
        },
        inventory: {
          title: 'アイテム収集と活用',
          description: 'ゲーム内で獲得したアイテムを適切な状況で使用'
        },
        branching: {
          title: '分岐ストーリー',
          description: 'プレイヤーの選択によって異なる結果につながる構造'
        },
        genres: {
          title: '様々なジャンル適用',
          description: 'SF、ホラー、ファンタジーなど様々なジャンルと組み合わせ可能'
        }
      },
      advantages: {
        title: 'テキスト脱出ゲームの利点',
        imagination: {
          title: '想像力刺激',
          description: 'テキストだけで状況を描写するためプレイヤーの想像力を刺激'
        },
        development: {
          title: '開発の容易さ',
          description: 'グラフィックが不要で開発コストと時間が少なくて済む'
        },
        accessibility: {
          title: 'アクセシビリティ',
          description: '高性能機器が不要でほとんどのデバイスで動作可能'
        },
        story: {
          title: 'ストーリー中心',
          description: 'テキストベースのため深いストーリーテリングに集中可能'
        },
        versatility: {
          title: '様々なジャンル適用',
          description: 'SF、ホラー、ファンタジーなど様々なジャンルと組み合わせ可能'
        }
      },
      gameStructure: {
        title: 'テキスト脱出ゲームの構造',
        basic: {
          title: '1. 基本ゲーム画面構成',
          gameScreen: 'ゲーム画面（状況描写テキスト）',
          choices: '選択肢リスト',
          inventory: 'インベントリウィンドウ',
          memo: 'メモ帳（オプション）'
        },
        progression: {
          title: '2. ゲーム進行方式',
          situation: '状況はテキストで与えられる',
          actions: '行動は選択肢を通じて実行',
          conditions: '選択肢は進行状況、アイテムの有無によって異なる'
        },
        puzzleTypes: {
          title: '3. パズルタイプ',
          cipher: '暗号解読パズル',
          combination: 'アイテム組み合わせパズル',
          matching: '数字/色合わせ',
          clues: '手がかり収集と接続',
          sequence: 'シーケンスパズル（特定の順序で行動）'
        }
      }
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
      seoKeywords: 'escape room, text game, puzzle, adventure, online game, browser game',
      languageSelection: 'Language Selection',
      currentlySelected: 'Currently Selected',
      learnMore: 'Learn More'
    },
    home: {
      welcome: 'TEXT-ESCAPE',
      subtitle: 'Welcome to the world of text-based escape room games. Experience the thrill of escape through various puzzles and challenges!',
      aboutEscapeRoom: {
        title: 'What is Escape Room?',
        description: 'Learn more about the concept and service of text-based escape room games.',
        learnMore: 'Learn More'
      },
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
    goToMain: 'Go to Main',
      common: {
        back: 'Go Back',
        continue: 'Continue',
        go_back: 'Go Back'
      },
      key: {
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
            use_key: 'Use the key',
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
      bookshelf_detail: {
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
          goToMain: 'Go to Main'
          }
        }
      },
      number: {
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
              go_back: 'Go Back',
              take_code: 'Take the code paper'
        }
      },
        code_input: {
        title: 'Code Input',
        description: 'There is a number pad. Enter the number written on the code paper.',
        choices: {
            go_back: 'Go Back',
            enter_code: 'Enter the code'
          }
        },
        escape: {
          title: '🎉 Escape Success! 🎉',
          description: 'Congratulations! You have solved all the puzzles and successfully escaped from the room! Your exploration spirit and problem-solving skills have shone.',
          choices: {
            goToMain: 'Go to Main'
          }
        }
      },
      color: {
        beginning: {
          title: 'Color Room',
          description: 'A room with various colored gems.',
          choices: {
            collect_gems: 'Collect gems'
          }
        },
        gem_collection: {
          title: 'Gem Collection',
          description: 'You have collected all the red, blue, green, and yellow gems.',
          choices: {
            go_back: 'Go Back',
            arrange_colors: 'Arrange colors in order'
          }
        },
        color_order: {
          title: 'Color Order',
          description: 'You need to arrange the gems in the correct order.',
          choices: {
            go_back: 'Go Back',
            complete_order: 'Complete the order'
          }
        },
        escape: {
          title: '🎉 Escape Success! 🎉',
          description: 'Congratulations! You have solved all the puzzles and successfully escaped from the room! Your exploration spirit and problem-solving skills have shone.',
          choices: {
            goToMain: 'Go to Main'
          }
        }
      },
      piece: {
        entrance: {
          title: 'Puzzle Room',
          description: 'A room with scattered puzzle pieces.',
          choices: {
            search_pieces: 'Search for puzzle pieces'
          }
        },
        piece_search: {
          title: 'Piece Collection',
          description: 'You have found all the puzzle pieces.',
          choices: {
            go_back: 'Go Back',
            assemble_puzzle: 'Assemble the puzzle'
          }
        },
        puzzle_assembly: {
          title: 'Puzzle Assembly',
          description: 'You need to complete the puzzle.',
          choices: {
            go_back: 'Go Back',
            complete_puzzle: 'Complete the puzzle'
          }
        },
        escape: {
          title: '🎉 Escape Success! 🎉',
          description: 'Congratulations! You have solved all the puzzles and successfully escaped from the room! Your exploration spirit and problem-solving skills have shone.',
          choices: {
            goToMain: 'Go to Main'
          }
        }
      },
      study: {
        entrance: {
          title: 'Study Entrance',
          description: 'You are standing at the entrance of an old study. Moving forward reveals a full study.',
          choices: {
            enter_study: 'Enter the study'
          }
        },
        study_room: {
          title: 'Old Study',
          description: 'You are trapped in an old, dusty study. You see creaking floors, a massive bookshelf reaching to the ceiling, an old desk covered with maps, and tightly closed windows. On one wall is a fireplace filled with ashes. An old wooden door to leave the room is visible in front.',
          choices: {
            explore_bookshelf: 'Examine the massive bookshelf closely',
            explore_desk: 'Examine the old desk',
            look_window: 'Check the window',
            explore_fireplace: 'Investigate the ash-filled fireplace',
            inspect_door_to_corridor: 'Examine the old wooden door'
          }
        },
        bookshelf_detail: {
          title: 'Crowded Bookshelf',
          description: 'Numerous old books and miscellaneous items are mixed together. Looking through the books one by one, one particularly worn book stands out. And there is one book strangely protruding on one side.',
          choices: {
            pull_dusty_book: 'Pull out the dusty book',
            push_protruding_book: 'Push in the protruding book',
            back_to_study: 'Go Back'
          }
        },
        secret_compartment_bookshelf: {
          title: 'Secret Compartment in Bookshelf',
          description: 'Pushing the book in, you hear a click from behind the bookshelf and a small secret space appears. Inside is a faded photograph.',
          choices: {
            get_faded_photograph: 'Take the photograph',
            back_to_bookshelf: 'Go Back'
          }
        },
        desk_detail: {
          title: 'Old Desk',
          description: 'On the desk are an ink bottle and a quill pen, and in one corner is a locked drawer. Beside the drawer is a torn map piece.',
          choices: {
            examine_locked_drawer: 'Open the locked drawer',
            get_map_piece_a: 'Take the torn map piece A',
            back_to_study: 'Go Back'
          }
        },
        drawer_open_diary: {
          title: 'Opened Drawer',
          description: 'Using the key to open the drawer reveals an old diary.',
          choices: {
            take_old_diary: 'Take the diary',
            back_to_desk_from_open: 'Go Back'
          }
        },
        window_view: {
          title: 'Window View',
          description: 'Outside the tightly closed window is a lush garden. In the distance, fog is so thick that nothing is visible. There is a thin gap in the window.',
          choices: {
            use_gardening_shears_on_vines: 'Use gardening shears on the vines outside the window',
            back_to_study: 'Go Back'
          }
        },
        window_vines_cleared: {
          title: 'Window with Vines Cleared',
          description: 'Cutting the vines covering the window with gardening shears reveals a rusty corridor key hidden between the vines!',
          choices: {
            get_corridor_key: 'Take the corridor key',
            back_to_window_from_cleared: 'Go Back'
          }
        },
        fireplace_detail: {
          title: 'Ash-filled Fireplace',
          description: 'It seems unused for a long time and is filled with ashes. It is sooty, and inside is a faintly glowing small object.',
          choices: {
            reach_into_fireplace: 'Reach in and take out the object',
            back_to_study: 'Go Back'
          }
        },
        corridor_entrance: {
          title: 'Old Wooden Door',
          description: 'This is the only door to leave the room. It is tightly locked. Beside it is an old lock. Beyond the door is a dimly visible dark and long corridor.',
          choices: {
            try_to_open_main_door: 'Try to open the door',
            back_to_study_from_door: 'Go Back'
          }
        },
        dark_corridor: {
          title: 'Dark Corridor',
          description: 'Opening the old door and stepping out, a completely lightless dark corridor spreads before your eyes. The air is cold and gloomy. At the end of the corridor is another tightly closed door. On the right is a small wooden box, and on the left is an old door that seems to lead to the garden.',
          choices: {
            examine_end_door: 'Examine the door at the end of the corridor (Reception Room)',
            examine_wooden_box: 'Examine the wooden box on the right',
            examine_garden_door: 'Examine the old door on the left (Garden)',
            back_to_study_from_corridor: 'Return to the study'
          }
        },
        corridor_box: {
          title: 'Corridor Wooden Box',
          description: 'A small wooden box. The lid has a lock for entering numbers. It seems to need a three-digit number.',
          choices: {
            input_code_corridor_box: 'Enter the number (472)',
            back_to_corridor_from_box: 'Go Back'
          }
        },
        corridor_box_open: {
          title: 'Opened Wooden Box',
          description: 'Entering the correct answer opens the box. Inside is an empty small glass bottle.',
          choices: {
            get_empty_bottle: 'Take the glass bottle',
            back_to_corridor_from_box_open: 'Go Back'
          }
        },
        reception_room_entrance: {
          title: 'Reception Room Entrance',
          description: 'Opening the door at the end of the corridor reveals a spacious reception room. Dusty sofas, a table with candlesticks, and a large fireplace are visible. On one side is a window with closed curtains, and on the other side is a small door.',
          choices: {
            examine_fireplace_reception: 'Examine the reception room fireplace',
            open_small_door: 'Open the small door (Pantry)',
            open_curtains: 'Open the curtains',
            back_to_corridor_from_reception: 'Return to the corridor'
          }
        },
        reception_fireplace_detail: {
          title: 'Reception Room Fireplace',
          description: 'This place also has accumulated ashes, but something is sparkling. Brushing away the ashes reveals old gardening shears.',
          choices: {
            get_gardening_shears: 'Take the gardening shears',
            back_to_reception: 'Go Back'
          }
        },
        reception_window: {
          title: 'Reception Room Window',
          description: 'Opening the curtains reveals the lush garden outside. Moss-covered stone walls are visible, and something seems to be stuck in the gaps.',
          choices: {
            investigate_stone_wall: 'Investigate the gaps in the stone wall',
            back_to_reception_from_window: 'Go Back'
          }
        },
        stone_wall_detail: {
          title: 'Moss-covered Stone Wall',
          description: 'Looking closely at the gaps in the stone wall, a faded stained glass shard is embedded. It can be carefully removed.',
          choices: {
            get_stained_glass_shard: 'Take the stained glass shard',
            back_to_reception_window: 'Go Back'
          }
        },
        pantry_room: {
          title: 'Pantry',
          description: 'A narrow and dark room. Shelves contain empty bottles and moldy food. An old calendar hangs on one wall. Beside it is where a map was torn.',
          choices: {
            search_map_spot: 'Search the spot where the map was torn',
            back_to_reception_from_pantry: 'Go Back'
          }
        },
        garden_path: {
          title: 'Desolate Garden Path',
          description: 'Opening the door and stepping out reveals a completely unmaintained desolate garden. A poorly connected dirt path leads to a closed small shed in the distance. In the middle of the path is a dry well.',
          choices: {
            go_to_shed: 'Head to the shed',
            examine_well: 'Examine the dry well',
            back_to_corridor_from_garden: 'Return to the corridor'
          }
        },
        dry_well: {
          title: 'Dry Well',
          description: 'The well is completely dry inside. There is nothing at the bottom, but there is a protruding iron bar inside the well. It seems you can hang something on it.',
          choices: {
            use_empty_bottle_on_bar: 'Hang the empty glass bottle on the iron bar',
            back_to_garden_from_well: 'Go Back'
          }
        },
        well_clue_revealed: {
          title: 'Well Clue',
          description: 'Hanging the glass bottle on the iron bar, the reaction of the hanging bottle opens a hidden part below the iron bar, revealing a torn map piece!',
          choices: {
            get_torn_map_piece_b_well: 'Take the torn map piece B',
            back_to_well_from_clue: 'Go Back'
          }
        },
        garden_shed_entrance: {
          title: 'Old Shed',
          description: 'At the end of the desolate garden stands an old wooden shed. The door is tightly locked. The lock has a groove where a map can be inserted.',
          choices: {
            insert_map_pieces: 'Insert the map pieces into the lock groove',
            back_to_garden_from_shed: 'Go Back'
          }
        },
        shed_open: {
          title: 'Opened Shed',
          description: 'Matching the map pieces, the lock clicks and the shed door opens. Inside the shed is a small door, and bright light leaks from beyond that door!',
          choices: {
            enter_light: 'Enter the bright light',
            back_to_shed_from_open: 'Go Back'
          }
        },
        escape: {
          title: 'Escape Success!',
          description: 'Entering the bright light, you have finally escaped from the shed! Congratulations! You have successfully escaped!',
          choices: {
            goToMain: 'Go to Main'
          }
        }
      }
    },
    items: {
      key: {
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
      number: {
        codePaper: {
          name: 'Code Paper',
          description: 'A piece of paper with a code found behind the calculator.'
        }
      },
      color: {
        redGem: {
          name: 'Red Gem',
          description: 'A red gem.'
        },
        blueGem: {
          name: 'Blue Gem',
          description: 'A blue gem.'
        },
        greenGem: {
          name: 'Green Gem',
          description: 'A green gem.'
        },
        yellowGem: {
          name: 'Yellow Gem',
          description: 'A yellow gem.'
        }
      },
      piece: {
        puzzlePiece1: {
          name: 'Puzzle Piece 1',
          description: 'The first piece of the puzzle.'
        },
        puzzlePiece2: {
          name: 'Puzzle Piece 2',
          description: 'The second piece of the puzzle.'
        },
        puzzlePiece3: {
          name: 'Puzzle Piece 3',
          description: 'The third piece of the puzzle.'
        },
        puzzlePiece4: {
          name: 'Puzzle Piece 4',
          description: 'The fourth piece of the puzzle.'
        }
      },
      study: {
        dustyBook: {
          name: 'Dusty Book',
          description: 'A book that seems unread for a long time and is covered in dust.'
        },
        fadedPhotograph: {
          name: 'Faded Photograph',
          description: 'An old photograph that has faded over time.'
        },
        studyKey: {
          name: 'Study Key',
          description: 'A key that can open the study drawer.'
        },
        tornMapPieceA: {
          name: 'Torn Map Piece A',
          description: 'A torn piece of a map.'
        },
        oldDiary: {
          name: 'Old Diary',
          description: 'An old diary.'
        },
        corridorKey: {
          name: 'Corridor Key',
          description: 'A key that can open the door to the corridor.'
        },
        emptyBottle: {
          name: 'Empty Bottle',
          description: 'An empty small glass bottle.'
        },
        gardeningShears: {
          name: 'Gardening Shears',
          description: 'Shears used for cutting plants.'
        },
        stainedGlassShard: {
          name: 'Stained Glass Shard',
          description: 'A faded stained glass shard.'
        },
        tornMapPieceB: {
          name: 'Torn Map Piece B',
          description: 'Another torn piece of a map.'
        }
      }
    },
    header: {
      gameSelection: 'Game Selection',
      progressLossWarning: 'Game progress will be lost. Are you sure you want to go to home?'
    },
    about: {
      title: 'What is Escape Room?',
      subtitle: 'Learn more about the concept and features of text-based escape room games',
      whatIsEscapeRoom: {
        title: 'What is Escape Room?',
        description: 'Escape room is a game where participants solve given clues and puzzles to escape within a time limit while trapped in a specific space.',
        evolution: 'Originally started as a form where people were actually trapped in rooms in offline spaces, it has now evolved into various forms such as board games, digital games, and text-based games.'
      },
      textEscapeRoom: {
        title: 'Text Escape Room Game Concept',
        description: 'Text escape room is a form of escape room game where all situations and clues are provided through text.',
        concept: 'Players must imagine the environment described in text and solve puzzles to escape.'
      },
      keyFeatures: {
        title: 'Key Features',
        storytelling: {
          title: 'Text-based Storytelling',
          description: 'All situations and spaces are described through text'
        },
        choices: {
          title: 'Choice-based Progression',
          description: 'Players choose actions from presented choices'
        },
        puzzles: {
          title: 'Puzzle Solving',
          description: 'Various puzzle elements such as cipher decoding, item combination, clue collection'
        },
        inventory: {
          title: 'Item Collection and Usage',
          description: 'Use items acquired in the game in appropriate situations'
        },
        branching: {
          title: 'Branching Story',
          description: 'Structure where player choices lead to different outcomes'
        },
        genres: {
          title: 'Various Genre Applications',
          description: 'Can be combined with various genres such as SF, horror, fantasy'
        }
      },
      advantages: {
        title: 'Advantages of Text Escape Room',
        imagination: {
          title: 'Imagination Stimulation',
          description: 'Stimulates player imagination by describing situations through text only'
        },
        development: {
          title: 'Easy Development',
          description: 'Low development cost and time as graphics are not required'
        },
        accessibility: {
          title: 'Accessibility',
          description: 'Can run on most devices without requiring high-performance equipment'
        },
        story: {
          title: 'Story-focused',
          description: 'Can focus on deep storytelling as it is text-based'
        },
        versatility: {
          title: 'Various Genre Applications',
          description: 'Can be combined with various genres such as SF, horror, fantasy'
        }
      },
      gameStructure: {
        title: 'Text Escape Room Game Structure',
        basic: {
          title: '1. Basic Game Screen Composition',
          gameScreen: 'Game screen (situation description text)',
          choices: 'Choice list',
          inventory: 'Inventory window',
          memo: 'Memo pad (optional)'
        },
        progression: {
          title: '2. Game Progression Method',
          situation: 'Situations are given through text',
          actions: 'Actions are performed through choices',
          conditions: 'Choices are provided differently based on progress and item availability'
        },
        puzzleTypes: {
          title: '3. Puzzle Types',
          cipher: 'Cipher decoding puzzles',
          combination: 'Item combination puzzles',
          matching: 'Number/color matching',
          clues: 'Clue collection and connection',
          sequence: 'Sequence puzzles (actions in specific order)'
        }
      }
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