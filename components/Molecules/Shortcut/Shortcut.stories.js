import Shortcut from './Shortcut.html.twig';

export default {
  title: 'Design System/Molecules/Shortcut'
};

export const base = {
  render: (args) => Shortcut(args),
  args: {
    customText: 'Titre de section'
  },
  argTypes: {
    active: {
      control: { type: 'boolean' }
    }
  }
};
