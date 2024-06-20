import React, { useCallback, useEffect, useState } from 'react'
import * as c from './style'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomState, userNameState } from '../../recoil/chatatom'
import chatLogo from '../../assets/cicon/chat-logo.svg'

import ChatMain from './chat-main'

import { Room } from './type'
import { useSocket } from '@renderer/contexts/socket-context'

function Chat(): JSX.Element {
  const [showChatRoom, setShowChatRoom] = useRecoilState(chatRoomState)
  const userName = useRecoilValue(userNameState)

  const { socket } = useSocket()

  const [data, setData] = useState<Room[]>()

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
        console.log('data : ', responseData.data)
        setData(
          responseData.data.rooms?.filter((room) =>
            room.info.members.some((member) => userName === member)
          )
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    if (socket) {
      fetchData()
    }
  }, [userName])

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
      <ChatMain onClose={toggleChatRoom} show={showChatRoom} rooms={data} />
    </React.Fragment>
  )
}

export default Chat
