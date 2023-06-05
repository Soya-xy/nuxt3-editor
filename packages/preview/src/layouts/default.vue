<template>
  <Header />
  <Suspense>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </Suspense>
</template>
