import React from 'react'
import * as c from './style'
import ReactEmoji from 'react-emoji'

import tempImg from '@renderer/assets/cicon/snail.jpg'
import { Message } from './type'

interface MessageProps {
  message: Message
  name: string
}
function MessageBox({ message, name }: MessageProps): JSX.Element {
  const isSentByCurrentUser: boolean = message.name === name

  return isSentByCurrentUser ? (
    <React.Fragment>
      <c.SentByCurrentUser>
        <c.CurrentUserMessageBox>
          <c.MessageText>{ReactEmoji.emojify(message.content)}</c.MessageText>
        </c.CurrentUserMessageBox>
      </c.SentByCurrentUser>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <c.SentByOtherUser>
        <c.UserImage src={tempImg} alt="userImage" />
        <c.OtherUserMessageWrapper>
          <c.MessageName>{message.name}</c.MessageName>
          <c.OtherUserMessageBox>
            <c.MessageText>{ReactEmoji.emojify(message.content)}</c.MessageText>
          </c.OtherUserMessageBox>
        </c.OtherUserMessageWrapper>
      </c.SentByOtherUser>
    </React.Fragment>
  )
}

export default MessageBox
