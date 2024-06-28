import { Preview } from '@storybook/html';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
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
    layout: 'fullscreen',
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
          name: 'theme-lighter',
          value: '#FFEDE5'
        },
        {
          name: 'theme-lightest',
          value: '#FFF5F1'
        }
      ]
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        largeDesktop: {
          name: 'Large desktop',
          styles: {
            width: '1681px',
            height: '801px'
          }
        }
      },
      defaultViewport: 'desktop'
    }
  }
};

export default preview;
