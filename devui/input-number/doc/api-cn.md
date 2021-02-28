# 如何使用

在module中引入：
```ts
import { InputNumberModule } from 'ng-devui';
```

在页面中使用：
```html
<d-input-number></d-input-number>
```

# d-input-number
## d-input-number 参数

|     参数     |        类型        |          默认           | 说明                                 | 跳转 Demo                                                                              |
| :----------: | :----------------: | :---------------------: | :----------------------------------- | -------------------------------------------------------------------------------------- |
|     max      |      `number`      | Number.MAX_SAFE_INTEGER | 可选，最大值                         | [基本用法](demo#number-basic)                                 |
|     min      |      `number`      | Number.MIN_SAFE_INTEGER | 可选，最小值                         | [基本用法](demo#number-basic)                                 |
|     step     |      `number`      |            1            | 可选，步进值                         | [基本用法](demo#number-basic)                                 |
|   disabled   |     `boolean`      |          false          | 可选，禁止输入态开关                 | [禁止输入态](demo#number-disabled)                            |
|     size     |  `'' \| 'sm' \| 'lg'`  |           ''            | 可选，组件大小                       | [基本用法](demo#number-basic)                                 |
|   ngModel    |      `number`      |           --            | 可选，组件的值                       | [基本用法](demo#number-basic)                                 |
| decimalLimit |      `number`      |           --            | 可选，限制小数点后的位数             | [限制小数](demo#decimal-limit)      |
|  autoFocus   |     `boolean`      |          false          | 可选，自动获取焦点                   | --      |
|  allowEmpty  |     `boolean`      |          false          | 可选，是否允许值为空                 | [允许空值](demo#number-empty)                                 |
| placeholder  |      `string`      |           --            | 可选，要显示的 placeholder           | [placeholder 和 maxLength](demo#number-placeholder-maxlength) |
|  maxLength   |      `number`      |            0            | 可选，限制最大输入的长度，0 为不限制 | [placeholder 和 maxLength](demo#number-placeholder-maxlength) |
|     reg      | `RegExp \| string` |           --            | 可选，用于限制输入的正则或正则字符串 | [正则限制](demo#number-reg)                                   |

## d-input-number 事件

|        事件        |          类型          | 说明                                                      | 跳转 Demo                                              |
| :----------------: | :--------------------: | :-------------------------------------------------------- | ------------------------------------------------------ |
| whileValueChanging | `EventEmitter<number>` | 用户使用键盘输入时发出的事件                              | [基本用法](demo#number-basic) |
| afterValueChanged  | `EventEmitter<number>` | 组件值变化时发出的事件，使用 ngModelChange 来监听值的变化 | [基本用法](demo#number-basic) |
