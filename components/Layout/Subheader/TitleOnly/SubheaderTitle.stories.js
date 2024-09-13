import SubheaderTitle from './SubheaderTitle.html.twig';

export default {
  title: 'Design System/Layout/Subheader/TitleOnly'
};

export const base = {
  render: (args) => SubheaderTitle(args),
  args: {
    position: 'left',
    title: 'Nom de la page',
    tag: 'h1'
  },
  argTypes: {
    position: {
      options: ['left', 'centered'],
      control: { type: 'radio' }
    }
  }
};
