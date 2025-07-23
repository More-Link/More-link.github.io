import { get } from 'es-toolkit/compat'
import { unref } from 'vue';
import useI18nJSON from './useI18nJSON';
import SUPPORTED_LANG from './constant/SupportedLang';

type IsEmptyKeys<Keys extends any[], K = Keys[0]> = undefined extends K ? true : false
type ValuePath<O extends object, Keys extends any[]> = IsEmptyKeys<Keys> extends true
  ? O
  : Keys extends [infer K, ...infer Rest]
    ? K extends keyof O
      ? IsEmptyKeys<Rest> extends true
        ? O[K]
        : O[K] extends object ? ValuePath<O[K], Rest> : never
      : never
    : never

export default function useI18n <V extends Record<string, any>>(json: Partial<Record<SUPPORTED_LANG, V>>) {
  const i18nJson = useI18nJSON(json)
  return {
    $t<
      K1 extends keyof V,
      K2 extends keyof V[K1] & (V[K1] extends object ? string | number : never),
      K3 extends keyof V[K1][K2] & (V[K1][K2] extends object ? string | number : never),
      K4 extends keyof V[K1][K2][K3] & (V[K1][K2][K3] extends object ? string | number : never),
      K5 extends keyof V[K1][K2][K3][K4] & (V[K1][K2][K3][K4] extends object ? string | number : never),
      K6 extends keyof V[K1][K2][K3][K4][K5] & (V[K1][K2][K3][K4][K5] extends object ? string | number : never),
    >(paths: [K1, K2?, K3?, K4?, K5?, K6?], defaultValue?: any): ValuePath<V, typeof paths> {
      return get(unref(i18nJson), paths as any[], defaultValue)
    }
  }
}
