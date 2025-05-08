import type { ModuleOptions as NaiveUiModuleOptions } from '@bg-dev/nuxt-naiveui'
import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@workspace/naive-ui'
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // @ts-expect-error unknown type
    nuxt.options.runtimeConfig.public = defu(nuxt.options.runtimeConfig.public, {
      naiveui: <NaiveUiModuleOptions>{
        colorModePreferenceCookieName: 'color-mode',
        themeConfig: {
          shared: {
            common: {
              primaryColor: '#2080f0',
              primaryColorHover: '#4098fc',
              primaryColorPressed: '#1060c9',
              primaryColorSuppl: '#4098fc'
            },
            Checkbox: {
              textColorDisabled: 'black',
              checkMarkColorDisabled: 'black',
              checkMarkColorDisabledChecked: 'black'
            }
          }
        }
      }
    })

    await installModule('@bg-dev/nuxt-naiveui')

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })

    // Add composables
    addImportsDir(resolver.resolve('./composables'))

    // Add utils
    addImportsDir(resolver.resolve('./utils'))

    // Add stores
    addImportsDir(resolver.resolve('./stores'))
  }
})
