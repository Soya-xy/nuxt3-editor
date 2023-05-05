import _ from 'lodash'
import type { CustomMouseEvent } from '..'
import { useEngine } from '..'
import type { IComponent } from '~/constants/type'

const components = await import('~/constants/components.json').then(m => m.default) as IComponent

function getWidget(name: any) {
  const comp = _.compact(_.map(_.values(components), (value) => {
    if (isArr(value?.children))
      return _.find(value.children, v => v.name === name)
  }))
  if (comp.length === 0)
    return
  return comp[0]
}

export function DragDropEvent() {
  const engine = useEngine()
  const editor = useEditor()
  const dom = document.getElementById('actionArea')
  // 起始位置
  let onMouseDownAt = 0
  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'drag:start',
      payload: () => {
        // console.log('IEvent', e)
      },
    })
  }

  function onStartDrag(e: MouseEvent) {
    if (engine.dragging)
      return
    engine.currentEvent = {
      type: 'drag:start',
      data: e,
    }
    engine.dragging = true
    dom?.addEventListener('contextmenu', onContextMenuWhileDragging)
  }

  function onMouseMove(e: MouseEvent) {
    if (!engine.startEvent)
      return

    const distance = Math.sqrt(
      (e.pageX - engine.startEvent.pageX) ** 2
      + (e.pageY - engine.startEvent.pageY) ** 2,
    )
    const timeDelta = Date.now() - onMouseDownAt
    if (timeDelta > 10 && distance > 4 && e !== engine.startEvent) {
      dom?.removeEventListener('mousemove', onMouseMove)
      onStartDrag(e)
    }
  }

  function onMouseDown(e: CustomMouseEvent) {
    if (e.button !== 0 || e.ctrlKey || e.metaKey)
      return

    if (
      (e.target as any).isContentEditable
      || (e.target as any).contentEditable === 'true'
    )
      return true

    // 判断是否靠近编辑器
    if ((e.target as any)?.closest?.('.monaco-editor'))
      return

    let target: HTMLElement | undefined
    // 判断e.target的标签是否的I
    if ((e.target as any)?.tagName === 'I') {
      target = (e.target as any).parentNode
      if (!(e.target as any).parentNode?.id?.startsWith?.('nx'))
        return
    }
    // 判断e.target的id是否是nx开头
    else if (!(e.target as any)?.id?.startsWith?.('nx')) {
      return
    }

    if (target === undefined)
      target = e.target as HTMLElement



    engine.nodesById.title = target.innerText
    engine.nodesById.id = target.id

    engine.startEvent = e
    engine.dragging = false
    onMouseDownAt = Date.now()
    dom?.addEventListener('mousemove', onMouseMove)
  }

  function onDragEnd(e: MouseEvent) {
    const comp = getWidget(engine.nodesById?.title)
    if (!comp)
      return

    let target = document.getElementById('NX-Editor') as HTMLElement

    if (engine.stateId) {
      target = document.getElementById(engine.stateId) as HTMLElement
    } else {
      target = e.target as HTMLElement
    }

    engine.dragging = false

    editor.addComponent(comp, target, engine.nodesById)
  }

  function onMouseUp(e: MouseEvent) {
    if (engine.dragging) {
      onDragEnd(e)
      engine.currentEvent = {
        type: 'drag:stop',
        data: e,
      }
      engine.nodesById = {}
    }

    dom?.removeEventListener('mousemove', onMouseMove)
    dom?.removeEventListener('contextmenu', onContextMenuWhileDragging)
    engine.dragging = false
  }

  function onContextMenuWhileDragging(e: MouseEvent) {
    e.preventDefault()
  }

  function subscribe() {
    dom?.addEventListener('mouseup', onMouseUp)
    dom?.addEventListener('mousedown', onMouseDown)
    dom?.addEventListener('dragend', payload)
    dom?.addEventListener('dragstart', onStartDrag)
  }

  function unSubscribe() {
    dom?.removeEventListener('mousedown', onMouseDown)
    dom?.removeEventListener('dragend', payload)
    dom?.removeEventListener('dragstart', onStartDrag)
    dom?.removeEventListener('contextmenu', onContextMenuWhileDragging)
  }

  return {
    type: 'drag:start',
    subscribe,
    unSubscribe,
  }
}
