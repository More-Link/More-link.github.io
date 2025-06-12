<template>
  <div class="footer">
    <div class="footer_container">
      <div class="contact-us">
        <div class="information">
          <div class="title">{{ i18nJson.footer.title }}</div>
          <div class="subtitle">{{ i18nJson.footer.subtitle }}</div>
          <div class="info">
            <div class="label">{{ i18nJson.footer.emailLabel }}:</div>
            <div class="description">{{ i18nJson.footer.email }}</div>
          </div>
          <div class="info">
            <div class="label">{{ i18nJson.footer.addressLabel }}:</div>
            <div class="description">{{ i18nJson.footer.address }}</div>
          </div>
        </div>
        <div class="mobile_actions">
          <img :src="qrCodeUrl" />
          <div>{{ i18nJson.footer.scanCode }}</div>
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
import { LANG } from '../../scripts/constant';
import useI18nJSON from '../../scripts/useI18nJSON';

const i18nMap = {
  [LANG.EN_US]: () => import('./i18n/en-us'),
  [LANG.ZH_CN]: () => import('./i18n/zh-cn'),
}
const i18nJson = useI18nJSON(i18nMap)
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
