import enUS from './locales/en-us'
import zhHans from './locales/zh-hans'

export default defineI18nConfig(() => ({
  messages: {
    'en-US': enUS,
    'zh-Hans': zhHans
  }
}))
