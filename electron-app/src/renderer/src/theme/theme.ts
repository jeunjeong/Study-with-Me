export interface Theme {
  mainBgColor: string
  subBgColor: string
  statusBarColor: string
  sideBarColor: string
  borderColor: string
  mainTextColor: string
  subTextColor: string
  hoverColor: string
}

interface ThemeGroup {
  light: Theme
  dark: Theme
}

export const dark: Theme = {
  mainBgColor: '#fff',
  subBgColor: '#e1e1e1',
  statusBarColor: '#4a4a4a',
  sideBarColor: '#4a4a4a',
  borderColor: '#fff',
  mainTextColor: '#000',
  subTextColor: '#818181',
  hoverColor: '#d9d9d9'
}

export const light: Theme = {
  mainBgColor: '#000',
  subBgColor: '#000',
  statusBarColor: '#000',
  sideBarColor: '#000',
  borderColor: '#000',
  mainTextColor: '#000',
  subTextColor: '#000',
  hoverColor: '#d9d9d9'
}

const mode: ThemeGroup = {
  light,
  dark
}

export default mode
