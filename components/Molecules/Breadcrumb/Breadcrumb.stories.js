import Breadcrumb from './Breadcrumb.twig';
import breadcrumbFunction from './Breadcrumb.js';

export default {
  title: 'Design System/Molecules/Breadcrumb'
};

export const Base = {
  render: (args) => Breadcrumb(args),
  args: {
    items: [
      { label: 'Page parante', href: '#' },
      { label: 'Page mère', href: '#' },
      { label: 'Page actuelle' }
    ]
  }
};

export const Lengthy = {
  render: (args) => Breadcrumb(args),
  play: () => {
    breadcrumbFunction()
  },
  args: {
    items: [
      { label: 'Non visible', href: '#' },
      { label: 'Non visible', href: '#' },
      { label: 'Page parante', href: '#' },
      { label: 'Page mère', href: '#' },
      { label: 'Page actuelle' }
    ]

  }
};
