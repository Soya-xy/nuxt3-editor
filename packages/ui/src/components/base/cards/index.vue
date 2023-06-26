<script setup lang="ts">
/**
 * 卡片
 * @componentName ld-card
 * @icon i-mdi:button-cursor
 * */
const link = ref('')
</script>

<template>
  <a-card :style="{ width: '360px' }" title="Arco Card">
    <template #extra>
      <a-link>{{ link }}</a-link>
    </template>
    ByteDance's core product, Toutiao ("Headlines"), is a content platform in
    China and around the world. Toutiao started out as a news recommendation
    engine and gradually evolved into a platform delivering content in various
    formats.
  </a-card>
</template>
