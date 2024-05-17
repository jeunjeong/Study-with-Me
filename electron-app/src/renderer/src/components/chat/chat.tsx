import React, { useState, useEffect } from 'react'
import * as c from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState } from '../../recoil/chatatom'
import chatLogo from '../../assets/cicon/chat-logo.svg'
import back from '../../assets/cicon/back.svg'
import close from '../../assets/cicon/close.svg'
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

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => {
        onClose()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [show, isMain, onClose])

  const groupClickHandler = (groupId: number): void => {
    console.log(groupId, 'clicked!')
    setIsMain(!isMain)
  }
  return (
    <React.Fragment>
      <c.Container show={show}>
        <c.Header>
          {!isMain && (
            <c.BackButton>
              <c.HeaderIcon src={back} alt="back" />
            </c.BackButton>
          )}
          <c.CloseButton onClick={onClose}>
            <c.HeaderIcon src={close} alt="close" />
          </c.CloseButton>
        </c.Header>
        <c.GroupList>
          {groups.map((group) => (
            <GroupCard key={group.groupId} groupInfo={group} onClick={groupClickHandler} />
          ))}
        </c.GroupList>

        {/* bottom */}
        <div></div>
      </c.Container>
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

  const toggleChatRoom = () => {
    if (showChatRoom === 0) {
      setShowChatRoom(1)
    } else if (showChatRoom !== 0) {
      setShowChatRoom(showChatRoom * -1)
    }
  }

  return (
    <React.Fragment>
      <c.Icon src={chatLogo} onClick={toggleChatRoom}></c.Icon>
      <ChatMain onClose={toggleChatRoom} show={showChatRoom} />
    </React.Fragment>
  )
}

export default Chat
