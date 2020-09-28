const path = require('path');
const glob = require('glob');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log('Running in production mode: ', isProduction);

module.exports = {
  // define an entry point for webpack to start its crawling.
  entry: './src/index.js',
  // define where the files webpack produce, are placed.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  // minimise js and css files.
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  devServer: {
    port: 9000
  },
  module: {
    rules: [
      // every file with a js extension Webpack pipes the code through babel-loader.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // every file with a html extension Webpack pipes the code through html-loader.
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      // every file with a css or less extension Webpack pipes the code through all loaders.
      // will produce css output on prod build only.
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'node_modules')]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    // To strip all locales except “en”
    new MomentLocalesPlugin()
  ],
  // enhance debugging by adding meta info for the browser devtools.
  devtool: 'source-map',
  // tells stats whether to output in the different colors.
  stats: {
    colors: true
  },
  // an error will be displayed notifying you of a large asset.
  performance: {
    hints: 'warning'
  }
};

if (isProduction) {
  module.exports.plugins.push(new MiniCssExtractPlugin());
  module.exports.plugins.push(
    new PurgecssPlugin({
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
        nodir: true
      }),
      whitelist: ['html', 'body', 'svg', 'png']
    })
  );
}
