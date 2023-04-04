import { useEngine } from '..'

export function MouseOutEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload(e: MouseEvent) {
    engine.dispatch({
      type: 'mouse:out',
      payload: () => {
        // console.log('IEvent', e)
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('mouseout', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('mouseout', payload)
  }
  return {
    type: 'mouse:out',
    subscribe,
    unSubscribe,
  }
}
