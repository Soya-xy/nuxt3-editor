<script setup lang='ts'>
withDefaults(defineProps<{
  value: string
  type: 'primary' | 'secondary' | 'outline' | 'dashed' | 'text'
}>(), {
  type: 'primary',
  value: '按钮',
})

defineOptions({
  customOptions: {
    name: '按钮',
    icon: 'i-mdi:button-cursor',
    props: {
      value: '测试',
      type: 'outline',
    },
  },
})
</script>

<template>
  <a-button :type="type" inline-block>
    <p text-red>
      {{ value }}
    </p>
  </a-button>
</template>
