import { defu } from 'defu'
import type { Nuxt } from 'nuxt/schema'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { ModuleOptions } from '../types'

export function installNaiveUiAutoImport(options: ModuleOptions, nuxt: Nuxt) {
  nuxt.options.vite = defu(nuxt.options.vite, {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'types/components.d.ts'
      })
    ]
  })
}
