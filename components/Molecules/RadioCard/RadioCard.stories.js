import RadioCard from './RadioCard.html.twig';

export default {
  title: 'Design System/Molecules/RadioCard'
};

export const Base = {
  render: (args) => RadioCard(args),
  args: {
    label: 'Label',
    name: 'radioCard'
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    }
  }
};
