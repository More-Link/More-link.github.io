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
import useI18n from '../scripts/useI18n'
import SUPPORTED_LANG from '../scripts/constant/SupportedLang'

const { $t } = useI18n({
  [SUPPORTED_LANG.EN_US]: {
    coming_soon: 'Coming Soon...',
  },
  [SUPPORTED_LANG.ZH_HANS]: {
    coming_soon: '敬请期待...',
  },
  [SUPPORTED_LANG.ZH_HANT]: {
    coming_soon: '敬請期待...',
  },
  [SUPPORTED_LANG.JA_JP]: {
    coming_soon: '近日公開予定...',
  },
})

</script>
<style lang="scss" scoped>
@use '../styles/content.scss';
</style>
