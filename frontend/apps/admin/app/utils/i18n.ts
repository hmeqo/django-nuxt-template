import zhHans from '~~/i18n/locales/zh-hans'

export const i18nKeys = Object.keys(zhHans).reduce(
  (acc, k) => Object.assign(acc, { [k]: k }),
  {} as { [K in keyof typeof zhHans]: K }
)
