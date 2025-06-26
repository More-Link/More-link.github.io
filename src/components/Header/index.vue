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
        <div class="language_label">{{$t(['Language'])}}</div>
        <div class="language_options">
          <div class="language_current">{{$langT([languageRef, 'full'])}}</div>
          <div class="language_group">
            <div
              v-for="languageItem of languageList"
              class="language"
              :class="{ active: languageItem.value === languageRef }" @click="() => languageItem.click()"
            >
              {{ $langT([languageItem.value, 'shore']) }}
            </div>
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
        :class="{ active: languageItem.value === languageRef }" @click="() => languageItem.click()"
      >
        {{ $langT([languageItem.value, 'shore']) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logoUrl from '../../images/icon/icon_logo.png'
import { LANG } from '../../scripts/constant/Lang'
import { useListMap } from '../hook'
import { computed, unref, useTemplateRef } from 'vue'
import { onClickOutside, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import useLanguage from '../../scripts/useLanguage'
import useI18n from '../../scripts/useI18n'
import useI18nAsync from '../../scripts/useI18nAsync'

const commonI18nMap = {
  [LANG.ZH_CN]: {
    full: '简体中文',
    shore: '简',
  },
  [LANG.ZH_HK]: {
    full: '繁體中文',
    shore: '繁',
  },
  [LANG.EN_US]: {
    full: 'English',
    shore: 'EN',
  },
}

const { $t: $langT } = useI18n(Object.fromEntries(Object.values(LANG).map((lang) => [lang, commonI18nMap])))

const i18nMap = {
  [LANG.ZH_CN]: () => import('./i18n/zh-cn'),
  [LANG.ZH_HK]: () => import('./i18n/zh-hk'),
  [LANG.EN_US]: () => import('./i18n/en-us'),
}

const languageRef = useLanguage()
const listMapRef = useListMap()
const { $t } = useI18nAsync(i18nMap)

const [isOpen, toggle] = useToggle(false)
const target = useTemplateRef<HTMLElement>('target')
onClickOutside(target, () => toggle(false))

const languageList = computed(() => {
  return ([
    { value: LANG.ZH_CN },
    { value: LANG.ZH_HK },
    { value: LANG.EN_US },
  ] as const).map((item) => ({
    ...item,
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
@use '../../styles/common.scss' as common;

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
      --uno: 'bg-white rounded-r-md color-black px-[5px] h-[30px] min-w-[75px] leading-[30px] text-center duration-500';
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
      --uno: 'bg-gray h-[22px] leading-[22px] min-w-[22px] rounded-sm text-[12px]';
      &.active {
        --uno: 'bg-active';
      }
    }
  }
}
.language {
  --uno: 'cursor-pointer text-center color-white';
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
    --uno: 'size-10 bg-hover leading-10';
    &:not(.active) {
      --uno-apply: color-gray;
    }
  }
}
</style>
