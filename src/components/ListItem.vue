<template>
  <div class="li flex-row-nowrap">
    <div class="dot">◆</div>
    <Text><slot /></Text>
  </div>
</template>
<script setup lang="ts">
import Text from './Text.vue';
</script>
<style lang="scss" scoped>
.dot {
  --uno: 'text-[20px] leading-[24px] py-[4px] text-center basis-[40px] grow-0 shrink-0';
}
</style>
