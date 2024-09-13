import Footer from './Footer.html.twig';
import FooterCheckout from './FooterCheckout.html.twig';

export default {
  title: 'Design System/Layout/Footer'
};

export const base = {
  render: (args) => Footer(args),
  args: {
    withNewsletter: false
  },
  argTypes: {}
};

export const checkout = {
  render: (args) => FooterCheckout(args),
  args: {},
  argTypes: {}
};
