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

|       参数        |  类型   | 默认  | 说明                       | 跳转 Demo                                                    |
| :---------------: | :-----: | :---: | :------------------------- | ------------------------------------------------------------ |
|   sourceOption    |  `array`  |  []   | 可选参数，穿梭框源数据     | [基本用法](demo#transfer-demo-base)     |
|   targetOption    |  `array`  |  []   | 可选参数，穿梭框目标数据   | [基本用法](demo#transfer-demo-base)     |
|      titles       |  `array`  |  []   | 可选参数，穿梭框标题       | [基本用法](demo#transfer-demo-base)     |
|      height       | `string`  | 320px | 可选参数，穿梭框高度       |
|     isSearch      | `number`  | false | 可选参数，是否可以搜索     | [搜索穿梭框](demo#transfer-demo-search) |
| isSourceDroppable | `boolean` | false | 可选参数，源是否可以拖拽   |
| isTargetDroppable | `boolean` | false | 可选参数，目标是否可以拖拽 | [排序穿梭框](demo#transfer-demo-sort)   |
|     disabled      | `boolean` | false | 可选参数 穿梭框禁止使用    | [基本用法](demo#transfer-demo-base)     |
|  beforeTransfer   | `(sourceOption, targetOption) => boolean \| Promise<boolean> \| Observable<boolean>` | - | 可选参数 在transfer事件发生前判断事件是否允许触发     | [基本用法](demo#transfer-demo-base)     |

## d-transfer 事件

|       事件       |          类型          |                说明                | 跳转 Demo                                                |
| :--------------: | :--------------------: | :--------------------------------: | -------------------------------------------------------- |
| transferToSource | 返回穿梭框源和目标数据 | 当点击右穿梭时，返回源和目标数据； | [基本用法](demo#transfer-demo-base) |
| transferToTarget | 返回穿梭框源和目标数据 | 当点击左穿梭时，返回源和目标数据； | [基本用法](demo#transfer-demo-base) |
