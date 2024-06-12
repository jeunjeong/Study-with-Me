import { atom } from 'recoil'

export const chatRoomState = atom({
  key: 'chatRoomState',
  default: 0
})

export const activatedChatState = atom({
  key: 'activatedChatState',
  default: 0
})
