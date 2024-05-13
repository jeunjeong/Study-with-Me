import React, { useState } from 'react'
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
import icon from './icon.png'

function SideBar(): JSX.Element {
  // useState를 사용하여 groups 상태와 이를 업데이트하는 setGroups 함수를 받습니다.
  const [groupselected, setGroupSelected] = useState(0)
  const [groups] = useState([icon, icon, icon, icon, icon, icon])

  const selectGroup = (index: number): void => {
    setGroupSelected(index)
  }

  return (
    <React.Fragment>
      <Container className="sidebar-container">
        <GroupSection>
          {groups.map((group, index) => (
            // isSelected와 같은 boolean 값을 GroupsItem 컴포넌트에 prop으로 전달합니다.
            <GroupsItem
              isSelected={index == groupselected}
              key={index}
              onClick={() => selectGroup(index)}
            >
              <GroupsImg src={group} alt={`Group ${index}`}></GroupsImg>
            </GroupsItem>
          ))}
        </GroupSection>
        <SettingSection>
          <SettingItem>
            <SettingImg src={todoicon} alt={`todo-icon`}></SettingImg>
          </SettingItem>
          <SettingItem>
            <SettingImg src={charticon} alt={`chart-icon`}></SettingImg>
          </SettingItem>
          <SettingItem>
            <SettingImg src={settingicon} alt={`setting-icon`}></SettingImg>
          </SettingItem>
        </SettingSection>
      </Container>
    </React.Fragment>
  )
}

export default SideBar
