import '@emotion/react'

type themeId = 'dark' | 'light'

declare module '@emotion/react' {
  export interface Theme {
    [key in themeId]: {
      mainBgColor: string
      subBgColor: string
      statusBarColor: string
      sideBarColor: string
      borderColor: string
      mainTextColor: string
      subTextColor: string
    }
  }
}
