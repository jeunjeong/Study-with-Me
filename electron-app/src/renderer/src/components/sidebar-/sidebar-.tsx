import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, GroupSection, GroupsItem, GroupsImg, SettingSection, SettingImg } from './style'
import todoicon from './icons/todo-icon.svg'
import charticon from './icons/chart-icon.svg'
import settingicon from './icons/setting-icon.svg'
import groupattend from './icons/groupattend-icon.svg'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Pagestate, mygrouplist, attendGroupModal, settingsModal } from '../../recoil/sideatom'

function SideBar(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useRecoilState(Pagestate)
  const [groups] = useRecoilState(mygrouplist)
  const navigate = useNavigate()
  const selectGroup = (code: string): void => {
    setSelectedIndex(code)
    if (code == 'main') {
      navigate('/')
    } else if (code == 'todo') {
      navigate('/todo')
    } else if (code == 'chart') {
      navigate('/chart')
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
          <GroupsItem isSelected={selectedIndex == 'main'} onClick={() => selectGroup('main')}>
            <GroupsImg src="icon.png" alt={`Main`}></GroupsImg>
          </GroupsItem>
          {groups.map((group, index) => (
            <GroupsItem
              isSelected={group[1] == selectedIndex}
              key={index}
              onClick={() => selectGroup(group[1])}
            >
              <GroupsImg src={group[2]} alt={`Group ${index}`}></GroupsImg>
            </GroupsItem>
          ))}
          <GroupsItem isSelected={false} onClick={() => showAttendGroupModal(true)}>
            <GroupsImg src={groupattend} alt={`Group attend`}></GroupsImg>
          </GroupsItem>
        </GroupSection>

        <SettingSection>
          <GroupsItem onClick={() => selectGroup('todo')} isSelected={selectedIndex == 'todo'}>
            <SettingImg src={todoicon} alt={`todo-icon`}></SettingImg>
          </GroupsItem>
          <GroupsItem onClick={() => selectGroup('chart')} isSelected={selectedIndex == 'chart'}>
            <SettingImg src={charticon} alt={`chart-icon`}></SettingImg>
          </GroupsItem>
          <GroupsItem onClick={() => showSettingModal(true)} isSelected={false}>
            <SettingImg src={settingicon} alt={`setting-icon`}></SettingImg>
          </GroupsItem>
        </SettingSection>
      </Container>
    </React.Fragment>
  )
}

export default SideBar
