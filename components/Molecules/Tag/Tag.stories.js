import Tag from './Tag.twig';

export default {
  title: 'Design System/Molecules/Tag'
};

export const Base = {
  render: (args) => Tag(args),
  args: {
    customText: "Commande validée",
    icon: "carbone",
  },
  argTypes: {
    variant: {
      options: ['validated', 'error', 'vermillon'],
      control: { type: 'select' },
    },
  },
};

export const Action = {
  render: (args) => Tag(args),
  args: {
    customText: "Commande validée",
    icon: "carbone",
    href: "",
    onClick: {},
  },
  argTypes: {
    variant: {
      options: ['validated', 'error', 'vermillon'],
      control: { type: 'select' },
    },
    closeOnClick: {
      control: { type: 'boolean' }
    },
  },
};
