import { defu } from 'defu'
import { i18nKeys, type I18nKeys } from '../lib/words'

export default defu(
  <I18nKeys>{
    ...Object.entries(i18nKeys).reduce(
      (acc, [k, v]) => {
        acc[k as keyof typeof acc] = v ? v : k.replace('_', ' ')
        return acc
      },
      <I18nKeys>{}
    )
  },
  i18nKeys
)
