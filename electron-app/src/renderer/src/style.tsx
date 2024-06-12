import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
    h-screen w-screen
  `,
  css`
    display: flex;
  `
])

export const Content = styled.div(() => [
  tw`
  `,
  css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `
])
