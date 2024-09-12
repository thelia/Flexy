import FieldSelect from './FieldSelect.html.twig';
import fieldSelectFunction from './FieldSelect.js';

export default {
  title: 'Design System/Molecules/Fields/FieldSelect'
};

export const Base = {
  render: (args) => FieldSelect(args),
  play: () => {
    fieldSelectFunction();
  },
  args: {
    name: 'Indication',
    options: [
      { value: 1, label: 'selecteur 1' },
      { value: 2, label: 'selecteur 2' },
      { value: 3, label: 'selecteur 3' }
    ],
    label: 'Indication',
    placeholder: 'Ex. Nom',
    error: '',
    tooltip: ''
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    },
    success: {
      control: { type: 'boolean' }
    },
    size: {
      options: ['large', 'small'],
      control: { type: 'select' }
    },
    required: {
      control: { type: 'boolean' }
    }
  }
};
