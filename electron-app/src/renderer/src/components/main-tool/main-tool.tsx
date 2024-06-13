import React from 'react'
import { Container, Button, Content } from './style'
import { mainToolState } from '@renderer/recoil/toolatom'
import { useRecoilState } from 'recoil'

function MainTool() {
  const [, setMainToolstate] = useRecoilState(mainToolState)

  const handleButtonClick = () => {
    setMainToolstate(0)
  }
  return (
    <Container>
      <Content>
        <Button>추가1</Button>
        <Button>추가2</Button>
        <button onClick={handleButtonClick}>완료</button>
      </Content>
    </Container>
  )
}

export default MainTool
