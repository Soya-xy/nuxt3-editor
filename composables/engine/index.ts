import { defineStore } from 'pinia'
import type { ID } from './type'
import { MouseMoveEvent } from './mouse/MouseMoveEvent'
import type { GlobComponents } from '~/components/Widgets/index'

export interface ITreeNode {
  id: ID
  title?: string
  description?: string
  parentId?: ID
  children: ID[]
  isSlot: boolean
  slots?: {
    [name: string]: ID
  }
  documentId: ID
  // 设计时的属性，比如readOnly， open等
  designerProps?: GlobComponents
  // 用来编辑属性的schema
  // designerSchema?: INodeSchema
  // 设计器专用属性，比如是否锁定
  // designerParams?: IDesignerParams
}

interface ISubscriber<EventType = any> {
  (payload?: EventType): void | boolean
}

interface IEvent {
  type: string
  payload?: ISubscriber
}

interface Listen extends IEvent {
  subscribe: ISubscriber
  unSubscribe?: ISubscriber
}

export const useEngine = defineStore('engine', () => {
  const stateId = ref('')
  // 拖动中的节点
  const draggingNodes = ref([])
  // 拖动中的组件
  const draggingResource = ref([])
  // 当前的节点
  const nodesById = ref<{ [id: ID]: ITreeNode }>({})
  // 注册自定义事件
  const providers = reactive(new Set<Listen>())

  function register(provider: Listen) {
    provider.subscribe()
    providers.add(provider)
  }

  function remove(type: string) {
    providers.forEach((p) => {
      if (p.type === type) {
        if (isFn(p.unSubscribe))
          p.unSubscribe()
        providers.delete(p)
      }
    })
  }

  function dispatch(event: IEvent) {
    providers.forEach((provider) => {
      if (provider.type === event.type) {
        if (isFn(event.payload))
          event.payload()
      }
    })
  }

  return {
    stateId,
    draggingNodes,
    draggingResource,
    nodesById,
    register,
    dispatch,
    remove,
  }
})

export function createEngine(): Listen[] {
  return [MouseMoveEvent()]
}
