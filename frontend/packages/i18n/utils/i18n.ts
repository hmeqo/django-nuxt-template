export { i18nKeys } from '../lib/words'

export const $t = (key: string) => {
  return useI18n().t(key) as string
}
