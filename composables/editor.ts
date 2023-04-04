import _ from 'lodash'

export function useNxId() {
  return `nx-${_.uniqueId()}`
}

export const DraggingNodes = ref('')
