import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/** `/eap#hash` vira pedido `/eap` (sem barra). O Vite com base `/eap/` recusa. */
function redirectEapBase(): Plugin {
  return {
    name: 'redirect-eap-base',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url ?? ''
        const [pathname, search = ''] = raw.split('?')
        const qs = search ? `?${search}` : ''
        if (pathname === '/eap') {
          res.statusCode = 302
          res.setHeader('Location', `/eap/${qs}`)
          res.end()
          return
        }
        if (
          pathname === '/eap/quiz-127' ||
          pathname === '/eap/quiz-127/' ||
          pathname === '/eap/quiz-67' ||
          pathname === '/eap/quiz-67/'
        ) {
          res.statusCode = 302
          res.setHeader(
            'Location',
            `/eap/?utm_source=instagram&utm_medium=organico&utm_campaign=eap-set-2026&utm_content=quiz-127`,
          )
          res.end()
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: '/eap/',
  plugins: [redirectEapBase(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/eap/api': {
        target: 'https://www.missaoconsciencia.com.br',
        changeOrigin: true,
      },
    },
  },
})
