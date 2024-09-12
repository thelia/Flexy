import Transporter from './Transporter.html.twig';

export default {
  title: 'Design System/Organisms/Card/Transporter'
};

export const Base = {
  render: (args) => `<div class='w-[340px]'>${Transporter(args)}</div>`,
  args: {
    selected: false,
    title: 'Nom du transporteur',
    date: 'JJ/MM',
    price: '7,80€',
    img: { alt: 'Logo Chronopost', src: '/images/chronopost.svg' }
  },
  argTypes: {
    date: { control: { type: 'text' } }
  }
};
