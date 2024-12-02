import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DevuiSourceData } from 'ng-devui/shared/devui-codebox/devui-source-data';

import sdk from '@stackblitz/sdk';
import { getParameters } from 'codesandbox/lib/api/define';
import { VERSION } from '../../version';

import angularJSON from './files/angular.json';
import appModuleTS from './files/app.module';
import dotAngularCliJSON from './files/dot_angular-cli.json';
import environmentTS from './files/environment';
import mainTS from './files/main';
import polyfillTS from './files/polyfill';
import tsconfigJSON from './files/tsconfig.json';
import { LinkMap } from '../../../devui-commons/src/constant';

const regConfig = {
  environmentUrl: /(?<=\'|\")src\/environments\/environment(?=\'|\")/,
  selector: /(?<=selector\:.+\'|\").+(?=\'|\")/,
  componentName: /(?<=export\s+class\s+)[a-zA-Z]+/,
  templateExtension: /(?<=templateUrl\:.+)[a-z]+(?=[\'\"\`])/,
  templateUrl: /(?<=templateUrl\:.+[\'\"\`]).+(?=[\'\"\`])/,
  styleExtension: /(?<=styleUrls\:.+)[a-z]+(?=[\'\"\`])/,
  styleUrl: /(?<=styleUrls\:.+[\'\"\`]).+(?=[\'\"\`])/,
};

@Injectable({
  providedIn: 'root',
})
export class DevuiOnlineIdeService {
  document: Document;
  dependencies = {
    '@angular/animations': '^18.0.0',
    '@angular/cdk': '^18.0.0',
    '@angular/common': '^18.0.0',
    '@angular/compiler': '^18.0.0',
    '@angular/core': '^18.0.0',
    '@angular/forms': '^18.0.0',
    '@angular/platform-browser': '^18.0.0',
    '@angular/platform-browser-dynamic': '^18.0.0',
    '@angular/router': '^18.0.0',
    "@ngx-translate/core": "^15.0.0",
    "lodash-es": "^4.17.15",
    '@devui-design/icons': '^1.2.0',
    'core-js': '^3.18.3',
    'date-fns': '^2.23.0',
    'ng-devui': `^18.0.0`,
    rxjs: '~7.5.5',
    tslib: '^2.0.0',
    'zone.js': '~0.11.4',
  };

  constructor(@Inject(DOCUMENT) document: any) {
    this.document = document;
  }

  openOnStackBlitz(sourceData: DevuiSourceData[]): void {
    sdk.openProject({
      title: 'DevUI',
      description: 'Angular UI Component Library based on DevUI Design',
      tags: ['devui', 'Angular', 'ng'],
      template: 'angular-cli',
      dependencies: this.dependencies,
      files: this.getFiles(sourceData),
    });
  }

  openOnCodeSandbox(sourceData: DevuiSourceData[]): void {
    const parameters = getParameters({
      files: this.getFiles(sourceData, 'CodeSandbox'),
    });

    const form = this.document.createElement('form');
    const parametersInput = this.document.createElement('input');
    form.method = 'POST';
    form.action = LinkMap.codesandbox;
    form.target = '_blank';
    parametersInput.name = 'parameters';
    parametersInput.value = parameters;
    form.appendChild(parametersInput);
    this.document.body.append(form);
    form.submit();
    this.document.body.removeChild(form);
  }

  getFiles(sourceData: DevuiSourceData[], ide: 'StackBlitz' | 'CodeSandbox' = 'StackBlitz'): any {
    console.log(sourceData);
    const _sourceData = sourceData.map((item) => ({ ...item, code: (item.code.default || item.code) as string }));

    // #region 处理Enter文件
    let tsCode = _sourceData.splice(
      _sourceData.findIndex((item) => item.language === 'typescript'),
      1
    )[0].code;
    const enterSelector = tsCode.match(regConfig.selector)[0];
    const enterComponentName = tsCode.match(regConfig.componentName)[0];
    const files: any = {
      'tsconfig.json': `${JSON.stringify(tsconfigJSON, null, 2)}`,
      'src/main.ts': mainTS,
      'src/polyfills.ts': polyfillTS,
      'src/environments/environment.ts': environmentTS,
      'src/styles.css': String.raw`/* Add application styles & imports to this file! */
@font-face { font-family: "devui-icomoon";
src: url('~@devui-design/icons/icomoon/fonts/devui-icomoon.eot?1622620995');
src: url('~@devui-design/icons/icomoon/fonts/devui-icomoon.woff?1622620995') format('woff'),
url('~@devui-design/icons/icomoon/fonts/devui-icomoon.ttf?1622620995') format('truetype'),
url('~@devui-design/icons/icomoon/fonts/devui-icomoon.svg?1622620995#devui-icomoon') format('svg'); }
`,
    };
    if(ide === 'CodeSandbox') {
      files['sandbox.config.json'] = '{"infiniteLoopProtection" : false}';
    }
    if (/templateUrl\:/.test(tsCode)) {
      const extension = tsCode.match(regConfig.templateExtension)[0];
      tsCode = tsCode.replace(regConfig.templateUrl, `./app.component.${extension}`);
      files[`src/app/app.component.${extension}`] = _sourceData.splice(
        _sourceData.findIndex((item) => item.language === 'html' || item.language === 'xml'),
        1
      )[0].code;
    }
    if (/styleUrls\:/.test(tsCode)) {
      const extension = tsCode.match(regConfig.styleExtension)[0];
      console.log(tsCode);
      tsCode = tsCode.replace(regConfig.styleUrl, `./app.component.${extension}`);
      console.log('after', tsCode);
      files[`src/app/app.component.${extension}`] = _sourceData.splice(
        _sourceData.findIndex((item) => item.language === 'css'),
        1
      )[0].code;
    }
    // #endregion

    // #region 解析文件结构
    const importPart: Array<{ reg: RegExp; fileName: string }> = [];
    tsCode.match(/(?<=import\s+\{)[a-zA-Z,\s]+(?=\}\s+from.+\.\/)/g)?.forEach((item) => {
      importPart.push(
        ...item
          .replace(/\s+/g, '')
          .split(',')
          .map((str) => ({
            reg: new RegExp(`export.+${str}`),
            fileName: tsCode.match(new RegExp(`(?<=import[\\s\\S]+${str}[\\s\\S]+)[a-zA-Z\\-\\.]+(?=\\'|\\")`))[0],
          }))
      );
    });
    tsCode = tsCode.replace(/(?<=import[\s\S]+from.+\'|\")\..*(?=\/)/g, './shared');
    tsCode = tsCode.replace(regConfig.environmentUrl, `../environments/environment`);

    const sharedComponentName: Array<{ componentName: string; fileName: string }> = [];
    const noTsData = _sourceData.filter((item) => item.language !== 'typescript');
    _sourceData
      .filter((item) => item.language === 'typescript')
      .forEach((item) => {
        item.code = item.code.replace(regConfig.environmentUrl, `../../environments/environment`);
        if (/\@Component/.test(item.code)) {
          let fileName = this.getNameByComponent(item.code.match(regConfig.componentName)[0]);
          importPart.forEach((part) => {
            if (part.reg.test(item.code)) {
              fileName = part.fileName;
            }
          });
          if (/templateUrl\:/.test(item.code)) {
            const extension = item.code.match(regConfig.templateExtension)[0];
            item.code = item.code.replace(regConfig.templateUrl, `./${fileName}.${extension}`);
            files[`src/app/shared/${fileName}.${extension}`] = noTsData.splice(
              noTsData.findIndex((_item) => _item.language === 'html' || _item.language === 'xml'),
              1
            )[0].code;
          }
          if (/styleUrls\:/.test(item.code)) {
            const extension = item.code.match(regConfig.styleExtension)[0];
            item.code = item.code.replace(regConfig.styleUrl, `./${fileName}.${extension}`);
            files[`src/app/shared/${fileName}.${extension}`] = noTsData.splice(
              noTsData.findIndex((_item) => _item.language === 'css'),
              1
            )[0].code;
          }
          sharedComponentName.push({ componentName: item.code.match(regConfig.componentName)[0], fileName: `${fileName}` });
          files[`src/app/shared/${fileName}.ts`] = item.code;
        } else {
          importPart.forEach((part) => {
            if (part.reg.test(item.code)) {
              files[`src/app/shared/${part.fileName}.ts`] = item.code;
            }
          });
        }
      });
    files['src/app/app.module.ts'] = appModuleTS(enterComponentName, sharedComponentName);
    files['src/app/app.component.ts'] = tsCode;
    // #endregion

    if (ide === 'StackBlitz') {
      return Object.assign(files, {
        'angular.json': `${JSON.stringify(angularJSON, null, 2)}`,
        'src/index.html': `<${enterSelector}>loading</${enterSelector}>`,
      });
    } else {
      Object.keys(files).forEach((key) => {
        files[key] = {
          content: files[key],
          isBinary: false,
        };
      });
      return Object.assign(files, {
        'package.json': {
          content: JSON.stringify({ dependencies: this.dependencies }, null, 2),
          isBinary: false,
        },
        '.angular-cli.json': {
          content: dotAngularCliJSON,
          isBinary: false,
        },
        'src/index.html': {
          content: `
<!DOCTYPE html>
<html>
  <body>
    <${enterSelector}>loading</${enterSelector}>
   </body>
</html>`,
          isBinary: false,
        },
      });
    }
  }

  getNameByComponent(name: string): string {
    const res: string[] = [];
    name.split('').forEach((item, index) => {
      if (index === 0) {
        res.push(item.toLowerCase());
      } else {
        if (/[A-Z]/.test(item)) {
          res.push(name.slice(index, index + 9) === 'Component' ? '.' : '-', item.toLowerCase());
        } else {
          res.push(item);
        }
      }
    });
    return res.join('');
  }
}
