import AddToCart from './AddToCart.html.twig';

export default {
  title: 'Design System/Organisms/AddToCart'
};

export const base = {
  render: (args) => AddToCart(args),
  args: {
    discount: '850,00€',
    price: '1 000,00€',
    unavailable: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
