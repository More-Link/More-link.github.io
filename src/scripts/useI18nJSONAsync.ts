import { computedAsync } from "@vueuse/core"
import useLanguage from "./useLanguage"
import { unref } from "vue"
import { LANG } from "./constant/Lang"

const useI18nJSONAsync = <V extends Record<string, any> = Record<string, any>>(json: Partial<Record<LANG, () => Promise<{ default: V }>>>) => {
  const language = useLanguage()
  return computedAsync<V>(async () => {
    let MaybePromiseFn = json[unref(language)]
    if (!MaybePromiseFn) {
      MaybePromiseFn = json[LANG.EN_US]
    }
    if (typeof MaybePromiseFn === 'function') {
      const m = await MaybePromiseFn()
      return m.default
    }
    // Ensure a value of type V is always returned
    return (MaybePromiseFn ?? {}) as V
  }, {} as V)
}

export default useI18nJSONAsync
