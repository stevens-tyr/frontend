const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const SERVER_PORT = 5000;
const DEV_PORT = 3000;

module.exports = {
  output: {
    publicPath: '/'
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
      Components: path.resolve(__dirname, './src/components/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
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
