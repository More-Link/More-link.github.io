import { computedAsync } from "@vueuse/core"
import useLanguage from "./useLanguage"
import { unref } from "vue"
import type { LANG } from "./constant"

const useI18nJSON = <V extends Record<string, any> = Record<string, any>>(json: Record<LANG, () => Promise<{ default: V }>>) => {
  const language = useLanguage()
  return computedAsync<V>(async () => {
    const MaybePromiseFn = json[unref(language)]
    if (typeof MaybePromiseFn === 'function') {
      const m = await MaybePromiseFn()
      return m.default
    }
    return MaybePromiseFn
  }, {} as V)
}

export default useI18nJSON
