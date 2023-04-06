import type { DefineComponent } from 'vue'
import { defineStore } from 'pinia'
import _ from 'lodash'
import type { GlobComponents } from './../components/Widgets/index'

export interface IComponents {
  componentName: string
  componentId?: string
  parentId: string | null
  slots?: {}
  render?: () => DefineComponent
  children?: IComponents[]
}

export function useNxId() {
  return `nx-${_.uniqueId()}`
}

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const componentsJson = ref<IComponents[]>([{
    componentName: 'Root',
    componentId: 'NX-Editor',
    parentId: null,
  }])

  function addComponent(comp: GlobComponents, target: HTMLElement) {
    if (target.id === 'NX-Editor' || target.id.startsWith('editor-nx')) {
      componentsJson.value.push({
        componentName: comp.name,
        componentId: `editor-${useNxId()}`,
        parentId: componentsJson.value.length === 0 ? null : target.id,
        render: comp.render,
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
