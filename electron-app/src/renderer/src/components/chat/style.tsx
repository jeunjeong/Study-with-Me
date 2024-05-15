import { css, keyframes } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
    fixed bottom-3 right-3
  `,
  css`
    width: 50px;
    height: 50px;
  `
])

export const ChatRoomdiv = styled.div(({ show }: { show?: boolean }) => [
  tw`
    fixed right-0 top-0
  `,
  css`
    width: 350px;
    height: 100%;
    background: white;
    animation: ${show ? slideIn : slideOut} 0.5s forwards;
  `
])

export const ChatRoomClose = styled.button(() => [
  tw` 
  `,
  css`
    color: black;
  `
])

// ChatRoomdiv가 나타나는 애니메이션
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

// ChatRoomdiv가 사라지는 애니메이션
const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`
