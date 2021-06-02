# 如何使用
在module中引入：
```ts
import { ToggleModule } from 'ng-devui/toggle';
```

在页面中使用：
```html
<d-toggle></d-toggle>
```
# Toggle

## d-toggle 参数

|     参数     |              类型               | 默认  | 说明                                                                        | 跳转 Demo                                   |全局配置项| 
| :----------------: | :----------: | :-----------------------------: | :---: | :-------------------------------------------------------------------------- | ------------------------------------------- |
|     size     |  `'sm'\|''\|'lg'`   | '' | 可选，开关尺寸大小                                                          | [基本用法](demo#basic-usage) |
|    color     |            `string`             |  --   | 可选，开关打开时的自定义颜色                                                | [自定义样式](demo#custom) |
|   checked    |            `boolean`            | false | 可选，开关是否打开，默认关闭                                                | [基本用法](demo#basic-usage) |
|  ngModel   |            `boolean`            | false | 可选，指定当前是否打开，可双向绑定                                          | [双向绑定](demo#two-binding) |
|   disabled   |            `boolean`            | false | 可选，是否禁用开关                                                          | [基本用法](demo#basic-usage) |
| checkedContent |      `string\|TemplateRef`    |  --   | 可选，开关打开时内部模板                                               | [自定义样式](demo#custom) |
| uncheckedContent |    `string\|TemplateRef`    |  --   | 可选，开关关闭时内部模板                                             | [自定义样式](demo#custom) |
| beforeChange | `Function\|Promise\|()=> Observable<boolean>` |  --   | 可选，开关变化前的回调函数,返回 boolean 类型，返回 false 可以阻止开关的变化 | [双向绑定](demo#two-binding) |

## d-toggle 事件

|  事件  |          类型           | 说明                                  | 跳转 Demo                                   |
| :----: | :---------------------: | :------------------------------------ | ------------------------------------------- |
| change | `EventEmitter<boolean>` | 可选,开关打开返回 true,关闭返回 false | [回调事件](demo#callback) |
