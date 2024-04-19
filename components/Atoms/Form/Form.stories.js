import Checkbox from './Checkboxs.twig';
import Radio from './Radios.twig';
import Toggle from './Toggles.twig';
import './checkbox.css';
import './toggle.css';

export default {
  title: 'Design System/Atoms/Form'
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

export const toggle = {
  render: (args) => Toggle(args),
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' }
    }
  }
};
