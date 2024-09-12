import Reinsurance from './Reinsurance.html.twig';

export default {
  title: 'Design System/Layout/Reinsurance'
};

export const base = {
  render: (args) => Reinsurance(args),
  args: {
    data: [
      {
        strongText: 'Livraison gratuite',
        text: 'Pour toute commande supérieure à 100€',
        linkLabel: 'Voir conditions',
        link: '#',
        icon: 'reinsurance-delivery'
      },
      {
        strongText: 'Paiement sécurisé',
        text: 'Carte bancaire, Paypal',
        linkLabel: 'Voir conditions',
        link: '#',
        icon: 'reinsurance-payment'
      },
      {
        strongText: 'Satisfait ou remboursé',
        text: 'Echange ou remboursement offert sous 30 jours',
        linkLabel: 'Voir conditions',
        link: '#',
        icon: 'reinsurance-satisfied'
      }
    ]
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
