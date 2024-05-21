import PickupPoint from './PickupPoint.twig';
import { pickupPoint } from './PickupPoint';

export default {
  title: 'Design System/Organisms/Card/PickupPoint'
};

const address = {
  address1: "Adresse première ligne",
  address2: "Complément d’adresse",
  zipCode: '00000',
  city: 'Clermont-Ferrand',
  country: 'Ville-Sur-Fleuve'
};
const hours = [
  {day: 'lundi', hours: '14h - 19h'},
  {day: 'mardi', hours: '14h - 20h'},
  {day: 'Mercredi', hours: '14h - 20h'},
  {day: 'Jeudi', hours: '14h - 20h'},
  {day: 'Vendredi', hours: '14h - 20h'},
  {day: 'Samedi', hours: '14h - 20h'},
  {day: 'Dimanche', hours: 'Fermé'},
]

export const Base = {
  render: (args) => `<div class='max-w-[340px]'>${PickupPoint(args)}</div>`,
  play: () => {
    pickupPoint();
  },
  args: {
    selected: false,
    closed: false,
    title: 'Nom du point relais',
    date: 'JJ/MM',
    address: address,
    price: '7,80€',
    img: {alt: 'Logo Mondial Relay', src: "/images/mondialRelay.svg"},
    hours
  },
  argTypes: {
    date: {control: { type: 'text' }}
  }
};
