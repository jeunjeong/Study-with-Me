import React from 'react'
import { CloseButton, Container, MiddleTitle, Title } from './Style'
import { useSetRecoilState } from 'recoil'
import { attendGroupModal } from '../SideBar/Atom'
import closebuttonicon from './closebutton-icon.png'
const AttendGroupModal: React.FC = () => {
  const showAttendGroupModal = useSetRecoilState(attendGroupModal)
  return (
    <Container>
      <Title>Add Group</Title>
      <br />
      <MiddleTitle> Join by GroupCode</MiddleTitle>
      <MiddleTitle> Create New Group</MiddleTitle>
      <CloseButton
        src={closebuttonicon}
        alt="closebutton-icon"
        onClick={() => showAttendGroupModal(false)}
      />
    </Container>
  )
}

export default AttendGroupModal
