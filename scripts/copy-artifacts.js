const fs = require('fs')
const path = require('path')
const shell = require('shelljs');
const runTask = require('./themeable/utils/generate-styles-var');
const artifacts = ['README.md', 'LICENSE']
artifacts.forEach(file => {
  let fromPath = path.resolve(__dirname, '..', '', file)
  let destPath = path.resolve(__dirname, '..', 'publish/', file)
  fs.readFile(fromPath, 'utf-8', (err, data) => {
    if (err) {
      console.log('An error occured:', err)
      return
    }
    fs.writeFile(destPath, data, (err) => {
      if (err) {
        console.log('An error occured:', err)
        return
      }
      console.log(`Copied ${file}:`)
    })
  })
})

// 复制主题化相关文件
shell.mkdir('publish/styles-var');
runTask();
shell.cp('scripts/themeable/*.js', 'publish/styles-var/');
shell.cp('scripts/themeable/*.json', 'publish/styles-var/');
console.log('Copied : styles-var')
