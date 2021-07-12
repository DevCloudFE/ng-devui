const path = require('path');
const ts = require('typescript');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularWebpackPlugin;
const readConfiguration = require('@angular/compiler-cli').readConfiguration;
const ES6_ONLY_THIRD_PARTY_LIST = require('./es6-only-third-party-list');

function getAngularCompilerTsConfigPath(config) {
  const angularCompilerPlugin = config.plugins.filter(plugin => plugin instanceof AngularCompilerPlugin).pop();
  if (angularCompilerPlugin) {
    return angularCompilerPlugin.pluginOptions.tsconfig;
  }
  return undefined;
}
function getTsconfigCompileTarget(tsconfigPath) {
  const {target} = readConfiguration(path.resolve(tsconfigPath)).options;
  return target;
}

function webpackConfigAddBabel2ES5(config, list = []) {
  const tsconfigPath = getAngularCompilerTsConfigPath(config) || 'tsconfig.json';
  const target = getTsconfigCompileTarget(tsconfigPath);
  if (target === ts.ScriptTarget.ES5) {
    config.module.rules.push({
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [
        ...ES6_ONLY_THIRD_PARTY_LIST,
        ...list
      ]
    });
  }
  return config;
};
module.exports = webpackConfigAddBabel2ES5;

/**
 * 如果三方库只提供es6版本， 则添加到ES6_ONLY_THIRD_PARTY_LIST， 通过babel转换语法到es5
 * 仅对target为es5的时候启用（比如npm start状态）
 * 差分打包会自动解决，不需要解决
 */
