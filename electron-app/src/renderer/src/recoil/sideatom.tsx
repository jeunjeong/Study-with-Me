import { atom } from 'recoil'
import icon from './icon.png'

export const Pagestate = atom({
  key: 'Pagestate',
  default: 'main'
})

export const mygrouplist = atom({
  key: 'mygrouplist',
  default: [
    ['1', 'Astudy', icon],
    ['2', 'Bstudy', icon],
    ['3', 'Cstudy', icon],
    ['4', 'Dstudy', icon],
    ['5', 'Estudy', icon]
  ]
  //group code, group name, group img
})

export const attendGroupModal = atom({
  key: 'attendGroupModal',
  default: false
})

export const settingsModal = atom({
  key: 'settingsModal',
  default: false
})
