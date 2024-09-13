import Dropdown from './Dropdown.html.twig';
import dropdownFunction from './Dropdown.js';

export default {
  title: 'Design System/Molecules/Dropdown'
};

export const Base = {
  render: (args) => Dropdown(args),
  args: {
    id: 'civility',
    placeholder: 'Civilité',
    options: [
      { value: 1, label: 'M.' },
      { value: 2, label: 'Mme' },
      { value: 3, label: 'Neutre / Non binaire / Agenre' },
      { value: 4, label: 'Je ne souhaite pas répondre' }
    ]
  },
  play: () => {
    dropdownFunction();
  },
  parameters: {
    backgrounds: { default: 'grey' }
  }
};
