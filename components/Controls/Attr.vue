<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row v-for="v in attrList" justify="start" align="center">
      <a-col :span="6">
        <div>{{ ATTR_NAME[v].value }}</div>
      </a-col>
      <a-col :span="18">
        <a-input v-if="ATTR_NAME[v].type === 'input'" :model-value="item?.props?.value"
          @input="e => changeHandle('value', e)"></a-input>
        <ControlsPropsSelect v-if="ATTR_NAME[v].type === 'select'" :type="item?.componentName" :value="item?.props?.type"
          @change="e => changeHandle('type', e)" />
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { cloneDeep, find } from 'lodash';
import { ATTR_NAME } from '~/constants/widgets'
const editor = useEditor()
const componentId = defineProp<string>()

const item = computed(() => find(cloneDeep(editor.componentsJson), ['componentId', componentId.value]))

const attrList = computed(() => {
  if (item.value?.props) {
    return Object.keys(item.value?.props)
  } else {
    return []
  }
})

function changeHandle(key: string, value: any) {
  const item = find(editor.componentsJson, ['componentId', componentId.value])
  if (!item) return Message.warning('未找到组件')
  if (item?.props)
    item.props[key] = value
  else {
    item['props'] = {
      [key]: value
    }
  }
}
</script>
