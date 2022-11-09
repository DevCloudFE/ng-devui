const postcss = require('postcss');
const fs = require('fs');
const addOriginVar = require('./themeable/add-origin-varvalue');

// 处理输入参数
fs.readFile('./publish/devui.css', (err, content) => {
  postcss([addOriginVar]).process(content, {from: './publish/devui.css', to: './publish/devui.css'})
  .then(result => {
    fs.writeFile('./publish/devui.css', result.css, (err, res)=> { if (err) console.log('Error:', err);});
    return result.css;
  })
});

fs.readFile('./publish/theme-collection/extend-theme.css', (err, content) => {
  postcss([addOriginVar]).process(content, {from: './publish/theme-collection/extend-theme.css', to: './publish/theme-collection/extend-theme.css'})
  .then(result => {
    fs.writeFile('./publish/theme-collection/extend-theme.css', result.css, (err, res)=> { if (err) console.log('Error:', err);});
    return result.css;
  })
});