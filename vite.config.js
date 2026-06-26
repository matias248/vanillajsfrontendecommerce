import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/VanillaTypeScriptFrontendEcommerce",
  plugins: [
    tailwindcss(),
  ],
  build: {
    sourcemap: true
  }
})