import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { name } from './package.json'

process.env.VITE_APP_NAME = name
require('dotenv-flow').config({
  node_env: process.env.NODE_ENV || 'development',
})

const apiPrefix = `${process.env.ROOT || '/'}api`
// const apiRegexp = new RegExp(`^${apiPrefix}`)

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'page-header-padding-left': '16px',
          'page-header-padding-right': 0,
          'page-header-padding-vertical': '8px',
        },
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        { 'vue-request': ['useRequest', 'usePagination'] },
        { '~/utils/ajax': ['api'] },
      ],
      dts: true,
    }),
    Pages(),
    Layouts(),
    Components({
      directoryAsNamespace: true,
      dts: true,
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5555,
    proxy: {
      [apiPrefix]: {
        target: `http://${process.env.API_SERVER}`,
      },
    },
  },
})
