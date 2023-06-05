import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  watch: !!process.env.DEV,
  clean: true,
  dts: true,
  define: {
    'import.meta.DEV': JSON.stringify(!!process.env.DEV),
  },
})
