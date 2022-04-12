# 如何使用

在 module 中引入：

```ts
import { DashboardModule } from 'ng-devui/dashboard';
```

页面中使用：

```html
<d-dashboard>
  <d-dashboard-widget [(width)]="3" [(height)]="1" [(x)]="x" [(y)]="y" [widgetData]="data"></d-dashboard-widget>
  <d-dashboard-widget [(width)]="3" [(height)]="2" [(x)]="x2" [(y)]="y2" [widgetData]="data2"></d-dashboard-widget>
</d-dashboard>
```

组件所需依赖

```json
"gridstack": "4.2.6",

```

## d-dashboard 组件

该组件定义了一个仪表盘（dashboard）。

### d-dashboard 参数

|      参数       |        类型        | 默认  | 说明                                                                            |
| :-------------: | :----------------: | :---: | :------------------------------------------------------------------------------ |
|   initOptions   | `GridstackOptions` |  --   | 可选，默认内置了配置，使用者基本不需要覆盖，该选项是为了保持扩展性              |
|     static      |     `boolean`      | false | 可选，是否允许为只读，true 表示只读，false 表示可编辑，默认配置为 false 可编辑  |
|      float      |     `boolean`      | true  | 可选，是否允许 widget 上方为空的时候可以放置在下方，默认配置为 true             |
|     animate     |     `boolean`      | true  | 可选，调整宽高和移动卡片的时候是否启用动画，默认配置为 true                     |
| widgetMoveable  |     `boolean`      | true  | 可选，内部的 widget 是否可以移动, 仅当 static 为 false 的时候生效               |
| widgetResizable |     `boolean`      | true  | 可选，内部 widget 是否可以改变大小                                              |
|  showGridBlock  |     `boolean`      | false | 可选，是否显示网格                                                              |
|     column      |      `number`      |  12   | 可选，默认为为 12，取值大于 12 的时候需要使用 gridstack.extra.scss 进行扩展 css |
|     minRow      |      `number`      |  --   | 可选，最小行数，0 表示不限制                                                    |
|     maxRow      |      `number`      |  --   | 可选，最大行数，0 表示不限制                                                    |
|   cellHeight    |  `number\|string`  |  --   | 可选，行高（含边距\*2），为 `number` 类型时候单位为 px                          |
|     margin      |  `number\|string`  |  --   | 可选，卡片相对格子内部的间距，为 `number` 类型时候单位为 px                     |

### d-dashboard 事件

|     事件      |                 类型                 | 说明                                                                                                                                                    |
| :-----------: | :----------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  widgetAdded  | `EventEmitter<DashboardWidgetEvent>` | 拖拽等 UI 界面上添加 widget 触发的事件。数组中单个数据 node 为添加的节点，包含 widgetData 信息, willItFit 信息表示是否有足够空间，origNode 为原来的节点 |
| widgetChanged | `EventEmitter<DashboardWidgetEvent>` | 拖拽等 UI 界面上改变 widget 触发的事件。数组中单个数据 node 为改变的节点，widget 为被拖动的 DashboardWidgetComponent                                    |
| widgetRemoved | `EventEmitter<DashboardWidgetEvent>` | 拖拽等 UI 界面上删除 widget 触发的事件。数组中单个数据 node 为删除的节点，包含 trashData 信息，widget 为被拖动的 DashboardWidgetComponent               |
| dashboardInit | `EventEmitter<DashboardWidgetEvent>` | dashboard 初始化完成                                                                                                                                    |

```typescript
export type DashboardWidgetEvent = Array<{
  widget?: DashboardWidgetComponent; // change, remove
  node?: GridStackNode & {
    widgetData?: any; // add
    willItFit?: boolean;
    trashData?: any; // remove
  };
  origNode?: GridStackNode; // add(optional)
}>;
```

### d-dashboard 函数

导出 dDashboard

```html
<d-dashboard #dashboard="dDashboard"> </d-dashboard>
```

`public getCurrentColumn():number` 查询当前 column 值，有多少列

`public getCurrentRow():number` 查询当前 row 值，有多少行

`public getCurrentColumnWidth():number` 查询当前 columnWidth，单列多宽，单位 px

`public getCurrentCellHeight():number` 查询当前 cellHeight，单行多高，单位 px

`public getCurrentMargin():number` 查询当前 margin 间距，单位 px

`public compact():void` 紧凑排列当前仪表盘内的挂件

`public willItFit(x: number, y: number, width: number, height: number, autoPosition = false):boolean` 查询新放置一个宽 width 高 height 的组件放到 x, y 是否能放下

## d-dashboard-widget 组件

该组件定义了一个仪表盘挂件（widget）。

### d-dashboard-widget 参数

