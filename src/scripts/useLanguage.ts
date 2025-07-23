import { createGlobalState, useLocalStorage } from "@vueuse/core"
import { LANG } from "./constant/Lang"
import { computed, unref } from "vue"
import { match, P } from "ts-pattern"
import SUPPORTED_LANG, { supportedLangs } from "./constant/SupportedLang"

const useCurrentLanguageState = createGlobalState(() => useLocalStorage<SUPPORTED_LANG | undefined>('language', undefined))

const useLanguage = () => {
  const currentLanguage = useCurrentLanguageState()
  return computed({
    set: (val: SUPPORTED_LANG) => currentLanguage.value = val,
    get: () => {
      const language = unref(currentLanguage)
      if (language && supportedLangs.includes(language)) return language

      const browserLang: string | undefined= ((navigator as any).browserLanguage || navigator.language).toLowerCase();
      return match(browserLang)
        .returnType<SUPPORTED_LANG>()
        // Traditional Chinese
        .with(P.union(LANG.ZH_HANT, LANG.ZH_HK, LANG.ZH_MO, LANG.ZH_TW), () => SUPPORTED_LANG.ZH_HANT)
        .with(P.union(P.string.startsWith(`${LANG.ZH_HANT}-`)), () => SUPPORTED_LANG.ZH_HANT)
        // Simplified Chinese
        .with(P.union(LANG.ZH_HANS, LANG.ZH_CN, LANG.ZH), () => SUPPORTED_LANG.ZH_HANS)
        .with(P.union(P.string.startsWith(`${LANG.ZH_HANS}-`), P.string.startsWith(`${LANG.ZH}-`)), () => SUPPORTED_LANG.ZH_HANS)
        // Japanese
        .with(P.union(LANG.JA_JP, LANG.JA), () => SUPPORTED_LANG.JA_JP)
        .with(P.union(P.string.startsWith(`${LANG.JA}-`)), () => SUPPORTED_LANG.JA_JP)
        // English
        .with(P.union(LANG.EN_US), () => SUPPORTED_LANG.EN_US)
        .otherwise(() => SUPPORTED_LANG.EN_US)
    },
  })
}

export default useLanguage
