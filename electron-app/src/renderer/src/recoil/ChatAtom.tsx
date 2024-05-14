import { atom } from 'recoil'

export const chatRoomState = atom({
  key: 'chatRoomState', // 고유한 key
  default: false // 기본값은 닫혀있음을 나타냄
})
