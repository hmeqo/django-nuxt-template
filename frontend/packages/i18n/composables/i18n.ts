import type { CookieOptions } from '#app'

import type { Composer } from 'vue-i18n'

export { i18nKeys } from '../lib/words'

let cachedI18n: Composer

export const useCachedI18n = () => {
  if (!cachedI18n) cachedI18n = useI18n()
  return cachedI18n
}

export const useLocale = () => {
  const { locale, availableLocales } = useCachedI18n()
  const langCookie = useLangCookie({ default: clientOnly(() => locale.value) })

  if (langCookie.value) {
    if (availableLocales.includes(langCookie.value)) locale.value = langCookie.value
    else langCookie.value = locale.value
  }
  return locale
}

export const useLangCookie = (
  opts?: CookieOptions<string> & {
    readonly?: false
  }
) => {
  return useCookie('language', opts)
}
