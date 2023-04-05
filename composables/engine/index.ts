import { defineStore } from 'pinia'
import type { ID } from './type'
import { MouseMoveEvent } from './mouse/MouseMoveEvent'
import { MouseClickEvent } from './mouse/MouseClickEvent'
import { MouseOverEvent } from './mouse/MouseOverEvent'
import { MouseOutEvent } from './mouse/MouseOutEvent'
import { DragDropEvent } from './mouse/DragDropEvent'
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

interface CustomEvent {
  type: 'drag:start' | 'drag:stop' | 'drag:move' | 'mouse:move' | 'mouse:click' | 'mouse:dblclick' | 'mouse:over' | 'mouse:out' | 'mouse:down' | 'mouse:up'
  data: MouseEvent | undefined
}

interface CustomMouseEvent extends MouseEvent {
  topClientX?: number
  topClientY?: number
  topPageX?: number
  topPageY?: number
  target: HTMLElement | EventTarget | null
}

export const useEngine = defineStore('engine', () => {
  // 是否在拖动
  const dragging = ref(false)
  // 当前的点击/拖拽的节点Id
  const stateId = ref('')
  // 当前操作的事件
  const currentEvent = ref<CustomEvent>()
  // 当前操作转换后的事件
  const targetEvent = ref<CustomMouseEvent | undefined>(undefined)
  // 拖动中的节点
  const draggingNodes = ref([])
  // 拖动中的组件
  const draggingResource = ref([])
  // 当前的节点
  const nodesById = ref<{ [id: ID]: ITreeNode }>()
  // 注册自定义事件
  const providers = reactive(new Set<Listen>())

  watch(currentEvent, (e) => {
    console.log(e)
    targetEvent.value = transformCoordinates(e?.data)
  }, {
    deep: true,
  })

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
    currentEvent,
    targetEvent,
    dragging,
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
  return [
    DragDropEvent(),
    MouseMoveEvent(),
    MouseClickEvent(),
    MouseOverEvent(),
    MouseOutEvent(),
  ]
}

function transformCoordinates(target?: CustomMouseEvent) {
  if (!target)
    return
  const { frameElement } = target?.view || {}
  if (frameElement) {
    const frameRect = frameElement.getBoundingClientRect()
    const scale = frameRect.width / (frameElement as any).offsetWidth
    target.topClientX = target.clientX * scale + frameRect.x
    target.topClientY = target.clientY * scale + frameRect.y
    target.topPageX
      = target.pageX + frameRect.x - (target.view?.scrollX || 0)
    target.topPageY
      = target.pageY + frameRect.y - (target.view?.scrollY || 0)
    const topElement = document.elementFromPoint(
      target.topPageX,
      target.topClientY,
    )
    if (topElement !== frameElement)
      target.target = topElement as any
  }
  else {
    target.topClientX = target.clientX
    target.topClientY = target.clientY
    target.topPageX = target.pageX
    target.topPageY = target.pageY
  }
  return target
}
