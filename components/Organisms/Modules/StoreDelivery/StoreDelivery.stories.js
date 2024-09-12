import StoreDelivery from './StoreDelivery.html.twig';
import { storeDelivery } from './StoreDelivery';

export default {
  title: 'Design System/Organisms/Modules/StoreDelivery'
};

const address = {
  address1: 'Adresse première ligne',
  address2: 'Complément d’adresse',
  zipCode: '00000',
  city: 'Clermont-Ferrand',
  country: 'Ville-Sur-Fleuve'
};

const hours = [
  { day: 'Lundi', hours: '14h - 19h' },
  { day: 'Mardi', hours: '14h - 20h' },
  { day: 'Mercredi', hours: '14h - 20h' },
  { day: 'Jeudi', hours: '14h - 20h' },
  { day: 'Vendredi', hours: '14h - 20h' },
  { day: 'Samedi', hours: '14h - 20h' },
  { day: 'Dimanche', hours: 'Fermé' }
];

export const Base = {
  render: (args) => StoreDelivery(args),
  play: () => {
    storeDelivery();
  },
  args: {
    selected: false,
    closed: false,
    registeredClient: false,
    newClient: false,
    title: 'Retrait en magasin',
    date: 'JJ/MM',
    address: address,
    price: 'Gratuit',
    img: { alt: 'Logo Mondial Relay', src: '/images/mondialRelay.svg' },
    hours,
    carbone: '0.12kg CO2'
  },
  argTypes: {
    date: { control: { type: 'text' } }
  }
};
