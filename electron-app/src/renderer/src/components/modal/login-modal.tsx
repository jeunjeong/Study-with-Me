import React, { useEffect } from 'react'
import { LoginContainer } from './style'
import Login from '../login/login'
import { loginState } from '@renderer/recoil/loginatom'
import { getauth } from '../login/loginaxios'
import { useSetRecoilState } from 'recoil'
const LoginModal: React.FC = () => {
  const isLoginState = useSetRecoilState(loginState)

  useEffect(() => {
    const loginInfo = async (): Promise<void> => {
      try {
        const response = await getauth()
        if (response) {
          console.log(response)
          isLoginState(true)
        }
        return
      } catch (error) {
        return
      }
    }
    loginInfo()
  }, [])
  return (
    <LoginContainer>
      <Login />
    </LoginContainer>
  )
}

export default LoginModal
