<script setup lang='ts'>
const data = 12
</script>

<template>
  <div flex justify="center" w="full">
    <a-card title="组件" w="98%" mx-auto>
      <a-row class="grid-demo" :gutter="12">
        <a-col v-for="v in 12" :key="v" :span="8">
          <div flex="~ col center">
            <IconBug my2 :size="32" />
            组件{{ v }}
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
