import FilterList from './FilterList.html.twig';

export default {
  title: 'Design System/Molecules/Filters/FilterList'
};

export const Base = {
  render: (args) => FilterList(args),
  args: {
    label: 'Item filtre et tri',
    value: 1,
    onClick: {}
  },
  parameters: {
    backgrounds: { default: 'grey-lighter' }
  }
};
