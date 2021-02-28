const shell = require('shelljs');
const fs = require('fs')
const path = require('path')
const artifacts = ['README.md', 'LICENSE']
const runTask = require('./themeable/utils/generate-styles-var') ;

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

shell.mkdir('publish/styles-var');
shell.cp('devui/styles-var/*.less', 'publish/styles-var/');
shell.cp('devui/styles-var/*.scss', 'publish/styles-var/');
runTask();

shell.cp('scripts/themeable/*.js', 'publish/styles-var/');
console.log('Copied : styles-var')
