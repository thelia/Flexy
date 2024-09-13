import Favorite from './Favorite.html.twig';

export default {
  title: 'Design System/Molecules/Favorite'
};

export const base = {
  render: (args) => Favorite(args),
  args: {
    text: 'Favori',
    selected: false
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
