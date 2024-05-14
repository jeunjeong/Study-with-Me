import { atom } from 'recoil'
import icon from './icon.png'

export const selectedGroup = atom({
  key: 'selectedGroup',
  default: 0
})

export const mygrouplist = atom({
  key: 'mygrouplist',
  default: [icon, icon, icon, icon, icon, icon]
  //group img
})

export const attendGroupModal = atom({
  key: 'attendGroupModal',
  default: false
})

export const settingsModal = atom({
  key: 'settingsModal',
  default: false
})
