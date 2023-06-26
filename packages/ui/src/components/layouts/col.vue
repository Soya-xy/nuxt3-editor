<script setup lang='ts'>
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

defineProps<{
  nxData: IComponents
  id: string
}>()
</script>

<template>
  <div>
    <PlaceHolder :id="id" name="列">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
