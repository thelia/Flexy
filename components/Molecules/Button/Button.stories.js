import Compact from './Classic.twig';
import Quantities from './Quantities.twig';
import Rounds from './Rounds.twig';

export default {
  title: 'Design System/Molecules/Button'
};

const types = ['primary', 'secondary', 'minimal', 'error'];
const icons = ['chevron-left', 'cart', 'zoom', 'close-big'];

export const classic = {
  render: (args) => Compact(args),
  args: {
    customText: 'Button',
    type: 'primary',
    isFill: false,
    isRectangle: false,
    icon_left: 'none',
    icon_right: 'none'
  },
  argTypes: {
    type: {
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
    isFill: {
      control: { type: 'boolean' }
    },
    isRectangle: {
      control: { type: 'boolean' }
    }
  }
};

export const quantity = {
  render: () => Quantities(),
  play: ({ canvasElement }) => {
    const minusButtons = canvasElement.querySelectorAll(
      'button[data-qty="minus"]'
    );
    const plusButtons = canvasElement.querySelectorAll(
      'button[data-qty="plus"]'
    );
    minusButtons.forEach((minus) => {
      minus.addEventListener('click', (e) => plusMinusInput(minus, true));
    });
    plusButtons.forEach((plus) => {
      plus.addEventListener('click', () => plusMinusInput(plus));
    });
  }
};

export const rounds = {
  render: (args) => Rounds(args),
  args: {
    type: 'primary',
    icon: 'chevron-left'
  },
  argTypes: {
    type: {
      options: types,
      control: { type: 'radio' }
    },
    icon: {
      options: icons,
      control: { type: 'radio' }
    }
  }
};

function plusMinusInput(el, minus = false) {
  const input = el.parentElement.querySelector('input');
  const value = parseInt(input.value);
  if (minus) {
    input.value = (value - 1).toString();
    return;
  }
  input.value = (value + 1).toString();
}
