import React, { useState, useEffect, useCallback } from 'react'
import * as c from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState, activatedChatState } from '../../recoil/chatatom'
import chatLogo from '../../assets/cicon/chat-logo.svg'
import back from '../../assets/cicon/back.svg'
import close from '../../assets/cicon/close.svg'

import Input from './input'
import Messages from './messages'

import tempImg from '@renderer/assets/cicon/snail.jpg'

interface Group {
  groupId: number
  name: string
  newMessage: boolean
  // 아마도 이미지는 url 이지 않을까
  img: string
}

interface ChatRoomProps {
  onClose: () => void
  show: number
}

interface GroupCardProps {
  onClick: (groupId: number) => void
  groupInfo: Group
}

const groups: Group[] = [
  {
    groupId: 1,
    name: 'Group1',
    newMessage: true,
    img: tempImg
  },
  {
    groupId: 2,
    name: 'Group2',
    newMessage: true,
    img: tempImg
  },
  {
    groupId: 3,
    name: 'Group3',
    newMessage: true,
    img: tempImg
  },
  {
    groupId: 4,
    name: 'Group4',
    newMessage: true,
    img: tempImg
  }
]

const ChatMain: React.FC<ChatRoomProps> = ({ onClose, show }): JSX.Element => {
  const [isMain, setIsMain] = useState<boolean>(true)
  const [currentChat, setCurrentChat] = useRecoilState<number>(activatedChatState)

  const [message, setMessage] = useState('')

  const groupClickHandler = (groupId: number): void => {
    setCurrentChat(groupId)
    setIsMain(false)
  }

  const backClickHandler = (): void => {
    setCurrentChat(0)
    setIsMain(true)
  }

  useEffect(() => {
    console.log(message)
  }, [message])

  return (
    <React.Fragment>
      <c.Container show={show}>
        <c.Header>
          {!isMain && (
            <c.BackButton onClick={backClickHandler}>
              <c.HeaderIcon src={back} alt="back" />
            </c.BackButton>
          )}
          <c.CloseButton onClick={onClose}>
            <c.HeaderIcon src={close} alt="close" />
          </c.CloseButton>
        </c.Header>
        {/* 채팅창목록 */}
        {isMain && (
          <c.Content>
            {groups.map((group) => (
              <GroupCard key={group.groupId} groupInfo={group} onClick={groupClickHandler} />
            ))}
          </c.Content>
        )}
        {/* 채팅창 */}
        {!isMain && <ChatRoom />}

        {/* bottom */}
        <div></div>
      </c.Container>
    </React.Fragment>
  )
}

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

const ChatRoom: React.FC = (): JSX.Element => {
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

const GroupCard: React.FC<GroupCardProps> = ({ onClick, groupInfo }): JSX.Element => {
  const { groupId, name, newMessage, img } = groupInfo

  console.log()

  return (
    <React.Fragment>
      <c.GroupCard onClick={() => onClick(groupInfo.groupId)}>
        <c.GroupImage src={img} alt="groupImg" />
        <c.ChatSummary>
          <c.GroupName>{name}</c.GroupName>
          <c.GroupText>
            here is test description i want to cut this long texttttttttttttttttt
          </c.GroupText>
        </c.ChatSummary>
        <c.GroupStatus>
          <c.Time>오후 01:23</c.Time>
          <c.UnreadMessage>5</c.UnreadMessage>
        </c.GroupStatus>
      </c.GroupCard>
    </React.Fragment>
  )
}

const Chat: React.FC = (): JSX.Element => {
  const [showChatRoom, setShowChatRoom] = useRecoilState(chatRoomState)

  const toggleChatRoom = useCallback((): void => {
    if (showChatRoom === 0) {
      setShowChatRoom(1)
    } else if (showChatRoom !== 0) {
      setShowChatRoom(showChatRoom * -1)
    }
  }, [showChatRoom, setShowChatRoom])

  return (
    <React.Fragment>
      <c.Icon src={chatLogo} onClick={toggleChatRoom}></c.Icon>
      <ChatMain onClose={toggleChatRoom} show={showChatRoom} />
    </React.Fragment>
  )
}

export default Chat
