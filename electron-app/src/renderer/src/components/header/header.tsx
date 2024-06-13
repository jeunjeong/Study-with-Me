import React, { useState } from 'react'
import { Container, FriendListDiv, Img, ImgContainer, Imgdiv } from './style'
import jbc from '../../assets/profile/jbc.png'
import hjh from '../../assets/profile/hjh.png'
import kej from '../../assets/profile/kej.jpeg'
import jej from '../../assets/profile/jej.png'
import UserState from './user-window/user-state'
import GridButton from '../grid/grid-button'

function Friend({ name, isConnected, status, studySubject, img, onClick }) {
  if (isConnected) {
    return (
      <ImgContainer>
        <Imgdiv>
          <Img
            src={img}
            alt={name}
            status={status}
            onClick={() => onClick({ name, status, studySubject, img })}
          />
          <div> {name}</div>
        </Imgdiv>
      </ImgContainer>
    )
  } else {
    return null
  }
}

function Header() {
  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  const CloseUserState = () => {
    setSelectedUser(null)
  }

  const friends = [
    {
      name: '병철',
      isConnected: true,
      status: 'studying',
      studySubject: '알고리즘',
      img: jbc
    },
    {
      name: '정현',
      isConnected: true,
      status: 'resting',
      studySubject: '',
      img: hjh
    },
    {
      name: '권정',
      isConnected: true,
      status: 'studying',
      studySubject: '알고리즘',
      img: kej
    },
    {
      name: '조정',
      isConnected: true,
      status: 'resting',
      studySubject: '',
      img: jej
    }
  ]

  return (
    <React.Fragment>
      <Container className="header-container">
        <FriendListDiv>
          {friends.map((friend) => (
            <Friend
              key={friend.name}
              name={friend.name}
              isConnected={friend.isConnected}
              status={friend.status}
              studySubject={friend.studySubject}
              img={friend.img}
              onClick={handleUserClick}
            />
          ))}
          <GridButton />
        </FriendListDiv>
      </Container>
      {selectedUser && <UserState user={selectedUser} onClose={CloseUserState} />}
    </React.Fragment>
  )
}

export default Header
