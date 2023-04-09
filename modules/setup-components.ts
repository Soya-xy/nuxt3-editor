import { writeFile } from 'node:fs'
import { createResolver, defineNuxtModule, useNuxt } from '@nuxt/kit'
import { getComponentAttr } from '../server/utils'
import type { IComponent } from '~/constants/type'

export default defineNuxtModule({
  meta: {
    name: 'setup-components',
  },
  setup() {
    const nuxt = useNuxt()
    const resolver = createResolver(process.cwd())
    nuxt.hook('components:extend', async (components) => {
      const data: IComponent = {}
      for (const component of components) {
        if (component.shortPath.startsWith('components/Widgets')) {
          let type = component.shortPath.split('/')[2]
          switch (type) {
            case 'base':
              type = '基础组件'
              break
            case 'business':
              type = '业务组件'
              break
          }
          const options = getComponentAttr(component.filePath)
          const item = {
            componentName: component.pascalName,
            ...options,
          }
          if (data[type]?.children) {
            data[type].children.push(item)
          }
          else {
            data[type] = {
              children: [item],
            }
          }
        }
      }

      writeFile('constants/components.json', JSON.stringify(data), (err) => {
        if (err)
          console.log(err)
      })
    })
  },
})
