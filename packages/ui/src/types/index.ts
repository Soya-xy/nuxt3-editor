export interface IComponents {
  name?: string
  componentName?: string
  componentId?: string
  parentId?: string
  slot?: Record<string, any>
  prop?: Record<string, any>
  children?: IComponents[]
}
