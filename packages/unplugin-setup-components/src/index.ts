import { posix, resolve, sep } from 'node:path'
import { writeFile } from 'node:fs'
import fg from 'fast-glob'
import { createUnplugin } from 'unplugin'
import type { ResolvedConfig } from 'vite'
import type { Options } from './types'
import { getComponentName, parseComponent } from './utils'

const componentType: Record<string, string> = {
  base: '基础组件',
  business: '业务组件',
  layouts: '布局组件',
}

interface Item {
  componentName: string
  options?: Record<string, any>
}

export default createUnplugin<Options>((options = {
  globs: ['../../ui/src/components/*/**/*.{vue}'],
  path: 'ui/src/components',
  root: '',
}) => ({
  name: 'unplugin-setup-components',
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  vite: {
    configResolved(ctx: ResolvedConfig) {
      const root = ctx.root
      options.globs.forEach(async (item) => {
        const path = resolve(root, item).split(sep).slice(0, -1).join(posix.sep)

        const components = fg.sync(path, {
          ignore: ['node_modules'],
          onlyFiles: true,
          cwd: root,
        })

        const data: Record<string, any> = {}
        for (const component of components) {
          const base = component.slice(component.indexOf(options.path) + options.path.length + 1)
          const type = componentType[base.split(posix.sep)[0]]

          const componentName = getComponentName(base)
          const arr = await parseComponent(base, options.root, options.path)
          // const item: Item = {
          //   componentName,
          // }
          // if (arr)
          //   item.options = JSON5.parse(arr).customOptions

          // if (data[type]?.children) {
          //   data[type].children.push(item)
          // }
          // else {
          //   data[type] = {
          //     children: [item],
          //   }
          // }
        }

        const constants = resolve(root, '../../playground/editor/constants/components.json')
        writeFile(constants, JSON.stringify(data), (err) => {
          if (err)
            return err
        })
      })
    },
  },
}))
