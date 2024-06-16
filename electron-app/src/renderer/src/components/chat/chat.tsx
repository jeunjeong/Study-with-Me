import React, { useCallback, useEffect } from 'react'
import * as c from './style'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomState, activatedChatState } from '../../recoil/chatatom'
import chatLogo from '../../assets/cicon/chat-logo.svg'

import ChatMain from './chat-main'

import { nameState } from '@renderer/test/test-atom'
import { Socket, io } from 'socket.io-client'

interface ChatProps {
  socket?: Socket | null
}

let socket

function Chat(): JSX.Element {
  const [showChatRoom, setShowChatRoom] = useRecoilState(chatRoomState)

  const user = useRecoilValue(nameState)

  // const socket = useSocket()

  useEffect(() => {
    console.log(socket)
  }, [socket])
  const ENDPOINT = 'http://localhost:3000'

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
      })

      socket.on('connect', () => {
        console.log('socket connected', socket)
      })

      socket.emit('setUserNick', user)
    }
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [ENDPOINT, user])
  // useState 로 소켓 변경해야함
  useEffect(() => {
    console.log('socket is : ', socket)
  }, [socket])

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
