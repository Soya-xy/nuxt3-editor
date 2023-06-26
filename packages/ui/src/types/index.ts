export interface IComponents {
  name?: string
  componentName?: string
  componentId?: string
  parentId?: string
  slots?: Record<string, any>
  props?: Record<string, any>
  children?: IComponents[]
}
