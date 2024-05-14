import React from 'react'
import {
  CloseButton,
  Container,
  MiddleTitle,
  MiddleIcon,
  InputTag,
  SmallTitle,
  ApplyButton,
  SmallIcon,
  ApplyButtonRight
} from './Style'
import { useSetRecoilState } from 'recoil'
import { attendGroupModal } from '../SideBar/Atom'
import closebuttonicon from './icons/closebutton-icon.svg'
import jointagicon from './icons/jointag-icon.svg'
import joinbuttonicon from './icons/joinbutton-icon.svg'
import creategroupicon from './icons/creategroup-icon.svg'
import createbuttonicon from './icons/createbutton-icon.svg'
const AttendGroupModal: React.FC = () => {
  const showAttendGroupModal = useSetRecoilState(attendGroupModal)
  return (
    <Container>
      <MiddleTitle>
        <MiddleIcon src={jointagicon} alt="joinicon" /> Join by GroupCode
      </MiddleTitle>
      <br />
      <InputTag placeholder="Please enter the group code..." />
      <br />
      <br />
      <ApplyButtonRight>
        <ApplyButton>
          <SmallTitle>Attend</SmallTitle>
          <SmallIcon src={joinbuttonicon} alt="joinbutton" />
        </ApplyButton>
      </ApplyButtonRight>
      <br />
      <br />
      <br />
      <MiddleTitle>
        <MiddleIcon src={creategroupicon} alt="joinicon" /> Create New Group
      </MiddleTitle>
      <br />
      <SmallTitle>Cover Image</SmallTitle>
      <InputTag />
      <br />
      <br />
      <SmallTitle>Name</SmallTitle>
      <InputTag placeholder="Group Name" />
      <br />
      <br />
      <SmallTitle>Note</SmallTitle>
      <InputTag placeholder="Description of the group" />
      <br />
      <br />
      <SmallTitle>Member</SmallTitle>
      <InputTag placeholder="Add members by entering an e-mail" />
      <br />
      <br />
      <ApplyButtonRight>
        <ApplyButton>
          <SmallTitle>Create</SmallTitle>
          <SmallIcon src={createbuttonicon} alt="createbutton" />
        </ApplyButton>
      </ApplyButtonRight>
      <CloseButton
        src={closebuttonicon}
        alt="closebutton-icon"
        onClick={() => showAttendGroupModal(false)}
      />
    </Container>
  )
}

export default AttendGroupModal
