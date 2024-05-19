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

    animation: ${show === 0 ? noAnim : show === 1 ? slideIn : slideOut} 0.5s forwards;
    box-shadow: ${show === 1 ? '-2px 0 4px rgba(0, 0, 0, 0.5)' : 'none'};

    ${positionCenter};
    flex-direction: column;
  `
])

export const Header = styled.div(() => [
  tw`
  `,
  css`
    width: 100%;
    min-height: 32px;
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

export const Content = styled.div(() => [
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

    min-height: 64px;

    display: flex;
    align-items: center;

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

export const ChatHeader = styled.div(() => [
  tw``,
  css`
    ${disableTextDrag}

    position: relative;
    top: 0;
    min-height: 64px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: row;
    align-items: center;
  `
])

export const MemberInfoText = styled.p(() => [
  tw``,
  css`
    ${resetFont}
    color:#4A4A4A;
    font-size: 0.6rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 1vw;
  `
])

export const ChatBox = styled.form(() => [
  tw``,
  css`
    background-color: #fff;
    border: none;
    width: 100%;
    padding: 0;
    margin-top: auto;
    display: flex;
    flex-direction: column;

    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  `
])
export const ChatInput = styled.textarea(() => [
  tw``,
  css`
    height: 8vh;
    border: none;
    border-radius: 0;
    resize: none;
    padding: 3%;
    font-size: 0.8rem;
    color: #4a4a4a;
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #818181;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #d9d9d9;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #d9d9d9;
    }
  `
])
export const SendButton = styled.button(() => [
  tw``,
  css`
    color: #fff;
    width: 48px;
    text-transform: uppercase;
    text-decoration: none;
    background: #4a4a4a;
    display: inline-block;
    border: none;
    margin-left: auto;
    padding: 4px;
    font-size: 0.8rem;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 4px;

    cursor: pointer;
    &:disabled {
      background-color: #ccc;
      color: #999;
      cursor: default;
    }
  `
])

export const MessageLogContaner = styled.div(() => [
  tw``,
  css`
    ${scrollBar}
    height: 100%;
    overflow-y: auto;
    width: 100%;
    flex: auto;
    padding: 5% 0;
  `
])

const messageContainer = css`
  display: flex;
  padding: 0 0.5vw;
  margin-bottom: 8px;
`
const messageBox = css`
  border-radius: 8px;
  padding: 5px 8px;
  color: black;
  margin-top: 4px;
  display: inline-block;
  max-width: 12vw;
`

export const SentByCurrentUser = styled.div(() => [
  tw``,
  css`
    ${messageContainer}
    justify-content: flex-end;
  `
])

export const SentByOtherUser = styled.div(() => [
  tw``,
  css`
    ${messageContainer}
    justify-content: flex-start;
  `
])

export const CurrentUserMessageBox = styled.div(() => [
  tw``,
  css`
    ${messageBox}
    background-color: #ffffff;
  `
])
export const OtherUserMessageBox = styled.div(() => [
  tw``,
  css`
    ${messageBox}
    background-color: #ffffff;
  `
])

export const OtherUserMessageWrapper = styled.div(() => [
  tw``,
  css`
    display: flex;
    flex-direction: column;
  `
])

export const MessageText = styled.p(() => [
  tw``,
  css`
    ${resetFont}
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 0.8rem;
    font-weight: 100;
    word-wrap: break-word;
  `
])

export const MessageName = styled(MessageText)(() => [
  tw``,
  css`
    ${disableTextDrag}
  `
])

export const UserImage = styled.img(() => [
  tw``,
  css`
    ${disableImageDrag}
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 8px;
    margin-top: 4px;
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
const noAnim = keyframes`

`
