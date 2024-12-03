# 全局配置项

## 如何使用

通过全局配置项功能定义组件的默认行为，可以减少重复的参数设置

## 使用方法一

在根注入器中根据注入令牌 DevUIGlobalConfigToken 提供一个符合 `DevUIGlobalConfig` 接口的对象。例如：

```typescript
// src/app/app.module.ts
import { DevUIGlobalConfig, DevUIGlobalConfigToken } from 'ng-devui/utils';
const custom_global_config: DevUIGlobalConfig = {
  global: {
    showAnimation: false,
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: DevUIGlobalConfigToken,
      useValue: custom_global_config
    }
  ],
  bootstrap: [AppComponent]
})
```

## 使用方法二

动态变更全局配置项配置

```typescript
import { DevConfigService } from 'ng-devui/utils';

constructor(private devConfigService: DevConfigService) {}

ngOnInit() {
  this.devConfigService.set('global', {
    'showAnimation': false
  })
}

```

### 全局配置项的优先级

对于支持全局配置的属性来说，属性值的生效优先级如下：

#### 为组件的某个实例单独设置的值（通过指令，组件，或类似于 service.open 的方法） > &nbsp; 通过 custom_global_config 对象内针对组件提供的全局默认值（包括 set 方法） > &nbsp; 通过 custom_global_config 对象内 global 键提供的全局默认值（包括 set 方法） > &nbsp; DevUI 组件库内置的默认值。

例如，你想为 Tooltip 提示组件设置动效：

1.使用 dTooltip 指令时传递参数 [showAnimation]="false"

2.通过 custom_global_config 设置 {tooltip: {showAnimation: true}}

3.通过 custom_global_config 设置全局默认值 {global: {showAnimation: false}}

4.DevUI 组件库内置的默认值: showAnimation = true

最终， 由于步骤 1 的优先级最高 Tooltip 会关闭动画

### 查看所有可用的全局配置项

`DevUIGlobalConfig` 接口提供的类型定义信息能够帮助你找到所有支持全局配置项的组件和属性。另外，每个组件的 API 文档都会在`全局配置项`列指出哪些属性支持全局配置。
