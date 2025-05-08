import en from './locales/en'
import zhCN from './locales/zh-cn'

export default defineI18nConfig(() => ({
  locale: useLangCookie().value || undefined,
  messages: {
    en: en,
    'zh-CN': zhCN
  }
}))
