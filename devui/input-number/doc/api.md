## InputNumber 使用说明

### d-input-number 参数

|     参数     |        类型        | 默认  | 说明                                 | 跳转 Demo                                                          |
| :----------: | :----------------: | :---: | :----------------------------------- | ------------------------------------------------------------------ |
|     max      |      `number`      |  100  | 可选，最大值                         | [基本用法](/components/input-number/demo#number-basic)                 |
|     min      |      `number`      |   0   | 可选，最小值                         | [基本用法](/components/input-number/demo#number-basic)                 |
|     step     |      `number`      |   1   | 可选，步进值                         | [基本用法](/components/input-number/demo#number-basic)                 |
|   disabled   |     `boolean`      | false | 可选，禁止输入态开关                 | [禁止输入态](/components/input-number/demo#number-disabled)              |
|     size     |  `''\|'sm'\|'lg'`  |  ''   | 可选，组件大小                       | [基本用法](/components/input-number/demo#number-basic)                 |
|   ngModel    |      `number`      |  --   | 可选，组件的值                       | [基本用法](/components/input-number/demo#number-basic)                 |
| decimalLimit |      `number`      |  --   | 可选，限制小数点后的位数             |
|  autoFocus   |     `boolean`      | false | 可选，自动获取焦点                   |
|  allowEmpty  |     `boolean`      | false | 可选，是否允许值为空                 | [允许空值](/components/input-number/demo#number-empty)                 |
| placeholder  |      `string`      |  --   | 可选，要显示的 placeholder           | [placeholder和maxLength](/components/input-number/demo#number-placeholder-maxlength) |
|  maxLength   |      `number`      |   0   | 可选，限制最大输入的长度，0 为不限制 | [placeholder和maxLength](/components/input-number/demo#number-placeholder-maxlength) |
|     reg      | `RegExp \| string` |  --   | 用于限制输入的正则或正则字符串       | [正则限制](/components/input-number/demo#number-reg)                   |

### d-input-number 事件

|        事件        |          类型          | 说明                                                      | 跳转 Demo                                          |
| :----------------: | :--------------------: | :-------------------------------------------------------- | -------------------------------------------------- |
| whileValueChanging | `EventEmitter<number>` | 用户使用键盘输入时发出的事件                              | [基本用法](/components/input-number/demo#number-basic) |
| afterValueChanged  | `EventEmitter<number>` | 组件值变化时发出的事件，使用 ngModelChange 来监听值的变化 |
