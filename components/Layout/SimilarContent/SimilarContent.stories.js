import SimilarContent from './SimilarContent.html.twig';
import { slider } from '../../../assets/js/slider';

export default {
  title: 'Design System/Layout/SimilarContent'
};

const standardSimilarContent = {
  title: 'Titre de l’article à cet endroit',
  date: 'JJ.MM.AAAA'
};

const similarContents = [];

for (let i = 0; i < 3; i++) {
  similarContents.push(standardSimilarContent);
}

export const base = {
  render: (args) => SimilarContent(args),
  args: {
    title: 'Sur le même sujet',
    similarContents,
    button: { href: '#', label: 'Voir toutes les actualités' }
  },
  play: () => {
    slider();
  },
  parameters: {
    backgrounds: { default: 'theme-lighter' }
  }
};
