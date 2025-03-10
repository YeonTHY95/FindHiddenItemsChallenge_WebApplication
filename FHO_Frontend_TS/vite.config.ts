import { defineConfig as viteDefineConfig, mergeConfig } from 'vite'
import { defineConfig as vitestDefineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const viteConfig = viteDefineConfig({
  
  plugins: [react()],
  server:{
    port : 3000,
    open : true,
    proxy : { '/api' : 'http://localhost:6677/'}
  },
  
})

const vitestConfig = vitestDefineConfig({
  test : {
    globals: true,
    environment : 'jsdom',
    
  }
})

export default mergeConfig(viteConfig, vitestConfig)
