import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar/sidebar'
import Home from './components/main/home'
import Group from './components/group/group'
import { useRecoilValue, RecoilRoot } from 'recoil'
import { attendGroupModal, settingsModal } from './recoil/sideatom'
import AttendGroupModal from './components/modal/attend-group-modal'
import SettingModal from './components/modal/setting-modal'
import Header from './components/header/header'
import Chat from './components/chat/chat'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)
  return (
    <RecoilRoot>
      <React.Fragment>
        <Router>
          {isAttendGroupModalOpen && <AttendGroupModal />}
          {isSettingModalOpen && <SettingModal />}
          <SideBar />
          <Header />
          <Chat />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/todo" element={<Home />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </Router>
      </React.Fragment>
    </RecoilRoot>
  )
}

export default App
