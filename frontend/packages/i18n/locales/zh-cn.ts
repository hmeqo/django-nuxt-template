import { defu } from 'defu'
import { i18nKeys, type I18nKeys } from '../lib/words'

export default defu(
  <I18nKeys>{
    simplified_chinese: '简体中文',
    welcome: '欢迎',

    error_occurred: '发生错误',
    operation_succeeds: '操作成功',
    status_code: '状态码',
    detail_message: '详细信息',
    network_error: '网络异常',
    canceled: '已取消'
  },
  i18nKeys
)
