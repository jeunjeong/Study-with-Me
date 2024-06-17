import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Use Dummy Data
import path from 'path'

// Custom APIs for renderer
const api = {
  // `send` 메소드를 `api` 객체에 추가합니다.
  // 여기서는 예시로 `ipcRenderer.send`를 직접 호출하는 방식을 사용합니다.
  send: (channel: string, ...args: string[]): void => {
    // 채널명이 허용된 리스트에 있는지 확인하는 로직을 추가할 수 있습니다.
    // 이는 보안을 강화하는 방법 중 하나입니다.
    const allowedChannels = ['open-auth-window']
    if (allowedChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    }
  },

  // Use Dummy Data
  fetchFilePath: (relativePath) => path.join(__dirname, relativePath),
  fetchData: (filePath) => ipcRenderer.invoke('fetch-data', filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
