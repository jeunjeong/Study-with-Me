import React from 'react'
import * as c from './Style'
import ReactEmoji from 'react-emoji'

import tempImg from '@renderer/assets/cicon/snail.jpg'

interface TempMessage {
  user: string
  text: string
}

interface MessageProps {
  message: TempMessage
  name: string
}

const Message: React.FC<MessageProps> = ({ message, name }) => {
  const isSentByCurrentUser: boolean = message.user === 'user1'

  return isSentByCurrentUser ? (
    <c.SentByCurrentUser>
      <c.CurrentUserMessageBox>
        <c.MessageText>{ReactEmoji.emojify(message.text)}</c.MessageText>
      </c.CurrentUserMessageBox>
    </c.SentByCurrentUser>
  ) : (
    <c.SentByOtherUser>
      <c.UserImage src={tempImg} alt="userImage" />
      <c.OtherUserMessageWrapper>
        <c.MessageName>{message.user}</c.MessageName>
        <c.OtherUserMessageBox>
          <c.MessageText>{ReactEmoji.emojify(message.text)}</c.MessageText>
        </c.OtherUserMessageBox>
      </c.OtherUserMessageWrapper>
    </c.SentByOtherUser>
  )
}

export default Message
