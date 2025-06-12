<template>
  <Header></Header>
  <RouterView />
  <slot />
  <Footer></Footer>
</template>
<script setup lang="ts">
import Footer from './Footer/index.vue';
import Header from './Header.vue';
</script>
