import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar/sidebar'
import Home from './components/main/home'
import Group from './components/group/group'
import Redirect from './components/login/redirect'
import { useRecoilValue } from 'recoil'
import { attendGroupModal, settingsModal } from './recoil/sideatom'
import AttendGroupModal from './components/modal/attend-group-modal'
import SettingModal from './components/modal/setting-modal'
import Header from './components/header/header'
import Chat from './components/chat/chat'
import TodoList from './components/todolist/todolist'
import Login from './components/login/login'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth/kakao-callback" element={<Redirect />} />
        </Routes>
        <React.Fragment>
          <Header />
          <Chat />
          {isAttendGroupModalOpen && <AttendGroupModal />}
          {isSettingModalOpen && <SettingModal />}
          <SideBar />
          <Routes>
            <Route path="/main" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </React.Fragment>
      </Router>
    </React.Fragment>
  )
}

export default App
