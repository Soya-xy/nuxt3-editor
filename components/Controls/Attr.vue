<template>
  <a-space direction="vertical" :size="16" style="display: block;">
    <a-row v-for="v in attrList" justify="start" align="center">
      <a-col :span="6">
        <div>{{ ATTR_NAME[v].value }}</div>
      </a-col>
      <a-col :span="18">
        <a-input v-if="ATTR_NAME[v].type === 'input'"></a-input>
        <ControlsPropsSelect v-if="ATTR_NAME[v].type === 'select'" :type="item?.componentName" />
      </a-col>
    </a-row>
  </a-space>
</template>

<script setup lang="ts">
import { find } from 'lodash';
import { ATTR_NAME } from '~/constants/widgets'
const editor = useEditor()
const componentId = defineProp<string>()
const item = find(editor.componentsJson, ['componentId', componentId.value])
console.log("🚀 ~ file: Attr.vue:22 ~ item:", item)
const attrList = computed(() => {
  if (item?.props) {
    return Object.keys(item?.props)
  } else {
    return []
  }
})
</script>
