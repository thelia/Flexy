import HomeDelivery from './HomeDelivery.html.twig';
import { homeDelivery } from './HomeDelivery';

export default {
  title: 'Design System/Organisms/Modules/HomeDelivery'
};

const address = {
  title: 'Domicile',
  name: 'Eleanor Shellstrop',
  address1: 'Adresse première ligne',
  address2: 'Complément d’adresse',
  zipCode: '00000',
  city: 'Clermont-Ferrand',
  country: 'Ville-Sur-Fleuve',
  phone: '06 06 06 06 06'
};

export const Base = {
  render: (args) => HomeDelivery(args),
  play: () => {
    HomeDelivery();
  },
  args: {
    selected: false,
    noAddress: false,
    title: 'Livraison à domicile',
    date: 'JJ/MM',
    price: '7,80 €',
    address
  }
};
