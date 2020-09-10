const path = require('path');
function webpackConfigCustomTheme(config, themeData, libOnly = false, removeVar = false ) {
  config.module.rules.push({
    test: /.*js$/,
    use: [
      {
        loader: require.resolve('./custom-theme-webpack-loader'),
        options: {
          theme: themeData,
          loaderType: 'ng-lib-js',
          handleFallBack: removeVar? 'only' : true
        }
      }
    ],
    enforce: 'pre',
    include: [
      path.resolve('./node_modules/ng-devui')
    ]
  });
  if (!libOnly) {
    [{
      ruleTest: /\.scss$|\.sass$/,
      loaderName: 'sass-loader'
    }, {
      ruleTest: /\.less$/,
      loaderName: 'less-loader'
    }].forEach(({ruleTest, loaderName}) => {
      config.module.rules.filter(rule => rule.test+'' === ruleTest+'').forEach((styleRule) => {
        if (styleRule) {
          var insertPosition = styleRule.use.findIndex(loaderUse => loaderUse.loader === loaderName
            || loaderUse.loader === require.resolve(loaderName));
          if (insertPosition > -1) {
            styleRule.use.splice(insertPosition, 0, {
              loader: require.resolve('./custom-theme-webpack-loader'),
              options: {
                theme: themeData,
                loaderType: 'css',
                handleFallBack: removeVar? 'only' : 'replace'
              }
            });
          }
        }
      });
    });
  }
  return config;
}
module.exports = webpackConfigCustomTheme;

/** usage：
 *  用在webpack-config-add-theme之后，也就是sass和less处理的样式编译完成css后执行该替换再执行origin降级插值效率最高
 *
 * ```
  config = addOriginVarConfig(config);
  config = webpackConfigCustomTheme(config, require(./my-theme.json));
 ```*
 */
