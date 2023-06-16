import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  shims: true,
  clean: true,
  watch: true,
  splitting:true,
  dts: true,
  // onSuccess: 'pnpm run watch'
})
