var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var Rupture = require('rupture');
var Autoprefixer = require('autoprefixer');
var Lost = require('lost');
var FontMagician = require('postcss-font-magician');
var Rucksack = require('rucksack-css');

var baseUrl = 'http://localhost:3000';

module.exports = {

  devtool: 'cheap-eval-source-map',

  entry: [
    'webpack-dev-server/client?' + baseUrl,
    'webpack/hot/dev-server',
    './src/app/index',
  ],

  output: {
    path: './dist',
    filename: '/scripts/app.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },

      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader!stylus-loader?sourceMap'
      },

      {
        test: /\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({
          name: '[name]_[hash]',
          prefixize: true
        })
      },
      {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
              'file?hash=sha512&digest=hex&name=[hash].[ext]',
              'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      }
    ],
  },

  eslint: {
    configFile: './.eslintrc'
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new OpenBrowserPlugin({
      url: baseUrl
    })
  ],

  devServer: {
    contentBase: './',
    hot: true,
    port: '3000',
    inline: true,
    progress: true,
    historyApiFallback: true,
  },

  stylus: {
    use: [Rupture()]
  },

  postcss: function () {
      return [Autoprefixer, Lost, FontMagician, Rucksack];
  }
}
