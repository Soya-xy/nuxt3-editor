<script setup lang='ts'>
/**
 * 列
 * @componentName ld-col
 * @icon i-mdi:button-cursor
 * @slot default - A default slot
 * @slot header - A header slot
 * */

import type { IComponents } from '~/types'

const props = defineProps<{
  nxData: IComponents
  id: string
}>()
watch(() => props.nxData, (nxData) => {
  console.log('🚀 ~ file: col.vue:17 ~ watch ~ nxData:', nxData)
}, {
  deep: true,
})
</script>

<template>
  <div>
    <PlaceHolder :id="id" data-slot-name="header" name="头" w-10>
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
    <PlaceHolder :id="id" data-slot-name="default" name="列" w-10>
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
