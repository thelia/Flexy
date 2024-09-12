import Link from './Link.html.twig';

export default {
  title: 'Design System/Molecules/Link'
};

const commonProps = {
  args: {
    customText: 'Link',
    href: '',
    target: ''
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['large', 'medium'],
      control: { type: 'select' }
    }
  }
};

export const Base = {
  render: (args) => Link(args),
  ...commonProps
};

export const WithIcon = {
  render: (args) => Link(args),
  ...commonProps,
  args: {
    iconLeft: 'chevron-left',
    iconRight: 'chevron-right',
    ...commonProps.args
  }
};
