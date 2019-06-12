| 参数        | 说明          | 类型        |   默认值                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| size        | 可选参数，搜索框尺寸，有三种选择lg、''、sm       | String      | ''
| placeholder        | 可选参数，输入框的placeholder       | String      | Please Input keywords
| maxLength        | 可选参数，输入框的max-length       | Number      | Number.MAX_SAFE_INTEGER
| delay        | 可选参数，debounceTime的延迟       | Number      | 300
| isKeyupSearch        | 可选参数，是否支持输入值立即出发searchFn       | boolean      | false
| searchFn        | 可选参数，回车或点击搜索按钮触发的回调函数       | function      | 无
