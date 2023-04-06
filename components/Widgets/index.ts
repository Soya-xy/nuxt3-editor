import type { DefineComponent } from 'vue'

export type GlobComponents = DefineComponent & {
  name?: string
  icon?: string
  nxType?: 'resource' | 'widget' | 'node'
  [key: string]: any
}

interface IComponent {
  children: GlobComponents[]
}

const components: Record<string, IComponent> = {}

const modules = import.meta.glob<GlobComponents>('./**/*/index.(tsx|vue)', {
  import: 'default',
  eager: true,
})

for (const path in modules) {
  let type = path.split('/')[1]
  switch (type) {
    case 'base':
      type = '基础组件'
      break
    case 'business':
      type = '业务组件'
      break
  }
  if (components[type]?.children) {
    components[type].children.push(modules[path])
  }
  else {
    components[type] = {
      children: [modules[path]],
    }
  }
}

export default components
