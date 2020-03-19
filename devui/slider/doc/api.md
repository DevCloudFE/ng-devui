## d-slider 参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :----------------------------------------------------------------------|
| min         | `number`       | 0        |可选，滑动输入条的最小值|
| max         | `number`       | 100      |可选，滑动输入条的最大值|
| step        | `number`       | 1        |可选，滑动输入条的步长，取值必须大于等于0，且必须可被(max-min)整除|
| disabled    | `boolean`      | false    |可选，值为true时禁止用户输入|
| tipsRenderer| `function` 或 `null` | (value) => String(value) |可选，渲染Popover内容的函数，传入null时不显示Popover|
