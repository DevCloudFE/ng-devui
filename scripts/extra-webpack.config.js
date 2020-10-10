const webpackConfigAddTheme = require('./themeable/webpack-config-add-theme');
const sassImporterAlias = require('./sass-importer/webpack-config-sass-loader-importer');
module.exports = (config) => {
   config = sassImporterAlias(config);
   return webpackConfigAddTheme(config);
};
