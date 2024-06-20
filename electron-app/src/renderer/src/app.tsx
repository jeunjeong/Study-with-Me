import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar/sidebar'
import Home from './components/main/home'
import Group from './components/group/group'
import Redirect from './components/login/redirect'
import { useRecoilState, useRecoilValue } from 'recoil'
import { attendGroupModal, settingsModal } from './recoil/sideatom'
import AttendGroupModal from './components/modal/attend-group-modal'
import SettingModal from './components/modal/setting-modal'
import Header from './components/header/header'
import Chat from './components/chat/chat'
import { Container, Content } from './style'
import { loginState } from './recoil/loginatom'
import LoginModal from './components/modal/login-modal'
import GlobalStyles from './styles/global-styles'

import { ThemeProvider } from '@emotion/react'
import { default as THEME } from './theme/theme'
import useTheme from './theme/useTheme'

import Test from './test/test'

import { useSocket } from './contexts/socket-context'
import { userNameState } from './recoil/chatatom'

// let socket

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)
  const [theme, onToggle] = useTheme()

  const isLoginState = useRecoilValue(loginState)

  // Socket Test
  const [name, setName] = useRecoilState<string>(userNameState)

  const { socket } = useSocket()
  const onLogin = (
    event: React.MouseEvent<HTMLButtonElement>,
    tempName: string,
    tempRoom: string
  ) => {
    if (!tempName || name) {
      console.log('is logged in', isLoginState, name)

      event.preventDefault()
    } else {
      setName(tempName)

      if (socket) {
        console.log(`change name ${name} to ${tempName}`)

        socket.emit('setUserNick', tempName)
        socket.emit('getUserNick')
        socket.on('serverMessage', (receive) => {
          console.log(receive)
        })
      }
    }
  }

  //

  return (
    <React.Fragment>
      <GlobalStyles />
      <ThemeProvider theme={THEME[theme]}>
        <Router>
          {!isLoginState ? (
            <LoginModal />
          ) : (
            <Container>
              <SideBar />
              <Content>
                <Header />
                <Test onToggle={onToggle} onLogin={onLogin} />
                {name && <Chat />}
                {isAttendGroupModalOpen && <AttendGroupModal />}
                {isSettingModalOpen && <SettingModal />}
                <Routes>
                  <Route path="/oauth/kakao-callback" element={<Redirect />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/group" element={<Group />} />
                  {/* <Route path="/todo" element={<TodoList />} /> */}
                  <Route path="/group" element={<Group />} />
                </Routes>
              </Content>
            </Container>
          )}
        </Router>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
