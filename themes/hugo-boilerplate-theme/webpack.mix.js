const mix = require('laravel-mix');
const path = require('path');

mix.setPublicPath(path.normalize('assets'));
mix.setResourceRoot(path.normalize('src'));
mix.setResourceRoot('./../');

if (mix.inProduction()) {
  mix.options({
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  });
} else {
  mix.webpackConfig({ devtool: 'inline-source-map' }).sourceMaps();
}

function resolve(dir) {
  return path.join(__dirname, dir);
}

mix.webpackConfig({
  resolve: {
    alias: {
      '@': resolve('src/js'),
    },
  },
  
  output: {
    publicPath: path.normalize('/'),
    chunkFilename: '[name].js',
  },
  
  watchOptions: {
    ignored: /node_modules/,
  },
});

mix.js('src/js/app.js', 'js/app.js').version();

mix.extract([
  'jquery',
]);

mix.autoload({
  jquery: ['$', 'jQuery', 'window.jQuery'],
});

mix.sass('src/sass/app.scss', 'css').version();
