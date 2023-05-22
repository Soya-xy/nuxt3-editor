import { defineStore } from 'pinia'
import _ from 'lodash'
import { ITreeNode, useEngine } from '~/composables/engine/index'
import type { GlobComponents } from '~/constants/type'
import { Message } from '@arco-design/web-vue'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId?: string
  slotsName?: string[]
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}
export function getRecentNxElement(el: HTMLElement, atrName = 'editor-nx-'): HTMLElement | undefined {
  if (el.id.startsWith(atrName) || el.id === 'NX-Editor') {
    return el
  }
  else {
    if (el.parentElement)
      return getRecentNxElement(el.parentElement, atrName)
  }
  return undefined
}

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const engine = useEngine()
  const componentsJson = ref<IComponents[]>([])
  const actionHistory = ref<[]>([])
  const isEditor = ref(true)

  function addComponent(comp: GlobComponents, target: HTMLElement, nodes?: ITreeNode) {
    const dom = getRecentNxElement(target)
    if (dom && comp.componentName) {
      componentsJson.value.push({
        componentName: comp.componentName,
        componentId: `editor-${useNxId()}`,
        parentId: engine.stateId,
        ...comp.options
      })
    }else{
      Message.error('该组件未定义组件名')
    }
  }

  function getJson(): IComponents[] {
    const data = _.cloneDeep(componentsJson.value)
    return construct(data, {
      id: 'componentId',
      pid: 'parentId',
    })
  }

  function editComponent() {

  }

  return {
    isEditor,
    actionHistory,
    componentsJson,
    addComponent,
    editComponent,
    getJson,
  }
})
