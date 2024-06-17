export interface Data {
  data: Data
}

export interface Data {
  rooms: Room[]
}

export interface Room {
  id: number
  info: GroupInfo
  messages: Message[]
}

export interface GroupInfo {
  name: string
  id: number
  members: string[]
  img: string
}

export interface Message {
  name: string
  content: string
  time?: string
  read?: boolean
}
