import Compact from './Classic.twig';
import Quantity from './Quantity.twig';

export default {
  title: 'Design System/Molecules/Button'
};

export const classic = {
  render: (args) => Compact(args),
  args: {
    customText: 'Button',
    type: 'primary',
    isFill: false,
    isRectangle: false,
    hasIconLeft: false,
    hasIconRight: false
  },
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'minimal', 'error'],
      control: { type: 'radio' }
    },
    hasIconLeft: {
      control: { type: 'boolean' }
    },
    hasIconRight: {
      control: { type: 'boolean' }
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
  render: () => Quantity(),
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

function plusMinusInput(el, minus = false) {
  const input = el.parentElement.querySelector('input');
  const value = parseInt(input.value);
  if (minus) {
    input.value = (value - 1).toString();
    return;
  }
  input.value = (value + 1).toString();
}
