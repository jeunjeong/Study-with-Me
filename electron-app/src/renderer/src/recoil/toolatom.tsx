import { atom } from 'recoil'
interface Component {
  id: number
  type: string
  col: number
  row: number
}
export const mainToolState = atom({
  key: 'mainToolState',
  default: 0
})

export const gridWindowState = atom<Component[]>({
  key: 'gridWindowState',
  default: []
})

export const rowcolState = atom({
  key: 'rowcolState',
  default: {
    row: 0,
    col: 0
  }
})
