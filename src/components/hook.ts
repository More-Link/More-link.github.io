import { computed } from 'vue'
import { LANG } from '../scripts/constant/Lang'
import { ROUTER_NAME } from '../scripts/router'
import { useRouter } from 'vue-router'

export const useListMap = () => {
  const router = useRouter()
  return computed(() => ({
    [LANG.ZH_CN]: [
      { title: '首页', name: ROUTER_NAME.HOME },
      { title: 'CDN+P2P', name: ROUTER_NAME.CDN_P2P },
      { title: 'PCDN', name: ROUTER_NAME.PCDN },
      { title: '解决方案', name: ROUTER_NAME.SOLUTION },
      { title: '公司介绍', name: ROUTER_NAME.ABOUT },
    ].map((item) => ({ ...item, active: item.name === router.currentRoute.value.name })),
    [LANG.ZH_HK]: [
      { title: '首頁', name: ROUTER_NAME.HOME },
      { title: 'CDN+P2P', name: ROUTER_NAME.CDN_P2P },
      { title: 'PCDN', name: ROUTER_NAME.PCDN },
      { title: '解決方案', name: ROUTER_NAME.SOLUTION },
      { title: '公司介紹', name: ROUTER_NAME.ABOUT },
    ].map((item) => ({ ...item, active: item.name === router.currentRoute.value.name })),
    [LANG.EN_US]: [
      { title: 'HOME', name: ROUTER_NAME.HOME },
      { title: 'CDN+P2P', name: ROUTER_NAME.CDN_P2P },
      { title: 'PCDN', name: ROUTER_NAME.PCDN },
      { title: 'SOLUTION', name: ROUTER_NAME.SOLUTION },
      { title: 'COMPANY', name: ROUTER_NAME.ABOUT },
    ].map((item) => ({ ...item, active: item.name === router.currentRoute.value.name })),
    [LANG.JA_JP]: [
      { title: 'ホーム', name: ROUTER_NAME.HOME },
      { title: 'CDN+P2P', name: ROUTER_NAME.CDN_P2P },
      { title: 'PCDN', name: ROUTER_NAME.PCDN },
      { title: 'ソリューション', name: ROUTER_NAME.SOLUTION },
      { title: '会社概要', name: ROUTER_NAME.ABOUT },
    ].map((item) => ({ ...item, active: item.name === router.currentRoute.value.name })),
  }))
}
