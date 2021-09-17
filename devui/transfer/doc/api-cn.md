# 如何使用
在module中引入：
```ts
import { TransferModule } from 'ng-devui/transfer';
```
在页面中使用：
```html
<d-transfer></d-transfer>
```

# d-transfer

## d-transfer 参数

|       参数        |  类型   | 默认  | 说明                       | 跳转 Demo                                                    |全局配置项| 
| :----------------: | :---------------: | :-----: | :---: | :------------------------- | ------------------------------------------------------------ |
|   sourceOption    |  `array`  |  []   | 可选参数，穿梭框源数据     | [基本用法](demo#transfer-demo-base)     |
|   targetOption    |  `array`  |  []   | 可选参数，穿梭框目标数据   | [基本用法](demo#transfer-demo-base)     |
|      titles       |  `array`  |  []   | 可选参数，穿梭框标题       | [基本用法](demo#transfer-demo-base)     |
|      height       | `string`  | 320px | 可选参数，穿梭框高度       |
|     isSearch      | `boolean` | false | 可选参数，是否可以搜索     | [搜索穿梭框](demo#transfer-demo-search) |
| isSourceDroppable | `boolean` | false | 可选参数，源是否可以拖拽   |
| isTargetDroppable | `boolean` | false | 可选参数，目标是否可以拖拽 | [排序穿梭框](demo#transfer-demo-sort)   |
|  virtualScroll    | `boolean` | false | 可选参数，是否虚拟滚动     | [虚拟滚动](demo#transfer-demo-virtual-scroll) |
|     disabled      | `boolean` | false | 可选参数 穿梭框禁止使用    | [基本用法](demo#transfer-demo-base)     |
|  showOptionTitle  | `boolean` | false | 可选，鼠标悬浮于数据是否显示title    | [搜索穿梭框](demo#transfer-demo-search) |
|  beforeTransfer   | `(sourceOption, targetOption) => boolean \| Promise<boolean> \| Observable<boolean>` | - | 可选参数 在transfer事件发生前判断事件是否允许触发     | [基本用法](demo#transfer-demo-base)     |
|customSourceCheckedLen|`number`|   0   |可选，使用模板时判断源是否可穿梭| [自定义穿梭框](demo#transfer-demo-custom) |
|customTargetCheckedLen|`number`|   0   |可选，使用模板时判断目标是否可穿梭| [自定义穿梭框](demo#transfer-demo-custom) |

## d-transfer 事件

|       事件       |                  类型                   |                说明                      | 跳转 Demo                                                |
| :--------------: | :------------------------------------: | :--------------------------------------: | -------------------------------------------------------- |
| transferToSource | `EventEmitter<{sourceOption, targetOption}>` | 当点击右穿梭时，返回穿梭框源和目标数据；     | [基本用法](demo#transfer-demo-base) |
| transferToTarget | `EventEmitter<{sourceOption, targetOption}>` | 当点击左穿梭时，返回穿梭框源和目标数据；          | [基本用法](demo#transfer-demo-base) |
|     searching    | `EventEmitter<{direction, keyword}>`         | 当搜索时触发，返回目标穿梭框和搜索文字，不设置此事件则会使用默认方法； | [搜索穿梭框](demo#transfer-demo-search) |
|   transferring   | `EventEmitter<TransferDirection>` | 当穿梭时触发，返回目标穿梭框，不设置此事件则会使用默认方法； | [搜索穿梭框](demo#transfer-demo-search) |
|  afterTransfer   | `EventEmitter<TransferDirection>` | 当穿梭完成后，返回目标穿梭框，不设置transferEvent才会触发； | [搜索穿梭框](demo#transfer-demo-search) |

### TransferDirection 类型

引入：
```ts
import { TransferDirection } from 'ng-devui';
```
结构：
```ts
enum TransferDirection { SOURCE, TARGET }
```
