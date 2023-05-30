<script setup lang='ts'>
defineOptions({
  customOptions: {
    name: '输入框',
    icon: 'i-mdi:button-cursor',
    props: {
      allowClear: true,
      size: 'medium',
      disabled: false,
      placeholder: '请输入',
      readonly: true,
      type: 'text',
    },
  },
})
type Size = 'mini' | 'small' | 'medium' | 'large'
type Type = 'text' | 'password' | 'number' | 'textarea '
const value = defineProp<any>('value', { default: '' })
const size = defineProp<Size>('size', { default: 'medium' })
const allowClear = defineProp<boolean>('allowClear', { default: true })
const placeholder = defineProp<string>('placeholder', { default: '请输入' })
const disabled = defineProp<boolean>('disabled', { default: false })
const readonly = defineProp<boolean>('readonly', { default: false })
const type = defineProp<Type>('type', { default: 'text' })
const change = defineEmit()
</script>

<template>
  <template v-if="type === 'text'">
    <a-input :model-value="value" :style="{ width: '320px' }" :allow-clear="allowClear" :size="size" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" @input="change" />
  </template>

  <template v-if="type === 'password'">
    <a-input-password :model-value="value" :style="{ width: '320px' }" :allow-clear="allowClear" :size="size" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" @input="change" />
  </template>
  <template v-if="type === 'number'">
    <a-input-number :model-value="value" :style="{ width: '320px' }" :allow-clear="allowClear" :size="size" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" @input="change" />
  </template>
  <template v-if="type === 'textarea '">
    <a-textarea :model-value="value" :style="{ width: '320px' }" :allow-clear="allowClear" :size="size" :readonly="readonly" :placeholder="placeholder" :disabled="disabled" @input="change" />
  </template>
</template>
