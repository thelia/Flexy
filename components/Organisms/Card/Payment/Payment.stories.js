import PaymentCard from './PaymentCard.twig';

export default {
  title: 'Design System/Organisms/Card/PaymentCard'
};

export const Base = {
  render: (args) => `<div class='w-[340px]''>${PaymentCard(args)}</div>`,
  args: {
    title: 'Prénom NOM',
    number: '**** **** **** 0000',
    expired: false,
    cardType: 'VISA',
    date: '05/25',
    withoutButton: false
  }
};
