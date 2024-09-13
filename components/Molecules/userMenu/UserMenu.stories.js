import UserMenu from './UserMenu.html.twig';

export default {
  title: 'Design System/Molecules/UserMenu'
};

export const Base = {
  render: (args) => UserMenu(args),
  args: {
    customText: 'Mes commandes',
    href: ''
  },
  argTypes: {
    variant: {
      options: ['vermillon', 'white'],
      control: { type: 'select' }
    },
    icon: {
      control: { type: 'boolean' }
    }
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
