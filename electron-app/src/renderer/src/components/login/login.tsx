// Login.tsx
import Icon from './kakao-icon.png'
import { Container, LoginButton, KakaoIcon } from './style'
// 렌더러 프로세스 (React 컴포넌트)
import { useState, useEffect } from 'react'
import { loginAxios } from './loginaxios'
import { useSetRecoilState } from 'recoil'
import { loginToken } from '@renderer/recoil/loginatom'
import { useNavigate } from 'react-router-dom'

async function getAccessToken(code: string): Promise<boolean> {
  try {
    const response = await loginAxios(code)
    if (response.data.accessToken != '') {
      response.data.accessToken = useSetRecoilState(loginToken)
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

function Login(): JSX.Element {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const navigate = useNavigate()
  const handleLogin = (): void => {
    window.electron.ipcRenderer.send('open-auth-window')
  }
  useEffect(() => {
    const handleAuthToken = (event, code): void => {
      console.log('react reponse code :: ', code)
      setAuthCode(code)
    }
    window.electron.ipcRenderer.on('auth-token', handleAuthToken)
  }, [])

  useEffect(() => {
    if (authCode != null) {
      getAccessToken(authCode)
      navigate('/')
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
