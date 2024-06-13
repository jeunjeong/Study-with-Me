import React from 'react'
import * as Style from './style'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { mainToolState } from '@renderer/recoil/toolatom'

function GridButton() {
  const [, setMainToolstate] = useRecoilState(mainToolState)

  const handleButtonClick = () => {
    setMainToolstate(1)
  }

  return (
    <React.Fragment>
      <Style.GridButton onClick={handleButtonClick}>그리드 수정ㄱㄱ</Style.GridButton>
    </React.Fragment>
  )
}

export default GridButton
