import Steps from './Steps.html.twig';

export default {
  title: 'Design System/Molecules/Steps'
};

export const base = {
  render: (args) => Steps(args),
  args: {
    currentStep: 2,
    checkoutSteps: {
      CART: {
        id: 1,
        label: 'Votre panier'
      },
      DELIVERY: {
        id: 2,
        label: 'Votre livraison'
      },
      PAYMENT: {
        id: 3,
        label: 'Paiement'
      },
      CONFIRMATION: {
        id: 4,
        label: 'Confirmation'
      }
    },
    cartTotal: '850,00€',
    cartQuantity: '2 articles'
  },
  parameters: {}
};
