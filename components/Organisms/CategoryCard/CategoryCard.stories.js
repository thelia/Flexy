import CategoryCard from './CategoryCard.twig';

export default {
  title: 'Design System/Organisms/Category Card'
};

export const base = {
  render: (args) => CategoryCard(args),
  args: {
    title: 'Nom de la catégorie',
    button: { label: 'Je découvre', href: '#' }
  },
  argTypes: {}
};
