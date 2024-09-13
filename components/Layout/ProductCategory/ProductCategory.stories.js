import ProductCategory from './ProductCategory.html.twig';

export default {
  title: 'Design System/Layout/Product Category'
};

const standardCategory = {
  title: 'Nom de la catégorie',
  button: { label: 'Je découvre', href: '#' }
};

const categories = [];

for (let i = 0; i < 5; i++) {
  categories.push(standardCategory);
}

export const base = {
  render: (args) => ProductCategory(args),
  args: {
    categories: categories,
    title: 'Nos catégories de produits'
  },
  argTypes: {}
};
