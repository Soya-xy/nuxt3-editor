import { defineStore } from 'pinia'
import _ from 'lodash'

export function useNxId() {
  return `nx-${_.uniqueId()}`
}

export const DraggingNodes = ref('')

export const useEditor = defineStore('editor', () => {
  const componentsJson = ref<any>({
    componentName: 'Root',
    slots: {},
    children: [],
  })
  return {
    componentsJson,
  }
})
