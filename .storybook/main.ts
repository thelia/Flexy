import type { StorybookConfig } from '@storybook/html-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../assets'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    'storybook-addon-pseudo-states',
    {
      name: '@storybook/addon-styling-webpack',

      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  implementation: require.resolve('postcss')
                }
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.twig$/,
      use: [
        {
          loader: 'twigjs-loader'
        }
      ]
    });

    if (Array.isArray(config?.entry)) {
      config.entry.push(
        path.resolve(__dirname, '../assets/js/twig/custom-twig.ts')
      );
    }
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@components': path.resolve(__dirname, '../components'),
        '@react': path.resolve(__dirname, '../react-components'),
        '@icons': path.resolve(__dirname, '../assets/icons')
      }
    };
    return config;
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
