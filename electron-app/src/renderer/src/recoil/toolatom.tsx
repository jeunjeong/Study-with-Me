import { atom } from 'recoil'

export const mainToolState = atom({
  key: 'mainToolState',
  default: 0
})

export const gridWindowState = atom({
  key: 'gridWindowState',
  default: []
})
