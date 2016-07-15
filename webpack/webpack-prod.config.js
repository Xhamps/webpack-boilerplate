var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');


var Rupture = require('rupture');
var Autoprefixer = require('autoprefixer');
var Lost = require('lost');
var FontMagician = require('postcss-font-magician');
var Rucksack = require('rucksack-css');

var baseUrl = 'http://localhost:3000';

module.exports = {

  entry: './src/app/index',

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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')
      },

      {
        test: /\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({
          name: '[name]_[hash]',
          prefixize: true,
          spriteModule: 'utils/my-custom-sprite'
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
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('/css/styles.css')
  ],

  stylus: {
    use: [Rupture()]
  },

  postcss: function () {
      return [Autoprefixer, Lost, FontMagician, Rucksack];
  }
}
