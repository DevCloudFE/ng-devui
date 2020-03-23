### d-panel参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| type        | `string`       | 'default'      | 可选，面板的类型 |
| heading   | `string`      | --        | 可选，面板的头部标题 |
| cssClass    | `string`       | --      | 可选，自定义class名 |
| isCollapsed     | `boolean`     | false      | 可选，是否展开 |

### d-panel 事件

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| toggle   |  `EventEmitter<boolean>`      | 可选，点击面板时的回调，返回当前面板的展开状态 |
