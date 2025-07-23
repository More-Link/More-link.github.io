import LANG from "./Lang";

export enum SUPPORTED_LANG {
  ZH_HANT = LANG.ZH_HANT,
  ZH_HANS = LANG.ZH_HANS,
  EN_US = LANG.EN_US,
  JA_JP = LANG.JA_JP,
}

export const supportedLangs = Object.values(SUPPORTED_LANG)
  .filter((lang) => lang.toLowerCase() === lang)

export default SUPPORTED_LANG
