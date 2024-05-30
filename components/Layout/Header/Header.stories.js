import Header from './Header.twig';
import HeaderCheckout from './HeaderCheckout.twig';

export default {
  title: 'Design System/Layout/Header'
};

const types = ['generic', 'sticky', 'searchbar'];

export const base = {
  render: (args) => Header(args),
  args: {
    type: 'generic'
  },
  argTypes: {
    type: {
      options: types,
      control: { type: 'radio' }
    }
  }
};

export const checkout = {
  render: (args) => HeaderCheckout(args),
  args: {},
  argTypes: {}
};
