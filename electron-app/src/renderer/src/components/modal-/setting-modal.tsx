// Modal.tsx
import React from 'react'
import { Container, CloseButton, Title } from './style-'
import { useSetRecoilState } from 'recoil'
import { settingsModal } from '../../recoil/sideatom'
import closebuttonicon from './icons/closebutton-icon.svg'

const SettingModal: React.FC = () => {
  const showSettingModal = useSetRecoilState(settingsModal)
  return (
    <Container>
      <Title>Settings</Title>
      <CloseButton
        src={closebuttonicon}
        alt="closebutton-icon"
        onClick={() => showSettingModal(false)}
      />
    </Container>
  )
}

export default SettingModal
