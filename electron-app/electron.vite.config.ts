import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    esbuild: {
      // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    plugins: [
      react({
        babel: {
          plugins: [
            'babel-plugin-macros',
            [
              '@emotion/babel-plugin-jsx-pragmatic',
              {
                export: 'jsx',
                import: '__cssprop',
                module: '@emotion/react',
              },
            ],
            [
              '@babel/plugin-transform-react-jsx',
              { pragma: '__cssprop' },
              'twin.macro',
            ],
          ],
        },
      }),
    ],
  }
})
