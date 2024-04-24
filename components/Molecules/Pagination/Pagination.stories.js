import Pagination from './Pagination.twig';

export default {
  title: 'Design System/Molecules/Pagination'
};

export const Base = {
  render: (args) => Pagination(args),
  args: {
    number: '1',
    prevText: 'Précédent',
    nextText: 'Suivant',
    href: '',
  },
  argTypes: {
    isPrev: {
      control: { type: 'boolean' }
    },
    isNext: {
      control: { type: 'boolean' }
    }
  },
};
