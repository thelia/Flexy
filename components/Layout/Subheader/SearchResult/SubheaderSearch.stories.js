import SubheaderSearch from './SubheaderSearch.twig';

export default {
  title: 'Design System/Layout/Subheader/SearchResults'
};

export const base = {
  render: (args) => SubheaderSearch(args),
  args: {
    title: 'Résultat de recherche'
  },
  argTypes: {}
};
