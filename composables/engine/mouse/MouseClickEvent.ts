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
        if (target) {
          engine.nodesById = find(cloneDeep(editor.componentsJson), ['componentId', target.id]) as IComponents || {}
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
