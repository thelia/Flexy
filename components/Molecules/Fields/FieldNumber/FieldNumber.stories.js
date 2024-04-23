import FieldNumber from './FieldNumber.twig';

export default {
  title: 'Design System/Molecules/Fields/FieldNumber'
};

export const Base = {
  render: (args) => FieldNumber(args),
  args: {
    name: "Indication",
    min: "",
    max: "",
    error: "",
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    required: {
      control: { type: 'boolean' }
    },
  }
};
