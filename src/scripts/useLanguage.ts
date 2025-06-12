import { createGlobalState, useLocalStorage } from "@vueuse/core"
import { LANG } from "./constant"
import { computed, unref } from "vue"

const useCurrentLanguageState = createGlobalState(() => useLocalStorage<LANG | undefined>('language', undefined))

const useLanguage = () => {
  const currentLanguage = useCurrentLanguageState()
  return computed({
    set: (val: LANG) => currentLanguage.value = val,
    get: () => {
      const language = unref(currentLanguage)
      if (language && Object.values(LANG).includes(language)) return language
    
      const browserLang = ((navigator as any).browserLanguage || navigator.language).toLowerCase();
      if (/^zh-/i.test(browserLang)) {
        return LANG.ZH_CN
      } else {
        return LANG.EN_US
      }
    },
  })
}

export default useLanguage
