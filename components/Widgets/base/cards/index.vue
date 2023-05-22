<script setup lang="ts">
defineOptions({
  customOptions: {
    name: '卡片',
    icon: 'i-carbon:3d-cursor',
  }
})
</script>

<template>
  <a-card :style="{ width: '360px' }" title="Arco Card">
    <template #extra>
      <a-link>More</a-link>
    </template>
    ByteDance's core product, Toutiao ("Headlines"), is a content platform in
    China and around the world. Toutiao started out as a news recommendation
    engine and gradually evolved into a platform delivering content in various
    formats.
  </a-card>
</template>
