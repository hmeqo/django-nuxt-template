import { cloneDeep, merge } from 'lodash'
import { i18nKeys, type I18nKeys } from '../words'

export default merge(cloneDeep(i18nKeys), <I18nKeys>{
  ...Object.entries(i18nKeys).reduce(
    (acc, [k, v]) => {
      acc[k as keyof typeof acc] = v ? v : k.replace('_', ' ')
      return acc
    },
    <I18nKeys>{}
  ),
  welcome: 'Welcome'
})
