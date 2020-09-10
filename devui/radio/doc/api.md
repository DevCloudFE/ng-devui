### d-radio-group 参数

|     参数     |              类型               |   默认   | 说明                                                                                          | 跳转 Demo                                           |
| :----------: | :-----------------------------: | :------: | :-------------------------------------------------------------------------------------------- | --------------------------------------------------- |
|     name     |            `string`             |    --    | 必选，单选项名称 （radio唯一标识符） | [竖向排列](/components/radio/demo#vertical)     |
|    values    |             `array`             |    --    | 必选，单选数据组                                                                              | [竖向排列](/components/radio/demo#vertical)         |
|   cssStyle   |       `'row' \| 'column'`       | 'column' | 可选，设置横向或纵向排列                                                                      | [横向排列](/components/radio/demo#horizontal)       |  |
| beforeChange | `Function\|Promise\|Observable` |    --    | 可选，radio-group 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio-group 的切换 | [回调切换](/components/radio/demo#condition-radio-group) |

### d-radio-group 事件

|  事件  |        类型         | 说明                             | 跳转 Demo                                   |
| :----: | :-----------------: | :------------------------------- | ------------------------------------------- |
| change | `EventEmitter<any>` | 单选项值改变时触发，返回选中的值 | [竖向排列](/components/radio/demo#vertical) |

### d-radio 参数

|     参数     |              类型               | 默认  | 说明                                                                            | 跳转 Demo                                               |
| :----------: | :-----------------------------: | :---: | :------------------------------------------------------------------------------ | ------------------------------------------------------- |
|     name     |            `string`             |  --   | 必选，单选项名称                                                                | [互相独立的单选项](/components/radio/demo#basic-usage)  |
|    value     |            `string`             |  --   | 必选，单选项值                                                                  | [互相独立的单选项](/components/radio/demo#basic-usage)  |
|   disabled   |            `boolean`            | false | 可选，是否禁用该单选项                                                          | [禁用](/components/radio/demo#disabled)                 |  |
| beforeChange | `Function\|Promise\|Observable` |  --   | 可选，radio 切换前的回调函数，返回 boolean 类型，返回 false 可以阻止 radio 切换 | [回调切换](/components/radio/demo#condition-change) |

### d-radio 事件

|     事件      |        类型         | 说明                                        | 跳转Demo                                           |
| :-----------: | :-----------------: | :----------------------------------------- | -------------------------------------------------- |
| ngModelChange | `EventEmitter<any>` | Form 事件，单选项值改变时触发，返回选中的值 | [互相独立的单选项](/components/radio/demo#basic-usage) |
