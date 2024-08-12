const Encore = require('@symfony/webpack-encore');
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  //.setOutputPath('public/build/')
  .setOutputPath('dist/')
  // public path used by the web server to access the output path
  //.setPublicPath('/templates/frontOffice/flexy/public/build') ///build
  .setPublicPath(
    Encore.isProduction()
      ? '/templates-assets/frontOffice/' + path.basename(__dirname) + '/dist'
      : '/dist'
  )
  // only needed for CDN's or subdirectory deploy
  .setManifestKeyPrefix('dist/')

  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry('app', './assets/app.js')

  // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
  .splitEntryChunks()

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  // enables hashed filenames (e.g. app.abc123.css)
  .enableVersioning(Encore.isProduction())

  // configure Babel
  // .configureBabel((config) => {
  //     config.plugins.push('@babel/a-babel-plugin');
  // })

  // enables and configure @babel/preset-env polyfills
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = '3.23';
  })
  .configureWatchOptions((config) => {
    config.ignored = /node_modules|dist/;
  })
  .configureDevServerOptions((options) => {
    options.allowedHosts = 'all';
  });

// enables Sass/SCSS support
//.enableSassLoader()

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use React
//.enableReactPreset()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()

// IMAGES CONFIG
Encore.copyFiles({
  from: './assets/images',
  to: 'images/[path][name].[ext]',
  pattern: /\.(png|jpg|jpeg|gif|svg|webp)$/
});

Encore.configureImageRule({ type: 'javascript/auto' }, (loaderRule) => {
  loaderRule.test = /\.(png|jpg|jpeg|gif|ico|webp)$/;
  loaderRule.oneOf = [
    { resourceQuery: /copy-files-loader/, type: 'javascript/auto' },
    {
      type: 'asset/resource',
      generator: { filename: 'images/[name].[hash:8][ext]' },
      parser: {}
    }
  ];
});

// CSS CONFIG
Encore.enablePostCssLoader();

module.exports = Encore.getWebpackConfig();
