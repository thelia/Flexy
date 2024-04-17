import Compact from './Compact.twig';

export default {
  title: 'Design System/Molecules/Button'
};

export const compact = {
  render: (args) => Compact(args),
  args: {
    customText: 'Button',
    type: 'primary',
    isFill: false,
    isRectangle: false,
    hasIconLeft: false,
    hasIconRight: false
  },
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'minimal', 'error'],
      control: { type: 'radio' }
    },
    hasIconLeft: {
      control: { type: 'boolean' }
    },
    hasIconRight: {
      control: { type: 'boolean' }
    },
    isFill: {
      control: { type: 'boolean' }
    },
    isRectangle: {
      control: { type: 'boolean' }
    }
  }
};
