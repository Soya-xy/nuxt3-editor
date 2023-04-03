<script setup lang='ts'>
const treeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Branch 0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Leaf',
            key: '0-0-0-0',
          },
          {
            title: 'Leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'Branch 0-0-1',
        key: '0-0-1',
        children: [
          {
            title: 'Leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div flex justify="center" w="full">
    <a-card title="大纲树" w="98%" mx-auto>
      <div w-15rem>
        <a-tree block-node :data="treeData" size="large" />
      </div>
    </a-card>
  </div>
</template>
