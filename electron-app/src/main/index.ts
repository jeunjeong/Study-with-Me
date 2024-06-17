import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import fs from 'fs'
// mainWindow를 전역 변수로 선언
let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Use Dummy Data
  ipcMain.handle('fetch-data', async (event, filePath) => {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 기존의 코드에 이어서...

ipcMain.on('open-auth-window', () => {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {}
  })

  authWindow.loadURL(`${import.meta.env.VITE_DOMAIN}/oauth/kakao-login`)

  authWindow.webContents.on('will-redirect', (event, newURL) => {
    console.log(123, newURL)
    const code = extractTokenFromURL(newURL) // 여기서 'extractTokenFromURL'은 가상의 함수입니다. 실제 구현이 필요합니다.
    if (code) {
      event.preventDefault()
      authWindow.close()

      // 여기서 mainWindow가 null이 아닌지 확인 후 사용
      if (mainWindow) {
        console.log('\ncode :: ')
        console.log(code)
        mainWindow.webContents.send('auth-token', code)
      }
    }
  })

  authWindow.on('closed', () => {
    console.log('Auth window closed')
  })
})

function extractTokenFromURL(url: string): string | null {
  try {
    // URL 객체를 생성하여 쿼리 파라미터를 분석합니다.
    const urlObj = new URL(url)
    // URLSearchParams 객체를 사용하여 'token' 쿼리 파라미터의 값을 얻습니다.
    const token = urlObj.searchParams.get('code')

    return token
  } catch (error) {
    console.error('Token 추출 중 오류 발생:', error)
    return null
  }
}
