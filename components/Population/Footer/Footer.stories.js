import Footer from './Footer.twig';
import FooterCheckout from './FooterCheckout.twig';

export default {
  title: 'Design System/Population/Footer'
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
