import React from 'react'
import MessageBox from './message-box'
import * as c from './style'
import { Message } from './type'
import { useRecoilValue } from 'recoil'

// use dummy data
import { userNameState } from '@renderer/recoil/chatatom'

interface MessagesProps {
  messages: Message[] | undefined
}

function Messages({ messages }: MessagesProps): JSX.Element {
  const currentUserName = useRecoilValue(userNameState)

  return (
    <React.Fragment>
      <c.MessageLogContaner>
        {messages?.map((message, i) => (
          <MessageBox key={i} message={message} name={currentUserName} />
        ))}
      </c.MessageLogContaner>
    </React.Fragment>
  )
}

export default Messages
