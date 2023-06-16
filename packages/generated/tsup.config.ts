import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src'],
  format: ['cjs', 'esm'],
  shims: true,
  target: 'node16.14',
  clean: true,
  watch: true,
  dts: true,
  // onSuccess: 'pnpm run watch'
})
