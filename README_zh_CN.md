<p align="center"><a href="https://devui.design/home" target="_blank" rel="noopener noreferrer"><img alt="DevUI Logo" src="logo.svg?sanitize=true" width="180" style="max-width:100%;">
</p>
<p align="center">
  <a href="https://github.com/DevCloudFE/ng-devui"><img src="https://img.shields.io/github/stars/DevCloudFE/ng-devui.svg?label=github%20stars" alt="Github Star"></a>
  <a href="https://angular.io/"><img src="https://img.shields.io/badge/%3C%2F%3E-Angular-blue"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/ng-devui.svg" alt="License"></a>
</br>
  <a href="README.md"><img src="https://img.shields.io/badge/document-English-blue" alt="Document"></a>
  <a href="README_zh_CN.md"><img src="https://img.shields.io/badge/%E6%96%87%E6%A1%A3-%E4%B8%AD%E6%96%87-blue" alt="Document"></a>
  <a href="https://www.npmjs.com/package/ng-devui"><img src="https://img.shields.io/npm/v/ng-devui" alt="Npm"></a>
  <a href="https://gitter.im/devui-design/devui-design"><img src="https://img.shields.io/gitter/room/devui-design/devui-design" alt="Chat"></a>
</p>

<h1 align="center">DevUI for Angular</h1>
DevUI Design设计系统包含了DevUI规则、设计语言和最佳实践的资源组合。DevUI Design可以让开发人员更加专注于应用逻辑的思考，而设计人员专注于用户体验、交互和流程

## 设计特点

* 企业级组件，提供配套设计规范、字体图标库
* 开箱即用

了解更多请访问官方网站 [devui.design](https://devui.design/home)

## Angular版本

当前支持的angular版本<font color=red>`^18.0.0`</font>

## 快速开始

1. 创建一个项目

推荐使用`@angular/cli`创建你的项目

```bash
ng new New-Project
```

2. 安装:

```bash
$ cd New-Project
$ npm i ng-devui
# 可选，字体图标库
# $ npm i @devui-design/icons
```

3. 引入模块:

```typescript
import { BrowserModule } from '@angular/platform-browser';
// DevUI部分组件依赖angular动画，需要引入animations模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DevUIModule } from 'ng-devui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
```

4. 在 <font color=red>`angular.json`</font> 文件夹中引入样式:

```json
{
  "styles": [
    ...
    "node_modules/ng-devui/devui.min.css"
  ]
}
```

5. 启动开发测试

```bash
ng serve --open
```

## 贡献

欢迎贡献您的代码或者讨论您的好点子！

在提出pull request之前，请确保您阅读了我们的[贡献指南](./CONTRIBUTING_zh_CN.md)

感谢所有帮助我们构建DevUI的贡献者

## 支持

支持IE11以上及其他浏览器

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 合作项目

- [H5-Dooring - 让H5制作，更简单](http://h5.dooring.cn/)

## 谁在使用

<p><a href="https://www.huaweicloud.com/devcloud/" target="_blank" rel="noopener noreferrer"><img alt="CodeArts Logo" src="CodeArts-logo.png" width="150" style="max-width:100%;"></a></p>

## LICENSE

[**MIT**](https://opensource.org/licenses/MIT)
