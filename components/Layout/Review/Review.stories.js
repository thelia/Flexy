import Review from './Review.twig';
import { slider } from '../../../assets/js/slider';

export default {
  title: 'Design System/Layout/Review'
};

const standardReview = {
  author: 'Prénom N.',
  review:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  note: 4,
  maxNote: 5,
  date: '04/05/2021'
};

const reviews = [];

for (let i = 0; i < 3; i++) {
  reviews.push(standardReview);
}

export const base = {
  render: (args) => Review(args),
  args: {
    title: 'Nos clients parlent de nous',
    reviews,
    button: { href: '#', label: 'Voir tous les avis' }
  },
  play: () => {
    slider();
  },
  parameters: {
    backgrounds: { default: 'theme-lighter' }
  }
};
