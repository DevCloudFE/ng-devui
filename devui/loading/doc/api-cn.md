# 如何使用

在 module 中引入:

```ts
import { LoadingModule } from 'ng-devui/loading';
```

在页面中使用:

```html
<!-- xxx可以是任意html元素 -->
<xxx dLoading></xxx>
```

# dLoading

## dLoading 参数

|        参数        |             类型              |          默认          | 说明                                                                  | 跳转 Demo                                  |全局配置项| 
| :----------------: | :----------------: | :---------------------------: | :--------------------: | :-------------------------------------------------------------------- | ------------------------------------------ |
|      loading       | [`LoadingType`](#loadingtype) |           --           | 可选，控制 loading 状态                                               | [基本用法](demo#basic-usage)               |
|      message       |           `string`            |           --           | 可选，loading 时的提示信息                                            | [多 promise](demo#multi-promise)           |
| loadingTemplateRef |      `TemplateRef<any>`       |           --           | 可选，自定义 loading 模板                                             | [自定义样式](demo#custom-style)            |
|      backdrop      |           `boolean`           |           --           | 可选，loading 时是否显示遮罩                                          | [基本用法](demo#basic-usage)               |
|    showLoading     |           `boolean`           |           --           | 可选，手动启动和关闭 loading 状态,与`loading`参数不能同时使用         | [使用 showLoading 控制](demo#show-loading) |
|    positionType    |           `string`            |       'relative'       | 可选，指定`dLoading`宿主元素的定位类型,取值与 css position 属性一致。 | [使用 showLoading 控制](demo#show-loading) |
|        view        | `{top?:string,left?:string}`  | {top:'50%',left:'50%'} | 可选，调整 loading 的显示位置，相对于宿主元素的顶部距离与左侧距离     | [基本用法](demo#basic-usage)               |
|       zIndex       |        `number`      |   --   | 可选，loading加载提示的 z-index 值        | [基本用法](demo#basic-usage)    |
|       loadingStyle       |        [`LoadingStyle`](#LoadingStyle)      |   `'default'`   | 可选，类型 `'default' \| 'infinity'`      | [基本用法](demo#basic-usage)    |

### LoadingType

```ts
export type LoadingType = Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | Subscription | undefined;
```

### LoadingStyle

```ts
export type LoadingStyle = 'default' | 'infinity';
```

# LoadingService

在 component 中引入:

```ts
import { LoadingService } from 'ng-devui/loading';
```

在 component 里的 constructor 中声明:

```ts
constructor( private loadingService: LoadingService ) {}
```

在页面中使用:

```html
<d-button bsStyle="primary" (click)="openFullScreen()">click me show full screen loading!</d-button>
在openFullScreen函数中调用loadingService.open()，打开loading 加载,并且获得返回值是一个实例，该实例调用close()， 关闭loading加载。
```

```ts
  // 举个例子：const dm = document.querySelector('#me');
  // 举个例子：@ViewChild('loadingTemplateRef1', { static: true }) loadingTemplateRef1: TemplateRef<any>;
  this.loadingService.open({
    target: dm,
    loadingTemplateRef: loadingTemplateRef1,
    backdrop: true,
    message: 'One moment please...',
    positionType: 'relative',
    view: {
      top: '50%',
      left: '50%'
    }
  });
```

## LoadingService 参数

|        参数        |             类型             |          默认          | 说明                                                                | 跳转 Demo                                      |
| :----------------: | :--------------------------: | :--------------------: | :------------------------------------------------------------------ | ---------------------------------------------- |
|      target       |        `Element`        |           document.body           | 可选，Loading 需要覆盖的 DOM 节点                                | [服务方式调用](demo#full-screen)   |
|      message       |           `string`           |           --           | 可选，loading 时的提示信息                                          | [服务方式调用](demo#full-screen) |
| loadingTemplateRef |      `TemplateRef<any>`      |           --           | 可选，自定义 loading 模板                                           | [服务方式调用](demo#full-screen)  |
|      backdrop      |          `boolean`           |           true           | 可选，loading 时是否显示遮罩                                        | [服务方式调用](demo#full-screen)   |
|    positionType    |           `'static' \| 'relative' \| 'absolute' \| 'fixed' \|'sticky'`           |       'relative'       | 可选，指定`dLoading`宿主元素的定位类型, |[服务方式调用](demo#full-screen)
|        view        | `{top?:string,left?:string}` | {top:'50%',left:'50%'} | 可选，调整 loading 的显示位置，相对于宿主元素的顶部距离与左侧距离   | [服务方式调用](demo#full-screen)   |
|          zIndex          |            `number`             |   --   | 可选，弹出框 z-index 值                        | [服务方式调用](demo#full-screen)   |
|         injector         |           `Injector`            |    --    | 可选，可以选择指定将用作组件的父级的注射器      |
|       loadingStyle       |        [`LoadingStyle`](#LoadingStyle)      |   `'default'`   | 可选，类型 `'default' \| 'infinity'`     |     |