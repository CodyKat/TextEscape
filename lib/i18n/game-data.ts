import { getLanguage } from './language'

// 한국어 게임 데이터
import { GAME_ROOMS as GAME_ROOMS_KO, GAME_ITEMS as GAME_ITEMS_KO, getRoom as getRoomKO, getItem as getItemKO } from './game-data-ko'

// 일본어 게임 데이터
import { GAME_ROOMS as GAME_ROOMS_JA, GAME_ITEMS as GAME_ITEMS_JA, getRoom as getRoomJA, getItem as getItemJA } from './game-data-ja'

// 영어 게임 데이터
import { GAME_ROOMS as GAME_ROOMS_EN, GAME_ITEMS as GAME_ITEMS_EN, getRoom as getRoomEN, getItem as getItemEN } from './game-data-en'

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

// 언어별 게임 데이터 매핑
const GAME_ROOMS_BY_LANG = {
  ko: GAME_ROOMS_KO,
  ja: GAME_ROOMS_JA,
  en: GAME_ROOMS_EN,
}

const GAME_ITEMS_BY_LANG = {
  ko: GAME_ITEMS_KO,
  ja: GAME_ITEMS_JA,
  en: GAME_ITEMS_EN,
}

const GET_ROOM_BY_LANG = {
  ko: getRoomKO,
  ja: getRoomJA,
  en: getRoomEN,
}

const GET_ITEM_BY_LANG = {
  ko: getItemKO,
  ja: getItemJA,
  en: getItemEN,
}

// 현재 언어에 따른 게임 데이터 반환
export const getGameRooms = () => {
  const lang = getLanguage()
  return GAME_ROOMS_BY_LANG[lang] || GAME_ROOMS_KO
}

export const getGameItems = () => {
  const lang = getLanguage()
  return GAME_ITEMS_BY_LANG[lang] || GAME_ITEMS_KO
}

export const getRoom = (roomId: string): Room | null => {
  const lang = getLanguage()
  const getRoomFunc = GET_ROOM_BY_LANG[lang] || getRoomKO
  return getRoomFunc(roomId)
}

export const getItem = (itemId: string): Item | null => {
  const lang = getLanguage()
  const getItemFunc = GET_ITEM_BY_LANG[lang] || getItemKO
  return getItemFunc(itemId)
}

// 기본 내보내기 (기존 코드와의 호환성을 위해)
export const GAME_ROOMS = getGameRooms()
export const GAME_ITEMS = getGameItems() 