<template>
  <ContentLayout>
    <template #title>
      PCDN
    </template>
    <Content class="body">
      <div class="container">
        <div class="section_title">
          {{ $t(['coming_soon']) }}
        </div>
      </div>
    </Content>
  </ContentLayout>
</template>
<script lang="ts" setup>
import ContentLayout from '../components/ContentLayout.vue'
import Content from '../components/Content.vue'
import { LANG } from '../scripts/constant/Lang'
import useI18n from '../scripts/useI18n'

const { $t } = useI18n({
  [LANG.EN_US]: {
    coming_soon: 'Coming Soon...',
  },
  [LANG.ZH_CN]: {
    coming_soon: '敬请期待...',
  },
  [LANG.ZH_HK]: {
    coming_soon: '敬請期待...',
  },
})

</script>
<style lang="scss" scoped>
@use '../styles/content.scss';
</style>
