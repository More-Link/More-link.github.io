<template>
  <header class="container-fluid header_container">
    <div class="header_box">
      <div class="mobile_back_holder"></div>
      <div class="logo_box">
        <a href="/">
          <img :src="'images/icon/icon_logo.png'" alt="" />
        </a>
      </div>
      <span class="nav_control_btn" for="nav_main">
        <i class="menu_bar"></i>
      </span>
      <nav id="main_nav_box" class="main_nav_box">
        <li v-for="obj of navList">
          <a :href="obj.href" :class="{active: obj.active}">{{obj.title}}</a>
        </li>
        <li>
          <div class="nav_language">
            <div>{{i18n.Language}}</div>
            <div>
              <div>{{i18n[language]}}</div>
              <ul class="lang_switch_options">
                <li v-for="lang of languageList" :value="lang.value" @click="() => lang.click()">{{ lang.text }}</li>
              </ul>
            </div>
          </div>
        </li>
      </nav>
    </div>
  </header>
</template>
<script lang="ts">
import { LANG } from './constant'
import { useLanguage, useListMap } from './nav.hook'

const i18nMap = {
  [LANG.CN]: {
    Language: '当前语言',
    [LANG.CN]: '中文',
    [LANG.EN]: 'English',
  },
  [LANG.EN]: {
    Language: 'LANGUAGE',
    [LANG.CN]: '中文',
    [LANG.EN]: 'English',
  },
}

export default {
  setup () {
    const language = useLanguage()
    const listMap = useListMap()
    return {
      language,
      listMap,
    }
  },
  computed: {
    i18n() { return i18nMap[(this as any).language] },
    languageList () {
      const that = this as any
      return [
        { value: LANG.CN, text: that.i18n[LANG.CN] },
        { value: LANG.EN, text: that.i18n[LANG.EN] },
      ].map((item) => ({
        ...item,
        active: item.value === that.language,
        click: () => {
          const index = that.listMap[that.language].findIndex((item) => item.active)
          that.language = item.value
          localStorage.setItem('language', item.value)
          location.pathname = that.listMap[that.language][index].href
        },
      }))
    },
    navList ()  {
      const that = this as any
      return that.listMap[that.language]
    },
  },
}

</script>
<style scoped>
.nav_language {
  height: 136px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 768px) and (max-width: 1500px) {
  .nav_language {
    height: 88px;
  }
}
.nav_language > div:first-child {
  padding: 0px 15px;
  height: 30px;
  align-content: center;
  background-color:#f0e64e;
  font-size: 14px;
  line-height: 30px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}
.nav_language > div:last-child {
  height: 30px;
  background-color: #ffffff;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
.nav_language > div:last-child div {
  padding: 0px 15px;
  height: 30px;
  width: 80px;
  align-content: center;
}
.nav_language > div:last-child ul {
  display: none;
  background-color: #ffffff;
}
.nav_language > div:last-child ul li {
  padding: 0px 15px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.nav_language > div:last-child:hover div {
  display: none;
}
.nav_language > div:last-child:hover ul {
  display: block;
  width: 80px;
}
</style>
