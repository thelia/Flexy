import Breadcrumb from './Breadcrumb.html.twig';
import breadcrumbFunction from './Breadcrumb.js';

export default {
  title: 'Design System/Molecules/Breadcrumb'
};

export const Base = {
  render: (args) => Breadcrumb(args),
  args: {
    backIcon: false,
    items: [
      { label: 'Page parente', href: '#' },
      { label: 'Page mère', href: '#' },
      { label: 'Page actuelle' }
    ]
  },
  argTypes: {
    backIcon: {
      control: { type: 'boolean' }
    }
  }
};

export const Lengthy = {
  render: (args) => Breadcrumb(args),
  play: () => {
    breadcrumbFunction();
  },
  args: {
    items: [
      { label: 'Non visible', href: '#' },
      { label: 'Non visible', href: '#' },
      { label: 'Page parente', href: '#' },
      { label: 'Page mère', href: '#' },
      { label: 'Page actuelle' }
    ]
  },
  argTypes: {
    backIcon: {
      control: { type: 'boolean' }
    }
  }
};
