<template>
  <ContentLayout>
    <template #title>
      PCDN
    </template>
    <Content class="body">
    </Content>
  </ContentLayout>
</template>
<script lang="ts" setup>
import ContentLayout from '../components/ContentLayout.vue'
import Content from '../components/Content.vue'
</script>
<style lang="scss" scoped>
@use '../styles/content.scss';
</style>
