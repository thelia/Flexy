import Header from './Header.html.twig';
import HeaderScript from './Header.js';
import HeaderCheckout from './HeaderCheckout.html.twig';
import headerButtonProfileFunction from '../../Molecules/HeaderButton/HeaderButtonProfile.js';

export default {
  title: 'Design System/Layout/Header'
};

const types = ['generic', 'sticky', 'searchbar'];

export const base = {
  render: (args) => Header(args),
  play: () => {
    HeaderScript();
    headerButtonProfileFunction();
  },
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
