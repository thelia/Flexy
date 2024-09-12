import FieldNumber from './FieldNumber.html.twig';
import fieldNumberFunction from './FieldNumber.js';

export default {
  title: 'Design System/Molecules/Fields/FieldNumber'
};

export const Base = {
  render: (args) => FieldNumber(args),
  play: () => {
    fieldNumberFunction();
  },
  args: {
    name: 'Indication',
    min: '',
    max: '',
    error: ''
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    required: {
      control: { type: 'boolean' }
    }
  }
};
