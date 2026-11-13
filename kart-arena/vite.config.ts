import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  // Serve from "/" on localhost; use the GitHub Pages sub-path for production builds.
  base: command === 'serve' ? '/' : '/KartArena-StudiulIndividualNr1/',
  plugins: [react(), tailwindcss()],
}))
