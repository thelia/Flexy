import Title from '../Font/Title.twig';
import Paragraph from '../Font/Paragraph.twig';
import './font.css';

export default {
  title: 'Design System/Atoms/Fonts'
};

export const titles = () => Title();
export const paragraphs = {
  render: (args) => Paragraph(args),
  args: {
    bold: false,
    italic: false,
    lineThrough: false
  },
  argTypes: {
    bold: {
      control: { type: 'boolean' }
    },
    italic: {
      control: { type: 'boolean' }
    },
    lineThrough: {
      control: { type: 'boolean' }
    }
  }
};
