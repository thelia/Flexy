import FilterPill from './FilterPill.html.twig';

export default {
  title: 'Design System/Molecules/Filters/FilterPill'
};

export const Base = {
  render: (args) => FilterPill(args),
  args: {
    customText: 'Commande validée',
    icon: 'carbone',
    iconColor: '',
    inputType: 'checkbox',
    value: 1,
    name: 'test',
    onClickClose: {},
    closeButton: true
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
};
