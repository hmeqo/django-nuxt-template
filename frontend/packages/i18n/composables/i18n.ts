import type { Composer } from 'vue-i18n'

export { i18nKeys } from '../lib/words'

let cachedI18n: Composer

export const useCachedI18n = () => {
  return (cachedI18n ??= useI18n())
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

export const useLangCookie = (opts?: { default?: () => string }) => {
  return useCookie('language', opts)
}
