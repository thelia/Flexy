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
    }
  }
};

export default preview;
