import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/SideBar/SideBar'
import MainPage from './components/Main/MainPage'
import GroupPage from './components/Group/GroupPage'
import { useRecoilValue } from 'recoil'
import { attendGroupModal, settingsModal } from './components/SideBar/Atom'
import AttendGroupModal from './components/Modal/AttendGroupModal'
import SettingModal from './components/Modal/SettingModal'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)
  return (
    <React.Fragment>
      <Router>
        {isAttendGroupModalOpen && <AttendGroupModal />}
        {isSettingModalOpen && <SettingModal />}
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/todo" element={<MainPage />} />
          <Route path="/chart" element={<GroupPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
