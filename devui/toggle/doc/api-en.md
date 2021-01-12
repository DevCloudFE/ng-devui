### d-toggle parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----------: | :-----------------------------: | :---: | :-------------------------------------------------------------------------- | ------------------------------------------- |
| size | `'sm'\|''\|'lg'` |'' | Optional. Switch size. | [Basic Usage](demo#basic-usage) |
| color | `string` | -- | Optional. Customized color when the switch is enabled. | [Basic Usage](demo#basic-usage) |
| checked | `boolean` | false | Optional. Specifies whether to enable the function. The function is disabled by default. | [Basic Usage](demo#basic-usage) |
| [ngModel] | `boolean` | false | Optional. Specifies whether to enable the function. Bidirectional binding is supported. | [Basic Usage](demo#basic-usage) |
| disabled | `boolean` | false | Optional. Indicating whether to disable the function. | [Basic Usage](demo#basic-usage) |
| beforeChange | `Function\|Promise\|Observable` | -- |Optional. Callback function before a switch is changed. The return value is of the boolean type. If false is returned, the switch is not changed. | [Basic Usage](demo#basic-usage) |

### d-toggle event

| Event | Type | Description | Jump to Demo |
| :----: | :---------------------: | :------------------------------------ | ------------------------------------------- |
| change | `EventEmitter<boolean>` | Optional. If the function is enabled, true is returned. If the function is disabled, false is returned. | [Basic Usage](demo#basic-usage) |
