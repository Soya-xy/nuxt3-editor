import type { StorybookConfig } from "@storybook/vue3-vite";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};



export default {
  ...config, async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [
        AutoImport({
          imports: ['vue'],
          dirs: ['../composables'],
          vueTemplate: true
        }),
        Components({
          dirs: [
            '../components/'
          ],
          resolvers: [
            ArcoResolver({
              importStyle: 'less',
              resolveIcons: true,
              sideEffect: true,

            }),
          ],
          dts: true,
          directoryAsNamespace: true
        }),
        Unocss()
      ],
      resolve: {
        alias: {
          '~/*': fileURLToPath(new URL('../', import.meta.url))
        }
      }
    });
  },
};
