# How to use

Import into module:
```ts
import { InputNumberModule } from 'ng-devui';
```

In the page:
```html
<d-input-number></d-input-number>
```
# d-input-number
## d-input-number Parameters

|  Parameter   |        Type        |         Default         | Description                                                                     | Jump to Demo                                                                                                   |Global Config| 
| :----------------: | :----------: | :----------------: | :---------------------: | :------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
|     max      |      `number`      | Number.MAX_SAFE_INTEGER | Optional. Maximum value                                                         | [Basic Usage](demo#number-basic)                                                      |
|     min      |      `number`      | Number.MIN_SAFE_INTEGER | Optional. Minimum value                                                         | [Basic Usage](demo#number-basic)                                                      |
|     step     |      `number`      |            1            | Optional. Step value                                                            | [Basic Usage](demo#number-basic)                                                      |
|   disabled   |     `boolean`      |          false          | Optional. This parameter specifies whether to enable the input function.        | [Disabled](demo#number-disabled)                                               |
|     size     |  `'' \| 'sm' \| 'lg'`   |           ''            | Optional. Component size                                                        | [Basic Usage](demo#number-basic)                                                      |
|   ngModel    |      `number`      |           --            | Optional. Component value                                                       | [Basic Usage](demo#number-basic)                                                      |
| decimalLimit |      `number`      |           --            | Optional. Limit the number of decimal places.                                   | [Avoid Decimal](demo#decimal-limit-auto-focus)  |
|  autoFocus   |     `boolean`      |          false          | Optional. Automatically obtain focus                                            | [Basic Usage](demo#number-basic) |
|  allowEmpty  |     `boolean`      |          false          | Optional. Whether to allow the value to be empty                                | [Allow Null](demo#number-empty)                                      |
| placeholder  |      `string`      |           --            | Optional. Placeholder to be displayed.                                          | [Set Placeholder and Maxlength](demo#number-placeholder-maxlength)                        |
|  maxLength   |      `number`      |            0            | Optional. Limit the maximum length. The value 0 indicates no limit.             | [Set Placeholder and Maxlength](demo#number-placeholder-maxlength)                        |
|     reg      | `RegExp \| string` |           --            | Optional. It is used to restrict the input regular or regular character string. | [Using Regular Expression](demo#number-reg)                                                |

## d-input-number Event

|              Event               |          Type          | Description                                                        | Jump to Demo                                                          |
| :------------------------------: | :--------------------: | :----------------------------------------------------------------- | --------------------------------------------------------------------- | 
|        whileValueChanging        | `EventEmitter<number>` | Event triggered when a user uses the keyboard to enter information | [Basic Usage](demo#number-basic)             |
| afterValueChanged |   `EventEmitter<number>`    | Component changed. The value change is monitored using ngModelChange.                                             | [Basic Usage](demo#number-basic) |
