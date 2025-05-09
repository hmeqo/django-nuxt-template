import { presetIcons } from '@unocss/preset-icons'
import { presetWind3 } from '@unocss/preset-wind3'
import { defineConfig, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  rules: [],
  presets: [presetWind3(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()]
})
