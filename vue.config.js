module.exports = {
  publicPath: '/',
  css: {
    extract: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
