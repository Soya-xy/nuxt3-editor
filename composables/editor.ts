import { defineStore } from 'pinia'
import _ from 'lodash'
import { useEngine } from './engine/index'
import type { GlobComponents } from '~/constants/type'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId: string | null
  slots?: string
  slotsName?: string[]
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}
export function getRecentNxElement(el: HTMLElement, atrrName = 'editor-nx-'): HTMLElement | undefined {
  if (el.id.startsWith(atrrName) || el.id === 'NX-Editor') {
    return el
  }
  else {
    if (el.parentElement)
      return getRecentNxElement(el.parentElement, atrrName)
  }
  return undefined
}

// export function getRecentNxElement(el: HTMLElement, atrrName = 'editor-nx-', slots?: string, parentId?: string): Record<string, any> | undefined {
//   if (el.id === 'NX-Editor') {
//     return { el, slots, parentId }
//   }
//   else {
//     if (el.parentElement) {
//       if (el.getAttribute('slot-name') && !slots)
//         slots = el.getAttribute('slot-name') || undefined
//       if (el.id.startsWith(atrrName) && !parentId && !el.getAttribute('is-slots'))
//         parentId = el.id

//       return getRecentNxElement(el.parentElement, atrrName, slots, parentId)
//     }
//   }
//   return undefined
// }

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const engine = useEngine()
  const componentsJson = ref<IComponents[]>([])

  function addComponent(comp: GlobComponents, target: HTMLElement) {
    const dom = getRecentNxElement(target)
    if (dom) {
      let slots, slotsName
      if (target.getAttribute('slot-name'))
        slots = target.getAttribute('slot-name') || undefined

      if (comp.slots)
        slotsName = comp.slots.split('|')

      componentsJson.value.push({
        componentName: comp.componentName!,
        name: comp.name,
        componentId: `editor-${useNxId()}`,
        parentId: engine.stateId,
        slots,
        slotsName,
      })
    }
  }

  function getJson(): IComponents[] {
    const data = _.cloneDeep(componentsJson.value)
    return construct(data, {
      id: 'componentId',
      pid: 'parentId',
    })
  }

  return {
    componentsJson,
    addComponent,
    getJson,
  }
})
