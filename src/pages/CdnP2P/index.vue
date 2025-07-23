<template>
  <ContentLayout>
    <template #title>
      CDN + P2P
    </template>
    <Content class="body">
      <div class="section_title">{{ $t(['cdn_p2p', 'section0', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section0', 'list'])">{{ item }}</Text>
      <img src="./images/001.png" class="max-h-[200px]" />

      <div class="section_title">{{ $t(['cdn_p2p', 'section1', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section1', 'list'])">{{ item }}</Text>
      <img src="./images/002.png" class="max-h-[325px]" />

      <div class="section_title">{{ $t(['cdn_p2p', 'section2', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section2', 'list'])">{{ item }}</Text>
      <img src="https://www.cdnbye.com/img/cdn-vs-p2p.jpeg" class="max-h-[200px]" >

      <div class="section_title">{{ $t(['cdn_p2p', 'section3', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section3', 'list'])">{{ item }}</Text>
      <img src="./images/003.png" class="max-h-[200px]" />

      <div class="section_title">{{ $t(['cdn_p2p', 'section4', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section4', 'list'])">{{ item }}</Text>

      <div class="section_title">{{ $t(['cdn_p2p', 'section5', 'title']) }}</div>
      <Text v-for="item of $t(['cdn_p2p', 'section5', 'list'])">{{ item }}</Text>

      <div class="section_title">{{ $t(['cdn_p2p', 'section6', 'title']) }}</div>
      <ListItem v-for="item of $t(['cdn_p2p', 'section6', 'list'])">{{ item }}</ListItem>
    </Content>
  </ContentLayout>
</template>
<script lang="ts" setup>
import ContentLayout from '../../components/ContentLayout.vue'
import Content from '../../components/Content.vue'
import Text from '../../components/Text.vue'
import ListItem from '../../components/ListItem.vue'
import useI18nAsync from '../../scripts/useI18nAsync'
import SUPPORTED_LANG from '../../scripts/constant/SupportedLang'

const i18nMap = {
  [SUPPORTED_LANG.EN_US]: () => import('./i18n/en-us'),
  [SUPPORTED_LANG.JA_JP]: () => import('./i18n/ja-jp'),
  [SUPPORTED_LANG.KO_KR]: () => import('./i18n/ko-kr'),
}

const { $t } = useI18nAsync(i18nMap)

</script>
<style lang="scss" scoped>
@use '../../styles/content.scss';

.body {
  --uno-apply: bg-odd text-white;
  img {
    --uno-apply: bg-white;
  }
}
</style>
