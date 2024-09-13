import SummaryCard from './SummaryCard.html.twig';

export default {
  title: 'Design System/Organisms/SummaryCard'
};

export const base = {
  render: (args) => `<div class='w-[334px]''>${SummaryCard(args)}</div>`,
  args: {
    cgvLink: '#',
    nbArticles: 2,
    subTotal: '2 150,00€',
    total: '2 000,00€',
    promo: {
      code: '50JUIL23',
      reduction: '-50€'
    },
    giftCard: {
      code: '4781 6931 567',
      reduction: '-100€'
    },
    noGiftCard: false,
    noPromo: false
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
