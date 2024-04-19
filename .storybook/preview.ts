import { Preview } from '@storybook/html';
import Twig from 'twig';

import '../components/base.css';

Twig.cache();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'grey',
          value: '#F5F5F5'
        },
        {
          name: 'white',
          value: '#FFFFFF'
        }
      ]
    }
  }
};

export default preview;
