## InputNumber 使用说明

### d-input-number 参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :----------------------------------------------------------------------|
| max  | `number`  | 100     | 可选，最大值 |
| min  | `number`  | 0     | 可选，最小值 |
| step  | `number`  | 1     | 可选，步进值 |
| disabled  | `boolean`  | false     | 可选，禁止输入态开关 |
| size  | `''\|'sm'\|'lg'` | '' | 可选，组件大小  |
| ngModel  | `number` | -- | 可选，组件的值 |
| decimalLimit  | `number` | -- | 可选，限制小数点后的位数 |
| autoFocus  | `boolean` | false | 可选，自动获取焦点 |
| allowEmpty  | `boolean`  | false | 可选，是否允许值为空 |
| placeholder  | `string`  | -- | 可选，要显示的placeholder |
| maxLength  | `number`  | 0 | 可选，限制最大输入的长度，0为不限制 |
| reg  | `RegExp \| string`  | -- | 用于限制输入的正则或正则字符串 |


### d-input-number 事件

| 事件        | 类型                  |   说明                 |
| :---------: | :-------------------:| :----------------------|
| whileValueChanging | `EventEmitter<number>` | 用户使用键盘输入时发出的事件 |
| afterValueChanged | `EventEmitter<number>` | 组件值变化时发出的事件，使用ngModelChange来监听值的变化 |
