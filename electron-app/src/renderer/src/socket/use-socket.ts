import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { io, Socket } from 'socket.io-client'
import { socketState } from '@renderer/recoil/chatatom'

const ENDPOINT = 'http://localhost:3000'

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useRecoilState(socketState)

  useEffect(() => {
    console.log('useEffect triggered')
    if (!socket) {
      console.log('No socket, creating new one')
      const newSocket = io(ENDPOINT, {
        transports: ['websocket', 'polling']
      })

      newSocket.on('connect', () => {
        console.log('connected')
      })
      setSocket(null)
      //   setSocket(newSocket)
    }
  }, [socket])

  console.log(socket)

  return socket
}

export default useSocket
