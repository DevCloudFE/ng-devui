const fs = require('fs').promises;
const path = require('path');

async function readFile(files, dir = '') {
  return Promise.all(files.map(async (file) => {
    return await fs.readFile(`${path.resolve(dir + file)}`, 'utf8');
  })).catch(e => console.error(e));
}

async function task() {
  const dir = 'devui/style/theme/';
  const content = (await readFile([
    '_basic.scss',
    '_color.scss',
    '_font.scss',
    '_shadow.scss',
    '_corner.scss',
    '_animation.scss',
    '_z-index.scss',
    '_export-var.scss'
  ], dir)).join('\n');
  const targetDir = "publish/styles-var/";
  const contentWithoutImport = content.replace(/@import[ 'a-z;./]*/ig, '')
  await fs.writeFile(targetDir + 'devui-var.scss', contentWithoutImport, 'utf8');
  await fs.writeFile(targetDir + 'devui-var.less', contentWithoutImport.replace(/\$/g, '@'), 'utf8');
}

module.exports = function runTask() {
  task().then(() => {
    console.log('StyleSheet variable file(s) generated.');
  });
};
