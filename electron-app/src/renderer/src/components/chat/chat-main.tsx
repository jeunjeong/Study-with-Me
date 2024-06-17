import React, { useEffect, useState } from 'react'
import * as c from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState, activatedChatState } from '../../recoil/chatatom'
import back from '../../assets/cicon/back.svg'
import close from '../../assets/cicon/close.svg'

import GroupCard from './group-card'
import ChatRoom from './chat-room'
import { Data, Room } from './type'

interface ChatRoomProps {
  onClose: () => void
  show: number
  rooms?: Room[] | undefined
}

function ChatMain({ onClose, show, rooms }: ChatRoomProps): JSX.Element {
  const [isMain, setIsMain] = useState<boolean>(true)
  const [currentChat, setCurrentChat] = useRecoilState<number>(activatedChatState)

  const [message, setMessage] = useState('')

  //   console.log(rooms)

  const groupClickHandler = (groupId: number): void => {
    setCurrentChat(groupId)
    setIsMain(false)
  }

  const backClickHandler = (): void => {
    setCurrentChat(0)
    setIsMain(true)
  }

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const api = window.api as {
  //           fetchFilePath: (relativePath: string) => string
  //           fetchData: (filePath: string) => Promise<any>
  //         }

  //         const relativePath = '/datas/data.json'
  //         const filePath = api.fetchFilePath(relativePath)
  //         const responseData = await api.fetchData(filePath)
  //         console.log('data : ', responseData.data)
  //       } catch (error) {
  //         console.error('Error fetching data:', error)
  //       }
  //     }
  //     fetchData()
  //   }, [])

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
            {rooms?.map((room) => (
              <GroupCard
                key={room.id}
                groupInfo={room.info}
                roomId={room.id}
                onClick={groupClickHandler}
              />
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
