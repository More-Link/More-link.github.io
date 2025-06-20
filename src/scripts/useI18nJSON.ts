import { computedAsync } from "@vueuse/core"
import useLanguage from "./useLanguage"
import { unref } from "vue"
import type { LANG } from "./constant/Lang"

const useI18nJSONAsync = <V extends Record<string, any> = Record<string, any>>(json: Partial<Record<LANG, V>>) => {
  const language = useLanguage()
  return computedAsync(async () => {
    const MaybePromiseFn = json[unref(language)]
    return MaybePromiseFn
  })
}

export default useI18nJSONAsync
