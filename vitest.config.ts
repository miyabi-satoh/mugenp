/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
  },
  resolve: {
    alias: {
      '~': __dirname + '/src',
    },
  },
})