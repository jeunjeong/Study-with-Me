import React, { useCallback, useEffect, useState } from 'react'
import * as c from './style'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomState, activatedChatState, userNameState } from '../../recoil/chatatom'
import chatLogo from '../../assets/cicon/chat-logo.svg'

import ChatMain from './chat-main'

import { nameState } from '@renderer/test/test-atom'
import { Socket, io } from 'socket.io-client'
import { Data, Room } from './type'

interface ChatProps {
  socket?: Socket | null
}

let socket

function Chat(): JSX.Element {
  const [showChatRoom, setShowChatRoom] = useRecoilState(chatRoomState)
  const [userName, setUserName] = useRecoilState(userNameState)
  const user = useRecoilValue(nameState)

  // const socket = useSocket()

  const ENDPOINT = 'http://localhost:3000'

  const [data, setData] = useState<Room[]>()

  useEffect(() => {
    //get Dummy Data
    const fetchData = async () => {
      try {
        const api = window.api as {
          fetchFilePath: (relativePath: string) => string
          fetchData: (filePath: string) => Promise<any>
        }

        const relativePath = '/datas/data.json'
        const filePath = api.fetchFilePath(relativePath)
        const responseData = await api.fetchData(filePath)
        console.log('data : ', responseData.data)
        setData(responseData.data.rooms)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (user) {
      socket = io(ENDPOINT, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
      })

      socket.on('connect', () => {
        socket.emit('setUserNick', 'user1')
        console.log('socket connected')
        socket.emit('getUserNick')
        socket.on('send', (receive) => {
          // console.log(receive)
          setUserName(receive.content)
        })
        fetchData()
      })

      socket.on('connect_error', (err) => {
        console.error('Connection error:', err)
      })
      socket.on('reconnect_attempt', () => {
        console.log('Reconnecting...')
      })
      socket.on('reconnect_failed', () => {
        console.error('Reconnection failed')
      })
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [ENDPOINT, user])
  // useState 로 소켓 변경해야함

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
