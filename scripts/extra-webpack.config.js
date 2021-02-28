const webpackConfigAddTheme = require('./themeable/webpack-config-add-theme');
const sassImporterAlias = require('./sass-importer/webpack-config-sass-loader-importer');
const lessImporterAlias = require('./less-importer/webpack-config-less-loader-importer');
const terserOptionsWebpackConfig = require('./terser-options-webpack.config');
const webpackConfigAddBabel2ES5 = require('./es2015-to-es5-bebal-loader/babel-loader-wepack-config');
module.exports = (config) => {
   config = sassImporterAlias(config);
   config = terserOptionsWebpackConfig(config);
   config = lessImporterAlias(config);
   config = webpackConfigAddBabel2ES5(config);
   return webpackConfigAddTheme(config);
};
