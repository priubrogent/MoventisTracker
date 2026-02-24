import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const moventisProxy = {
  '/moventis': {
    target: 'https://www.moventis.es',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/moventis/, ''),
  },
}

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        widget: 'widget/index.html',
      },
    },
  },
  server: { proxy: moventisProxy },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    allowedHosts: true,
    proxy: moventisProxy,
  },
})
