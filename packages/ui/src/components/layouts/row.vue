<script setup lang='ts'>
/**
 * 行
 * @componentName ld-row
 * @icon i-mdi:button-cursor
 * @slot default - A default slot
 * */

import type { IComponents } from '~/types'

defineProps<{
  nxData: IComponents
  id: string
}>()
</script>

<template>
  <div>
    <PlaceHolder :id="id" data-slot-name="default" name="行">
      <Render v-if="nxData?.children" :components="nxData.children" />
    </PlaceHolder>
  </div>
</template>
