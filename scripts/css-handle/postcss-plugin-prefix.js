const postcss = require('postcss/lib/postcss');
module.exports = postcss.plugin('postcss-plugin-prefix', (opts) => {
  return (root) => {
    root.walkRules(rule => {
      if (rule.selector) {
        rule.replaceWith(rule.clone({selector: rule.selector.replace(/\./g, '.dl-')}));
      }
    });
  }
});
