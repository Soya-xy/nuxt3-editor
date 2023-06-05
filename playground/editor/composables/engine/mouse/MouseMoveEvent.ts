import type { Listen } from '..'
import { useEngine } from '..'

type MouseHandle = (e: MouseEvent) => void

export function MouseMoveEvent(): Listen {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:move',
      payload: () => {
        const target = e.target as HTMLElement
        const editor = document.getElementById(EDITOR_ID)
        if (target.id === EDITOR_ID || editor?.contains(target))
          engine.isInEditor = true
      },
    })
  }

  function subscribe(fn?: MouseHandle) {
    unSubscribe(fn)
    dom?.addEventListener('mousemove', fn || payload)
  }

  function unSubscribe(fn?: MouseHandle) {
    dom?.removeEventListener('mousemove', fn || payload)
  }
  return {
    type: 'mouse:move',
    subscribe,
    unSubscribe,
  }
}
