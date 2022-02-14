function webPackConfigAddLayoutPrefix(config) {
  [
    {
      ruleTest: /\.(?:sass)$/i,
      loaderName: 'sass-loader',
    },
    {
      ruleTest: /\.(?:scss)$/i,
      loaderName: 'sass-loader',
    },
  ].forEach(({ ruleTest, loaderName }) => {
    config.module.rules
      .filter((rule) => rule.test + '' === ruleTest + '')
      .forEach((styleRule) => {
        if (styleRule) {
          var insertPosition = styleRule.rules[1].use.findIndex(
            (loaderUse) => loaderUse.loader === loaderName || loaderUse.loader === require.resolve(loaderName)
          );
          if (insertPosition > -1) {
            styleRule.rules[1].use.splice(insertPosition, 0, {
              loader: 'postcss-loader',
              options: {
                sourceMap: styleRule.rules[1].use[insertPosition].options.sourceMap,
                postcssOptions: (opts) => {
                  if (opts.resourcePath.indexOf('devui-layout.scss') !== -1) {
                    return {
                      plugins: [require('./postcss-plugin-prefix')],
                    };
                  }

                  return {
                    plugins: [],
                  };
                },
              },
            });
          }
        }
      });
  });
  return config;
}
module.exports = webPackConfigAddLayoutPrefix;
