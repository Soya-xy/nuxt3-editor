<script setup lang='ts'>
/**
 * 按钮
 * @componentName ld-button
 * @icon i-mdi:button-cursor
 * */
import type { IComponents } from '~/types'

withDefaults(defineProps<{
  value: string
  type: 'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
  nxData: IComponents
  id: string
}>(), {
  value: '按钮',
  type: 'primary',
})
defineEmits(['change', 'delete'])
</script>

<template>
  <a-button :type="type" inline-block>
    {{ value }}
    <PlaceHolder :id="id" name="默认位置">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </a-button>
</template>
