## Checkbox 使用说明

### d-checkbox 参数

| 参数                  | 类型                             | 默认            |   说明                                                |
| :-------------------: | :-----------------------------: | :-------------: | :--------------------------------------------------:  |
| name                  | `string`                        | --              | 可选，表单域名，input原生name属性                       |
| label                 | `string`                        | --              | 可选，显示标签                                         |
| isShowTitle           | `boolean`                       | true            | 可选，是否显示title提示                                 |
| disabled              | `boolean`                       | false           | 可选，是否禁用                                         |
| labelTemplate         | `TemplateRef`                   | --              | 可选，标签的自定义模板                                  |
| halfchecked           | `boolean`                       | false           | 可选，半选状态                                         |
| color                 | `string`                        | --              | 可选，复选框颜色                                        |
| showAnimation         | `boolean`                       | true            | 可选，控制是否显示动画                                  |

### d-checkbox 事件

| 事件                  | 类型                             | 说明                                                                    |
| :-------------------: | :-----------------------------: | :--------------------------------------------------------------------:  |
| change              | `EventEmitter<boolean>`         |复选框的值改变时发出的事件，值是当前状态                                     |

### d-checkbox-group 参数

| 参数                  | 类型                             | 默认            |   说明                                                |
| :-------------------: | :-----------------------------: | :-------------: | :--------------------------------------------------:  |
| name                  | `string`                        | --              | 可选，表单域名，input原生name属性                       |
| direction             | `'row'\|'column'`               | 'column'        | 可选，显示方向                                         |
| isShowTitle           | `boolean`                       | true            | 可选，是否显示title提示                                |
| options               | `Array<any>`                    | []              | 可选，复选框选项数组                                   |
| filterKey             | `string`                        | --              | 可选，options为对象数组时，标识选项唯一id的键值          |
| labelTemplate         | `TemplateRef`                   | --              | 可选，标签的自定义模板                                  |
| halfchecked           | `boolean`                       | false           | 可选，半选状态                                         |
| color                 | `string`                        | --              | 可选，复选框颜色                                       |
| showAnimation         | `boolean`                       | true            | 可选，控制是否显示动画                                  |

### d-checkbox-group 事件

| 事件                  | 类型                             | 说明                                                                    |
| :-------------------: | :-----------------------------: | :--------------------------------------------------------------------:  |
| change              | `EventEmitter<boolean>`         | checkbox值改变事件                                                       |
