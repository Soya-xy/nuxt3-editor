import { defineStore } from 'pinia'
import _ from 'lodash'
import { ITreeNode, useEngine } from './engine/index'
import type { GlobComponents } from '~/constants/type'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId: string | null
  slots?: string
  slotsName?: string[]
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}
export function getRecentNxElement(el: HTMLElement, atrrName = 'editor-nx-'): HTMLElement | undefined {
  if (el.id.startsWith(atrrName) || el.id === 'NX-Editor') {
    return el
  }
  else {
    if (el.parentElement)
      return getRecentNxElement(el.parentElement, atrrName)
  }
  return undefined
}

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const engine = useEngine()
  const componentsJson = ref<IComponents[]>([])

  function addComponent(comp: GlobComponents, target: HTMLElement, nodes?: ITreeNode) {

    const dom = getRecentNxElement(target)
    if (dom) {
      const slots = nodes?.slots || ''
      const slotsName = comp.slots?.split('|') || undefined
      componentsJson.value.push({
        componentName: comp.componentName!,
        name: comp.name,
        componentId: `editor-${useNxId()}`,
        parentId: engine.stateId,
        slots,
        slotsName,
      })
    }
  }

  function getJson(): IComponents[] {
    const data = _.cloneDeep(componentsJson.value)
    return construct(data, {
      id: 'componentId',
      pid: 'parentId',
    })
  }

  return {
    componentsJson,
    addComponent,
    getJson,
  }
})
