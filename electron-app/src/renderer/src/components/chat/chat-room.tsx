import React, { useState, useEffect } from 'react'
import * as c from './style'
import { useRecoilValue } from 'recoil'
import { activatedChatState, userNameState } from '../../recoil/chatatom'

import Input from './input'
import Messages from './messages'

import tempImg from '@renderer/assets/cicon/snail.jpg'
import { Message } from './type'
import { useSocket } from '@renderer/contexts/socket-context'

function ChatRoom(): JSX.Element {
  const [message, setMessage] = useState<string>('')

  // tempmessage test
  const [messages, setMessages] = useState<Message[]>([])

  const roomId = useRecoilValue<number>(activatedChatState)

  //dummy data -> test-atom
  const userName = useRecoilValue(userNameState)

  const { socket } = useSocket()

  const sendMessage = (
    event: React.SyntheticEvent<HTMLTextAreaElement | HTMLButtonElement>
  ): void => {
    event.preventDefault()
    if (message.length === 0) return
    // 왜 콜백이 안되는지 나도 모르겠음
    if (socket) {
      socket.emit('sendMessage', { name: userName, content: message }, () => {})
    }
    setMessage('')
  }

  // useEffect(() => {
  //   // check messages
  //   console.log(messages)
  // }, [messages])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = window.api as {
          fetchFilePath: (relativePath: string) => string
          fetchData: (filePath: string) => Promise<any>
        }

        const relativePath = '../datas/data.json'
        const filePath = api.fetchFilePath(relativePath)
        const responseData = await api.fetchData(filePath)
        setMessages(responseData.data.rooms.find((room) => room.id === roomId).messages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (socket) {
      const handleServerMessage = (receive) => {
        const { name, content } = receive.content
        console.log(name, content)
        setMessages((prevMessages) => [...prevMessages, { name, content }])
      }

      socket.on('serverMessage', handleServerMessage)

      return () => {
        socket.off('serverMessage', handleServerMessage)
      }
    }
  }, [socket])

  return (
    <React.Fragment>
      <c.Content>
        <c.ChatHeader>
          <c.GroupImage src={tempImg} alt="groupImg" />
          <c.ChatSummary>
            <c.GroupName>Group{roomId}</c.GroupName>
            <c.MemberInfoText>N Online</c.MemberInfoText>
            <c.MemberInfoText>N Studying about this group</c.MemberInfoText>
          </c.ChatSummary>
        </c.ChatHeader>
        <Messages messages={messages} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </c.Content>
    </React.Fragment>
  )
}

export default ChatRoom
