### d-toggle 参数

|     参数     |              类型               | 默认  | 说明                                                                        | 跳转 Demo                                   |
| :----------: | :-----------------------------: | :---: | :-------------------------------------------------------------------------- | ------------------------------------------- |
|     size     |  `'sm'\|''\|'lg'`   | '' | 可选，开关尺寸大小                                                          | [基本用法](/components/toggle/demo#basic-usage) |
|    color     |            `string`             |  --   | 可选，开关打开时的自定义颜色                                                | [基本用法](/components/toggle/demo#basic-usage) |
|   checked    |            `boolean`            | false | 可选，开关是否打开，默认关闭                                                | [基本用法](/components/toggle/demo#basic-usage) |
|  [ngModel]   |            `boolean`            | false | 可选，指定当前是否打开，可双向绑定                                          | [基本用法](/components/toggle/demo#basic-usage) |
|   disabled   |            `boolean`            | false | 可选，是否禁用开关                                                          | [基本用法](/components/toggle/demo#basic-usage) |
| beforeChange | `Function\|Promise\|Observable` |  --   | 可选，开关变化前的回调函数,返回 boolean 类型，返回 false 可以阻止开关的变化 | [基本用法](/components/toggle/demo#basic-usage) |

### d-toggle 事件

|  事件  |          类型           | 说明                                  | 跳转 Demo                                   |
| :----: | :---------------------: | :------------------------------------ | ------------------------------------------- |
| change | `EventEmitter<boolean>` | 可选,开关打开返回 true,关闭返回 false | [基本用法](/components/toggle/demo#basic-usage) |
