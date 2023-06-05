import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      // utils
      'flex-center': 'items-center justify-center',
      'wh-full': 'w-full h-full',
    },
    ['btn', 'px-4 py-1 rounded inline-block bg-[#2D5CF6] text-white cursor-pointer hover:bg-[#2D5CF6] disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-[#2D5CF6]'],
    ['icon', 'inline-block select-none opacity-75 transition duration-200 ease-in-out hover:text-[#2D5CF6]'],
  ],
  safelist: [
    'i-mdi:button-cursor',
    'i-carbon:3d-cursor',
    'i-tabler:line-dashed',
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,

    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
