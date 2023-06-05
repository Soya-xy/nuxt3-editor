import { useEngine } from '..'

export function MouseOverEvent() {
  const engine = useEngine()
  const dom = document.getElementById('actionArea')

  function payload() {
    engine.dispatch({
      type: 'mouse:over',
      payload: () => {
        // console.log('IEvent', e)
      },
    })
  }

  function subscribe() {
    dom?.addEventListener('mouseover', payload)
  }

  function unSubscribe() {
    dom?.removeEventListener('mouseover', payload)
  }
  return {
    type: 'mouse:over',
    subscribe,
    unSubscribe,
  }
}
