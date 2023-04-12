import { writeFile } from 'node:fs'
import { defineNuxtModule, useNuxt } from '@nuxt/kit'
import { getComponentAttr } from '../server/utils'
import {
  type IComponent,
  componentType,
} from '../constants/type'

export default defineNuxtModule({
  meta: {
    name: 'setup-components',
  },
  setup() {
    const nuxt = useNuxt()
    nuxt.hook('components:extend', async (components) => {
      const data: IComponent = {}
      for (const component of components) {
        if (component.shortPath.startsWith('components/Widgets')) {
          const type = componentType[component.shortPath.split('/')[2]]
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
