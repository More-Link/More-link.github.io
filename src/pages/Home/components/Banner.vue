<template>
  <div class="banner_container">
    <LoopVideo
      videoKey="loop_banner.mp4"
      :resolutions="[1536, 1280, 1024, 768, 640]"
    >
    </LoopVideo>
    <div class="banner_action">
      <div class="demo">
        <a href="/demo.html" target="_blank">
          <div>
            {{ $t(['tryDemo']) }}
          </div>
        </a>
      </div>
      <div class="next">
        <div class="i-ci-chevron-duo-down"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoopVideo from '../../../components/LoopVideo.vue';
import { LANG } from '../../../scripts/constant/Lang';
import useI18n from '../../../scripts/useI18n';

const i18nMap = {
  [LANG.EN_US]: {
    tryDemo: 'Try Demo',
  },
  [LANG.ZH_CN]: {
    tryDemo: '试用演示',
  },
  [LANG.ZH_HK]: {
    tryDemo: '試用演示',
  },
}

const { $t } = useI18n(i18nMap)

</script>
<style lang="scss" scoped>
@use '../../../styles/common.scss' as common;

.banner_container {
  @include common.header-height-mixin;
  --banner-height: calc(100dvh - var(--header-height));
  --uno-apply: flex-col-nowrap justify-center items-center bg-black h-[var(--banner-height)];

  video {
    --uno-apply: max-w-full;
  }
}
.banner_action {
  @include common.header-height-mixin;
  --banner-action-height: calc(100dvh - var(--header-height));
  --uno-apply: absolute w-full h-[var(--banner-action-height)];
  --icon-height: 50px;
  --icon-mb: 20px;
  --btn-bottom: calc(var(--icon-height) + var(--icon-mb) + 60px);
  .demo {
    --uno-apply: flex justify-center w-full absolute bottom-[var(--btn-bottom)] left-0;
    a {
      text-decoration: none;
    }
    div {
      --uno-apply: w-[180px] h-[45px] leading-[45px] text-center text-active border border-solid border-orange-500 cursor-pointer duration-500;
      &:hover {
        --uno-apply: border-orange-500/95 bg-orange-500/95 text-white;
      }
    }
  }
  .next {
    --uno-apply: flex justify-center grow-0 w-full mb-[var(--icon-mb)] absolute bottom-0 left-0;
    div {
      --uno-apply: w-[50px] h-[var(--icon-height)] text-orange-100/75 animate-bounce;
    }
  }
}
</style>
