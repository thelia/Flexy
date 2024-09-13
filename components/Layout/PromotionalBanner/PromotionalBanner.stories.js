import PromotionalBanner from './PromotionalBanner.html.twig';
import promotionalBanner from './PromotionalBanner';

export default {
  title: 'Design System/Layout/PromotionalBanner'
};

const types = ['button', 'link'];

export const base = {
  render: (args) => PromotionalBanner(args),
  play: () => {
    promotionalBanner();
  },
  args: {
    text: 'Ici un message promotionnel avec un bouton pour découvrir la catégorie de produits à laquelle les réductions s’appliquent.',
    type: 'button',
    linkLabel: 'Découvrir',
    link: '#'
  },
  argTypes: {
    type: {
      options: types,
      control: { type: 'radio' }
    }
  }
};
