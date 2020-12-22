const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    // 支持 lodash
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash',
      }),
    ],
  },
};
