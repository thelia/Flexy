import SimilarContentCard from './SimilarContentCard.html.twig';

export default {
  title: 'Design System/Organisms/SimilarContentCard'
};

export const base = {
  render: (args) => SimilarContentCard(args),
  args: {
    title: 'Titre de l’article à cet endroit',
    date: 'JJ.MM.AAAA',
    url: '#'
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
