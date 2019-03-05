const config = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
  ]
};
module.exports = require('babel-jest').createTransformer(config);
