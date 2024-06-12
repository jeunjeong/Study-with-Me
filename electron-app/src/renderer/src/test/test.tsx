import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { nameState, roomState } from './test-atom'

interface TestProps {
  onToggle: () => void
  onLogin: (event: React.MouseEvent<HTMLButtonElement>, tempName: string, tempRoom: string) => void
}

function Test({ onToggle, onLogin }: TestProps): JSX.Element {
  const [tempName, setTempName] = useState<string>('')
  const [tempRoom, setTempRoom] = useState<string>('')

  return (
    <Wrapper>
      <Button onClick={onToggle}>TOGGLE THEME</Button>
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setTempName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setTempRoom(event.target.value)}
          />
        </div>
        <button onClick={(event) => onLogin(event, tempName, tempRoom)}>Sign in</button>
      </div>
    </Wrapper>
  )
}

export default Test

const Button = styled.button(() => [
  tw``,
  css`
    z-index: 999;
  `
])

const Wrapper = styled.div(() => [
  tw``,
  css`
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `
])
