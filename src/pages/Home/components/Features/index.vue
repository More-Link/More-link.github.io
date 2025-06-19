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
import { LANG } from '../../../../scripts/constant';
import { useRouter } from 'vue-router';
import useI18nJSONAsync from '../../../../scripts/useI18nJSONAsync';

const i18nMap = {
  [LANG.EN_US]: () => import('./i18n/en-us'),
  [LANG.ZH_CN]: () => import('./i18n/zh-cn'),
  [LANG.ZH_HK]: () => import('./i18n/zh-hk'),
}

const i18nJson = useI18nJSONAsync(i18nMap)

const router = useRouter()
const featuresRef = computed(() => [
  {
    key: 'cdn-p2p',
    href: '',
    videoKey: 'MVI_7780.mp4',
    videoResolutions: [300],
    ...unref(i18nJson)['cdn-p2p'],
  },
  {
    key: 'pcdn',
    href: '',
    videoKey: 'MVI_7799.mp4',
    videoResolutions: [300],
    ...unref(i18nJson)['pcdn'],
  },
  {
    key: 'wifi-solution',
    href: '',
    videoKey: 'MVI_7781.mp4',
    videoResolutions: [300],
    ...unref(i18nJson)['wifi-solution'],
  },
].map((item) => ({ ...item, jump: () => item.href && router.push(item.href) })))
</script>
<style lang="scss" scoped>
.feature {
  --uno: 'w-screen h-screen bg-black';
  .card-group {
    --uno: 'flex justify-start items-center mx-auto h-full px-[60px] gap-[60px]';
    @screen sm {
      --uno: 'justify-center gap-[40px] px-0';
    }
    @screen lt-lg {
      --uno: 'overflow-scroll';
    }
  }
  .card {
    --uno: 'mb-[40px] bg-white cursor-pointer';
    @screen sm {
      --uno: 'mx-[0] w-[300px]';
    }
  }
  .card-content {
    .image-container {
      --uno: 'flex justify-center items-center w-[calc(100vw-120px)] h-[190px] overflow-hidden bg-black';
      @screen sm {
        --uno: 'w-[300px]';
      }
    }
  }
  .card-footer {
    --uno: 'pt-[10px] pb-[15px] px-[15px] text-center min-h-[200px] font-semibold';
    .description {
      --uno-apply: text-[12px] color-gray text-left;
    }
  }
}
</style>
