import AddressCard from './AddressCard.twig';
import ClientAddressCard from './ClientAddressCard.twig';
import { addressCard } from './AddressCard';

export default {
  title: 'Design System/Organisms/Card/AddressCard'
};

const address = {
  title: "Domicile",
    name: "Eleanor Shellstrop",
    address1: "12 rue du port",
    address2: "Bâtiment C",
    zipCode: '63000',
    city: 'Clermont-Ferrand',
    country: 'France',
    phone: '06 00 00 00 00',
};

export const Base = {
  render: (args) => `<div class='w-[309px]'>${AddressCard(args)}</div>`,
  play: () => {
    addressCard();
  },
  args: {
    purchaseFunnel: false,
    address: address,
    isDefault: true,
    selected: true,
    radio: false,
  },
  argTypes: {
    radio: {if: { arg: 'purchaseFunnel', truthy: false }},
    selected: {if: { arg: 'purchaseFunnel', truthy: false }},
    isDefault: {if: { arg: 'purchaseFunnel', truthy: false }},
  }
};
export const ClientInformation = {
  render: (args) => `<div class='max-w-[540px]'>${ClientAddressCard(args)}</div>`,
  args: {
    address: address,
    undefined: false
  }
};
