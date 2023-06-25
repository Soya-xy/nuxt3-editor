import * as UI from '@lc/ui'
import '@lc/ui/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(UI).forEach((key: string) => {
    nuxtApp.vueApp.component(key, (UI as any)[key])
  })

  // nuxtApp.vueApp.use(UI)
})
