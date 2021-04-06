const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');
const postcss = require('postcss');

const loaderName = 'devui-custom-theme-loader';

const optionsSchema = {
  type: 'object',
  properties: {
    loaderType: {
      anyOf: [{
        enum: ['other', 'ng-lib-js', 'css', 'custom']
      }]
    },
    theme: {
      anyOf: [
        {
          instanceof: 'Object'
        },
        {
          type: 'string'
        }
      ]
    },
    themeType: {
      anyOf: [
        {
          enum: ['json', 'string']
        }
      ]
    },
    handleFallBack: {
      anyOf: [
        {
          type: 'boolean'
        },
        {
          enum: [
            'enforce', // equal true, if no fallback, insert one
            'replace', // if fallback exist, process it, otherwise, do nothing
            'nothing', // equal false, handle var default value only
            'remove', // remove fallback only exist, better work with handleVarValue = 'replace-var-expression'
            'only' // remove var expression
          ]
        }
      ]
    }
  },
  additionalProperties: false
}

const defaultOptions = {
  loaderType: 'other',
  theme: {},
  themeType: 'json',
  handleFallBack: true
}

function getOptionsFromConfig(config) {
  const rawOptions = getOptions(config)
  if (rawOptions) {
    validateOptions(optionsSchema, rawOptions, loaderName);
  }
  return Object.assign({}, defaultOptions, rawOptions);
}
/**
 * 定位ng-packagr打包出来的库代码component装饰器元数据描述的styles位置
 *
 * @param {*} source 文件内容
 * @returns 含有css的片段
 */
function locateNgComponentDecoratorStyleString(source) {
  // TODO: 正则待进一步优化， 部分会过渡扫描跨多行
  const reg = /(?<=\{\s*?type\:\s*?(?:core\.)?Component,\s*?args\:\s*?\[(?:\s|\S)*?\n\s*?styles\:\s*?)\[\"(?:.)*?\"\],?\n/g;
  const regNg9 = /(?<=__decorate\(\[\s*?(?:core\.)?Component\(\{(?:\s|\S)*?\n\s*?styles\:\s*?)\[\"(?:.)*?\"\],?\n/g;
  return (source.match(reg) || []).concat(source.match(regNg9) || []);
}

/**
 * 获取主题数据
 * @param {*} fileContent 文件内容
 * @param {*} fileType json | string
 */
function getThemeDefinition(fileContent, fileType) {
  if (fileType === 'string') {
    return JSON.parse(fileContent);
  } else {
    return fileContent;
  }
}
/**
 *
 * @param {*} css css文本内容
 * @param {*} reg 匹配的正则
 * @param {*} replaceFn 正则的替换函数
 * @param {*} fallBackHandler 处理回落的正则和替换函数
 * @param {} fallbackStrategy 策略
 */
function cssReplaceVarValue(css, reg, replaceFn, fallBackHandler = null, fallbackStrategy = 'enforce') {
  const replaceOriginValue = (reg,replaceFn,fallBackHandler,fallbackStrategy) => {
    return {
      postcssPlugin: 'postcss-plugin-replace-var-value',
      Once(root, { result }) {
        root.walkDecls(decl => {
          if (decl.type !== 'comment' && decl.value && decl.value.match(reg)) {
            var newDecl = decl.clone({ value: decl.value.replace(reg, replaceFn) });
            decl.replaceWith(newDecl);
            if (fallBackHandler) {
              var declPrev = newDecl.prev();
              var regFallback = fallBackHandler.reg;
              var replaceFnFallBack = fallBackHandler.replaceFn;
              if (declPrev && declPrev.type !== 'comment' && declPrev.value
                && declPrev.toString() === decl.clone({ value: decl.value.replace(regFallback, replaceFnFallBack) }).toString()) {
                if ('remove' === fallbackStrategy) {
                  declPrev.remove();
                } else {
                  declPrev.replaceWith(newDecl.clone({ value: newDecl.value.replace(regFallback, replaceFnFallBack) }));
                  if ('only' === fallbackStrategy) {
                    newDecl.remove();
                  }
                }

              } else {
                if ('enforce' === fallbackStrategy || true === fallbackStrategy || 'only' === fallbackStrategy) {
                  newDecl.cloneBefore({ value: newDecl.value.replace(regFallback, replaceFnFallBack) });
                  if ('only' === fallbackStrategy) {
                    newDecl.remove();
                  }
                }
              }
            }
          }
        });
      }
    }
  }
  return postcss([replaceOriginValue(reg,replaceFn,fallBackHandler,fallbackStrategy)]).process(css).css;
}

function process(source, map) {
  this.cacheable && this.cacheable();

  // 获取配置文件里的主题数据
  const option = getOptionsFromConfig(this);
  const themeData = getThemeDefinition(option.theme, option.themeType);
  let newSource = source;
  if (Object.keys(themeData).length > 0) {
    const themeDataVar = Object.keys(themeData).join('|');
    const reg = new RegExp(String.raw`(?<=var\(\-\-(${themeDataVar}),)(?:.*?)(?=\))`, 'g');
    const replaceFn = (match, varName, value) => themeData[varName];
    const fallbackReg = new RegExp(String.raw`var\(\-\-(?:${themeDataVar}),(.*?)\)`, 'g');
    const fallbackFn = (match, item) => item;
    const fallbackHandler = option.handleFallBack && option.handleFallBack !== 'nothing'
      ? { reg: fallbackReg, replaceFn: fallbackFn }
      : null;

    // 处理针对文件类型定位处理的位置
    switch (option.loaderType) {
      case 'ng-lib-js':
        const styleGroup = locateNgComponentDecoratorStyleString(source);
        if (styleGroup) {
          styleGroup.map(content => ({
            content,
            newContent: JSON.stringify(
              JSON.parse(content).map(partCss => cssReplaceVarValue(partCss, reg, replaceFn, fallbackHandler, option.handleFallBack))
            )
          })).forEach(({ content, newContent }) => {
            newSource = newSource.replace(content, newContent)
          });
        }
        break;
      case 'css':
        newSource = cssReplaceVarValue(source, reg, replaceFn, fallbackHandler, option.handleFallBack);
        break;
      case 'other': // 不管源码内容直接替换, 暂不支持降级方案的处理
      default:
        newSource = source.replace(reg, replaceFn);
    }

  }

}
// 返回结果
this.callback(null, newSource, map);
return newSource;
}
exports.default = process;
