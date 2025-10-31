import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separa vendors em chunks específicos
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Framer Motion (pesado)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }

            if (id.includes('formik')) {
              return 'formik';
            }

            if (id.includes('yup')) {
              return 'yup';
            }
            // Three.js e React Three (muito pesado)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Ícones
            if (id.includes('react-icons')) {
              return 'icons';
            }
            // Embla Carousel
            if (id.includes('embla-carousel')) {
              return 'embla';
            }
            // GSAP
            if (id.includes('gsap')) {
              return 'gsap';
            }
            // OGL
            if (id.includes('ogl')) {
              return 'ogl';
            }
            // Resto dos vendors
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Usa esbuild (padrão do Vite) para minificação
    minify: 'esbuild',
  },
  // Otimizações de dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei']
  },
  // Remove console.log em produção com esbuild
  esbuild: {
    drop: ['console', 'debugger'],
  }
})