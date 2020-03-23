### d-alert参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| type        | `'success'\|'danger'\|'warning'\|'info'`| 'info'      | 必选，指定警告提示的样式
| cssClass    | `string `      | --      | 可选，自定义class名 |
| closeable   | `boolean`      | true        | 可选，默认显示关闭按钮 |
| dismissTime | `number`       | --      | 可选，自动关闭alert的延迟时间(单位：ms) |
| showIcon    | `boolean`      | true        | 可选，是否使用默认的类型图标   |

### d-alert 事件

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| closeEvent     | `EventEmitter<any>`| 可选，关闭时触发的回调函数 |
