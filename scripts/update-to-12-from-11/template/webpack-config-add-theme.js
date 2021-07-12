function webpackConfigAddThemeSupportForIE(config) {
    [{
        ruleTest: /\.(?:sass)$/i,
        loaderName: 'sass-loader'
    },
    {
        ruleTest: /\.(?:scss)$/i,
        loaderName: 'sass-loader'
    },
    {
        ruleTest: /\.(?:less)$/i,
        loaderName: 'less-loader'
    }].forEach(({ ruleTest, loaderName }) => {
        config.module.rules.filter(rule => rule.test + '' === ruleTest + '').forEach((styleRule) => {
            if (styleRule) {
                var insertPosition = styleRule.rules[1].use.findIndex(loaderUse => loaderUse.loader === loaderName
                    || loaderUse.loader === require.resolve(loaderName));
                if (insertPosition > -1) {
                    styleRule.rules[1].use.splice(insertPosition, 0, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: styleRule.rules[1].use[insertPosition].options.sourceMap,
                            postcssOptions: {
                                plugins: [
                                    require('./add-origin-varvalue'),
                                ]
                            }

                        }
                    });
                }
            }
        });
    });
    return config;
};
module.exports = webpackConfigAddThemeSupportForIE;
