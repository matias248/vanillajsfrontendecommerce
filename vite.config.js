import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/vanillajsfrontendecommerce",
  plugins: [
    tailwindcss(),
  ],
  build: {
    sourcemap: true
  }
})