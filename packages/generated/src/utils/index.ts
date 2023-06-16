import path from 'node:path'
import { construct } from './tree'
import { IComponents } from '../types'

export const COMPONENT_PATH = path.resolve(__dirname, '../../../playground/editor/components/Widgets/**/*.vue')
export const GENERATE_ROUTE_PATH = path.resolve(__dirname, '../../../packages/preview/src/pages')
export const WATCH_PATH = path.resolve(__dirname, '../../../playground/editor/constants/save.json')

export const getJSON = (data: IComponents[]) => {
  return construct(data, {
    id: 'componentId',
    pid: 'parentId',
  })
}


// 递归循环children
export const loopComponent = (data: any[], callback: (item: any) => void) => {
  data.forEach((item) => {
    if (item.children) {
      loopComponent(item.children, callback)
    } else
      callback(item)
  })
}
