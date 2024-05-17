import { css, keyframes } from '@emotion/react'
import tw, { styled } from 'twin.macro'

const disableTextDrag = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
const disableImageDrag = css`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`
const resetFont = css`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`
const positionCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
const scrollBar = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 5px;
  }

  /* ::-webkit-scrollbar-track {
    background-color: transparent;
  } */

  ::-webkit-scrollbar-thumb:hover {
    background-color: #d9d9d9;
  }
`

export const Icon = styled.img(() => [
  tw`absolute right-4 bottom-4
  `,
  css`
    ${disableImageDrag}
    width: 64px;
    height: 64px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      filter: opacity(0.6) drop-shadow(0 0 0 #000000);
    }
  `
])

export const Container = styled.div(({ show = 0 }: { show?: number }) => [
  tw`
    fixed  top-0
  `,
  css`
    right: -30vw;
    width: 30vw;
    height: 100vh;
    background-color: #d9d9d9;

    animation: ${show === 0 ? noAmin : show === 1 ? slideIn : slideOut} 0.5s forwards;
    box-shadow: ${show === 1 ? '-2px 0 4px rgba(0, 0, 0, 0.5)' : 'none'};

    ${positionCenter};
    flex-direction: column;
  `
])

export const Header = styled.div(() => [
  tw`
  `,
  css`
    /* position: absolute;
    top: 0; */
    width: 100%;
    height: 32px;
    background-color: #4a4a4a;
    display: flex;
  `
])

export const HeaderButton = styled.button(() => [
  tw``,
  css`
    ${positionCenter}
    background: none;
    border: none;
    transition: 0.1s ease;
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  `
])

export const BackButton = styled(HeaderButton)(() => [
  tw``,
  css`
    margin-right: auto;
  `
])
export const CloseButton = styled(HeaderButton)(() => [
  tw``,
  css`
    margin-left: auto;
  `
])

export const HeaderIcon = styled.img(() => [
  tw``,
  css`
    ${disableImageDrag}
    width: 20px;
  `
])

export const GroupList = styled.div(() => [
  tw``,
  css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;
    ${scrollBar}
  `
])

export const GroupCard = styled.div(() => [
  tw``,
  css`
    ${disableTextDrag}
    width: 100%;
    background-color: #fff;

    height: 64px;

    display: flex;
    align-items: center;

    /* margin: 0 8px; */
    transition: 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #d9d9d9;
    }
  `
])

export const GroupImage = styled.img(() => [
  tw``,
  css`
    ${disableImageDrag}
    width: 48px;
    height: 48px;
    border-radius: 10px;
    margin: 0 8px;
  `
])

export const ChatSummary = styled.div(() => [
  tw``,
  css`
    display: flex;
    flex-direction: column;
    width: 80%;
    overflow: hidden;
  `
])

export const GroupName = styled.p(() => [
  tw``,
  css`
    ${resetFont}
    font-size: 0.8rem;
    font-weight: 600;
  `
])
export const GroupText = styled.p(() => [
  tw``,
  css`
    ${resetFont}

    color:#4A4A4A;
    font-size: 0.8rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 1vw;
  `
])

export const GroupStatus = styled.div(() => [
  tw``,
  css`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 16px;
    margin-right: 8px;
  `
])

export const UnreadMessage = styled.p(() => [
  tw``,
  css`
    ${resetFont}
    display: inline;
    background-color: red;
    color: #ffffff;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    padding: 0 0.4rem;
    border-radius: 15px;
  `
])
export const Time = styled.p(() => [
  tw``,
  css`
    ${resetFont}
    color:#4A4A4A;
    font-size: 0.6rem;
    white-space: nowrap;
  `
])

const slideOut = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideIn = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`
const noAmin = keyframes`

`
