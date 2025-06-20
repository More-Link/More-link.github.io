import { createGlobalState, useLocalStorage } from "@vueuse/core"
import { LANG } from "./constant/Lang"
import { computed, unref } from "vue"
import { match, P } from "ts-pattern"

type SUPPORTED_LANG = LANG.ZH_HK | LANG.ZH_CN | LANG.EN_US

const useCurrentLanguageState = createGlobalState(() => useLocalStorage<SUPPORTED_LANG | undefined>('language', undefined))

const useLanguage = () => {
  const currentLanguage = useCurrentLanguageState()
  return computed({
    set: (val: SUPPORTED_LANG) => currentLanguage.value = val,
    get: () => {
      const language = unref(currentLanguage)
      if (language && Object.values([LANG.ZH_HK, LANG.ZH_CN, LANG.EN_US]).includes(language)) return language
    
      const browserLang: string | undefined= ((navigator as any).browserLanguage || navigator.language).toLowerCase();
      return match(browserLang)
        .returnType<SUPPORTED_LANG>()
        // #region constant check
        .with(P.union(LANG.ZH_HK, LANG.ZH_MO, LANG.ZH_TW), () => LANG.ZH_HK)
        .with(LANG.ZH_CN, () => LANG.ZH_CN)
        .with(LANG.EN_US, () => LANG.EN_US)
        // #endregion constant check
        // #region language prefix
        .with(P.string.startsWith('zh-hant'), () => LANG.ZH_HK)
        .with(P.string.startsWith('zh-hans'), () => LANG.ZH_CN)
        .with(P.string.startsWith('zh-'), () => LANG.ZH_CN)
        // #endregion language prefix
        .otherwise(() => LANG.EN_US)
    },
  })
}

export default useLanguage
