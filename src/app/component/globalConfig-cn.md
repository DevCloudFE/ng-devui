# 全局配置项

## 如何使用

支持全局设置 showAnimation（是否展示动画效果），减少重复代码，不管组件库给任何默认设置，但是你可以自己定一个默认值。

## 开始使用

Angular CLI 工程，可以在 src\app\app.module.ts 引入 DevUI_global_config 对象作为全局设置默认值的对象，这个对象的类型是 DevUIGlobalConfig ;

```typescript
// app.module.ts
import { DevUIGlobalConfigToken, DevUI_global_config } from 'ng-devui/utils/globalConfig';
  providers: [
    {
      provide: DevUIGlobalConfigToken,
      useValue: DevUI_global_config
    }
  ],
```

DevUI_global_config 的对象定义如下：

```typescript
// 举个例子
export const DevUI_global_config: DevUIGlobalConfig = {
  global: {
    showAnimation: false,
  }
};
```

global 内设定的 showAnimation 为 false 会关闭所有组件的动效，等于批量改变了组件库内所有是showAnimation的参数的值为 false 。

## 调用this.devConfigService.set函数变更全局配置项

```typescript
import { DevConfigService } from 'ng-devui/utils/globalConfig';

  constructor(private devConfigService: DevConfigService) {}
  // 比如在ngOnInit里调用 将会修改整个的全局配置。
  ngOnInit() {
    this.devConfigService.set('global', {
      'showAnimation': false
    })
  }

```
