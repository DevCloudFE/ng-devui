### d-alert 参数

|    参数     |                   类型                   |  默认  | 说明                                      | 跳转 Demo                                  |
| :---------: | :--------------------------------------: | :----: | :---------------------------------------- | ------------------------------------------ |
|    type     | `'success'\|'danger'\|'warning'\|'info'` | 'info' | 必选，指定警告提示的样式                  | [基本用法](demo#basic-usage) |
|  cssClass   |                 `string`                 |   --   | 可选，自定义 class 名                     |
|  closeable  |                `boolean`                 |  true  | 可选，默认显示关闭按钮                    | [基本用法](demo#tips-to-close) |
| dismissTime |                 `number`                 |   --   | 可选，自动关闭 alert 的延迟时间(单位：ms) |
|  showIcon   |                `boolean`                 |  true  | 可选，是否使用默认的类型图标              | [基本用法](demo#basic-usage) |

### d-alert 事件

|    参数    |        类型         | 说明                       | 跳转 Demo                                    |
| :--------: | :-----------------: | :------------------------- | -------------------------------------------- |
| closeEvent | `EventEmitter<any>` | 可选，关闭时触发的回调函数 | [可关闭的提示](demo#tips-to-close) |
