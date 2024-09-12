import SubheaderSearch from './SubheaderSearch.html.twig';

export default {
  title: 'Design System/Layout/Subheader/Search Results'
};

export const base = {
  render: (args) => SubheaderSearch(args),
  args: {
    title: 'Résultat de recherche',
    nbProducts: 16
  },
  argTypes: {}
};
