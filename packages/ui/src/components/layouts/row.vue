<script setup lang='ts'>
/**
 * 行
 * @componentName ld-row
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

defineProps<{
  nxData: IComponents
  id: string
}>()
</script>

<template>
  <div>
    <PlaceHolder :id="id" name="行">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
