<div align="center">
  <img alt="DevUI Logo" src="logo.svg" width="180" style="max-width:100%;">
</div>

<h1 align="center">DevUI for Angular</h1>

## Features
* 企业级组件，提供配套设计规范、字体图标库
* 开箱即用

## Angular Support
Now supports Angular `^7.0.0`

## Getting Started

1. Installation:

```bash
 # install
 npm i ng-devui
```
2. Usage:

```typescript
import { BrowserModule } from '@angular/platform-browser';
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

在 `angular.json` 文件中引入devui样式：

```json
{
  "styles": [
    ...
    "node_modules/ng-devui/devui.min.css"
  ]
}
```

## Contribution

Read up on our guidelines for [contributing](./CONTRIBUTING.md).

## Support
Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## LICENSE
**MIT**
