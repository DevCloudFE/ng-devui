
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| source      | `array`        | []          | 必选，有searchFn的情况下可以不必选 |
| disabled    | `boolean`      | false     | 可选，是否禁止指令 |
| cssClass    | `string`       | --      | 可选，自定义class名 |
| delay       | `number`       | 300         | 可选，只有在delay时间经过后并且输入新值，才做搜索查询 |
| itemTemplate| `TemplateRef`  | --      | 可选，自定义展示模板 |
| noResultItemTemplate| `TemplateRef`        | --      | 可选参数，没有匹配项的展示结果 |
| formatter   | `function`     | --      | 可选，格式化函数 |
| searchFn    | `function`     | --      | 可选，自定义搜索过滤 |
| selectValue | `function`     | --      | 可选，选择选项之后的回调函数 |
