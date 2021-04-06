module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-plugin-prefix',
    Once(root, { result }) {
      root.walkRules(rule => {
        if (rule.selector) {
          rule.replaceWith(rule.clone({ selector: rule.selector.replace(/\./g, '.dl-') }));
        }
      });
    
    }
  }
}
module.exports.postcss = true