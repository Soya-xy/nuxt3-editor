<script setup lang='ts'>
/**
 * 列
 * @componentName ld-col
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
    <PlaceHolder :id="id" name="列">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
