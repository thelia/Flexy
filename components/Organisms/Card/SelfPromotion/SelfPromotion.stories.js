import SelfPromotion from './SelfPromotion.twig';

export default {
  title: 'Design System/Organisms/Card/SelfPromotion'
};

export const Base = {
  render: (args) => SelfPromotion(args),
  args: {
    img: { url: '', alt: '' },
    title: "Ici un texte d’autopromotion",
    desc: "Accompagné d’un texte secondaire à cet endroit",
  }
};
