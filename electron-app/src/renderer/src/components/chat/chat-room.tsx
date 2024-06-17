import React, { useState, useEffect, useCallback } from 'react'
import * as c from './style'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomState, activatedChatState, userNameState } from '../../recoil/chatatom'

import Input from './input'
import Messages from './messages'

import tempImg from '@renderer/assets/cicon/snail.jpg'
import { Message, Room } from './type'

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

interface ChatRoomProps {
  roomId?: number
}

function ChatRoom(): JSX.Element {
  // const { groupId, name, newMessage, img } = groupInfo

  // get name from socket or server
  const [name, setName] = useState<string>('')

  const [message, setMessage] = useState<string>('')

  // tempmessage test
  const [messages, setMessages] = useState<Message[]>([])

  const roomId = useRecoilValue<number>(activatedChatState)
  const userName = useRecoilValue<string>(userNameState)

  const [roomData, setRoomData] = useState<Room>()

  const sendMessage = (
    event: React.SyntheticEvent<HTMLTextAreaElement | HTMLButtonElement>
  ): void => {
    event.preventDefault()
    if (message.length === 0) return
    setMessages([...messages, { name: userName, content: message }])
    setMessage('')
  }

  useEffect(() => {
    // check messages
    console.log(messages)
  }, [messages])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = window.api as {
          fetchFilePath: (relativePath: string) => string
          fetchData: (filePath: string) => Promise<any>
        }

        const relativePath = '/datas/data.json'
        const filePath = api.fetchFilePath(relativePath)
        const responseData = await api.fetchData(filePath)
        setRoomData(responseData.data.rooms.find((room) => room.id === roomId))
        setMessages(responseData.data.rooms.find((room) => room.id === roomId).messages)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  //   useEffect(() => {
  //     console.log(roomData)
  //   }, [roomData])

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
        <Messages messages={messages} name={userName} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </c.Content>
    </React.Fragment>
  )
}

export default ChatRoom
