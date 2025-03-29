export { i18nKeys } from '@@/i18n/words'

export const $t = (key: string | number) => {
  return useI18nB().t(key)
}
