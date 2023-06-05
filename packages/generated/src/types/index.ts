export interface IComponents {
  name?: string
  componentName?: string
  componentId?: string
  parentId?: string
  slots?: boolean
  props?: Record<string, any>
  children?: IComponents[]
}
