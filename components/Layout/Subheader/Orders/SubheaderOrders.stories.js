import SubheaderOrders from './SubheaderOrders.twig';

export default {
  title: 'Design System/Layout/Subheader/Orders'
};

export const base = {
  render: (args) => SubheaderOrders(args),
  args: {
    title: 'Mes commandes'
  },
  argTypes: {}
};
