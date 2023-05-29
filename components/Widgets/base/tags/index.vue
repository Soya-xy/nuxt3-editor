<script setup lang="ts">
defineOptions({
  customOptions: {
    name: '标签',
    icon: 'i-mdi:button-cursor',
  },
})
</script>

<template>
  <a-space>
    <a-tag>Default</a-tag>
    <a-tag>Tag 1</a-tag>
    <a-tag>Tag 2</a-tag>
    <a-tag>
      <template #icon>
        <icon-check-circle-fill />
      </template>
      Complete
    </a-tag>
  </a-space>
</template>
