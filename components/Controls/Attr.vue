<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { cloneDeep, find } from 'lodash'
import { ATTR_NAME } from '~/constants/widgets'

const editor = useEditor()
const componentId = defineProp<string>()

const item = computed(() => find(cloneDeep(editor.componentsJson), ['componentId', componentId.value]))

const attrList = computed(() => {
  if (item.value?.props)
    return Object.keys(item.value?.props)
  else
    return []
})

function changeHandle(key: string, value: any) {
  const item = find(editor.componentsJson, ['componentId', componentId.value])
  if (!item)
    return Message.warning('未找到组件')
  if (item?.props) {
    item.props[key] = value
  }
  else {
    item.props = {
      [key]: value,
    }
  }
}
</script>

<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row v-for="v in attrList" :key="v" justify="start" align="center">
      <a-col :span="6">
        <div>{{ ATTR_NAME[v].value }}</div>
      </a-col>
      <a-col :span="18">
        <ControlsPropsInput
          v-if="ATTR_NAME[v].type === 'input'" :type="item?.componentName" :value="item?.props?.value"
          @change="e => changeHandle(v, e)"
        />
        <ControlsPropsSelect
          v-if="ATTR_NAME[v].type === 'select'" :type="item?.componentName" :value="item?.props?.type"
          @change="e => changeHandle(v, e)"
        />
      </a-col>
    </a-row>
  </a-space>
</template>
