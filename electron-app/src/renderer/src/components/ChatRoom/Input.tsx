import React, { ChangeEvent, KeyboardEvent } from 'react'
import * as c from './Style'

interface InputProps {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  sendMessage: (event: React.SyntheticEvent<HTMLTextAreaElement | HTMLButtonElement>) => void
}

const Input: React.FC<InputProps> = ({ message, setMessage, sendMessage }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (message.length > 0) {
      if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault()
        setMessage((prevMessage) => prevMessage + '\n')
      } else if (event.key === 'Enter') {
        sendMessage(event)
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  return (
    <>
      <c.ChatBox>
        <c.ChatInput
          autoFocus
          spellCheck="false"
          placeholder="Send a message to Group..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <c.SendButton onClick={sendMessage} disabled={message.length === 0}>
          전송
        </c.SendButton>
      </c.ChatBox>
    </>
  )
}

export default Input
