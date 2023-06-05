<script setup lang='ts'>
import type { IComponents } from '~/composables/editor'

defineOptions({
  customOptions: {
    name: '行',
    icon: 'i-mdi:button-cursor',
    emit: {},
    slots: {
      default: [],
    },
  },
})
const nxData = defineProp<IComponents>()
const id = defineProp<string>()
</script>

<template>
  <div>
    <PlaceHolder :id="id" name="行">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
