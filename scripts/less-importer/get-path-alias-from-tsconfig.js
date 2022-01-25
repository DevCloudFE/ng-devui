const path = require('path');
const { createSyncFn  } = require('synckit');
module.exports = function pathAlias(tsconfigPath) {
  const readConfiguration = createSyncFn(require.resolve('../worker'));
  const { baseUrl, paths } = readConfiguration(path.resolve(tsconfigPath)).options;
  if (!paths) { return []; }
  return Object.keys(paths)
    .filter(alias => alias.endsWith('/*'))
    .map(alias => (
      { alias: alias, paths: paths[alias] }
    ))
    .map(rule => ({
      aliasReg: new RegExp('^~' + rule.alias.replace(/\/\*$/, '/(.*?)')),
      pathPrefixes: rule.paths.map(pathname => path.resolve(baseUrl || '', pathname.replace(/\*$/, '')))
    }));
}
