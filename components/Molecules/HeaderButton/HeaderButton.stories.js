import HeaderButtons from './HeaderButtons.twig';

export default {
  title: 'Design System/Molecules/Header Buttons'
};

export const base = {
  render: (args) => HeaderButtons(args),
  args: {
    inactive: false,
    small: false
  },
  parameters: {}
};
