import type { Meta, StoryObj } from '@storybook/vue3'

import Render from './Render.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: '按钮',
  component: Render,
} satisfies Meta<typeof Render>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const 默认: Story = {
  args: {
  },
}
