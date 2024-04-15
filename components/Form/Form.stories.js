import Checkbox from './Checkbox.twig';
import './checkbox.css';

export default {
  title: 'Example/Form'
};

export const checkbox = {
  render: (args) => Checkbox(args),
  args: {
    error: false,
    disabled: false
  },
  argTypes: {
    error: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  play: ({ canvasElement }) => {
    const checkbox = canvasElement.querySelector(
      '.Checkbox.indeterminate input'
    );
    checkbox.indeterminate = true;

    const focusInput = canvasElement.querySelector('input:checked');
    focusInput.focus();
  }
};
