import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import pages from 'virtual:generated-pages'
const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(pages),
})

export default router
