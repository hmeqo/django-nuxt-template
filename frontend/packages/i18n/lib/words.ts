export const i18nKeys = {
  en: 'English',
  'zh-CN': '中文 (简体)',
  english: '',
  simplified_chinese: '',
  welcome: '',

  error_occurred: '',
  operation_succeeds: '',
  status_code: '',
  detail_message: '',
  network_error: '',
  canceled: ''
}

export type I18nKeys = typeof i18nKeys

for (const [k, v] of Object.entries(i18nKeys)) {
  i18nKeys[k as keyof typeof i18nKeys] = v ? v : k
}
