# 如何使用

在 module 中引入：

```ts
import { RadioModule } from 'ng-devui';
```

在页面中使用

```html
<d-radio [name]="radio" [value]="value"></d-radio>
<d-radio-group [name]="radioGroup" [values]="[]"></d-radio-group>
```

# d-radio
## d-radio 参数

|     参数     |              类型               | 默认  | 说明                                                                            | 跳转 Demo                            |全局配置项| 
| :----------------: | :----------: | :-----------------------------: | :---: | :------------------------------------------------------------------------------ | ------------------------------------ |
|     name     |            `string`             |  --   | 必选，单选项名称                                                                | [互相独立的单选项](demo#basic-usage) |
|    value     |            `string`             |  --   | 必选，单选项值                                                                  | [互相独立的单选项](demo#basic-usage) |
|   disabled   |            `boolean`            | false | 可选，是否禁用该单选项                                                          | [禁用](demo#disabled)                |
| beforeChange | `Function \| Promise \| Observable` |  --   | 可选，radio 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio 切换 | [回调切换](demo#condition-change)    |

## d-radio 事件

|     事件      |        类型         | 说明                                        | 跳转 Demo                            |
| :-----------: | :-----------------: | :------------------------------------------ | ------------------------------------ |
| ngModelChange | `EventEmitter<string>` | Form 事件，单选项值改变时触发，返回选中的值 | [互相独立的单选项](demo#basic-usage) |


# d-radio-group
## d-radio-group 参数

|     参数     |              类型               |   默认   |                                             说明                                              | 跳转 Demo                              |
| :----------: | :-----------------------------: | :------: | :-------------------------------------------------------------------------------------------: | -------------------------------------- |
|     name     |            `string`             |    --    |                             必选，单选项名称 （radio 唯一标识符）                             | [竖向排列](demo#vertical)              |
|    values    |             `array`             |    --    |                                       必选，单选数据组                                        | [竖向排列](demo#vertical)              |
|   disabled   |            `boolean`            | false | 可选，是否禁用该选项组                                                          | [radio-group根据条件终止切换操作](demo#condition-radio-group)                |
|   cssStyle   |       `'row' \| 'column'`       | 'column' |                                   可选，设置横向或纵向排列                                    | [横向排列](demo#horizontal)            |     |
| beforeChange | `Function \| Promise \| Observable` |    --    | 可选，radio-group 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio-group 的切换 | [回调切换](demo#condition-radio-group) |

## d-radio-group 事件

|  事件  |        类型         | 说明                             | 跳转 Demo                 |
| :----: | :-----------------: | :------------------------------- | ------------------------- |
| change | `EventEmitter<string \| object>` | 单选项值改变时触发，返回选中的值 | [竖向排列](demo#vertical) |
