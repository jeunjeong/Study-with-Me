import React, { useEffect, useState } from 'react'

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

import { ThemeProvider } from '@emotion/react'
import { default as THEME } from './theme/theme'

function App(): JSX.Element {
  const isAttendGroupModalOpen = useRecoilValue(attendGroupModal)
  const isSettingModalOpen = useRecoilValue(settingsModal)

  const [theme, setTheme] = useState<string>('dark')

  return (
    <React.Fragment>
      <ThemeProvider theme={THEME[theme]}>
        <Router>
          {isAttendGroupModalOpen && <AttendGroupModal />}
          {isSettingModalOpen && <SettingModal />}

          <button
            style={{ position: 'absolute', zIndex: '999', left: '0', top: '0' }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            TOGGLE THEME
          </button>

          <SideBar />
          {/* <Header /> */}
          <Chat />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="/todo" element={<Home />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
