const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const SERVER_PORT = 8080;
const DEV_PORT = 3000;

module.exports = {
  output: {
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    compress: true,
    open: false,
    port: DEV_PORT,
    quiet: true,
    proxy: {
      '/api': `http://localhost:${SERVER_PORT}`
    },
    historyApiFallback: {
      index: `http://localhost:${DEV_PORT}/index.html`
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#828dd3',
                'link-color': '#5343b3'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff(2)?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      Style: path.resolve(__dirname, './src/style/'),
      Components: path.resolve(__dirname, './src/components/'),
      Utils: path.resolve(__dirname, './src/utils/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `React Dev Server is running here: http://localhost:${DEV_PORT}`,
          `Server requests proxied from this port: ${SERVER_PORT}`
        ]
      }
    })
  ]
};
