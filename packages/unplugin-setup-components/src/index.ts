import { posix, resolve, sep } from 'node:path'
import { writeFile } from 'node:fs'
import fg from 'fast-glob'
import { createUnplugin } from 'unplugin'
import type { ResolvedConfig } from 'vite'
import type { Options } from './types'
import { parseComponent, toHump } from './utils'

const componentType: Record<string, string> = {
  base: '基础组件',
  business: '业务组件',
  layouts: '布局组件',
}

export default createUnplugin<Options>((options = {
  globs: ['../../ui/src/components/*/**/*.vue'],
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
          let item: Record<string, any> | undefined
          const arr = await parseComponent(base, options.root, options.path)
          if (arr.description) {
            item = {
              name: arr.description,
              prop: {},
              slot: {},
              data: {},
            }
            arr?.keywords?.forEach((keyword) => {
              if (item) {
                if (keyword.name === 'componentName')
                  item[keyword.name] = toHump(keyword.description!)

                else
                  item[keyword.name] = keyword.description!
              }
            })
            arr?.props?.forEach((prop) => {
              // 去掉prop.default的引号
              if (item)
                item.prop[prop.name] = prop.default?.replaceAll('\"', '') || undefined
            })
            arr?.slots?.forEach((slot) => {
              if (item)
                item.slot[slot.name] = []
            })

            arr?.data?.forEach((data) => {
              if (item)
                item.data[data.name] = data.initialValue?.replaceAll('\"', '') || undefined
            })

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

        const constants = resolve(root, '../../playground/editor/constants/components.json')
        writeFile(constants, JSON.stringify(data), (err) => {
          if (err)
            return err
        })
      })
    },
  },
}))
