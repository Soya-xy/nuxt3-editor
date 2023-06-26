<script setup lang='ts'>
import { watch } from 'vue'

/**
 * 列
 * @componentName ld-col
 * @icon i-mdi:button-cursor
 * */
export interface IComponents {
  name?: string
  componentName?: string
  componentId?: string
  parentId?: string
  slots?: Record<string, any>
  props?: Record<string, any>
  children?: IComponents[]
}

const props = defineProps<{
  nxData: IComponents
  id: string
}>()

watch(() => props.nxData, (nxData) => {
  console.log('🚀 ~ file: col.vue:25 ~ watch ~ nxData:', nxData)
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <PlaceHolder :id="id" name="列">
      <Render v-if="nxData?.children" :components="nxData.children" />
      <slot />
    </PlaceHolder>
  </div>
</template>
