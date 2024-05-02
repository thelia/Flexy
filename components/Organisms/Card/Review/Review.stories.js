import Review from './Review.twig';

export default {
  title: 'Design System/Organisms/Card/Review'
};

export const Base = {
  render: (args) => Review(args),
  args: {
    author: "Prénom N.",
    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    note: 4,
    maxNote: 5,
    date: "04/05/2021"
  },
  parameters: {
    backgrounds: { default: 'grey' },
  },
};
