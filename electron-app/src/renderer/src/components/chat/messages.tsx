import React from 'react'
import MessageBox from './message-box'
import * as c from './style'
import { Message } from './type'
import { useRecoilValue } from 'recoil'
import { userNameState } from '@renderer/recoil/chatatom'

interface TempMessage {
  user: string
  text: string
}

interface MessagesProps {
  messages: Message[] | undefined
  name: string
}

function Messages({ messages, name }: MessagesProps): JSX.Element {
  console.log(name, messages)
  const currentUserName = useRecoilValue(userNameState)

  return (
    <c.MessageLogContaner>
      {messages?.map((message, i) => (
        <MessageBox key={i} message={message} name={currentUserName} />
      ))}
    </c.MessageLogContaner>
  )
}

export default Messages
