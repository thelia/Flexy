import SuggestFilters from './SuggestFilters.html.twig';

export default {
  title: 'Design System/Organisms/Card/SuggestFilters'
};

export const Base = {
  render: (args) => SuggestFilters(args),
  args: {
    customText:
      "<p>Vous n'avez pas trouvé le produit que vous recherchez ?</p><p>Essayez les filtres</p>",
    button: 'Filtrer & trier'
  }
};
