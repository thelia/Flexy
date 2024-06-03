import SubheaderOrders from './SubheaderOrders.twig';

export default {
  title: 'Design System/Layout/Subheader/Orders'
};

export const base = {
  render: (args) => SubheaderOrders(args),
  args: {
    title: 'Mes commandes',
    selected: 'in_progress'
  },
  argTypes: {
    selected: {
      options: ['in_progress', 'history'],
      control: { type: 'select' }
    }
  }
};
