import { css, keyframes } from '@emotion/react'
import tw, { styled } from 'twin.macro'
interface ContainerProps {
  showChatRoom?: boolean
  isClosing?: boolean
}
export const Container = styled.div<ContainerProps>(({ showChatRoom, isClosing }) => [
  tw`
    fixed bottom-0 right-0
  `,
  css`
    background-color: black;
    color: white;
    width: 350px;
    height: 100%;
    right: ${showChatRoom ? '350px' : '0'};
    animation: ${isClosing ? slideOut : slideIn} 0.5s forwards;
    transition: right 0.4s ease-out;
  `
])

export const Img = styled.img(() => [
  tw`
    rounded-full m-7 mt-12
  `,
  css`
    width: 130px;
    height: 130px;
  `
])

export const ContentBox = styled.div(() => [
  tw` 
    flex flex-col items-center
  `,
  css`
    height: 100%;
  `
])

export const CloseButton = styled.div(() => [
  tw` 
    flex justify-end
  `,
  css`
    color: white;
    cursor: pointer;
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
