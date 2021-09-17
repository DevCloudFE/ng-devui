# How To Use
Import into module：
```ts
import { TransferModule } from 'ng-devui/transfer';
```
In the page：
```html
<d-transfer></d-transfer>
```

# d-transfer

## d-transfer parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------------: | :-----: | :---: | :------------------------- | ------------------------------------------------------------ |
| sourceOption | `array` | [] | Optional. This parameter indicates the source data of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| targetOption | `array` | [] | Optional. This parameter indicates the target data of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| titles | `array` | [] | Optional. Title of the shuttle box. | [Basic Usage](demo#transfer-demo-base) |
| height | `string` | 320px | Optional. It indicates the height of the shuttle box. |
| isSearch | `boolean` | false | Optional. Specifies whether to search. | [Search Shuttle Box](demo#transfer-demo-search) |
| isSourceDroppable | `boolean` | false | Optional. Indicates whether the source can be dragged. |
| isTargetDroppable | `boolean` | false | Optional. Indicates whether the object can be dragged. | [Sorting Shuttle Box](demo#transfer-demo-sort) |
|  virtualScroll    | `boolean` | false | Optional. Indicates whether to scroll virtually.           | [Virtual Scroll](demo#transfer-demo-virtual-scroll) |
| disabled | `boolean` | false | Optional. The shuttle box cannot be used. | [Basic Usage](demo#transfer-demo-base) |
|  showOptionTitle  | `boolean` | false | Optional. Indicates whether to display title when the cursor is hovered over data.    | [Search Shuttle Box](demo#transfer-demo-search) |
| beforeTransfer | `(sourceOption, targetOption) => boolean \| Promise<boolean> \| Observable<boolean>` | - | Optional. Determines whether the transfer event can be triggered before the transfer event occurs. | [Basic Usage](demo#transfer-demo-base) |
|customSourceCheckedLen|`number`|   0   |Optional. Determine whether the source can be shuttled when using a template.| [Custom Shuttle Box](demo#transfer-demo-custom) |
|customTargetCheckedLen|`number`|   0   |Optional. Determine whether the target can be shuttled when using a template.| [Custom Shuttle Box](demo#transfer-demo-custom) |

## d-transfer event

| Event | Type | Description | Jump to Demo |
| :--------------: | :--------------------: | :--------------------------------: | -------------------------------------------------------- |
| transferToSource | `EventEmitter<{sourceOption, targetOption}>` | When you click the transfer to source button, the shuttle box and target data are returned. | [Basic Usage](demo#transfer-demo-base) |
| transferToTarget | `EventEmitter<{sourceOption, targetOption}>` | When you click the transfer to target button, the shuttle box and target data are returned. | [Basic Usage](demo#transfer-demo-base) |
|    searching     | `EventEmitter<{direction, keyword}>` | Triggered during search. Return the shuttle box and the search text. If this event is not set, the default function is used. | [Search Shuttle Box](demo#transfer-demo-search) |
|   transferring   | `EventEmitter<TransferDirection>` | Triggered during transfer. Return the shuttle box. If this event is not set, the default function is used. | [Search Shuttle Box](demo#transfer-demo-search) |
|  afterTransfer   | `EventEmitter<TransferDirection>` | Triggered after transfer. Return the shuttle box. This event will not trigger when transferEvent is not set. | [Search Shuttle Box](demo#transfer-demo-search) |

### TransferDirection Type

Import：
```ts
import { TransferDirection } from 'ng-devui';
```
Structure：
```ts
enum TransferDirection { SOURCE, TARGET }
```
