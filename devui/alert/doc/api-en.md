### d-alert Attributes

|    Attributes     |                   Type                   |  Default  | Description                                      | Go To                                   |
| :---------: | :--------------------------------------: | :----: | :---------------------------------------- | ------------------------------------------ |
|    type     | `'success'\|'danger'\|'warning'\|'info'` | 'info' | Required. Specify the style of the warning prompt                 | [Basic Usage](demo#basic-usage) |
|  cssClass   |                 `string`                 |   --   | Optional. Customize className                     |
|  closeable  |                `boolean`                 |  true  | Optional. The close button is displayed by default   | [Basic Usage](demo#tips-to-close) |
| dismissTime |                 `number`                 |   --   | Optional. Toggle off the delay time of Alert(unit：ms) |
|  showIcon   |                `boolean`                 |  true  | Optional. Whether to use the default type icon     | [Basic Usage](demo#basic-usage) |

### d-alert Events

|    Attributes    |        Type         | Description                       | Go To                                    |
| :--------: | :-----------------: | :------------------------- | -------------------------------------------- |
| closeEvent | `EventEmitter<any>` | Optional. Callback when alert is closed | [Closable Prompt](demo#tips-to-close) |
