import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './app'
import { SocketProvider } from './contexts/socket-context'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <RecoilRoot>
    <SocketProvider>
      <App />
    </SocketProvider>
  </RecoilRoot>
)
