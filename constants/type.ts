export interface GlobComponents {
  componentName: string
  name?: string
  icon?: string
  nxType?: 'resource' | 'widget' | 'node'
  haveSlots?: string
}

export type IComponent = Record<string, {
  children: GlobComponents[]
}>

export const componentType: Record<string, string> = {
  base: '基础组件',
  business: '业务组件',
  layouts: '布局组件',
}
