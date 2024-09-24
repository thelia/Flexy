import FieldInput from './FieldInput.html.twig';
import FieldInputFunction from './FieldInput.js';

export default {
  title: 'Design System/Molecules/Fields/FieldInput'
};

export const Base = {
  render: (args) => FieldInput(args),
  play: () => {
    FieldInputFunction();
  },
  args: {
    name: 'indication',
    type: '',
    label: 'Indication',
    placeholder: 'Ex. Nom',
    iconButtonLeft: false,
    min: '',
    max: '',
    error: '',
    unit: '',
    tooltip: '',
    iconButton: ''
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    optional: {
      control: { type: 'boolean' }
    },
    success: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'select' }
    }
  }
};

export const WithButton = {
  render: (args) => FieldInput(args),
  play: () => {
    fieldInputFunction();
  },
  args: {
    name: 'promoCode',
    type: 'text',
    label: '',
    placeholder: 'Code Promo',
    min: '',
    max: '',
    error: '',
    tooltip: '',
    button: 'Appliquer'
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    optional: {
      control: { type: 'boolean' }
    },
    success: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'select' }
    }
  }
};
