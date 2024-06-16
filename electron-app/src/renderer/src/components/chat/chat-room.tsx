import React, { useState, useEffect, useCallback } from 'react'
import * as c from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState, activatedChatState } from '../../recoil/chatatom'

import Input from './input'
import Messages from './messages'

import tempImg from '@renderer/assets/cicon/snail.jpg'

interface TempMessage {
  user: string
  text: string
}
const tempMessages: TempMessage[] = [
  { user: 'user1', text: 'message1' },
  { user: 'user1', text: 'message2' },
  { user: 'user2', text: 'message3' },
  { user: 'user1', text: 'message4' },
  { user: 'user1', text: 'message5' },
  { user: 'user2', text: 'message6' },
  { user: 'user2', text: 'there is log message from other user ~~~~~~~~~~~ message7' },
  { user: 'user1', text: 'message8' },
  { user: 'user1', text: 'message9' },
  { user: 'user1', text: 'message10' },
  { user: 'user2', text: '한글로 적으면 이런 느낌으로 내용들이 나올겁니다. message11' },
  { user: 'user1', text: 'there is log message from current user ~~~~~~~~~~~ message12' }
]

function ChatRoom(): JSX.Element {
  // const { groupId, name, newMessage, img } = groupInfo

  // get name from socket or server
  const [name, setName] = useState<string>('')

  const [message, setMessage] = useState<string>('')

  // tempmessage test
  const [messages, setMessages] = useState<TempMessage[]>(tempMessages)

  const [currentChat, setCurrentChat] = useRecoilState<number>(activatedChatState)

  const sendMessage = (
    event: React.SyntheticEvent<HTMLTextAreaElement | HTMLButtonElement>
  ): void => {
    event.preventDefault()
    if (message.length === 0) return
    setMessages([...messages, { user: 'user1', text: message }])
    setMessage('')
  }

  useEffect(() => {
    // check messages
    console.log(messages)
  }, [messages])

  return (
    <React.Fragment>
      <c.Content>
        <c.ChatHeader>
          <c.GroupImage src={tempImg} alt="groupImg" />
          <c.ChatSummary>
            <c.GroupName>Group{currentChat}</c.GroupName>
            <c.MemberInfoText>N Online</c.MemberInfoText>
            <c.MemberInfoText>N Studying about this group</c.MemberInfoText>
          </c.ChatSummary>
        </c.ChatHeader>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </c.Content>
    </React.Fragment>
  )
}

export default ChatRoom
