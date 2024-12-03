# 如何使用

在 module 中引入：

```ts
import { ToastModule } from 'ng-devui/toast';
```

在页面中使用：

```xml
<d-toast></d-toast>
```

## d-toast

### d-toast 参数

| 参数                                                      | 类型                         | 默认   | 说明                                                                                                                                                                                         | 跳转 Demo                                 |
| --------------------------------------------------------- | ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| value                                                     | [`Array<Message>`](#message) | --     | 必选，消息内容数组，Message 对象定义见下文                                                                                                                                                   | [基本用法](demo#basic-usage)              |
| life                                                      | `number`                     | 5000   | 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒                                                            | [超时时间](demo#life)                     |
| lifeMode                                                  | `string`                     | global | 可选，超时时间模式，预设值为 global 和 single 。默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间； 设置为 single 时， 每个消息使用自身的超时时间，参见 Message 中的 life 定义 | [每个消息使用单独的超时时间](demo#single) |
| sticky                                                    | `boolean`                    | false  | 可选，是否常驻，默认自动关闭                                                                                                                                                                 |
| style                                                     | `{[klass:string]:any;}`      | --     | 可选，样式。参见 [ngStyle](https://angular.cn/api/common/NgStyle)                                                                                                                            |                                           |
| styleClass                                                | `string`                     | --     | 可选，类名。                                                                                                                                                                                 |                                           |
| <span style="white-space:nowrap;">appendUpperLimit</span> | `number`                     | 0      | 可选，在该值范围内追加显示新消息，而不是清空原有消息，需注意新消息插入后会重置已有消息的持续时间。设置为 0 时不启用。                                                                        | [追加显示](demo#append)                   |

### d-toast 事件

| 参数        | 类型                      | 说明                                                                           |
| ----------- | ------------------------- | ------------------------------------------------------------------------------ |
| closeEvent  | `EventEmitter<any>`       | 可选，返回被手动关闭或自动消失的单条消息内容                                   |
| valueChange | `EventEmitter<Message[]>` | 可选，返回变化（手动关闭或自动消失）后剩余消息内容数组，Message 对象定义见下文 |

## 接口 & 类型定义

### Message

```ts
export interface Message {
  severity?: string; // 预设值有 common、success、error、warn、info，超时时间参见 life 说明，未设置或非预设值时超时时间为 5000 毫秒，warn 和 error 为 10000 毫秒
  summary?: string; // 消息标题。当设置超时时间，未设置标题时，不展示标题和关闭按钮
  content?: string | TemplateRef<any>; // 消息内容，支持纯文本和模板，推荐使用
  life?: number; // 单个消息超时时间，需设置 lifeMode 为 single 。每个消息使用自己的超时时间，开启该模式却未设置时按 severity 判断超时时间
  id?: any; // 消息ID
}
```

## ToastService

在 component 中引入:

```ts
import { ToastService } from 'ng-devui/toast';
```

在 component 里的 constructor 中声明:

```ts
constructor( private toastService: ToastService ) {}
```

在页面中使用:

```html
<d-button (click)="openToast()">click me show simplest toast!</d-button>
在openToast函数中调用toastService.open()，打开toast全局通知,并且获得返回值是一个实例，这个实例的sticky默认是false，即自动关闭。如果sticky设置是true,是常驻，调用该实例的close()，
关闭toast全局通知。
```

```ts
this.toastService.open({
  value: [{ severity: 'info', summary: '摘要', content: '详细信息' }],
});
```

### ToastService 参数

| 参数                     | 类型                         | 默认   | 说明                                                                                                                                                                                         | 跳转 Demo                          |
| ------------------------ | ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| value                    | [`Array<Message>`](#message) | --     | 必选，消息内容数组，Message 对象定义见下文                                                                                                                                                   | [服务方式调用](demo#toast-service) |
| life                     | `number`                     | 5000   | 可选，超时时间，超时后自动消失，鼠标悬停可以阻止消失，单位毫秒。普通、成功、提示类默认为 5000 毫秒，错误、警告类默认为 10000 毫秒                                                            | [服务方式调用](demo#toast-service) |
| lifeMode                 | `string`                     | global | 可选，超时时间模式，预设值为 global 和 single 。默认为 global，所有消息使用 life 或群组第一个消息的预设超时时间； 设置为 single 时， 每个消息使用自身的超时时间，参见 Message 中的 life 定义 | [服务方式调用](demo#toast-service) |
| sticky                   | `boolean`                    | false  | 可选，是否常驻，默认自动关闭                                                                                                                                                                 | [服务方式调用](demo#toast-service) |
| style                    | `{[klass:string]:any;}`      | --     | 可选，样式。参见 [ngStyle](https://angular.cn/api/common/NgStyle)                                                                                                                            | [服务方式调用](demo#toast-service) |
| styleClass               | `string`                     | --     | 可选，类名。                                                                                                                                                                                 | [服务方式调用](demo#toast-service) |
| injector                 | `Injector`                   | --     | 可选，可以选择指定将用作组件的父级的注射器。                                                                                                                                                 |
| componentFactoryResolver | `ComponentFactoryResolver`   | --     | 可选，可以选择指定将用作组件的父级的注射器。                                                                                                                                                 |

接收发射过来的数据，closeEvent 返回被手动关闭或自动消失的单条消息内容，valueChange 返回变化（手动关闭或自动消失）后剩余消息内容数组，[`Array<Message>`](#message) 对象定义见接口 & 类型定义:

```ts
const results = this.toastService.open({
  value: [
    { severity: 'info', summary: '摘要', content: '第一行 详细信息' },
    { severity: 'error', summary: '摘要', content: '第二行 详细信息' },
    { severity: 'error', summary: '摘要', content: '第三行 详细信息' },
  ],
  sticky: true,
  style: { width: '600px', color: 'red' },
  styleClass: 'myCustom-toast',
  life: 5000,
  lifeMode: 'single ',
});
// 接收closeEvent发射过来的数据
results.toastInstance.closeEvent.subscribe((value: any) => {
  console.log('closeEvent', value);
});
// 接收valueChange发射过来的数据
results.toastInstance.valueChange.subscribe((value: any) => {
  console.log('valueChange', value);
});
this.results = results;
console.log('results', this.results);

// 因为sticky: true设置的常驻提示，需要手动关闭，调用返回的实例的close()即可关闭全局提示
this.results.toastInstance.close();
//关闭指定下标的某条提示
this.results.toastInstance.close(1);
//关闭指定内容的某条提示
this.results.toastInstance.close({ severity: 'info', summary: '摘要', content: '第一行 详细信息' });
```
