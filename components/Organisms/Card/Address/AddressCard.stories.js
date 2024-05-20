import AddressCard from './AddressCard.twig';
import { addressCard } from './AddressCard';

export default {
  title: 'Design System/Organisms/Card/AddressCard'
};

export const Base = {
  render: (args) => `<div class='w-[309px]'>${AddressCard(args)}</div>`,
  play: () => {
    addressCard();
  },
  args: {
    address: {
      title: "Domicile",
      name: "Eleanor Shellstrop",
      address1: "12 rue du port",
      address2: "Bâtiment C",
      zipCode: '63000',
      city: 'Clermont-Ferrand',
      country: 'France',
      phone: '06 00 00 00 00',
    },
    isDefault: true,
    selected: true,
    radio: false,
  }
};
