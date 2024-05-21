import SummaryCard from './SummaryCard.twig';

export default {
  title: 'Design System/Organisms/SummaryCard'
};

export const base = {
  render: (args) => `<div class='w-[334px]''>${SummaryCard(args)}</div>`,
  args: {
    cgv: true,
    promo: {
      code: '50JUIL23',
      reduction: '-50€'
    },
    giftCard: {
      code: '4781 6931 567',
      reduction: '-100€'
    }
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
