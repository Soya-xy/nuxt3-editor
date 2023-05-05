<template>
  <div class="drop-here" @mouseenter="enter" @mouseleave="leave">
    <slot>
      Drop here
    </slot>
  </div>
</template>
<script setup>
import { useEngine } from '~/composables/engine';
const engine = useEngine()
const parentId = defineProp('parentId')
const slotName = defineProp('slotName')
function enter(e) {
  if (engine.dragging) {
    engine.dropSlot = true
    engine.stateId = parentId.value
    engine.nodesById.slots = slotName
  }
}
const leave = () => {
  engine.dropSlot = false
  engine.stateId = ''
}
</script>
<style scoped>
.drop-here {
  outline: 1px dashed #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F8FF !important;
  height: 100%;
  min-height: 60px;
}

.drop-here:hover {
  outline: 1px solid #4285f4;

}
</style>
