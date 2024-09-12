import SubheaderCategory from './SubheaderCategory.html.twig';

export default {
  title: 'Design System/Layout/Subheader/Category'
};

export const base = {
  render: (args) => SubheaderCategory(args),
  args: {
    title: 'Nom de la catégorie',
    nbProducts: 16,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...'
  },
  argTypes: {}
};
