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
The DevUI Design Design system contains a combination of DevUI rules, Design languages, and best practices. DevUI Design allows developers to focus more on application logic, while designers focus on user experience, interactions, and processes.

## Features

* **Enterprise components, supporting design specifications, font icon library**
* **Out of the box**

To see more in [devui.design](https://devui.design/home).

## Angular Support

Now supports Angular <font color=red>`^18.0.0`</font>

## Getting Started

1. Create a new project

``` bash
ng new New-Project
```

2. Installation:

```bash
$ cd New-Project
$ npm i ng-devui
# font icon library
# $ npm i @devui-design/icons
```

3. Usage:

```typescript
import { BrowserModule } from '@angular/platform-browser';
// need for animations
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

4. Import devui style into <font color=red>`angular.json`</font> file:

```json
{
  "styles": [
    ...
    "node_modules/ng-devui/devui.min.css"
  ]
}
```

5. Debugging

```bash
ng serve --open
```

## Contribution

Please feel free to contribute code or discuss your idea!

Please make sure you read the [contributing](./CONTRIBUTING.md) guide before making a pull request.

We appreciate all contributors who helped us build DevUI.

## Support

Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Partner project

- [H5-Dooring - 让H5制作，更简单](http://h5.dooring.cn/)

## Who use it

<p><a href="https://www.huaweicloud.com/devcloud/" target="_blank" rel="noopener noreferrer"><img alt="CodeArts Logo" src="CodeArts-logo.png" width="150" style="max-width:100%;"></a></p>

## LICENSE

[**MIT**](https://opensource.org/licenses/MIT)
