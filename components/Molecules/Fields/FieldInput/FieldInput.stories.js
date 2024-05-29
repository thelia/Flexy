import FieldInput from './FieldInput.twig';
import fieldInputFunction from './FieldInput.js';

export default {
  title: 'Design System/Molecules/Fields/FieldInput'
};

export const Base = {
  render: (args) => FieldInput(args),
  play: () => {
    fieldInputFunction();
  },
  args: {
    name: 'indication',
    type: '',
    label: 'Indication',
    placeholder: 'Ex. Nom',
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
    required: {
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
    required: {
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
