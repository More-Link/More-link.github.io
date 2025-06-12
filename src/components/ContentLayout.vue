<template>
  <Layout>
    <Content class="title_container">
      <div class="title"><slot name="title" /></div>
    </Content>
    <slot />
  </Layout>
</template>
<script setup lang="ts">
import Layout from './Layout.vue';
import Content from './Content.vue';
</script>
<style lang="scss" scoped>
.title_container {
  --banner-url: url(../images/img_content_banner.png);
  @screen lt-sm {
    --banner-url: url(../images/img_content_banner@640.png);
  }
  @screen at-sm {
    --banner-url: url(../images/img_content_banner@768.png);
  }
  @screen at-md {
    --banner-url: url(../images/img_content_banner@1024.png);
  }
  @screen at-lg {
    --banner-url: url(../images/img_content_banner@1280.png);
  }
  @screen at-xl {
    --banner-url: url(../images/img_content_banner@1536.png);
  }
  --uno: 'bg-black bg-no-repeat';
  background-image: var(--banner-url);
  background-position: right center;
  background-size: auto 100%;
}
.title_container {
  --container-height: 200px;
  @screen md {
    --container-height: 286px;
  }
  --uno: 'h-[var(--container-height)]';
  .title {
    --uno: 'h-full flex items-center color-white font-black text-[34px]';
  }
}
</style>
