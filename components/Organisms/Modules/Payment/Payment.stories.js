import Payment from './Payment.twig';

export default {
  title: 'Design System/Organisms/Modules/Payment'
};

export const Base = {
  render: (args) => Payment(args),
  args: {
    selected: false,
    title: 'Carte bancaire'
  },
  argTypes: {}
};
