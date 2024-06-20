import { loginState } from '@renderer/recoil/loginatom'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'
import { io, Socket } from 'socket.io-client'

interface ISocketContext {
  socket: Socket | null
}

const SocketContext = createContext<ISocketContext | undefined>(undefined)

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: ReactNode
}

const ENDPOINT = 'http://localhost:3000'

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const isLogin = useRecoilValue(loginState)
  useEffect(() => {
    console.log(isLogin)

    if (isLogin) {
      const newSocket = io(ENDPOINT, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
      })

      newSocket.on('connect', () => {
        // console.log('connect!')
        console.log('newSocket connected')
        // newSocket.emit('setUserNick', 'user1')
        // newSocket.emit('getUserNick')
        // newSocket.on('send', (receive) => {
        //   console.log(receive)
        // })
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [isLogin])

  // useEffect(() => {
  //   console.log('useEffect triggered')
  //   if (!socket) {
  //     console.log('No socket, creating new one')
  //     const newSocket = io(ENDPOINT, {
  //       transports: ['websocket', 'polling']
  //     })

  //     newSocket.on('connect', () => {
  //       console.log('connected')
  //     })
  //     setSocket(null)
  //       setSocket(newSocket)
  //   }
  // }, [socket])

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
