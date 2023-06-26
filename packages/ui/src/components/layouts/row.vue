<script setup lang='ts'>
/**
 * 行
 * @componentName ld-row
 * @icon i-mdi:button-cursor
 * */

import type { IComponents } from '~/types'

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
