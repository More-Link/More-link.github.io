<template>
  <div class="footer">
    <div class="footer_container">
      <div class="contact-us">
        <div class="information">
          <div class="title">{{ $t(['footer', 'title']) }}</div>
          <div class="subtitle">{{ $t(['footer', 'subtitle']) }}</div>
          <div class="info">
            <div class="label">{{ $t(['footer', 'emailLabel']) }}:</div>
            <div class="description">{{ $t(['footer', 'email']) }}</div>
          </div>
          <div class="info">
            <div class="label">{{ $t(['footer', 'addressLabel']) }}:</div>
            <div class="description">{{ $t(['footer', 'address']) }}</div>
          </div>
        </div>
        <div class="mobile_actions">
          <img :src="qrCodeUrl" />
          <div>{{ $t(['footer', 'scanCode']) }}</div>
        </div>
      </div>
      <div class="copyright">
        COPYRIGHT © 2016 <span class="highlight">MORE-LINK.COM.HK</span> ALL RIGHTS RESERVED
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import qrCodeUrl from './images/img_qrcode.jpg'
import useI18nAsync from '../../scripts/useI18nAsync'
import SUPPORTED_LANG from '../../scripts/constant/SupportedLang'

const i18nMap = {
  [SUPPORTED_LANG.EN_US]: () => import('./i18n/en-us'),
  [SUPPORTED_LANG.ZH_HANS]: () => import('./i18n/zh-hans'),
  [SUPPORTED_LANG.ZH_HANT]: () => import('./i18n/zh-hant'),
  [SUPPORTED_LANG.JA_JP]: () => import('./i18n/ja-jp'),
  [SUPPORTED_LANG.KO_KR]: () => import('./i18n/ko-kr'),
}
const { $t } = useI18nAsync(i18nMap)
</script>
<style lang="scss" scoped>
.footer {
  --uno: 'px-[15px] pt-[80px] bg-black';
  .footer_container {
    --uno: 'm-auto max-w-3xl';
  }
}
.contact-us {
  --uno: 'flex-row-wrap justify-center gap-4';
  @screen sm {
    --uno: 'flex-nowrap';
  }
  .information {
    --uno: 'flex-col-nowrap color-white max-w-[480px]';
    .title, .subtitle {
      --uno: 'font-black pb-[4px]';
    }
    .info {
      & + .info {
        --uno: 'mt-[4px]';
      }
      .label {
        --uno: 'text-white';
      }
      .description {
        --uno: 'text-gray';
      }
    }
  }
}
.mobile_actions {
  --uno: 'flex-col-nowrap justify-center gap-2 w-[125px]';
  img {
    --uno: 'w-[125px] h-[125px] bg-white'
  }
  div {
    --uno: 'text-[12px] text-gray text-center';
  }
}
.copyright {
  --uno: 'text-[12px] text-white text-center border-0 border-t border-solid border-white leading-[40px] min-h-[40px] mt-[30px]';
  .highlight {
    --uno: 'text-active';
  }
}
</style>
