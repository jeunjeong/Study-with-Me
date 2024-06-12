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
import { Container, Content } from './style'
import { loginState } from './recoil/loginatom'
import LoginModal from './components/modal/login-modal'
import GlobalStyles from './styles/GlobalStyles'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)
  const isLoginState = useRecoilValue(loginState)

  return (
    <React.Fragment>
      <GlobalStyles />
      <Router>
        {!isLoginState ? (
          <LoginModal />
        ) : (
          <Container>
            <SideBar />
            <Content>
              <Header />
              <Chat />
              {isAttendGroupModalOpen && <AttendGroupModal />}
              {isSettingModalOpen && <SettingModal />}
              <Routes>
                <Route path="/oauth/kakao-callback" element={<Redirect />} />
                <Route path="/" element={<Home />} />
                <Route path="/group" element={<Group />} />
                <Route path="/todo" element={<TodoList />} />
                <Route path="/group" element={<Group />} />
              </Routes>
            </Content>
          </Container>
        )}
      </Router>
    </React.Fragment>
  )
}

export default App
