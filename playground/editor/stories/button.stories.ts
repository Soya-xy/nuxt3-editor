import Btn from '~/components/Widgets/base/button/btn.vue'

export default {
  component: Btn,
  title: 'atoms/Logo',
  template: '<Btn/>',
}

function Template(_args, { argTypes }) {
  return {
    components: { Btn },
    props: Object.keys(argTypes),
    // Storybook provides all the args in a $props variable.
    // Each arg is also available as their own name.
    template: '<Btn/>',
  }
}

export const Default = Template.bind({})

export const Compact = Template.bind({
  navbar: true,
})
