const postcss = require('postcss');
const fs = require('fs');
const prefix = require('./postcss-plugin-prefix');

// 处理输入参数
fs.readFile('./publish/devui-layout.css', (err, content) => {
  postcss([prefix]).process(content, {from: './publish/devui-layout.css', to: './publish/devui-layout.css'})
  .then(result => {
    fs.writeFile('./publish/devui-layout.css', result.css, (err, res)=> { if (err) console.log('Error:', err);});
    return result.css;
  })
});
