import Hero from './Hero.html.twig';

export default {
  title: 'Design System/Layout/Hero'
};

export const Base = {
  render: (args) => Hero(args),
  args: {
    blocks: [
      {
        image:
          'https://sabatier-k.openstudio-lab.com/cache/images/carousel/design780x480-4-4.png',
        title: 'Ici une phrase d’accroche pour accompagner le visuel',
        href: 'http://sabatier-k.openstudio-lab.com/couteaux-sabatier.html',
        linkLabel: 'Je découvre'
      },
      {
        image: '',
        title: 'Ici une phrase d’accroche pour accompagner le visuel',
        href: 'http://example.com',
        linkLabel: 'Je découvre'
      },
      {
        image: '',
        title: 'Ici une phrase d’accroche pour accompagner le visuel',
        href: 'http://example.com',
        linkLabel: 'Je découvre'
      }
    ]
  },
  argTypes: {
    blocks: { control: 'object' }
  }
};
