<template>
  <div v-if="editor.isEditor" class="drop-here" ref="droptips" :class="{
    active: active,
    hover: !active && hover,
    'min-h-50px': !slot.default,
    '!outline-gray-400': editor.isEditor,
    '!outline-dashed': editor.isEditor,
    '!outline-1': editor.isEditor,
    'nx-row': defaultSlot === 'Layouts'
  }" @click.stop="clickHandle" @mouseenter.stop="enter" @mouseleave="leave">
    <slot>
      <p text-center min-h-60px>Drop here</p>
    </slot>
    <div absolute top-0 right-0 flex="~" justify="between" v-if="active">
      <div mx1 bg-blue-500 p=".5" rounded pointer="curs">
        <i i-carbon:copy inline-block text="sm white"></i>
      </div>
      <div mx1 bg-blue-500 p=".5" rounded pointer="curs">
        <i i-carbon:move inline-block text="sm white"></i>
      </div>
      <div mx1 bg-blue-500 p=".5" rounded>
        <i i-carbon:trash-can inline-block text="sm white"></i>
      </div>
    </div>
  </div>
  <slot v-else />
</template>
<script setup lang="ts">
import { useEngine } from '~/composables/engine';
import * as _ from 'lodash'
const editor = useEditor()
const engine = useEngine()
const slot = useSlots()
const parentId = defineProp<string>('parentId', { default: '' })
const slotName = defineProp<string>('slotName', { default: '' })
const defaultSlot = slot.default!()[0]?.props?.['nx-data'].componentName

const id = ref(_.uniqueId())
const droptips = ref<HTMLElement>()


const active = computed(() => engine.nodesById.id === id.value)
const hover = computed(() => engine.nodesById.designerId === id.value)

function clickHandle() {
  if (engine.nodesById.id === id.value) {
    engine.nodesById.id = ''
    return
  }
  engine.nodesById.id = id.value
}

function enter() {
  engine.nodesById.designerId = id.value
  if (engine.dragging) {
    engine.dropSlot = true
    engine.stateId = parentId.value
    engine.nodesById.haveSlots = slotName.value
    engine.nodesById.id = id.value
  }
}

const leave = () => {
  engine.dropSlot = false
  engine.stateId = ''
  droptips.value!.style.outline = 'none'
}


</script>
<style scoped>
.drop-here {
  position: relative;
  display: inline-block;
  height: 100%;
  width: auto;
  box-sizing: border-box;
}

.hover {
  outline: 1px dashed #4285f4 !important;
}

.active {
  border: 1px solid #4285f4 !important;
  outline: none !important
}

:global(.nx-row),
:global(.nx-row .drop-here) {
  display: block !important;
  width: 100% !important;
}
</style>
