import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      globs: ['../../ui/src/components/*/**/*.{vue}'],
      path: 'ui/src/components',
    }),
  ],
  // externals: [
  //   '@webfansplz/vuedoc-parser',
  // ],
})
