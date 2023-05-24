import { cloneDeep, find } from 'lodash'
import { useEngine } from '..'
import { IComponents } from '~/composables/editor'

export function MouseClickEvent() {
  const engine = useEngine()
  const editor = useEditor()

  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:click',
      payload: () => {
        const target = getRecentNxElement(e.target as HTMLElement)
        console.log("🚀 ~ file: MouseClickEvent.ts:16 ~ payload ~ target:", target)
        if (target) {
          const item = find(cloneDeep(editor.componentsJson), ['componentId', target.id]) as IComponents || {}
          engine.nodesById = {
            ...item,
            isWidget: false,
          }
        }
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('click', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('click', payload)
  }
  return {
    type: 'mouse:click',
    subscribe,
    unSubscribe,
  }
}
