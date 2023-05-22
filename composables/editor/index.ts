import { defineStore } from 'pinia'
import _, { find } from 'lodash'
import { useEngine } from '~/composables/engine/index'
import type { GlobComponents } from '~/constants/type'
import { Message } from '@arco-design/web-vue'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId?: string
  slots?: boolean
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}
export function getRecentNxElement(el: HTMLElement, atrName = 'editor-nx-'): HTMLElement | undefined {
  if (el?.id.startsWith(atrName) || el?.id === 'NX-Editor') {
    return el
  }
  else {
    if (el?.parentElement)
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

  function addComponent(comp: GlobComponents, target: HTMLElement) {
    const dom = getRecentNxElement(target)
    if (dom && comp.componentName) {
      const parent = find(componentsJson.value, ['componentId', engine.stateId]) as any
      const parentId = parent ? (parent?.slots ? engine.stateId : parent.parentId) : engine.stateId
      componentsJson.value.push({
        componentName: comp.componentName,
        componentId: `editor-${useNxId()}`,
        parentId,
        ...comp.options
      })
    } else {
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

  function editComponent(target: HTMLElement) {
    const node = engine.draggingNodes
    if (!node?.componentId || node.componentId === target.id) return
    const data = _.cloneDeep(componentsJson.value)
    const nowNode = _.findIndex(data, ['componentId', node.componentId])
    const targetNode = _.findIndex(data, ['componentId', target.id])

    if (target.id === 'NX-Editor') {
      const item = data[nowNode]
      item.parentId = 'NX-Editor'

      if (nowNode !== -1) {
        data.splice(nowNode, 1)
        data.push(item)
        componentsJson.value = data
      }
    }

    // 在componentsJson中将nowNode移动到targetNode的位置
    if (nowNode !== -1 && targetNode !== -1) {
      console.log(data, data[targetNode]);
      
      data[nowNode].parentId = data[targetNode].parentId

      if (data[targetNode].slots) {
        data[nowNode].parentId = data[targetNode].componentId
      }
      const now = data.splice(nowNode, 1)[0]
      data.splice(targetNode, 0, now)
      componentsJson.value = data
    }


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
