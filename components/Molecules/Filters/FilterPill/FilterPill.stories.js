import FilterPill from './FilterPill.twig';
import filterPillFunction from './FilterPill.js';

export default {
  title: 'Design System/Molecules/Filters/FilterPill'
};

export const Base = {
  render: (args) => FilterPill(args),
  play: () => {
    filterPillFunction()
  },
  args: {
    customText: "Commande validée",
    icon: "carbone",
    onClickClose: {},
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
  },
};
