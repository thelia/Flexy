import Checkbox from './Checkbox.twig';
import Radio from './Radio.twig';
import './checkbox.css';

export default {
  title: 'Example/Form'
};

const commonProps = {
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
  }
};

export const checkbox = {
  render: (args) => Checkbox(args),

  play: ({ canvasElement, ...props }) => {
    const checkbox = canvasElement.querySelector(
      '.Checkbox.indeterminate input'
    );
    checkbox.indeterminate = true;
  },
  ...commonProps
};

export const radio = {
  render: (args) => Radio(args),
  ...commonProps
};
