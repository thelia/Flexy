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
          name: 'grey-lighter',
          value: '#D6D6D6'
        },
        {
          name: 'white',
          value: '#FFFFFF'
        },
        {
          name: 'theme-lightest',
          value: '#FFF5F1'
        }
      ]
    }
  }
};

export default preview;
