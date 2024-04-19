import Tab from './Tab.twig';

export default {
  title: 'Design System/Molecules/Tab',
};

const commonProps = {
  args: {
    customText: "Tabulation",
    disabled: false,
    classes: '',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'select' },
    }
  }
};

export const Base = {
  render: (args) => Tab(args),
  ...commonProps
};

export const WithIcon = {
  render: (args) => Tab(args),
  ...commonProps,
  args: {
    iconLeft: "chevron-left",
    iconRight: "chevron-right",
    ...commonProps.args
  },
};