|     参数     |   类型    | 默认  |                        说明                         |
| :----------: | :-------: | :---: | :-------------------------------------------------: |
|      x       | `number`  |   0   |       可选，坐标 x（第 x 行），首行为第 0 行        |
|      y       | `number`  |   0   |       可选，坐标 y（第 y 列），首列为第 0 列        |
|    width     | `number`  |   1   |             可选，widget 宽度（单位列）             |
|    height    | `number`  |   1   |             可选，widget 高度（单位行）             |
|      id      | `number`  |  --   | 可选，widget 节点 id，对应生成 GridStackNode 的 id  |
|   maxWidth   | `number`  |   0   |      可选，widget 调整大小最大宽度，0 为不限制      |
|  maxHeight   | `number`  |   0   |      可选，widget 调整大小最大高度，0 为不限制      |
|   minWidth   | `number`  |   0   |      可选，widget 调整大小最小宽度，0 为不限制      |
|  minHeight   | `number`  |   0   |      可选，widget 调整大小最小高度，0 为不限制      |
|   noResize   | `boolean` | false |            可选，widget 是否允许调整大小            |
|    noMove    | `boolean` | false |              可选，widget 是否允许移动              |
| autoPosition | `boolean` | false |   可选，是否忽略 x，y 自动寻找空位，仅初始化有效    |
|    locked    | `boolean` | false | 可选，widget 是否锁定位置，不被其他 widget 位置挤压 |
|  widgetData  |   `any`   |  --   |      可选，用户自定义数据，可用于区分传递等等       |

### d-dashboard-widget 事件

|     事件      |          类型          |                                                                           说明                                                                            |
| :-----------: | :--------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    xChange    | `EventEmitter<number>` |                             x 值发生变化， 建议双向绑定到对应的 x 值上去，如果未绑定回 x 的值，内部 x 值会强制修改（见说明）                              |
|    yChange    | `EventEmitter<number>` |                             y 值发生变化， 建议双向绑定到对应的 x 值上去，如果未绑定回 y 的值，内部 y 值会强制修改 （见说明）                             |
|  widthChange  | `EventEmitter<number>` |                     width 值发生变化， 建议双向绑定到对应的 width 值上去，如果未绑定回 width 的值，内部 width 值会强制修改 （见说明）                     |
| heightChange  | `EventEmitter<number>` |                   height 值发生变化， 建议双向绑定到对应的 height 值上去，如果未绑定回 height 的值，内部 height 值会强制修改（见说明）                    |  |
|  widgetInit   |     `EventEmitter`     |                                                            可选， widget 初始化完成的时候发射                                                             |
| widgetResize  |     `EventEmitter`     | 可选， widget 发生大小调整的时候触发，单列模式下列发生变化的时候触发， 调整大小时 width 为 widget 宽度（单位：列），height 为为 widget 的高度（单位：行） |
| widgetDestroy |     `EventEmitter`     |                                                               可选， widget 销毁的时候发射                                                                |

- 说明：如果没有绑定回原来的数据值，内部值会强制刷新以适配界面作用， 使用者可以在 dashboard 的 widgetChange 事件里统一处理。

## dDashboardLibraryWidget 指令

该组件定义了一个可以被拖入仪表盘的外部挂件。

### dDashboardLibraryWidget 参数

|      参数       |         类型         |  默认  | 说明                                                              |
| :-------------: | :------------------: | :----: | :---------------------------------------------------------------- |
| targetDashboard | `DashboardComponent` |   --   | 必选， 可拖入的目标仪表盘                                         |
|      width      |       `number`       |   1    | 可选，待拖入的 widget 宽度（单位列）                              |
|     height      |       `number`       |   1    | 可选，待拖入的 widget 高度（单位行）                              |
|    dragMode     |  `'copy' \| 'move'`  | 'copy' | 可选，移动或者复制                                              |
|  dragTemplate   |  `TemplateRef<any>`  |   --   | 可选，拖拽的时候的显示被拖拽的内容模板， 模板可用变量参考下面章节 |
|  dragCopyStyle  |      `boolean`       |   --   | 可选，拖拽的时候的是否全量复制样式                                |
|  dragDisabled   |      `boolean`       | false  | 可选，是否禁止拖拽，用于临时禁用拖入仪表盘                        |

### dragTemplate 的 outlet 参数

|    参数    |   类型   | 说明                              |
| :--------: | :------: | :-------------------------------- |
| \$implicit |  `any`   | 用户传入的 widgetData             |
|   width    | `number` | widget 拖入之后的宽度（单位：列） |
|   height   | `number` | widget 拖入之后的高度（单位：行） |

## dDashboardLibraryPanel 指令

该组件定义了一个可以被拖入仪表盘的外部挂件的容器， 用于获取挂件拖拽的信息。

### dDashboardLibraryPanel 事件

|      事件       |      类型      | 说明                             |
| :-------------: | :------------: | :------------------------------- |
| widgetDragStart | `EventEmitter` | 可选， widget 开始拖拽的时候发射 |
| widgetDragStop  | `EventEmitter` | 可选， widget 结束拖拽的时候发射 |

## dDashboardLibraryTrash 指令

该组件定义了一个可以接受仪表盘的挂件拖入的回收站。

### dDashboardLibraryTrash 参数

|      参数       |         类型         | 默认  | 说明                                                 |
| :-------------: | :------------------: | :---: | :--------------------------------------------------- |
| targetDashboard | `DashboardComponent` |  --   | 必选，删除操作关联的目标仪表盘                       |
|    trashData    |        `any`         |  --   | 可选，用户自定义的回收站信息，可用于区分不同的回收站 |
|  dropDisabled   |      `boolean`       | false | 可选，是否禁止被放，用于临时禁用接收仪表盘挂件拖进来 |
