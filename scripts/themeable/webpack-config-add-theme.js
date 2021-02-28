function webpackConfigAddThemeSupportForIE(config) {
    [{
        ruleTest: /\.scss$|\.sass$/,
        loaderName: 'sass-loader'
    }, {
        ruleTest: /\.less$/,
        loaderName: 'less-loader'
    }].forEach(({ ruleTest, loaderName }) => {
        config.module.rules.filter(rule => rule.test + '' === ruleTest + '').forEach((styleRule) => {
            if (styleRule) {
                var insertPosition = styleRule.use.findIndex(loaderUse => loaderUse.loader === loaderName
                    || loaderUse.loader === require.resolve(loaderName));
                if (insertPosition > -1) {
                    styleRule.use.splice(insertPosition, 0, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: styleRule.use[insertPosition].options.sourceMap,
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
