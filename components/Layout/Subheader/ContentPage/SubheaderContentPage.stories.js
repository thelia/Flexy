import SubheaderContentPage from './SubheaderContentPage.html.twig';

export default {
  title: 'Design System/Layout/Subheader/Content Page'
};

export const base = {
  render: (args) => SubheaderContentPage(args),
  args: {
    title: 'Ici le titre de l’article',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    img: { alt: 'image 1', src: '/images/placeholder2.webp' }
  },
  argTypes: {}
};
