# 快速开始
引导您如何在项目中使用DevUI

### 1. 创建一个项目

推荐使用`@angular/cli`创建你的项目

```bash
$ ng new New-Project
```

### 2. 安装
进入你的项目文件夹，使用npm安装DevUI
```bash
$ npm i ng-devui
```

### 3. 引入模块

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
    // 引入公共service
    DevUIModule.forRoot()
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }

```

### 4. 引入样式

在 `angular.json` 文件中引入devui样式：

```json
{
  "styles": [
    ...
    "node_modules/ng-devui/devui.min.css"
  ]
}
```

### 5. 启动开发调试
```bash
$ ng serve --open
```
