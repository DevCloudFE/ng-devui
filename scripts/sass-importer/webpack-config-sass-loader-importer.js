const AngularCompilerPlugin = require('@ngtools/webpack').AngularWebpackPlugin;
const getTsConfigAlias = require('./get-tsconfig-alias');

function getAngularCompilerTsConfigPath(config) {
  const angularCompilerPlugin = config.plugins.filter(plugin => plugin instanceof AngularCompilerPlugin).pop();
  if (angularCompilerPlugin) {
    return angularCompilerPlugin.pluginOptions.tsconfig;
  }
  return undefined;
}
function webpackConfigSassImporterAlias(config) {
  const tsconfigPath = getAngularCompilerTsConfigPath(config) || 'tsconfig.json';
  [{
    ruleTest: /\.(?:sass)$/i,
    loaderName: 'sass-loader'
  },
  {
    ruleTest: /\.(?:scss)$/i,
    loaderName: 'sass-loader'
  }].forEach(({ruleTest, loaderName}) => {
    config.module.rules.filter(rule => rule.test + '' === ruleTest + '').forEach((styleRule) => {
      if (styleRule) {
        var insertPosition = styleRule.rules[1].use.findIndex(loaderUse => loaderUse.loader === loaderName
          || loaderUse.loader === require.resolve(loaderName));
        if (insertPosition > -1) {
          styleRule.rules[1].use[insertPosition].options = {
            sourceMap: true,
            api: 'legacy',
            sassOptions: {
              importer: [
                getTsConfigAlias(tsconfigPath)
              ],
              precision: 8,
              outputStyle: 'expanded',
            },
          };
        }

      }
    });
  });
  return config;
}
module.exports = webpackConfigSassImporterAlias;
