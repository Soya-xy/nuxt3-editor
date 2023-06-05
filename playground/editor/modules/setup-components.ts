import { writeFile } from 'node:fs'
import JSON5 from 'json5'
import { defineNuxtModule, useNuxt } from '@nuxt/kit'
import type { Component } from '@nuxt/schema'
import { getComponentAttr } from '../server/utils'
import {
  type IComponent,
  componentType,
} from '../constants/type'

interface Item {
  componentName: string
  options?: Record<string, any>
}

let allComponent: Component[] = []

async function generateJson(components: Component[]) {
  const data: IComponent = {}
  for (const component of components) {
    if (component.shortPath.startsWith('components/Widgets')) {
      const type = componentType[component.shortPath.split('/')[2]]
      const options = getComponentAttr(component.filePath)
      const item: Item = {
        componentName: component.pascalName,
      }
      if (options)
        item.options = JSON5.parse(options).customOptions

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
  allComponent = components
}

export default defineNuxtModule({
  meta: {
    name: 'setup-components',
  },
  setup() {
    const nuxt = useNuxt()
    nuxt.hook('components:extend', generateJson)
  },
  hooks: {
    'builder:watch': (event, path) => {
      if (event === 'change' && path.includes('components/Widgets')) {
        generateJson(allComponent)
        console.info(
        `%cChange: ${path} update`,
        'color: green;',
        )
      }
    },
  },
})
