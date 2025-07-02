<template>
  <div class="features">
    <div class="feature">
      <div class="card-group">
        <div
          v-for="feature of featuresRef"
          class="card"
          :class="feature.key"
          @click="() => feature.jump()"
        >
          <div class="card-content">
            <div class="image-container">
              <LoopVideo
                :videoKey="feature.videoKey"
                :resolutions="feature.videoResolutions"
              ></LoopVideo>
            </div>
          </div>
          <div class="card-footer">
            <p>{{ feature.title }}</p>
            <div>
              <small class="description">{{ feature.description }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, unref } from 'vue';
import LoopVideo from '../../../../components/LoopVideo.vue';
import { LANG } from '../../../../scripts/constant/Lang';
import { useRouter } from 'vue-router';
import useI18nAsync from '../../../../scripts/useI18nAsync';
import { ROUTER_NAME } from '../../../../scripts/router';

const i18nMap = {
  [LANG.EN_US]: () => import('./i18n/en-us'),
  [LANG.ZH_CN]: () => import('./i18n/zh-cn'),
  [LANG.ZH_HK]: () => import('./i18n/zh-hk'),
}

const { $t } = useI18nAsync(i18nMap)

const router = useRouter()
const featuresRef = computed(() => [
  {
    key: 'cdn-p2p',
    href: ROUTER_NAME.CDN_P2P,
    videoKey: 'MVI_7780.mp4',
    videoResolutions: [300],
    ...$t(['cdn-p2p']),
  },
  {
    key: 'pcdn',
    href: ROUTER_NAME.PCDN,
    videoKey: 'MVI_7799.mp4',
    videoResolutions: [300],
    ...$t(['pcdn']),
  },
  {
    key: 'wifi-solution',
    href: ROUTER_NAME.SOLUTION,
    videoKey: 'MVI_7781.mp4',
    videoResolutions: [300],
    ...$t(['wifi-solution']),
  },
].map((item) => ({ ...item, jump: () => item.href && router.push(item.href) })))
</script>
<style lang="scss" scoped>
.feature {
  --uno-apply: w-screen min-h-dvh bg-black flex items-center justify-center;
  .card-group {
    --uno-apply: flex flex-col justify-start items-center mx-auto h-full px-[60px] gap-[60px];
    @screen sm {
      --uno-apply: flex-row justify-center gap-[80px] px-0;
    }
  }
  .card {
    --uno-apply: mb-[40px] bg-white cursor-pointer;
    @screen sm {
      --uno-apply: mx-[0] w-[300px];
    }
  }
  .card-content {
    .image-container {
      --uno-apply: flex justify-center items-center w-[calc(100vw-120px)] h-[190px] overflow-hidden bg-black;
      @screen sm {
        --uno-apply: w-[300px];
      }
    }
  }
  .card-footer {
    --uno-apply: pt-[10px] pb-[15px] px-[15px] text-center min-h-[200px] font-semibold;
    .description {
      --uno-apply: text-[12px] color-gray text-left;
    }
  }
}
</style>
