### d-search 参数

| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| size          | `string`      | ''      | 可选，搜索框尺寸，有三种选择lg、''、sm |
| placeholder          | `string`     | 'Please Input keywords'   | 可选，输入框的placeholder |
| maxLength          | `number` |  Number.MAX_SAFE_INTEGER | 可选，输入框的max-length |
| delay       | `number`     | 300   | 可选，debounceTime的延迟 |
| isKeyupSearch         | `boolean`  | false  | 可选，是否支持输入值立即出发searchFn |

### d-search 事件

| 事件 | 类型  | 说明 |
| :---: | :---:| :---|
| searchFn | `string` |回车或点击搜索按钮触发的回调函数，返回文本框输入的值 |
