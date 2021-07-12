const shelljs = require('shelljs');
const JsonHandle = require('./utils/json-handle');
const fs = require('fs');
const path = require('path');

// shelljs.echo(`rm 'patches/ng-packagr+11.2.4.patch'`);
// shelljs.rm('patches/ng-packagr+11.2.4.patch');
// shelljs.echo(`cp 'scripts/update-to-12-from-11/template/ng-packagr+12.1.0.patch''patches'`);
// shelljs.cp('scripts/update-to-12-from-11/template/ng-packagr+12.1.0.patch', 'patches');


// shelljs.echo(`ng update @angular/cli@^12 @angular/core@^12 --force --allow-dirty`);
// if (shelljs.exec(`ng update @angular/cli@^12 @angular/core@^12 --force --allow-dirty`).code !== 0) {
//     shelljs.echo('npm update failed');
//     shelljs.exit(1);
// } else {
//     shelljs.echo(`ng update successfully`);
// }

// shelljs.echo(`ng update @angular/cdk@^12 --force --allow-dirty`);
// if (shelljs.exec(`ng update @angular/cdk@^12 --force --allow-dirty`).code !== 0) {
//     shelljs.echo('npm update failed');
//     shelljs.exit(1);
// } else {
//     shelljs.echo(`ng update successfully`);
// }

// shelljs.echo(`npm install ng-packagr@12.0.0`);
// if (shelljs.exec(`npm install ng-packagr@12.0.0`).code !== 0) {
//     shelljs.echo('npm install failed');
//     shelljs.exit(1);
// } else {
//     shelljs.echo(`npm install successfully`);
// }
shelljs.echo(`npm run postinstall`);
if (shelljs.exec(`npm run postinstall`).code !== 0) {
    shelljs.echo('npm install failed');
    shelljs.exit(1);
} else {
    shelljs.echo(`npm install successfully`);
}

shelljs.echo(`npm install @angular-builders/custom-webpack@^12.0.0 --allow-dirty`);
if (shelljs.exec(`npm install @angular-builders/custom-webpack@^12.0.0 --allow-dirty`).code !== 0) {
    shelljs.echo('@angular-builders/custom-webpack install failed');
    shelljs.exit(1);
} else {
    shelljs.echo(`@angular-builders/custom-webpack install success`);
}

shelljs.echo('update devui/package.json')
new JsonHandle('devui/package.json', function (obj) {
    obj.version = obj.version.replace(/^11(.*)/, '12$1')
    Object.assign(obj.dependencies, {
        "@angular/cdk": "^12.0.0"
    });
    Object.assign(obj.peerDependencies, {
        "@angular/animations": "^12.0.0",
        "@angular/common": "^12.0.0",
        "@angular/core": "^12.0.0",
        "@angular/forms": "^12.0.0"
    });
    return obj;
}).processContent();

shelljs.echo('modify scripts for the change of webpack@^5.0.0')
fs.writeFileSync(path.resolve('scripts/es2015-to-es5-babel-loader/babel-loader-wepack-config.js'), fs.readFileSync(path.resolve('scripts/update-to-12-from-11/template/babel-loader-wepack-config.js')));
fs.writeFileSync(path.resolve('scripts/themeable/webpack-config-add-theme.js'), fs.readFileSync(path.resolve('scripts/update-to-12-from-11/template/webpack-config-add-theme.js')));
fs.writeFileSync(path.resolve('scripts/less-importer/webpack-config-less-loader-importer.js'), fs.readFileSync(path.resolve('scripts/update-to-12-from-11/template/webpack-config-less-loader-importer.js')));
fs.writeFileSync(path.resolve('scripts/sass-importer/webpack-config-sass-loader-importer.js'), fs.readFileSync(path.resolve('scripts/update-to-12-from-11/template/webpack-config-sass-loader-importer.js')));
