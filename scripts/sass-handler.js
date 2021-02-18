const path = require('path');
const fs = require('fs')
var sass = require('sass');
const args = process.argv.slice(2);
var result = sass.renderSync({
  file: args[0],
  outputStyle: "expanded",
  precision: 6,
  importer: [function importer(url, prev, done) {
    if (url[0] === '~') {
      url = path.resolve('node_modules', url.substr(1));
    }

    return { file: url };
  }]
});

const writeFileRecursive = function(path, buffer, callback){
  let lastPath = path.substring(0, path.lastIndexOf("/"));
  fs.mkdir(lastPath, {recursive: true}, (err) => {
      if (err) return callback(err);
      fs.writeFile(path, buffer, function(err){
          if (err) return callback(err);
          return callback(null);
      });
  });
}

writeFileRecursive(args[1], result.css, (err) => {
  if (err) {
    console.log(err)
  }
})