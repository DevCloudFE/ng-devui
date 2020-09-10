### d-search 参数

|     参数      |   类型    |          默认           | 说明                                    | 跳转 Demo                                             |
| :-----------: | :-------: | :---------------------: | :-------------------------------------- | ----------------------------------------------------- |
|     size      | `string`  |           ''            | 可选，搜索框尺寸，有三种选择 lg、''、sm | [基本用法](/components/search/demo#basic-usage)           |
|  placeholder  | `string`  | 'Please Input keywords' | 可选，输入框的 placeholder              |
|   maxLength   | `number`  | Number.MAX_SAFE_INTEGER | 可选，输入框的 max-length               | [双向绑定](/components/search/demo#bidirectional-binding) |
|     delay     | `number`  |           300           | 可选，debounceTime 的延迟               |
|   disabled    | `boolean` |          false          | 可选，输入框是否可用                    |
| isKeyupSearch | `boolean` |          false          | 可选，是否支持输入值立即出发 searchFn   | [基本用法](/components/search/demo#basic-usage)           |
| iconPosition  | `string` |          'right'          | 可选，搜索图标位置，有两种选择 'left'/'right'| [基本用法](/components/search/demo#basic-usage)
|   cssClass    | `string`  |           ''            | 可选，支持传入类名到输入框上            |                                                          |

### d-search 事件

|   事件   |   类型   | 说明                                                 | 跳转 Demo                                   |
| :------: | :------: | :--------------------------------------------------- | ------------------------------------------- |
| searchFn | `string` | 回车或点击搜索按钮触发的回调函数，返回文本框输入的值 | [基本用法](/components/search/demo#basic-usage) |
