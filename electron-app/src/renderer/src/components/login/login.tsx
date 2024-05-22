import Icon from './kakao-icon.png'
import { Container, LoginButton, KakaoIcon } from './style'
import { useState, useEffect } from 'react'
import { loginAxios } from './loginaxios'
import { useRecoilState } from 'recoil'
import { loginToken } from '@renderer/recoil/loginatom'

function Login(): JSX.Element {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [token, setToken] = useRecoilState<string>(loginToken)
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
      const getToken = async (): Promise<void> => {
        try {
          const response = await loginAxios(authCode)
          if (response.data.access_token !== '') {
            setToken(response.data.access_token)
          }
          return
        } catch (error) {
          return
        }
      }
      getToken()
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
