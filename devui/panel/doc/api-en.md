# How to use

Import into module：

```ts
import { PanelModule } from 'ng-devui';
```

In the page：

```html
<d-panel>
  <d-panel-header></d-panel-header>
  <d-panel-body></d-panel-body>
  <d-panel-footer></d-panel-footer>
</d-panel>
```

# d-panel

## d-panel Parameters

|   Parameter    |              Type               |  Default  |                                                                                   Description                                                                                    | Jump to Demo                                                  | Global Config |
| :------------: | :-----------------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------ | ------------- |
|      type      |    [`PanelType`](#paneltype)    | 'default' |                                                                               Optional. Panel type                                                                               | [Basic Usage](demo#basic-usage)                               |
|    cssClass    |            `string`             |    --     |                                                                        Optional. User-defined class name                                                                         |
|  isCollapsed   |            `boolean`            |   false   |                                                                      Optional. Whether to expand the panel                                                                       | [Basic Usage](demo#basic-usage)                               |
| hasLeftPadding |            `boolean`            |   true    |                                                                  Optional. Whether to display the left padding                                                                   | [Basic Usage](demo#basic-usage)                               |
| showAnimation  |            `boolean`            |   true    |                                                               Optional. Indicating whether to display animations.                                                                | [Basic Usage](demo#basic-usage)                               |
|  beforeToggle  | `Function\|Promise\|Observable` |    --     | Optional. Callback function before the panel folding status changes. The value of this parameter is of the boolean type. If false is returned, the panel folding status changes. | [Prevent Collapse Based on Conditions](demo#condition-change) |

## d-panel Event

| Parameter |          Type           | Description                                                                             |
| :-------: | :---------------------: | :-------------------------------------------------------------------------------------- |
|  toggle   | `EventEmitter<boolean>` | Optional. Callback upon panel click to return the expanded status of the current panel. |

# Interface & Type Definition

### PanelType

```ts
export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
```
