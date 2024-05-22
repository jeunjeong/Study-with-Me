// Modal.tsx
import React from 'react'
import { LoginContainer } from './style'
import Login from '../login/login'

const LoginModal: React.FC = () => {
  return (
    <LoginContainer>
      <Login />
    </LoginContainer>
  )
}

export default LoginModal
