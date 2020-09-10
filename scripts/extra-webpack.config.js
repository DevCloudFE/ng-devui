const webpackConfigAddTheme = require('./themeable/webpack-config-add-theme');
module.exports = (config) => {
   return webpackConfigAddTheme(config);
};
