import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    VueMacros.vite({
      plugins: {
        vue: vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
    AutoImport({
      imports: [
        'vue',
        { '@arco-design/web-vue': ['Message', 'Notification'] },
      ],
      dts: true,
    }),
    Components({
      dts: true,
      resolvers: [
        ArcoResolver({
          importStyle: 'less',
          resolveIcons: true,
          sideEffect: true,

        }),
        IconsResolver(),
      ],
    }),
    Icons(),
    // https://github.com/antfu/unocss
    Unocss(),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'index',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
