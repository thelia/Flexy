import Icon from './Icon.html.twig';
import icons from './icons.json';

export default {
  title: 'Design System/Atoms/Icons'
};

export const list = {
  render: (args) => Icon({ ...args, icons }),
  args: {
    color: 'text-theme',
    size: 'h-5 w-5'
  },
  argTypes: {
    color: {
      options: ['text-theme', 'text-success-dark', 'text-validated'],
      control: { type: 'radio' }
    },
    size: {
      options: ['h-5 w-5', 'h-8 w-8', 'h-12 w-12'],
      control: { type: 'radio' }
    }
  }
};
