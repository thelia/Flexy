import Base from './Base.html.twig';

export default {
  title: 'Design System/Molecules/SearchBar'
};

export const base = {
  render: (args) => Base(args),
  args: {
    type: 'classic'
  },
  argTypes: {
    type: {
      options: ['classic', 'white'],
      control: { type: 'radio' }
    }
  }
};
