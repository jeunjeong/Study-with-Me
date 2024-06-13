import React from 'react'
import { Container } from './style'
import GridWindow from '../grid/grid-window'
import { MainText } from '@renderer/style'
import MainTool from '../main-tool/main-tool'
import { mainToolState } from '@renderer/recoil/toolatom'
import { useRecoilValue } from 'recoil'

function Home(): JSX.Element {
  const showTool = useRecoilValue(mainToolState)

  return (
    <React.Fragment>
      <Container>
        {showTool === 1 && <MainTool />}
        여기는 메에에에에ㅔ에ㅔ인
        <GridWindow />
      </Container>
    </React.Fragment>
  )
}

export default Home
