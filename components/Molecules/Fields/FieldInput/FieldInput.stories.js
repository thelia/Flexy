import FieldInput from './FieldInput.twig';

export default {
  title: 'Design System/Molecules/Fields/FieldInput'
};

export const Base = {
  render: (args) => FieldInput(args),
  args: {
    name: "Indication",
    type: "",
    label: "Indication",
    placeholder: "Ex. Nom",
    min: "",
    max: "",
    error: "",
    unit: "",
    tooltip: "",
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
      control: { type: 'select' },
    }
  }
};
