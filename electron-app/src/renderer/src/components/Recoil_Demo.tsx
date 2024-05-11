import React from 'react'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil'

function Recoil_Demo() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  )
}

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '' // default value (aka initial value)
})

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
      <ul className='ts'>
        <li>src/renderer/src/components/Recoil_Demo</li>
        <li>src/renderer/styles/GlobalStyles.tsx</li>
      </ul>
    </div>
  )
}

function TextInput() {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event) => {
    setText(event.target.value)
  }


  return (
    <div>
      <input type="text" value={text} onChange={onChange} placeholder="Change Here" />
      <br />
      Echo: {text}
    </div>
  )
}

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState)

    return text.length
  }
})

function CharacterCount() {
  const count = useRecoilValue(charCountState)

  return <React.Fragment>Character Count: {count}</React.Fragment>
}

export default Recoil_Demo
