<template>
  <div v-if="editor.isEditor" class="drop-here" ref="droptips" :class="{
    active: active,
    hover: !active && hover,
    'min-h-50px': !slot.default,
    '!outline-gray-400': editor.isEditor,
    '!outline-dashed': editor.isEditor,
    '!outline-1': editor.isEditor,
  }" @click.stop="clickHandle" @mouseenter.stop="enter" @mouseleave="leave">
    <slot>
      <p text-center min-h-60px>Drop here</p>
    </slot>
    <div absolute top-0 right-0 v-if="active">
      删除
    </div>
  </div>
  <slot v-else />
</template>
<script setup>
import { useEngine } from '~/composables/engine';
import * as _ from 'lodash'
const editor = useEditor()
const engine = useEngine()
const slot = useSlots()
console.log("🚀 ~ file: DropTips.vue:25 ~ slot:", slot)
const parentId = defineProp('parentId')
const slotName = defineProp('slotName')

const id = $ref(_.uniqueId())
const droptips = $ref(null)


const active = computed(() => engine.nodesById.id === id)
const hover = computed(() => engine.nodesById.designerId === id)

function clickHandle() {
  if (engine.nodesById.id === id) {
    engine.nodesById.id = ''
    return
  }
  engine.nodesById.id = id
}

function enter() {
  engine.nodesById.designerId = id
  if (engine.dragging) {
    engine.dropSlot = true
    engine.stateId = parentId.value
    engine.nodesById.slots = slotName
    engine.nodesById.id = id.value
  }
}

const leave = () => {
  engine.dropSlot = false
  engine.stateId = ''
  droptips.style.outline = 'none'
}

</script>
<style scoped>
.drop-here {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 100%;
}

.hover {
  outline: 1px dashed #4285f4 !important;
}

.active {
  border: 1px solid #4285f4 !important;
  outline: none !important
}
</style>
