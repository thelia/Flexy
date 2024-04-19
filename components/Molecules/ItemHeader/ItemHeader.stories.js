import ItemHeader from './ItemHeader.twig';

export default {
  title: 'Design System/Molecules/ItemHeader'
};

export const Base = {
  render: (args) => ItemHeader(args),
  args: {
    customText: "Item menu",
    href: "",
  },
};
