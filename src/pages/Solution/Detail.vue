<template>
  <ContentLayout>
    <template #title>
      {{ i18n.title }}
    </template>
    <Content class="section features">
      <div class="section_title">
        The Features
      </div>
      <div class="section_content">
        <ListItem v-for="feature of i18n.features">
          {{ feature }}
        </ListItem>
      </div>
    </Content>
    <Content class="section specification">
      <div class="section_title">
        Specification
      </div>
      <div class="section_content" :class="`specification-${i18n.specification.length}`">
        <div v-for="specification of i18n.specification">
          <div class="title">{{ specification.title }}</div>
          <ListItem v-for="item of specification.list">{{ item }}</ListItem>
        </div>
      </div>
    </Content>
  </ContentLayout>
</template>
<script lang="ts" setup>
import ContentLayout from '../../components/ContentLayout.vue'
import ListItem from '../../components/ListItem.vue'
import useI18nJSONAsync from '../../scripts/useI18nJSONAsync'
import { useRoute } from 'vue-router'
import Content from '../../components/Content.vue'
import { useTitle } from '@vueuse/core'
import { onMounted, computed } from 'vue'
import SUPPORTED_LANG from '../../scripts/constant/SupportedLang'

const route = useRoute()

const i18nMap = {
  [SUPPORTED_LANG.EN_US]: () => import('./i18n/en-us'),
  [SUPPORTED_LANG.ZH_HANS]: () => import('./i18n/zh-hans'),
  [SUPPORTED_LANG.ZH_HANT]: () => import('./i18n/zh-hant'),
}

const i18nJson = useI18nJSONAsync(i18nMap)
const i18n = computed(() => {
  const id = route.params.id as string
  return i18nJson.value[id]
})

const title = useTitle()

onMounted(() => {
  const id = route.params.id as string
  title.value = [id, title.value].join(' | ')
})

</script>
<style lang="scss" scoped>
@use '../../styles/content.scss';

* {
  box-sizing: border-box;
}

.section_title {
  --uno: 'color-white text-[40px] border-0 border-b border-solid border-gray mb-0';
}
.section_content {
  --uno: 'color-white py-26px';
}

.section {
  --uno: 'odd:bg-odd even:bg-even min-h-[200px] py-[26px] overflow-hidden';
}

.specification .section_content {
  --uno: 'flex-row-nowrap overflow-scroll min-w-[650px]';
  @screen sm {
    --uno: 'overflow-auto';
  }
  &.specification-1 > * {
    --uno: 'w-[10%]';
  }
  &.specification-2 > * {
    --uno: 'w-[50%]';
  }
  &.specification-3 > * {
    --uno: 'w-[33%]';
  }
  &.specification-4 > * {
    --uno: 'w-[25%]';
  }
  > * {
    --uno: 'py-[10px]';
    .title {
      --uno: 'mx-[25px] pb-[10px] content-end h-[46px] text-[22px] text-center leading-[20px] border-0 border-b border-solid border-gray';
    }
  }
}

</style>
