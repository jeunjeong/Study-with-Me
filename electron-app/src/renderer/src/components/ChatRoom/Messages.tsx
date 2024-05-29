import React from 'react'
import Message from './Message'
import * as c from './Style'

interface TempMessage {
  user: string
  text: string
}

interface MessagesProps {
  messages: TempMessage[]
  name: string
}

const Messages: React.FC<MessagesProps> = ({ messages, name }) => {
  return (
    <c.MessageLogContaner>
      {messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
    </c.MessageLogContaner>
  )
}

export default Messages
