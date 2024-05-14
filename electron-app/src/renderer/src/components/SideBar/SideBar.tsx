import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  GroupSection,
  GroupsItem,
  GroupsImg,
  SettingSection,
  SettingItem,
  SettingImg
} from './Style'
import todoicon from './icons/todo-icon.png'
import charticon from './icons/chart-icon.png'
import settingicon from './icons/setting-icon.png'
import groupattend from './icons/groupattend-icon.png'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedGroup, mygrouplist, attendGroupModal, settingsModal } from './Atom'

function SideBar(): JSX.Element {
  const [selectedGroupIndex, setSelectedGroupIndex] = useRecoilState(selectedGroup)
  const [groups] = useRecoilState(mygrouplist)
  const navigate = useNavigate()
  const selectGroup = (index: number): void => {
    setSelectedGroupIndex(index)
    if (index == 0) {
      navigate('/')
    } else {
      navigate('/group')
    }
  }

  const showAttendGroupModal = useSetRecoilState(attendGroupModal)

  const showSettingModal = useSetRecoilState(settingsModal)

  return (
    <React.Fragment>
      <Container className="sidebar-container">
        <GroupSection>
          {groups.map((group, index) => (
            <GroupsItem
              isSelected={index == selectedGroupIndex}
              key={index}
              onClick={() => selectGroup(index)}
            >
              <GroupsImg src={group} alt={`Group ${index}`}></GroupsImg>
            </GroupsItem>
          ))}
          <GroupsItem isSelected={false} onClick={() => showAttendGroupModal(true)}>
            <GroupsImg src={groupattend} alt={`Group attend`}></GroupsImg>
          </GroupsItem>
        </GroupSection>

        <SettingSection>
          <SettingItem>
            <SettingImg src={todoicon} alt={`todo-icon`}></SettingImg>
          </SettingItem>
          <SettingItem>
            <SettingImg src={charticon} alt={`chart-icon`}></SettingImg>
          </SettingItem>
          <SettingItem onClick={() => showSettingModal(true)}>
            <SettingImg src={settingicon} alt={`setting-icon`}></SettingImg>
          </SettingItem>
        </SettingSection>
      </Container>
    </React.Fragment>
  )
}

export default SideBar
