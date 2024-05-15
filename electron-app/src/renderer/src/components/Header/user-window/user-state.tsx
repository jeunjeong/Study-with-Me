import React, { useState } from 'react'
import { Container, Img, ContentBox, CloseButton } from './style'
import { useRecoilValue } from 'recoil'
import { chatRoomState } from '../../../recoil/ChatAtom'
import { relative } from 'path'

function UserState({ user, onClose }) {
  const showChatRoom = useRecoilValue(chatRoomState)
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(onClose, 500)
  }

  return (
    <React.Fragment>
      <Container showChatRoom={showChatRoom} isClosing={isClosing}>
        <CloseButton onClick={handleClose}>닫침</CloseButton>
        <ContentBox>
          <Img src={'../' + user.img} />
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ marginTop: '10px' }}>{user.name}</div>
            <div style={{ marginTop: '10px' }}>{user.status}</div>
            {user.status === 'studying' && <div>{user.studySubject}</div>}
          </div>
          <div
            style={{ backgroundColor: 'pink', width: '80%', height: '2px', marginTop: '20px' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '15px',
              width: '100%'
            }}
          >
            <div>투두</div>
            <div
              style={{ width: '80%', height: '100px', backgroundColor: 'gray', marginTop: '15px' }}
            ></div>
          </div>
        </ContentBox>
      </Container>
    </React.Fragment>
  )
}

export default UserState
