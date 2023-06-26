import { appDescription } from './constants/index'

export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        jsxTemplates: true,
        experimentalRfc436: true,
      },
    },
  },
  routeRules: {
    '/editor/**': { ssr: false },
  },
  components: {
    dirs: [
      '~/components',
    ],
  },
  modules: [
    '@vue-macros/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    // '~/modules/setup-components',
  ],
  imports: {
    dirs: [
      './composables/editor',
      './composables/engine',
    ],
  },
  vite: {
    build: {
      target: 'esnext',
    },
  },
  experimental: {
    reactivityTransform: true,
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    watcher: 'chokidar',
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/vars.css',
    '~/styles/global.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
})
