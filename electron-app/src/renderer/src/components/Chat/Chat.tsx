import React, { useState, useEffect } from 'react'
import { Container, ChatRoomdiv, ChatRoomClose } from './style'
import { useRecoilState } from 'recoil'
import { chatRoomState } from '../../recoil/ChatAtom'
import ChatIcon from '../../assets/cicon/chatimg.png'

function ChatRoom({ onClose, show }) {
  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => {
        onClose()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <React.Fragment>
      <ChatRoomdiv show={show}>
        <ChatRoomClose onClick={onClose}>닫기</ChatRoomClose>
        <div style={{ color: 'black' }}>채팅리스트</div>
      </ChatRoomdiv>
    </React.Fragment>
  )
}

function Chat() {
  const [showChatRoom, setShowChatRoom] = useRecoilState(chatRoomState)

  const toggleChatRoom = () => {
    setShowChatRoom(!showChatRoom)
  }

  return (
    <React.Fragment>
      <Container className="chat-container">
        {!showChatRoom && (
          <img src={ChatIcon} onClick={toggleChatRoom} style={{ cursor: 'pointer' }} />
        )}
      </Container>
      <ChatRoom onClose={() => setShowChatRoom(false)} show={showChatRoom} />
    </React.Fragment>
  )
}

export default Chat
