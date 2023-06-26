import * as UI from '@lc/ui'
import '@lc/ui/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  UI.LdConfig.value.isDev = import.meta.env.MODE === 'development'

  Object.keys(UI).forEach((key: string) => {
    console.log('🚀 ~ file: ui.ts:8 ~ Object.keys ~ key:', key)
    if (key !== 'LdConfig')
      nuxtApp.vueApp.component(key, (UI as any)[key])
  })
  // nuxtApp.vueApp.use(UI)
})
