import { computedAsync } from "@vueuse/core"
import useLanguage from "./useLanguage"
import { unref } from "vue"
import SUPPORTED_LANG from "./constant/SupportedLang"

const useI18nJSONAsync = <V extends Record<string, any> = Record<string, any>>(json: Partial<Record<SUPPORTED_LANG, V>>) => {
  const language = useLanguage()
  return computedAsync(async () => {
    const MaybePromiseFn = json[unref(language)] ?? json[SUPPORTED_LANG.EN_US]
    return MaybePromiseFn
  })
}

export default useI18nJSONAsync
