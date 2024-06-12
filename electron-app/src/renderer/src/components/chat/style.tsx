import { css, keyframes, useTheme } from '@emotion/react'
import tw, { styled } from 'twin.macro'
import { Theme } from '../../theme/theme'

// const theme = useTheme() as Theme

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
const scrollBar = () => {
  const theme = useTheme() as Theme

  return css`
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${theme.sideBarColor};
      border-radius: 5px;
    }

    /* ::-webkit-scrollbar-track {
    background-color: transparent;
  } */

    ::-webkit-scrollbar-thumb:hover {
      background-color: #d9d9d9;
    }
  `
}

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

export const Container = styled.div(({ show = 0 }: { show?: number }) => {
  const theme = useTheme() as Theme

  return [
    tw`
      fixed  top-0
    `,
    css`
      right: -30vw;
      width: 30vw;
      height: 100vh;
      background-color: ${theme.subBgColor};

      animation: ${show === 0 ? noAnim : show === 1 ? slideIn : slideOut} 0.5s forwards;
      box-shadow: ${show === 1 ? '-2px 0 4px rgba(0, 0, 0, 0.5)' : 'none'};

      ${positionCenter};
      flex-direction: column;
    `
  ]
})

export const Header = styled.div(() => {
  const theme = useTheme() as Theme
  // console.log('Current theme:', theme)

  return [
    tw``,
    css`
      width: 100%;
      min-height: 32px;
      background-color: ${theme.statusBarColor};
      display: flex;
    `
  ]
})

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
    ${scrollBar()}
  `
])

export const GroupCard = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${disableTextDrag}
      width: 100%;
      background-color: ${theme.mainBgColor};

      min-height: 64px;

      display: flex;
      align-items: center;

      transition: 0.2s ease;
      cursor: pointer;
      &:hover {
        background-color: ${theme.hoverColor};
      }
    `
  ]
})

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

export const GroupName = styled.p(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${resetFont}
      color:${theme.mainTextColor};
      font-size: 0.8rem;
      font-weight: 600;
    `
  ]
})
export const GroupText = styled.p(() => {
  const theme = useTheme() as Theme
  return [
    tw``,
    css`
      ${resetFont}
      color:#4A4A4A;
      color: ${theme.subTextColor};

      font-size: 0.8rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 1vw;
    `
  ]
})

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
export const Time = styled.p(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${resetFont}
      color:${theme.subTextColor};
      font-size: 0.6rem;
      white-space: nowrap;
    `
  ]
})

export const ChatHeader = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${disableTextDrag}

      position: relative;
      top: 0;
      min-height: 64px;
      width: 100%;
      background-color: ${theme.mainBgColor};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      display: flex;
      flex-direction: row;
      align-items: center;
    `
  ]
})

export const MemberInfoText = styled.p(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${resetFont}
      color:${theme.subTextColor};
      font-size: 0.6rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-right: 1vw;
    `
  ]
})

export const ChatBox = styled.form(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      background-color: ${theme.mainBgColor};
      border: none;
      width: 100%;
      padding: 0;
      margin-top: auto;
      display: flex;
      flex-direction: column;

      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    `
  ]
})
export const ChatInput = styled.textarea(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      height: 8vh;
      border: none;
      border-radius: 0;
      resize: none;
      padding: 3%;
      font-size: 0.8rem;
      color: #4a4a4a;
      background-color: ${theme.mainBgColor};
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
        background-color: ${theme.subBgColor};
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: ${theme.subBgColor};
      }
    `
  ]
})
export const SendButton = styled.button(() => {
  const theme = useTheme() as Theme
  return [
    tw``,
    css`
      color: #fff;
      width: 48px;
      text-transform: uppercase;
      text-decoration: none;
      background: ${theme.subBgColor};
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
  ]
})

export const MessageLogContaner = styled.div(() => [
  tw``,
  css`
    ${scrollBar()}
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

export const SentByCurrentUser = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${messageContainer}
      color: ${theme.mainTextColor};
      justify-content: flex-end;
    `
  ]
})

export const SentByOtherUser = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${messageContainer}
      color: ${theme.mainTextColor};
      justify-content: flex-start;
    `
  ]
})

export const CurrentUserMessageBox = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${messageBox}
      background-color: ${theme.mainBgColor};
    `
  ]
})
export const OtherUserMessageBox = styled.div(() => {
  const theme = useTheme() as Theme

  return [
    tw``,
    css`
      ${messageBox}
      background-color: ${theme.mainBgColor};
    `
  ]
})

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
