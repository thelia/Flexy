import Reinsurance from './Reinsurance.html.twig';

export default {
  title: 'Design System/Organisms/Reinsurance'
};

export const small = {
  render: (args) => Reinsurance(args),
  args: {
    data: [
      {
        strongText: 'Livraison gratuite',
        text: ' à partir de 50€',
        icon: 'reinsurance-delivery'
      },
      {
        strongText: 'Expédition',
        text: ' sous 24h',
        icon: 'reinsurance-shipping'
      }
    ]
  },
  argTypes: {
    data: { type: 'array' }
  }
};
