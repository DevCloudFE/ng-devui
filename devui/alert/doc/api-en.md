# How to use

Import into module:

```ts
import { AlertModule } from 'ng-devui/alert';
```

In the page:

```xml
<d-alert></d-alert>
```
# d-alert
## d-alert Parameter

|    Attributes     |                   Type                   |  Default  | Description                                      |  Jump to Demo                                    |Global Config|
| :----------------: | :---------: | :--------------------------------------: | :----: | :---------------------------------------- | ------------------------------------------ |
|    type     | [`AlertType`](#alerttype) | 'info' | Required. Specify the style of the warning prompt                 | [Basic Usage](demo#basic-usage) |
|  cssClass   |                 `string`                 |   --   | Optional. Customize className                     |
|  closeable  |                `boolean`                 |  true  | Optional. The close button is displayed by default   | [Basic Usage](demo#tips-to-close) |
| dismissTime |                 `number`                 |   --   | Optional. Toggle off the delay time of Alert(`ms`) |
|  showIcon   |                `boolean`                 |  true  | Optional. Whether to use the default type icon     | [Without Icon](demo#without-icon) |

## d-alert Event

|    Attributes    |        Type         |        Description              |          Jump to Demo            |
| :--------: | :-----------------: | :------------------------- | -------------------------------------------- |
| closeEvent | `EventEmitter<AlertComponent>` | Optional. Callback when alert is closed | [Closable Prompt](demo#tips-to-close) |

# Interface & Type Definition
### AlertType

The default value is 'info', which specifies the type of alert warning.

```ts
export type AlertType = 'success' | 'danger' | 'warning' | 'info' | 'simple';
```
