import { computed } from 'vue'
import { LANG } from './constant'

export const useListMap = () => {
  return computed(() => ({
    [LANG.CN]: [
      { title: '首页', href: '/index-cn.html' },
      { title: 'CDN+P2P', href: '/cdn-p2p.html' },
      { title: 'PCDN', href: '' },
      { title: '解决方案', href: '/solution-list.html' },
      { title: '公司介绍', href: '/about.html' },
    ].map((item) => ({ ...item, active: location.pathname === item.href })),
    [LANG.EN]: [
      { title: 'HOME', href: '/index-en.html' },
      { title: 'CDN+P2P', href: '/cdn-p2p.html' },
      { title: 'PCDN', href: '' },
      { title: 'SOLUTION', href: '/solution-list.html' },
      { title: 'COMPANY', href: '/about-en.html' },
    ].map((item) => ({ ...item, active: location.pathname === item.href })),
  }))
}

export const useLanguage = () => {
  const listMap = useListMap()
  return computed(() => {
    const language = localStorage.getItem('language')
    if (language && listMap.value[language]) return language
    for (const langItem in listMap.value) {
      if (listMap.value[langItem].some((item) => item.active)) {
        return langItem
      }
    }
  
    const browserLang = ((navigator as any).browserLanguage || navigator.language).toLowerCase();
    if (/^zh-/i.test(browserLang)) {
      return LANG.CN
    } else {
      return LANG.EN
    }
  })
}
