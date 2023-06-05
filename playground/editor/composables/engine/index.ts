import { defineStore } from 'pinia'
import type { IComponents } from '../editor'
import { MouseMoveEvent } from './mouse/MouseMoveEvent'
import { MouseClickEvent } from './mouse/MouseClickEvent'
import { MouseOverEvent } from './mouse/MouseOverEvent'
import { MouseOutEvent } from './mouse/MouseOutEvent'
import { DragDropEvent } from './mouse/DragDropEvent'

interface ISubscriber<EventType = any> {
  (payload?: EventType): void | boolean
}

export interface IEvent {
  type: string
  payload?: ISubscriber
}

export interface Listen extends IEvent {
  subscribe: ISubscriber
  unSubscribe?: ISubscriber
}

export interface CustomsEvent {
  type: 'drag:start' | 'drag:stop' | 'drag:move' | 'mouse:move' | 'mouse:click' | 'mouse:dblclick' | 'mouse:over' | 'mouse:out' | 'mouse:down' | 'mouse:up'
  data: MouseEvent | undefined
}

export interface CustomMouseEvent extends MouseEvent {
  topClientX?: number
  topClientY?: number
  topPageX?: number
  topPageY?: number
  target: HTMLElement | EventTarget | null
}

interface NodesById extends IComponents {
  id?: string
  isWidget?: boolean
}

export const useEngine = defineStore('engine', () => {
  // 是否在拖动
  const dragging = ref(false)
  // 拖到droptip里面了
  const dropSlot = ref(false)
  // 当前的悬停的节点Id
  const stateId = ref('')
  // 开始拖动的节点Id
  const startEvent = ref<MouseEvent>()
  // 当前操作的事件
  const currentEvent = ref<CustomsEvent>()
  // 当前操作转换后的事件
  const targetEvent = ref<CustomMouseEvent | undefined>(undefined)
  // 拖动中的节点
  const draggingNodes = ref<NodesById>({
    componentName: '',
  })
  // 拖动中的组件
  const draggingResource = ref([])
  // 当前激活的节点
  const nodesById = ref<NodesById>({
    componentName: '',
  })
  // 注册自定义事件
  const providers = reactive(new Set<Listen>())
  //  当前鼠标是否在编辑器内
  const isInEditor = ref(false)

  watch(currentEvent, (e) => {
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
    isInEditor,
    startEvent,
    currentEvent,
    targetEvent,
    dragging,
    stateId,
    dropSlot,
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

export function transformCoordinates(target?: CustomMouseEvent) {
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
