const TerserPlugin = require('terser-webpack-plugin');

function terserOptionsWebpackConfig(config) {
  // 处理打包时出现 terser 报错的问题=
  // const terserOptions = {
  //   ecma: 8
  // };
  // config.optimization = {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       sourceMap: false,
  //       parallel: true,
  //       cache: true,
  //       terserOptions,
  //     }),
  //   ]
  // };

  let minimizerArr = config.optimization.minimizer;
  let terserPlugins = minimizerArr
    .filter(plugin => plugin.options && plugin.options.terserOptions && plugin.options.terserOptions.ecma < 8)
    .map(plugin => ({plugin: plugin ,index: minimizerArr.indexOf(minimizerArr)}));
  terserPlugins.forEach(terserPlugin => {
    terserPlugin.plugin.options.terserOptions.ecma = 8;
    minimizerArr.splice(terserPlugin.index,
      1 ,
      new TerserPlugin(terserPlugin.plugin.options))
  });
  return config;
};

module.exports = terserOptionsWebpackConfig;
