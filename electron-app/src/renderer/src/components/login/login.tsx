import Icon from './kakao-icon.png'
import { Container, LoginButton, KakaoIcon } from './style'
import { useState, useEffect } from 'react'
import { loginAxios } from './loginaxios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Login(): JSX.Element {
  const [authCode, setAuthCode] = useState<string | null>(null)

  const [cookies, setCookie] = useCookies(['accessToken'])

  const navigate = useNavigate()
  const handleLogin = (): void => {
    window.electron.ipcRenderer.send('open-auth-window')
  }

  // useEffect(() => {
  //   if (cookies) {
  //     navigate('/main')
  //   }
  // }, [cookies])

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
            console.log(response)
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
