import React from 'react'
import Header from './components/header/header'
import Chat from './components/chat/chat'
import { RecoilRoot } from 'recoil'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <RecoilRoot>
      <React.Fragment>
        <Header></Header>
        <Chat></Chat>
      </React.Fragment>
    </RecoilRoot>
  )
}

export default App
