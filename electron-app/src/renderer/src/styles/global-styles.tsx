// src/styles/GlobalStyles.tsx
import React from 'react'
import { Global } from '@emotion/react'
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro'

// @renderer == src/renderer/src, Checkout electron.vite.config.ts
import '@renderer/assets/main.css'

const customStyles = css({
  input: {
    backgroundColor: 'var(--color-background)' // Change Here
  },
  body: {
    ...tw`antialiased`
  }
})

const GlobalStyles = (): JSX.Element => (
  <React.Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </React.Fragment>
)

export default GlobalStyles
