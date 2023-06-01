import { defineStore } from 'pinia'
import _, { cloneDeep, find } from 'lodash'
import { Message } from '@arco-design/web-vue'
import { useEngine } from '~/composables/engine/index'
import type { GlobComponents } from '~/constants/type'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId?: string
  slots?: boolean
  props?: Record<string, any>
  children?: IComponents[]
}

export const EDITOR_ID = 'NX-Editor'
export const EDITOR_ATTR = 'editor-nx-'
export const TOOLBAR_ID = 'toolbar-'
export function useNxId() {
  return `nx-${_.uniqueId()}`
}
export function getRecentNxElement(el: HTMLElement, atrName = EDITOR_ATTR): HTMLElement | undefined {
  // 如果点击的是toolbar，不做处理
  if (el?.id.startsWith(TOOLBAR_ID))
    return undefined

  if (el?.id.startsWith(atrName) || el?.id === EDITOR_ID) {
    return el
  }
  else {
    if (el?.parentElement)
      return getRecentNxElement(el.parentElement, atrName)
  }
  return undefined
}

export const DraggingNodes = ref('')

interface Router {
  name: string
  path: string
  components: IComponents[]
}

export const useEditor = defineStore('editor', () => {
  const engine = useEngine()
  const router = ref<Router[]>([]) // 路由
  const routerActive = ref(-1) // 当前编辑路由
  const componentsJson = ref<IComponents[]>([]) // 组件结构
  const actionHistory = ref<Array<IComponents[]>>([]) // 历史记录
  const isEditor = ref(true)
  const isUnDo = ref(false)
  const shotIndex = ref(0)
  const changeType = ref('change')

  // undo
  watch(() => componentsJson.value, (val) => {
    if (isUnDo.value) {
      if (changeType.value !== 'undo') {
        isUnDo.value = false
        actionHistory.value = [cloneDeep(val)]
        shotIndex.value = 0
      }
      else {
        changeType.value = 'change'
      }
      return
    }

    if (Array.isArray(actionHistory.value))
      actionHistory.value.push(cloneDeep(val))

    router.value[routerActive.value].components = cloneDeep(val)
  }, {
    deep: true,
  })

  function getJson(): IComponents[] {
    const data = _.cloneDeep(componentsJson.value)
    return construct(data, {
      id: 'componentId',
      pid: 'parentId',
    })
  }

  function addComponent(comp: GlobComponents, target: HTMLElement) {
    if (routerActive.value === -1 || !router.value[routerActive.value]?.path)
      return Message.error('请先选择路由')

    const dom = getRecentNxElement(target)
    if (dom && comp.componentName) {
      const data = _.cloneDeep(componentsJson.value)
      const parent = find(data, ['componentId', engine.stateId]) as any
      const parentId = parent ? (parent?.slots ? engine.stateId : parent.parentId) : engine.stateId
      componentsJson.value.push({
        componentName: comp.componentName,
        componentId: `editor-${useNxId()}`,
        parentId,
        ...comp.options,
      })
    }
    else {
      Message.error('该组件未定义组件名')
    }
  }

  function editComponent(target: HTMLElement) {
    const node = engine.draggingNodes
    if (!node?.componentId || node.componentId === target.id)
      return
    const data = _.cloneDeep(componentsJson.value)
    const nowNode = _.findIndex(data, ['componentId', node.componentId])
    const targetNode = _.findIndex(data, ['componentId', target.id])

    if (target.id === EDITOR_ID) {
      const item = data[nowNode]
      item.parentId = EDITOR_ID

      if (nowNode !== -1) {
        data.splice(nowNode, 1)
        data.push(item)
        componentsJson.value = data
      }
    }

    // 在componentsJson中将nowNode移动到targetNode的位置
    if (nowNode !== -1 && targetNode !== -1) {
      data[nowNode].parentId = data[targetNode].parentId

      if (data[targetNode].slots)
        data[nowNode].parentId = data[targetNode].componentId

      const now = data.splice(nowNode, 1)[0]
      data.splice(targetNode, 0, now)
      componentsJson.value = data
    }
  }

  function deleteComponent(id: string) {
    const data = _.cloneDeep(componentsJson.value)
    const nowNode = _.findIndex(data, ['componentId', id])
    if (nowNode !== -1) {
      data.splice(nowNode, 1)
      componentsJson.value = data
    }
  }

  function cloneComponent(id: string) {
    const data = _.cloneDeep(componentsJson.value)
    const nowNode = _.findIndex(data, ['componentId', id])
    if (nowNode !== -1) {
      const item = _.cloneDeep(data[nowNode])
      item.componentId = `editor-${useNxId()}`
      data.splice(nowNode + 1, 0, item)
      componentsJson.value = data
    }
  }

  function editHistory(index: number) {
    isUnDo.value = true
    changeType.value = 'undo'
    if (actionHistory.value[index])
      componentsJson.value = actionHistory.value[index]
  }
  return {
    isEditor,
    isUnDo,
    routerActive,
    actionHistory,
    componentsJson,
    shotIndex,
    router,
    editHistory,
    addComponent,
    cloneComponent,
    deleteComponent,
    editComponent,
    getJson,
  }
})
