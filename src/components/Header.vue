<template>
  <div
    class="header"
  >
    <div class="logo_box">
      <img :src="logoUrl" alt="" />
    </div>
    <div class="nav">
      <div
        v-for="obj of navList"
        class="nav_item"
        @click="() => obj.jump()"
      >
        {{obj.title}}
      </div>
      <div class="language_container group">
        <div class="language_label">{{i18nJson.Language}}</div>
        <div class="language_options">
          <div class="language_current">{{i18nJson[languageRef]}}</div>
          <div class="language_group">
            <div
              v-for="languageItem of languageList"
              class="language"
              :class="languageItem.classes" @click="() => languageItem.click()"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav_hamburger" @click="() => toggle()">
      <div class="nav_hamburger_icon i-charm-menu-hamburger"></div>
    </div>
  </div>
  <div class="nav_side" v-if="isOpen" :class="{open: isOpen}" ref="target">
    <div class="nav">
      <div
        v-for="obj of navList"
        class="nav_item"
        @click="() => obj.jump()"
      >
        {{obj.title}}
      </div>
    </div>
    <div class="language_group">
      <div
        v-for="languageItem of languageList"
        class="language"
        :class="languageItem.classes" @click="() => languageItem.click()"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logoUrl from '../images/icon/icon_logo.png'
import { LANG } from '../scripts/constant'
import { useListMap } from './hook'
import { computed, unref, useTemplateRef } from 'vue'
import { onClickOutside, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import useLanguage from '../scripts/useLanguage'
import useI18nJSON from '../scripts/useI18nJSON'

const i18nMap = {
  [LANG.ZH_CN]: {
    Language: '当前语言',
    [LANG.ZH_CN]: '中文',
    [LANG.EN_US]: 'English',
  },
  [LANG.EN_US]: {
    Language: 'LANGUAGE',
    [LANG.ZH_CN]: '中文',
    [LANG.EN_US]: 'English',
  },
}

const languageRef = useLanguage()
const listMapRef = useListMap()
const i18nJson = useI18nJSON(i18nMap)

const [isOpen, toggle] = useToggle(false)
const target = useTemplateRef<HTMLElement>('target')
onClickOutside(target, () => toggle(false))

const languageList = computed(() => {
  return [
    { value: LANG.ZH_CN, classes: [`lang-${LANG.ZH_CN}`, 'i-flag-cn-4x3'] },
    { value: LANG.EN_US, classes: [`lang-${LANG.EN_US}`, 'i-flag-us-4x3'] },
  ].map((item) => ({
    ...item,
    classes: [...item.classes, item.value !== unref(languageRef) ? 'grayscale-90' : undefined].filter(Boolean),
    click: () => {
      languageRef.value = item.value
      toggle(false)
    },
  }))
})
const router = useRouter()
const navList = computed(() => {
  const list = unref(listMapRef)[unref(languageRef)]
  return list.map((item) => ({
    ...item,
    jump () {
      router.push({ name: item.name })
    },
  }))
})
</script>
<style lang="scss">
*:has(.nav_side.open) {
  --uno: 'overflow-hidden';
}
</style>
<style scoped lang="scss">
@use '../styles/common.scss' as common;

.nav_item {
  --uno: 'text-[14px] cursor-pointer text-center';
}
.header {
  @include common.header-height-mixin;
  --uno: 'flex-row-nowrap justify-between items-center w-screen h-[var(--header-height)] bg-black';
  @screen sm {
    --uno: 'justify-around';
  }

  .logo_box {
    --uno: 'grow-0 h-[var(--header-height)]';
    img {
      --uno: 'h-[var(--header-height)]';
    }
  }
  .nav {
    --uno: 'color-white flex-row-nowrap items-center gap-4';
    @screen lt-sm {
      --uno: 'hidden';
    }
    .nav_item {
      --uno: 'min-w-[75px] h-[40px] leading-[40px] text-white';
      &.active {
        --uno: 'text-active'
      }
      &:hover {
        --uno: 'text-hover'
      }
    }
  }
  .nav_hamburger {
    --uno: 'size-[var(--header-height)] bg-active';
    &:hover {
      --uno: 'bg-hover';
    }
    @screen sm {
      --uno: 'hidden';
    }
    & > .nav_hamburger_icon {
      --uno: "size-[var(--header-height)] text-[55px] text-center leading-[var(--header-height)] text-white";
      &:hover {
        --uno: 'bg-hover';
      }
    }
  }
  .language_container {
    --uno: 'flex-row-nowrap';
    @screen lt-sm {
      --uno: 'hidden';
    }

    .language_label {
      --uno: 'bg-active rounded-l-md h-[30px] w-[100px] leading-[30px] text-center';
    }
    .language_options {
      --uno: 'bg-white rounded-r-md color-black h-[30px] w-[75px] leading-[30px] text-center';
    }
    &:hover .language_current {
      --uno: 'hidden';
    }
    .language_group {
      --uno: 'hidden flex-row flex-nowrap justify-center gap-2 items-center h-full';
    }
    &:hover .language_group {
      --uno: 'flex';
    }
    .language {
      --uno: 'cursor-pointer';
    }
  }
}
.nav_side {
  --uno: 'w-screen bg-active';
  @screen sm {
    --uno: 'hidden';
  }

  .nav {
    --uno: 'flex flex-wrap';
  }
  .nav_item {
    --uno: 'color-white w-[100%] h-[60px] leading-[60px]';
    &.active {
      --uno: 'bg-active text-active'
    }
    &:hover {
      --uno: 'bg-hover text-hover'
    }
  }
  .language_group {
    --uno: 'py-[20px] flex-row-nowrap justify-center gap-10 items-center h-full';
  }
  .language {
    --uno: 'size-10 cursor-pointer';
  }
}
</style>
