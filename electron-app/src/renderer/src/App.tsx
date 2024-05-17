import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar/sidebar'
import Home from './components/main/home'
import Group from './components/group/group'
import Login from './components/login/login'
import Redirect from './components/login/redirect'
import { useRecoilValue, RecoilRoot } from 'recoil'
import { attendGroupModal, settingsModal } from './recoil/sideatom'
import { loginToken } from './recoil/loginatom'
import AttendGroupModal from './components/modal/attend-group-modal'
import SettingModal from './components/modal/setting-modal'
import Header from './components/header/header'
import Chat from './components/chat/chat'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)
  const userLoginToken = useRecoilValue(loginToken)

  return (
    <RecoilRoot>
      <React.Fragment>
        <Router>
          {userLoginToken === '' ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/oauth/callback" element={<Redirect />} />
            </Routes>
          ) : (
            <React.Fragment>
              <Header />
              <Chat />
              {isAttendGroupModalOpen && <AttendGroupModal />}
              {isSettingModalOpen && <SettingModal />}
              <SideBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/group" element={<Group />} />
                <Route path="/todo" element={<Home />} />
                <Route path="/group" element={<Group />} />
              </Routes>
            </React.Fragment>
          )}
        </Router>
      </React.Fragment>
    </RecoilRoot>
  )
}

export default App
