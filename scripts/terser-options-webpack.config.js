const TerserPlugin = require('terser-webpack-plugin');

function terserOptionsWebpackConfig(config) {
  const minimizerArr = config.optimization.minimizer;
  const terserPlugins = minimizerArr
    .filter(plugin => plugin.options && plugin.options.terserOptions && plugin.options.terserOptions.ecma < 8)
    .map(plugin => ({plugin: plugin ,index: minimizerArr.indexOf(minimizerArr)}));
  terserPlugins.forEach(terserPlugin => {
    terserPlugin.plugin.options.terserOptions.ecma = 8;
    minimizerArr.splice(terserPlugin.index,
      1 ,
      new TerserPlugin(terserPlugin.plugin.options));
  });
  return config;
};

module.exports = terserOptionsWebpackConfig;

