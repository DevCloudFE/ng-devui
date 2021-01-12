### d-panel parameter

|  Parameter   |              Type               |  Default  | Description                                                                                                                                                                      | Jump to Demo                                                                  |
| :----------: | :-----------------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
|     type     |            `string`             | 'default' | Optional. Panel type                                                                                                                                                             | [Basic usage](demo#basic-usage)                       |
|   cssClass   |            `string`             |    --     | Optional. User-defined class name                                                                                                                                                |
| isCollapsed  |            `boolean`            |   false   | Optional. Whether to expand the file                                                                                                                                             | [Basic usage](demo#basic-usage)                       |
| beforeToggle | `Function\|Promise\|Observable` |    --     | Optional. Callback function before the panel folding status changes. The value of this parameter is of the boolean type. If false is returned, the panel folding status changes. | [Blocking based on conditions](demo#condition-change) |

### d-panel event

| Parameter |          Type           | Description                                                                             |
| :-------: | :---------------------: | :-------------------------------------------------------------------------------------- |
|  toggle   | `EventEmitter<boolean>` | Optional. Callback upon panel click to return the expanded status of the current panel. |
