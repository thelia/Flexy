import Title from './Title.html.twig';
import Paragraph from './Paragraph.html.twig';
import Other from './Other.html.twig';
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

export const others = () => Other();
