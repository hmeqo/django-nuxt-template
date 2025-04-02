import { alovaInst } from '../lib/alova/core'
import type { ModuleOptions } from '../types'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.backend as ModuleOptions
  alovaInst.options.baseURL = config.alovaBaseUrl
})
