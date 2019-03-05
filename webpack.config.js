const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./src/server/config');

module.exports = env => {
  console.log('Webpack ENV', env);
  const plugins = [
    new CopyWebpackPlugin(
      [
        {
          from: 'src/client/public',
          to: 'public'
        }
      ],
      { debug: 'error' }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        API_URI: JSON.stringify(config.client.apiUri)
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ];
  // DEV PLUGINS
  if (env === 'development') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: './src/client/index.js',
    resolve: {
      alias: {
        Root: path.resolve(__dirname, 'src/client/')
      }
    },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '.build/client'),
      chunkFilename: '[name].js',
      publicPath: 'assets/'
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          resolve: {
            extensions: ['.js', '.jsx', '.json']
          },
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader', // creates style nodes from JS strings
            { loader: 'css-loader', options: { importLoaders: 1 } } // translates CSS into CommonJS
          ]
        },
        {
          test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ]
    },
    devServer: {
      port: 9090
    },
    devtool: 'source-map'
  };
};
