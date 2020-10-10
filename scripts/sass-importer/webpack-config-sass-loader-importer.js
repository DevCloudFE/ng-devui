const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const getTsConfigAlias = require('./get-tsconfig-alias');

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
    ruleTest: /\.scss$|\.sass$/,
    loaderName: 'sass-loader'
  }].forEach(({ruleTest, loaderName}) => {
    config.module.rules.filter(rule => rule.test + '' === ruleTest + '').forEach((styleRule) => {
      if (styleRule) {
        var insertPosition = styleRule.use.findIndex(loaderUse => loaderUse.loader === loaderName
          || loaderUse.loader === require.resolve(loaderName));
        if (insertPosition > -1) {
          styleRule.use[insertPosition].options.sassOptions.importer = [
            getTsConfigAlias(tsconfigPath)
          ];
        }

      }
    });
  });
  return config;
}
module.exports = webpackConfigSassImporterAlias;
