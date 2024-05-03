import Standard from './Standard.twig';
import Search from './Search.twig';
import Order from './Order.twig';

export default {
  title: 'Design System/Organisms/ProductCard'
};

export const standard = {
  render: (args) => Standard(args),
  args: {
    productTitle: 'Nom du produit',
    secondaryTitle: 'Titre secondaire',
    price: '1000,00€',
    promoPrice: '900,00€',
    rate: 4,
    reviewCount: 12,
    colors: [
      '#667761',
      '#84DCC6',
      '#C17767',
      '#DD6E42',
      '#5F0F40',
      '#6969B3',
      '#2E3438'
    ]
  },
  argTypes: {
    isNew: {
      control: { type: 'boolean' }
    },
    isPromo: {
      control: { type: 'boolean' }
    },
    inWishlist: {
      control: { type: 'boolean' }
    },
    hasReviews: {
      control: { type: 'boolean' }
    },
    hasColors: {
      control: { type: 'boolean' }
    }
  }
};

export const search = {
  render: (args) => Search(args),
  args: {
    productTitle: 'Nom du produit',
    price: '1000,00€'
  }
};

export const order = {
  render: (args) => Order(args),
  args: {
    productTitle: 'Nom du produit',
    orderSecondaryTitle: 'Titre secondaire',
    size: 'S-34/36',
    quantity: 1,
    price: '50,00€'
  }
};
