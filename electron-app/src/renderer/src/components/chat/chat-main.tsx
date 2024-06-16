import React, { useState } from 'react'
import * as c from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState, activatedChatState } from '../../recoil/chatatom'
import back from '../../assets/cicon/back.svg'
import close from '../../assets/cicon/close.svg'

import tempImg from '@renderer/assets/cicon/snail.jpg'
import GroupCard from './group-card'
import ChatRoom from './chat-room'

interface Group {
  groupId: number
  name: string
  newMessage: boolean
  // 아마도 이미지는 url 이지 않을까
  img: string
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

interface ChatRoomProps {
  onClose: () => void
  show: number
}

function ChatMain({ onClose, show }: ChatRoomProps): JSX.Element {
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

  // useEffect(() => {
  //   console.log(message)
  // }, [message])

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

export default ChatMain
