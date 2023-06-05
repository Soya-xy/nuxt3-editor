<script setup lang='ts'>
import { storeToRefs } from 'pinia'

const engine = useEngine()
const { nodesById } = storeToRefs(engine)
const componentId = ref()
watch(() => nodesById.value?.componentId, (val) => {
  componentId.value = val
})
</script>

<template>
  <div>
    <a-tabs v-if="componentId" default-active-key="1">
      <a-tab-pane key="1" title="属性" px4>
        <ControlsAttr :component-id="componentId" />
      </a-tab-pane>
      <a-tab-pane key="2" title="样式">
        Content of Tab Panel 2
      </a-tab-pane>
      <a-tab-pane key="3" title="插槽">
        Content of Tab Panel 3
      </a-tab-pane>
      <a-tab-pane key="4" title="逻辑">
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
