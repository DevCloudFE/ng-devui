const path = require('path');
const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');
const postcss = require('postcss');
const postcssLessSyntax = require('postcss-less');

const loaderName = 'less-path-alias-replacer-loader';
const trailingSlashAndContent = /[/\\][^/\\]*?$/;
const optionsSchema = {
  type: 'object',
  properties: {
    aliasMap: {
      anyOf: [{
        instanceof: 'Array'
      }, {
        enum: [
          null
        ]
      }]
    },
  },
  additionalProperties: false
}

const defaultOptions = {
}

function getOptionsFromConfig(config) {
  const rawOptions = getOptions(config)
  if (rawOptions) {
    validateOptions(optionsSchema, rawOptions, loaderName);
  }
  return Object.assign({}, defaultOptions, rawOptions);
}

/**
 *
 * @param {*} css less文本内容
 * @param {*} aliasMap 别名规则集合
 */
function lessReplacePathAlias(css, aliasMap, sourcePath) {
  const replacePathAlias = postcss.plugin('postcss-plugin-replace-path-alias', () => {
    return (root) => {
      root.walkAtRules(atRule => {
        if (atRule.import && atRule.filename) {
          const oFilename = atRule.filename.substring(1, atRule.filename.length - 1); // 去掉头尾单引号双引号 // TODO: 待改为正则
          const rule = aliasMap.filter(rule => rule.aliasReg.test(oFilename)).pop();
          if (rule) {
            const prefix = rule.pathPrefixes[0];
            const filename = path.resolve(prefix, oFilename.replace(rule.aliasReg, (item, match) => match));
            const relativePath = path.relative(sourcePath.replace(trailingSlashAndContent, ""), filename).split(path.sep).join('/');
            var realPathAtRule = atRule.clone({ params: (atRule.options || '' )  + " '" + relativePath + "'", filename: "'" + relativePath + "'"});
            atRule.replaceWith(realPathAtRule);
          }
        }
      });
    }
  });
  return postcss([replacePathAlias]).process(css, { syntax: postcssLessSyntax }).css;
}

function process(source, map) {
  this.cacheable && this.cacheable();

  // 获取配置文件里的主题数据
  const aliasMap = getOptionsFromConfig(this).aliasMap;
  let newSource = source;
  if (aliasMap.length > 0) {
    newSource = lessReplacePathAlias(source, aliasMap, this.resourcePath);
  }
  // 返回结果
  this.callback(null, newSource, map);
  return newSource;
}

exports.default = process;