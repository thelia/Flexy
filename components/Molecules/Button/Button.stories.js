import Compact from './Classic.html.twig';
import Quantities from './Quantities.html.twig';
import Rounds from './Rounds.html.twig';
import { quantityButton } from './button';

export default {
  title: 'Design System/Molecules/Button'
};

const types = ['primary', 'secondary', 'minimal', 'error'];
const icons = ['chevron-left', 'cart', 'zoom', 'close-big'];

export const classic = {
  render: (args) => Compact(args),
  args: {
    customText: 'Button',
    variant: 'primary',
    fill: false,
    rectangle: false,
    sharp: false,
    icon_left: 'none',
    icon_right: 'none',
    name: '',
    onClick: {},
  },
  argTypes: {
    variant: {
      options: types,
      control: { type: 'radio' }
    },
    icon_left: {
      options: ['none', ...icons],
      control: { type: 'radio' }
    },
    icon_right: {
      options: ['none', ...icons],
      control: { type: 'radio' }
    },
    fill: {
      control: { type: 'boolean' }
    },
    rectangle: {
      control: { type: 'boolean' }
    },
    href: {
      control: { type: 'text' }
    }
  }
};

export const quantity = {
  render: () => Quantities(),
  play: () => {
    quantityButton();
  }
};

export const rounds = {
  render: (args) => Rounds(args),
  args: {
    variant: 'primary',
    icon: 'chevron-left'
  },
  argTypes: {
    variant: {
      options: types,
      control: { type: 'radio' }
    },
    icon: {
      options: icons,
      control: { type: 'radio' }
    }
  }
};
