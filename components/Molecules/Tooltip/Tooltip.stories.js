import Tooltip from './Tooltip.html.twig';
import TooltipFunction from './Tooltip.js';

export default {
  title: 'Design System/Molecules/Tooltip'
};

export const Base = {
  render: (args) => Tooltip(args),
  play: () => {
    TooltipFunction();
  },
  args: {
    tooltip:
      'Ici un texte pour le tool tip, celui-ci doit rester en dessous de 80 caractères.'
  },
  argTypes: {
    position: {
      options: ['top', 'bottom'],
      control: { type: 'select' }
    }
  },
  parameters: {
    layout: 'centered'
  }
};
