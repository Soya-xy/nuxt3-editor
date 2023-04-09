export interface GlobComponents {
  componentName: string
  name?: string
  icon?: string
  nxType?: 'resource' | 'widget' | 'node'
}

export type IComponent = Record<string, {
  children: GlobComponents[]
}>
