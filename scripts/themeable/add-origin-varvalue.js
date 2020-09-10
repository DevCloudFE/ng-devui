
var postcss = require('postcss');

var varStringJoinSperator = 'devui-(?:.*?)|' + 'hwc-(?:.*?)';
var cssVarReg = new RegExp('var\\(\\-\\-(?:' + varStringJoinSperator + '),(.*?)\\)', 'g'); // 要用\\表示\

module.exports = postcss.plugin('postcss-plugin-add-origin-varvalue', () => {
  return (root) => {
    root.walkDecls(decl => {
      if (decl.type !== 'comment' && decl.value && decl.value.match(cssVarReg)) {
        decl.cloneBefore({value: decl.value.replace(cssVarReg, (match, item) => item) });
      }
    });
  }
});


/**
 * postcss插件
 *
 * webpack使用方法：
 * 依赖postcss-loader
 ```
 {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => {
            return [
              require('ng-devui/styles-var/add-origin-varvalue'),
            ];
          }
        }
      },
      'less-loader',
    ],
  },
 ```
 *
 *
 * =========================================
 *
 * gulp使用方法：
 * 依赖gulp-postcss
 ```
   const postcss = require('gulp-postcss');
   gulp.src('./src/*.css')
   .pipe(postcss([
     require('./add-origin-varvalue')
   ]))
   .pipe(gulp.dest('./dest'));

 ```
 *
 * =========================================
 *
 * node原生使用方法（嵌入其他插件的时候），流式：
 * 依赖
 ```
  import * as postcss from 'postcss/lib/postcss';
  import * as addOriginVar from 'ng-devui/styles-var/add-origin-varvalue';
  postcss([addOriginVar]).process(content, {
    from: path
  })
  .then(output => {
    return output.css;
  })
 ```
 *
 *
 * */

