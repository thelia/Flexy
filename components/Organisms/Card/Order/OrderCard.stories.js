import OrderCard from './OrderCard.html.twig';

export default {
  title: 'Design System/Organisms/Card/OrderCard'
};

export const Base = {
  render: (args) =>
    `<div class='max-w-[320] sm:max-w-[390px] md:max-w-[438px] 2xl:max-w-[616px]'>${OrderCard(args)}</div>`,
  args: {
    orderNumber: 'XXXX XXXX XXX',
    date: '08/01/2024',
    deliveryDate: '10/01/2024',
    nbItems: 1,
    price: '398,26€',
    productImages: [
      { alt: 'image 1', src: '/images/placeholder2.webp' },
      { alt: 'image 2', src: '/images/placeholder2.webp' },
      { alt: 'image 2', src: '/images/placeholder2.webp' },
      { alt: 'image 2', src: '/images/placeholder2.webp' },
      { alt: 'image 6', src: '/images/placeholder2.webp' }
    ]
  }
};
