import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3334',
        changeOrigin: true,
        cookieDomainRewrite: '',
      },
      '/to-do': {
        target: 'http://localhost:3334',
        changeOrigin: true,
        cookieDomainRewrite: '',
      },
      '/contact': {
        target: 'http://localhost:3334',
        changeOrigin: true,
        cookieDomainRewrite: '',
      },
    },
  },
})
