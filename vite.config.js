import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages 루트 배포용: base 는 기본값('/') 그대로 둔다. (GitHub Pages 전용 base 경로를 넣지 않는다)
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
})
