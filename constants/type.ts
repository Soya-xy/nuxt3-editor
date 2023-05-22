export interface GlobComponents {
  componentName: string
  options?: {
    name?: string
    icon?: string
    slots?: Record<string, any>
  }
}

export type IComponent = Record<string, {
  children: GlobComponents[]
}>

export const componentType: Record<string, string> = {
  base: '基础组件',
  business: '业务组件',
  layouts: '布局组件',
}
