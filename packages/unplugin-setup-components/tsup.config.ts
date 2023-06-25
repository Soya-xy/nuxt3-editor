import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
  ],
  format: ['cjs', 'esm'],
  onSuccess: 'npm run build:fix',
}
