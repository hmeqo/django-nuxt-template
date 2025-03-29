import type { Composer } from 'vue-i18n'

const i18nFns = <Composer>{}

export const useI18nB = () => {
  if (!i18nFns.t) Object.assign(i18nFns, useI18n())
  return i18nFns
}
