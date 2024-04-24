import Breadcrumb from './Breadcrumb.twig';

export default {
  title: 'Design System/Molecules/Breadcrumb'
};

export const Base = {
  render: (args) => Breadcrumb(args),
  args: {
    customText: 'Homepage',
    href: ''
  },
  argTypes: {
    compressed: {
      control: { type: 'boolean' }
    }
  },
};
