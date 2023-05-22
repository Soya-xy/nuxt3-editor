<template>
  <div>
    <PlaceHolder name="列" :id="id">
      <Render v-if="nxData?.children" :components="nxData.children"></Render>
    </PlaceHolder>
  </div>
</template>

<script setup lang='ts'>
import type { IComponents } from '~/composables/editor'
defineOptions({
  customOptions: {
    name: '列',
    icon: 'i-mdi:button-cursor',
    emit: {},
    slots: {
      default: []
    }
  }
})
const nxData = defineProp<IComponents>()
const id = defineProp<string>()
</script>
