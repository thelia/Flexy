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
          loader: 'twig-loader'
        }
      ]
    });
    return config;
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
