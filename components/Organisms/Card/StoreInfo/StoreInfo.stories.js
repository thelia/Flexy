import StoreInfo from './StoreInfo.twig';
import { storeInfo } from './StoreInfo';

export default {
  title: 'Design System/Organisms/Card/StoreInfo'
};

const address = {
  address1: '12 rue du port',
  address2: 'Bâtiment C',
  zipCode: '63000',
  city: 'Clermont-Ferrand',
  country: 'France'
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
  render: (args) =>
    `<div class='max-w-[334] lg:max-w-[540px]'>${StoreInfo(args)}</div>`,
  play: () => {
    storeInfo();
  },
  args: {
    storeName: 'Nom du magasin',
    displayHours: false,
    address,
    hours
  }
};
