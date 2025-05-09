import { addComponentsDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import type { ModuleOptions as PwaModuleOptions } from '@vite-pwa/nuxt'
import { defu } from 'defu'

export default defineNuxtModule({
  meta: {
    name: '@workspace/pwa'
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.pwa = defu(nuxt.options.pwa, <PwaModuleOptions>{
      registerType: 'autoUpdate',
      manifest: {
        name: 'Django Nuxt Template',
        short_name: 'Django Nuxt Template',
        theme_color: '#141414',
        description: 'Django Nuxt Template',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        display: 'standalone'
      },
      registerWebManifestInRouteRules: true,
      devOptions: {
        enabled: false,
        type: 'module'
      }
    })

    await installModule('@vite-pwa/nuxt')

    // Add components
    addComponentsDir({
      path: resolver.resolve('./components')
    })
  }
})
