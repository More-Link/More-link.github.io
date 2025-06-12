<template>
  <div class="content_container">
    <div class="content"><slot /></div>
  </div>
</template>
<style lang="scss" scoped>
.content_container {
  --uno: 'w-screen bg-white min-h-[75px]';
  .content {
    --uno: 'mx-auto max-w-5xl h-full px-[15px]';
  }
}
</style>
