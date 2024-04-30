import Accordion from './Accordion.twig';
import FilterList from '../Filters/FilterList/FilterList.twig';
import FieldInput from '../Fields/FieldInput/FieldInput.twig';

export default {
  title: 'Design System/Molecules/Accordion'
};

const commonProps = {
  args: {
    title: 'Concertina',
  },
  argTypes: {
    variant: {
      options: ['text', 'promo', 'filter', 'faq'],
      control: { type: 'select' },
    },
  },
};

export const Text = {
  render: (args) => Accordion(args),
  ...commonProps,
  args: {
    ...commonProps.args,
    variant: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }
};

// TODO: manque input avec bouton à l'intérieur pour le code promo
export const CodePromo = {
  render: (args) => Accordion(args),
  args: {
    ...commonProps.args,
    variant: 'promo',
    content: `${FieldInput({ placeholder: 'Code Promo', name: 'promoCode' })}`,
  }
};

export const Filter = {
  render: (args) => Accordion(args),
  args: {
    ...commonProps.args,
    variant: 'filter',
    content: `
    ${FilterList({ label: 'Du - cher au + cher', value: 1 })}
    ${FilterList({ label: 'Du + cher au - cher', value: 2 })}
    ${FilterList({ label: 'Nouveautés', value: 3 })}
    ${FilterList({ label: 'Meilleurs notes', value: 4 })}
    ${FilterList({ label: 'Promotions', value: 5 })}`,
  }
};

export const Faq = {
  render: (args) => Accordion(args),
  ...commonProps,
  args: {
    title: "Une question fréquente ici ?",
    variant: 'faq',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }
};
