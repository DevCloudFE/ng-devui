const path = require('path');
const { createSyncFn  } = require('synckit');

function pathAlias(tsconfigPath) {
  const readConfiguration = createSyncFn(require.resolve('../worker'));
  const {baseUrl, paths} = readConfiguration(path.resolve(tsconfigPath)).options;
  if (!paths) { return []; }
  return Object.keys(paths)
    .filter(alias => alias.endsWith('/*'))
    .map(alias => (
      {alias: alias, paths:paths[alias]}
    ))
    .map(rule => ({
      aliasReg: new RegExp('^~' + rule.alias.replace(/\/\*$/,'/(.*?)')),
      pathPrefixes: rule.paths.map(pathname => path.resolve(baseUrl || '' , pathname.replace(/\*$/,'')))
    }));
}

module.exports = function getTsconfigPathAlias(tsconfigPath = 'tsconfig.base.json') {
  try {
    const rules = pathAlias(tsconfigPath);
    // 匹配的情况下给出文件
    return function importer(url, prev, done) {
      if (!rules || rules.length === 0) {
        return null;
      }
      for (let rule of rules) {
        if (rule.aliasReg.test(url)) {
          // 暂时只支持第一个alias地址，其他的忽略
          const prefix = rule.pathPrefixes[0];
          const filename = path.resolve(prefix, url.replace(rule.aliasReg, (item, match) => match));
          return { file: filename};
        }
      }
      return null; // 没有匹配的返回null，以继续使用下一个importer
    };
  } catch (error) {
    console.warn('Sass alias importer might not effected', error);
    return function importer(url, prev, done) {
      return null;
    }
  }
}
