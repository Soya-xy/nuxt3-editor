import { defineStore } from 'pinia'
import _ from 'lodash'
import type { GlobComponents } from '~/constants/type'

export interface IComponents {
  name?: string
  componentName: string
  componentId?: string
  parentId: string | null
  slots?: {}
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}

export function getRecentNxElement(el: HTMLElement, atrrName = 'editor-nx-'): HTMLElement | undefined {
  if (el.id.startsWith(atrrName) || el.id === 'NX-Editor') {
    console.log(el)

    return el
  }
  else {
    if (el.parentElement)
      return getRecentNxElement(el.parentElement, atrrName)
  }
  return undefined
}

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const componentsJson = ref<IComponents[]>([{
    name: 'Root',
    componentName: '',
    componentId: 'NX-Editor',
    parentId: null,
  }])

  function addComponent(comp: GlobComponents, target: HTMLElement) {
    if (getRecentNxElement(target)) {
      componentsJson.value.push({
        componentName: comp.componentName!,
        name: comp.name,
        componentId: `editor-${useNxId()}`,
        parentId: componentsJson.value.length === 0 ? null : target.id,
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
