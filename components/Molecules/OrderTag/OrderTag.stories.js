import OrderTag from './OrderTag.html.twig';

export default {
  title: 'Design System/Molecules/OrderTag'
};

export const Base = {
  render: (args) => OrderTag(args),
  args: {
    customText: 'Commande validée',
    withoutChip: false
  },
  argTypes: {
    variant: {
      options: [
        'informative',
        'success',
        'validated',
        'grey',
        'error',
        'processing',
        'warning',
        'vermillon'
      ],
      control: { type: 'select' }
    },
    type: {
      options: ['outline', 'minimal'],
      control: { type: 'select' }
    }
  }
};

export const Variants = {
  render: () => `
    <h2 class="font-bold text-lg">Status Commande</h2>
    <div class="my-2">
    informative :
    ${OrderTag({ customText: 'Commande validée', variant: 'informative' })}</div>
    </div>
    <span class="mt-4 mb-1">
    success :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'success' })}</div>
    <div class="my-2">
    validated :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'validated' })}</div>
    <div class="my-2">
    grey :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'grey' })}</div>
    <div class="my-2">
    error :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'error' })}</div>
    <div class="my-2">
    processing :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'processing' })}</div>
    <div class="my-2">
    warning :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'warning' })}</div>
    <div class="my-2">
    vermillon :
    ${OrderTag({ customText: 'Commande expédiée', variant: 'vermillon' })}</div>

    <h2 class="font-bold text-lg mt-8">Stock Status</h2>
    <div class="my-2">
    informative :
    ${OrderTag({ customText: 'En stock', variant: 'success', type: 'minimal' })}</div>
    <div class="my-2">
    success :
    ${OrderTag({ customText: 'Stocks faibles', variant: 'warning', type: 'minimal' })}</div>
    <div class="my-2">
    validated :
    ${OrderTag({ customText: 'Epuisé', variant: 'error', type: 'minimal' })}</div>
  `
};
