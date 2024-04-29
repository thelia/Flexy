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
      options: ['text', 'bold', 'vermillon'],
      control: { type: 'select' },
    },
  },
};

export const Base = {
  render: (args) => Accordion(args),
  ...commonProps,
  args: {
    ...commonProps.args,
    variant: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }
};

// TODO: manque input avec bouton à l'intérieur pour le code promo
export const Bold = {
  render: (args) => Accordion(args),
  args: {
    ...commonProps.args,
    variant: 'bold',
    content: `${FieldInput({ placeholder: 'Code Promo', name: 'promoCode' })}`,
  }
};

export const Vermillon = {
  render: (args) => Accordion(args),
  args: {
    ...commonProps.args,
    variant: 'vermillon',
    content: `
    ${FilterList({ label: 'Du - cher au + cher', value: 1 })}
    ${FilterList({ label: 'Du + cher au - cher', value: 2 })}
    ${FilterList({ label: 'Nouveautés', value: 3 })}
    ${FilterList({ label: 'Meilleurs notes', value: 4 })}
    ${FilterList({ label: 'Promotions', value: 5 })}`,
  }
};
