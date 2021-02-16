## InputNumber Usage Description

### d-input-number Parameter

|  Parameter   |        Type        |         Default         | Description                                                                     | Jump to Demo                                                                                                   |
| :----------: | :----------------: | :---------------------: | :------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
|     max      |      `number`      | Number.MAX_SAFE_INTEGER | Optional. Maximum value                                                         | [Basic usage](demo#number-basic)                                                      |
|     min      |      `number`      | Number.MIN_SAFE_INTEGER | Optional. Minimum value                                                         | [Basic usage](demo#number-basic)                                                      |
|     step     |      `number`      |            1            | Optional. Step value                                                            | [Basic usage](demo#number-basic)                                                      |
|   disabled   |     `boolean`      |          false          | Optional. This parameter specifies whether to enable the input function.        | [Forbidden state](demo#number-disabled)                                               |
|     size     |  `'\|'sm'\|'lg'`   |           ''            | Optional. Component size                                                        | [Basic usage](demo#number-basic)                                                      |
|   ngModel    |      `number`      |           --            | Optional. Component value                                                       | [Basic usage](demo#number-basic)                                                      |
| decimalLimit |      `number`      |           --            | Optional. Limit the number of decimal places.                                   | [Limit decimals](demo#decimal-limit)  |
|  autoFocus   |     `boolean`      |          false          | Optional. Automatically obtain focus                                            | -- |
|  allowEmpty  |     `boolean`      |          false          | Optional. Whether to allow the value to be empty                                | [Null allowed](demo#number-empty)                                      |
| placeholder  |      `string`      |           --            | Optional. Placeholder to be displayed.                                          | [placeholder and maxLength](demo#number-placeholder-maxlength)                        |
|  maxLength   |      `number`      |            0            | Optional. Limit the maximum length. The value 0 indicates no limit.             | [placeholder and maxLength](demo#number-placeholder-maxlength)                        |
|     reg      | `RegExp \| string` |           --            | Optional. It is used to restrict the input regular or regular character string. | [Regular restriction](demo#number-reg)                                                |

### d-input-number event

|              Event               |          Type          | Description                                                        | Jump to Demo                                                          |
| :------------------------------: | :--------------------: | :----------------------------------------------------------------- | --------------------------------------------------------------------- | 
|        whileValueChanging        | `EventEmitter<number>` | Event triggered when a user uses the keyboard to enter information | [Basic usage](demo#number-basic)             |
| afterValueChanged |   `EventEmitter<number>`    | Component changed. The value change is monitored using ngModelChange.                                             | [Basic usage](demo#number-basic) |
