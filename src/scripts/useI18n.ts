import { get } from 'es-toolkit/compat'
import { LANG } from "./constant";
import { unref } from 'vue';
import useI18nJSON from './useI18nJSON';

type Keys<V extends object> = Parameters<typeof get<V>>[1];

export default function useI18n <V extends Record<string, any>>(json: Partial<Record<LANG, V>>) {
  const i18nJson = useI18nJSON(json)
  return {
    $t (paths: Keys<V>, defaultValue?: any) {
      return get(unref(i18nJson), paths, defaultValue)
    }
  }
}
