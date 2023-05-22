<template>
 <div>
    <PlaceHolder name="行" :id="id">
      <Render v-if="nxData?.children" :components="nxData.children"></Render>
    </PlaceHolder>
  </div>
</template>

<script setup lang='ts'>
import { IComponents } from '~/composables/editor';
defineOptions({
  customOptions: {
    name: '行',
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
