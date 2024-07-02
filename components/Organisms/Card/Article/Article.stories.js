import Article from './Article.twig';

export default {
  title: 'Design System/Organisms/Card/Article'
};

export const Base = {
  render: (args) => `<div class='w-[334px]''>${Article(args)}</div>`,
  args: {
    img: { url: '/images/placeholder2.webp', alt: '' },
    title: 'Titre de l’article à cet endroit',
    date: '04.05.2021'
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
