<template>
  <Layout>
    <Content class="body">
      <div class="container">
        <div class="section_title">
          {{ i18nJson.solution.products }}
        </div>
        <HScrollView>
          <div v-for="item of list" class="product">
            <img :src="item.img">
            <div class="info">
              <div class="label">{{ item.label }}</div>
              <div class="description">{{ item.description }}</div>
            </div>
            <div class="detail_button" @click="() => jump(item.id)">{{ i18nJson.solution.detail }}</div>
          </div>
        </HScrollView>
      </div>
    </Content>
  </Layout>
</template>
<script lang="ts" setup>
import Layout from '../../components/Layout.vue'
import Content from '../../components/Content.vue'
import HScrollView from './components/HScrollView.vue'
import img0 from './images/pro_pbr_c1_cop.png'
import img1 from './images/pro_pbr_m2_cop.png'
import img2 from './images/pro_pbr_w3_cop.png'
import img3 from './images/img_product_c1.png'
import img4 from './images/img_product_m1.png'
import img5 from './images/img_product_m2.png'
import img6 from './images/img_product_w3.png'
import img7 from './images/img_product_w1.png'
import useI18nJSONAsync from '../../scripts/useI18nJSONAsync'
import { unref, computed } from 'vue'
import { PLATFORM } from './constant'
import { useRouter } from 'vue-router'
import { ROUTER_NAME } from '../../scripts/router'
import SUPPORTED_LANG from '../../scripts/constant/SupportedLang'

const router = useRouter()

const i18nMap = {
  [SUPPORTED_LANG.EN_US]: () => import('./i18n/en-us'),
  [SUPPORTED_LANG.ZH_HANS]: () => import('./i18n/zh-hans'),
  [SUPPORTED_LANG.ZH_HANT]: () => import('./i18n/zh-hant'),
}

const i18nJson = useI18nJSONAsync(i18nMap)

const list = computed(() => [
  {
    id: PLATFORM['MLN-C1'],
    img: img0,
    label: unref(i18nJson).solution.c1_pop_label,
    description: unref(i18nJson).solution.c1_pop_description,
  },
  {
    id: PLATFORM['MLN-M2'],
    img: img1,
    label: unref(i18nJson).solution.m2_pop_label,
    description: unref(i18nJson).solution.m2_pop_description,
  },
  {
    id: PLATFORM['MLN-W3'],
    img: img2,
    label: unref(i18nJson).solution.w3_pop_label,
    description: unref(i18nJson).solution.w3_pop_description,
  },
  {
    id: PLATFORM['PBR-C1'],
    img: img3,
    label: unref(i18nJson).solution.c1_label,
    description: unref(i18nJson).solution.c1_description,
  },
  {
    id: PLATFORM['PBR-M1'],
    img: img4,
    label: unref(i18nJson).solution.m1_label,
    description: unref(i18nJson).solution.m1_description,
  },
  {
    id: PLATFORM['PBR-M2'],
    img: img5,
    label: unref(i18nJson).solution.m2_label,
    description: unref(i18nJson).solution.m2_description,
  },
  {
    id: PLATFORM['PBR-W3'],
    img: img6,
    label: unref(i18nJson).solution.w3_label,
    description: unref(i18nJson).solution.w3_description,
  },
  {
    id: PLATFORM['PBR-W1'],
    img: img7,
    label: unref(i18nJson).solution.w1_label,
    description: unref(i18nJson).solution.w1_description,
  },
])


const jump = (id: PLATFORM) => {
  router.push({ name: ROUTER_NAME.SOLUTION_DETAIL, params: { id } })
}
</script>
<style lang="scss" scoped>
@use '../../styles/common.scss' as common;
@use '../../styles/content.scss';

.body {
  --uno-apply: bg-[#11191c];
}

.section_title {
  --uno-apply: color-white text-[40px] border-0 border-b border-solid border-gray mb-0;
}

.container {
  @include common.header-height-mixin;
  --banner-height: calc(100dvh - var(--header-height));
  --uno-apply: h-[var(--banner-height)];
  .product {
    --uno-apply: flex-col-nowrap gap-[20px];
    img {
      --uno-apply: w-[200px];
    }
    .label, .description {
      --uno-apply: color-white text-center text-[12px];
    }
    .description {
      --uno-apply: text-[10px];
    }
    .detail_button {
      --uno-apply: text-active border-1 border-solid text-[8px] p-[5px] text-center w-[60px] m-auto cursor-pointer;
      &:hover {
        --uno-apply: text-hover;
      }
    }
    &:not(.active) {
      .label, .description {
        --uno-apply: color-gray text-[10px];
      }
      .detail_button {
        --uno-apply: hidden;
      }
    }
  }
}

</style>
