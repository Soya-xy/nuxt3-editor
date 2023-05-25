<template>
  <div>
    <a-tabs default-active-key="1" v-if="componentId">
      <a-tab-pane key="1" title="属性" px4>
        <ControlsAttr :componentId="componentId" />
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

<script setup lang='ts'>
import { storeToRefs } from 'pinia';

const engine = useEngine()
const { nodesById } = storeToRefs(engine)
const componentId = ref()
watch(() => nodesById.value?.componentId, (val) => {
  componentId.value = val
})
</script>
