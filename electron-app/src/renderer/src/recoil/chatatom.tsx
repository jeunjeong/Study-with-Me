import { atom } from 'recoil'
import { Socket } from 'socket.io-client'

export const socketState = atom<Socket | null>({
  key: 'socketState',
  default: null
})

export const chatRoomState = atom<number>({
  key: 'chatRoomState',
  default: 0
})

export const activatedChatState = atom<number>({
  key: 'activatedChatState',
  default: 0
})
