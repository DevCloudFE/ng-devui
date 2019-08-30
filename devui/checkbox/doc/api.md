### d-checkbox 参数
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| name        | `string` | ''     | 可选，表单域名，input原生name属性 |
| label       | `string` | ''     | 可选，显示标签 |
| isShowTitle    | `boolean`| true  | 可选，是否显示title提示 |
| disabled    | `boolean`| false  | 可选，是否禁用 |
| labelTemplate| `TemplateRef`| undefined | 可选，标签的自定义模板 |
| halfchecked| `boolean`| false | 可选，半选状态 |
| color | `string` | -- | 可选，复选框颜色 |

### d-checkbox 事件
| 事件 | 类型  | 说明 |
| :---: | :---:| :---|
| change | `boolean` |复选框的值改变时发出的事件，值是当前状态 |

### d-checkbox-group 参数
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| name        | `string` | --     | 可选，表单域名，input原生name属性 |
| direction   | `string` | column     | 可选，显示方向，值可为 `row` 或 `column` |
| isShowTitle    | `boolean`| true  | 可选，是否显示title提示 |
| options    | `[]` | []  |  复选框选项数组 |
| filterKey  | `string` | --  |  可选，options为对象数组时，标识选项唯一id的键值 |
| labelTemplate| `TemplateRef`| undefined | 可选，标签的自定义模板 |
| halfchecked| `boolean`| false | 可选，半选状态 |
| color | `string` | -- | 可选，复选框颜色 |

### d-checkbox-group 事件
| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| change | boolean | checkbox值改变事件 |
