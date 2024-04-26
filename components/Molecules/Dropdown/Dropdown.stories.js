import Dropdown from './Dropdown.twig';

export default {
  title: 'Design System/Molecules/Dropdown'
};

export const Base = {
  render: (args) => Dropdown(args),
  args: {
    id: "civility",
    placeholder: "Civilité",
    options: [{ value: 1, label: "M." }, { value: 2, label: "Mme" }, { value: 3, label: "Neutre / Non binaire / Agenre" }, { value: 4, label: "Je ne souhaite pas répondre" }],
  },
  parameters: {
    backgrounds: { default: 'grey' },
  },
};
