import { presetIcons } from '@unocss/preset-icons'
import { presetWind3 } from '@unocss/preset-wind3'
import { defineConfig, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  rules: [],
  presets: [presetWind3(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()],
  theme: {
    fontFamily: {
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    colors: {
      'card-border-light': '#f0f0f0',
      'card-border-dark': '#2f2f2f'
    }
  },
  shortcuts: [['border-card', 'border border-solid border-card-border-light dark:border-card-border-dark']]
})
