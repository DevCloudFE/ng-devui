const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const pathAlias = require('./get-path-alias-from-tsconfig');

function getAngularCompilerTsConfigPath(config) {
  const angularCompilerPlugin = config.plugins.filter(plugin => plugin instanceof AngularCompilerPlugin).pop();
  if (angularCompilerPlugin) {
    return angularCompilerPlugin.options.tsConfigPath;
  }
  return undefined;
}
function webpackConfigSassImporterAlias(config) {
  const tsconfigPath = getAngularCompilerTsConfigPath(config) || 'tsconfig.json';
  [{
    ruleTest: /\.less$/,
    loaderName: 'less-loader'
  }].forEach(({ruleTest, loaderName}) => {
    config.module.rules.filter(rule => rule.test + '' === ruleTest + '').forEach((styleRule) => {
      if (styleRule) {
        var insertPosition = styleRule.use.findIndex(loaderUse => loaderUse.loader === loaderName
          || loaderUse.loader === require.resolve(loaderName));
        if (insertPosition > -1) {
          styleRule.use.splice(insertPosition + 1, 0, {
            loader: require.resolve('./less-alias-replacer-loader'),
            options: {
              aliasMap: pathAlias(tsconfigPath)
            }
          });
        }

      }
    });
  });
  return config;
}
module.exports = webpackConfigSassImporterAlias;
