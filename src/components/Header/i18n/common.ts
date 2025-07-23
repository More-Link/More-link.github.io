import { LANG } from "../../../scripts/constant/Lang";

export const commonI18nMap = {
  [LANG.ZH_CN]: {
    full: '简体中文',
    shore: '简',
  },
  [LANG.ZH_HK]: {
    full: '繁體中文',
    shore: '繁',
  },
  [LANG.EN_US]: {
    full: 'English',
    shore: 'EN',
  },
  [LANG.JA_JP]: {
    full: '日本語',
    shore: 'JA',
  },
} as const
