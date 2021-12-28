const webpackConfigAddTheme = require('./themeable/webpack-config-add-theme');
const sassImporterAlias = require('./sass-importer/webpack-config-sass-loader-importer');
const lessImporterAlias = require('./less-importer/webpack-config-less-loader-importer');
const terserOptionsWebpackConfig = require('./terser-options-webpack.config');
const webPackConfigAddLayoutPrefix = require('./css-handle/handle-layout-prefix');
const webpackConfigAddBabel2ES5 = require('./es2015-to-es5-babel-loader/babel-loader-wepack-config');
const assetSourceConfig = require('./asset-source-config')
module.exports = (config) => {
   config = sassImporterAlias(config);
   config = terserOptionsWebpackConfig(config);
   config = lessImporterAlias(config);
   config = webpackConfigAddBabel2ES5(config);
   config = webPackConfigAddLayoutPrefix(config);
   config = assetSourceConfig(config);
   return webpackConfigAddTheme(config);
};