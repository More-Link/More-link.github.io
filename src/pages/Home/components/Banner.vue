<template>
  <div class="banner_container">
    <LoopVideo
      videoKey="loop_banner.mp4"
      :resolutions="[1536, 1280, 1024, 768, 640]"
    >
    </LoopVideo>
  </div> 
</template>
<script setup lang="ts">
import LoopVideo from '../../../components/LoopVideo.vue';
</script>
<style lang="scss" scoped>
@use '../../../styles/common.scss' as common;

.banner_container {
  @include common.header-height-mixin;
  --banner-height: calc(100vh - var(--header-height));
  --uno: 'flex justify-center items-center bg-black h-[var(--banner-height)]';

  video {
    --uno: 'max-w-full';
  }
}
</style>
