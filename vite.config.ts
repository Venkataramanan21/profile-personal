import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/profile-personal/' when deploying to GitHub project Pages.
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
