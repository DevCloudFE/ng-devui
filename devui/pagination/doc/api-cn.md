# 如何使用

在 module 中引入：

```ts
import { PaginationModule } from 'ng-devui/pagination';
```

在页面中使用：

```html
<d-pagination></d-pagination>
```
# d-pagination 

## d-pagination 参数

|       参数        |                                                   类型                                                    |            默认            | 说明                                                                                                     | 跳转 Demo                                |全局配置项| 
| :----------------: | :---------------: | :-------------------------------------------------------------------------------------------------------: | :------------------------: | :------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
|     pageSize      |                                                 `number`                                                  |             10             | 可选，每页显示最大条目数量                                                                               | [基本用法](demo#basic-usage)             |
|       total       |                                                 `number`                                                  |             0              | 可选，显示的总条目数                                                                                     | [基本用法](demo#basic-usage)             |
|  pageSizeOptions  |                                                `number[]`                                                 |             10             | 可选，分页每页最大条目数量的下拉框的数据源，默认有四种选择 5, 10, 20, 50                                 | [多种配置](demo#multiple-configurations) |
| pageSizeDirection | `Array<`[`AppendToBodyDirection`](#appendtobodydirection)`\|`[`ConnectedPosition`](#connectedposition)`>` | ['centerDown', 'centerUp'] | 可选，设置分页每页条目的下拉框展示的方向                                                                 | [多种配置](demo#multiple-configurations) |
|     pageIndex     |                                                 `number`                                                  |             1              | 可选，初始化页码                                                                                         | [基本用法](demo#basic-usage)             |
|     maxItems      |                                                 `number`                                                  |             10             | 可选，分页最多显示几个按钮                                                                               | [基本用法](demo#basic-usage)             |
|      preLink      |                                                 `string`                                                  |             --             | 可选，上一页按钮显示图标,默认设置为左箭头图标                                                            | [基本用法](demo#basic-usage)             |
|     nextLink      |                                                 `string`                                                  |             --             | 可选， 下一页按钮显示图标,默认设置为右箭头图标                                                           | [基本用法](demo#basic-usage)             |
|       size        |                                                 `number`                                                  |             ''             | 可选，分页组件尺寸，有三种选择 lg,``,sm,分别代表大，中，小                                               | [基本用法](demo#basic-usage)             |
|    canJumpPage    |                                                 `boolean`                                                 |            false            | 可选，是否显示分页输入跳转                                                                               | [基本用法](demo#basic-usage)             |
| canChangePageSize |                                                 `boolean`                                                 |           false            | 可选，是否显示用于选择更改分页每页最大条目数量的下拉框                                                   | [基本用法](demo#basic-usage)             |
|   canViewTotal    |                                                 `boolean`                                                 |            false            | 可选，是否显示总条目                                                                                     | [基本用法](demo#basic-usage)             |
|   totalItemText   |                                                 `string`                                                  |         '所有条目'         | 可选，总条目文本                                                                                         | [极简模式](demo#minimalist-model)        |
|     goToText      |                                                 `string`                                                  |           '跳至'           | 可选，跳转文本                                                                                           | [基本用法](demo#basic-usage)             |
|  showJumpButton   |                                                 `boolean`                                                 |           false            | 可选，是否显示跳转按钮                                                                                   | [多种配置](demo#multiple-configurations) |
| showTruePageIndex |                                                 `boolean`                                                 |           false            | 可选，页码超出分页范围时候也显示当前页码的开关                                                           | [多种配置](demo#multiple-configurations) |
|       lite        |                                                 `boolean`                                                 |           false            | 可选，是否切换为极简模式                                                                                 | [极简模式](demo#minimalist-model)        |
| showPageSelector  |                                                 `boolean`                                                 |            true            | 可选，`极简模式`下是否显示页码下拉                                                                       | [极简模式](demo#minimalist-model)        |
|  haveConfigMenu   |                                                 `boolean`                                                 |           false            | 可选，`极简模式`下是否显示配置                                                                           | [极简模式](demo#minimalist-model)        |
| autoFixPageIndex  |                                                 `boolean`                                                 |            true            | 可选，改变 pageSize 时是否自动修正页码，若`pageSizeChange`事件中会对`pageIndex`做处理，建议设置为`false` | [极简模式](demo#minimalist-model)        |
| autoHide          |             `boolean`               |            false           | 可选，是否自动隐藏, autoHide为 true 并且 pageSizeOptions最小值 > total 不展示分页                                     | [极简模式](demo#minimalist-model)        |

## d-pagination 事件

|      参数       |          类型          | 说明                                                       | 跳转 Demo                                |
| :-------------: | :--------------------: | :--------------------------------------------------------- | ---------------------------------------- |
| pageIndexChange | `EventEmitter<number>` | 可选，页码变化的回调,返回当前页码值                        | [多种配置](demo#multiple-configurations) |
| pageSizeChange  | `EventEmitter<number>` | 可选，每页最大条目数量变更时的回调，返回当前每页显示条目数 | [多种配置](demo#multiple-configurations) |

# 接口 & 类型定义

### AppendToBodyDirection

```ts
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

### ConnectedPosition

```ts
export interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';

  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';

  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}
```
