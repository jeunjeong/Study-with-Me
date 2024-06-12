import { useState, useEffect } from 'react'
import { Container, LoginButton, KakaoIcon } from './style'
import { loginAxios, getauth } from './loginaxios'
import { useSetRecoilState } from 'recoil'
import { loginState } from '@renderer/recoil/loginatom'
import Icon from './kakao-icon.png'

function Login(): JSX.Element {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const isLoginState = useSetRecoilState(loginState)
  const handleLogin = (): void => {
    window.electron.ipcRenderer.send('open-auth-window')
  }

  useEffect(() => {
    const handleAuthToken = (event, code): void => {
      setAuthCode(code)
    }
    window.electron.ipcRenderer.on('auth-token', handleAuthToken)
  }, [])

  useEffect(() => {
    if (authCode !== null && authCode != '') {
      const loginprocess = async (): Promise<void> => {
        try {
          const response = await loginAxios(authCode)
          if (response) {
            const authInfo = async (): Promise<void> => {
              try {
                const res = await getauth()
                if (res) {
                  isLoginState(true)
                }
                return
              } catch (error) {
                return
              }
            }
            authInfo()
          }
          return
        } catch (error) {
          return
        }
      }
      loginprocess()
    }
  }, [authCode])

  return (
    <Container>
      <LoginButton onClick={handleLogin}>
        <KakaoIcon src={Icon} alt="kakao-icon" />
        Login with Kakao
      </LoginButton>
    </Container>
  )
}

export default Login
