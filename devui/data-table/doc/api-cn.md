# 如何使用

在module中引入：

```ts
import { DataTableModule } from 'ng-devui/data-table';
```

在页面中使用：

```html
<d-data-table></d-data-table>
```

## d-data-table

### d-data-table 参数
|        参数名         |             类型              | 默认值 |                                               描述                                               | 跳转 Demo                                                              |全局配置项| 
| :----------------: | :-------------------: | :---------------------------: | :----- | :----------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
|      dataSource       |            `any[]`            | --     |                                     必选，数据源，用于渲染表格数据                                     | [基本用法](demo#basic-usage)                     |
|         lazy          |           `boolean`           | --     |                                       可选，是否懒加载数据                                       | [列表数据懒加载](demo#lazy-loading-of-list-data) |
|      scrollable       |           `boolean`           | --     |                       可选，表格在超出容器时，是否可以通过滚动查看表格内容                       | [表格交互](demo#table-interaction)               |
|       maxWidth        |          `string px`          | --     |                              可选，限制表格最大宽度，默认撑满父容器                              |
|       maxHeight       |          `string px`          | --     |                                     可选，限制最大高度，默认                                     | [表头固定](demo#table-fixing)                    |
|       minHeight       |          `string px`          | --     |                                     可选，限制最小高度                                    |  --                |
|       size            |          `'mini'\| 'xs' \|'sm'\|'md'\|'lg'`   | 'sm'     |                                     可选，表格大小               |[表格样式](demo#mutil-styles)                     |
|  rowHoveredHighlight  |           `boolean`           | true   |                              可选，鼠标悬浮行时是否高亮,默认高亮认                               |
| generalRowHoveredData |           `boolean`           | false  |      可选，使用配置column方式实现table,鼠标悬浮行时$hovered是否记录到rowItem中，默认不记录       |
|       cssClass        |           `string`            | --     |                                       可选，自定义表格样式                                       |
|      tableWidth       |           `string`            | 100%   |                                          可选，表格宽度                                          |
|      tableHeight      |           `string`            | --     |                                          可选，表格高度，取值'100%'时依赖table父容器的高度                                          | [虚拟滚动](demo#virtual-scroll)                  |
| containFixHeaderHeight |      `boolean`            | false |     可选，固定表头指定的高度是否包含表头高度，`tableHeight`设置的高度默认是表格body的高度    | [固定表头虚拟滚动](demo#fixed-virtual-scroll)                  |
| fixHeader |      `boolean`            | false |     可选，表头是否固定    | [固定表头虚拟滚动](demo#fixed-virtual-scroll)                  |
|   checkableRelation   |      [`CheckableRelation`](#checkablerelation)      | --     |                             可选，配置树形表格的父子选中是否互相关联                             | [树形表格](demo#tree-form)                       |
|   loadChildrenTable   |           `(rowItem: any) => Promise<any>`           | --     |                            可选，展开子表格的回调，用于异步加载子表格                            | [树形表格](demo#tree-form)                       |
| loadAllChildrenTable  |           `() => Promise<any>`           | --     |                      可选，表头展开所有子表格的回调，用于异步加载所有子表格                      | [树形表格](demo#tree-form)                       |
|     colDraggable      |           `boolean`           | false  |                                    可选，表格列是否可拖动排序                                    | [列拖拽](demo#column-dragging)                   |
|    colDropFreezeTo    |           `number`            | 0      |                            可选，表格列可拖动排序时配置前n列不可拖动                             | [列拖拽](demo#column-dragging)                   |
|     virtualScroll     |           `boolean`           | false  |                                      可选，是否开启虚拟滚动，虚拟滚动参数对树形表格不生效，需要使用树形虚拟滚动请参考大数据量树形表格demo的实现         | [虚拟滚动](demo#virtual-scroll)                  |
|    virtualItemSize    |           `number`            | 40     |                       可选，虚拟滚动时每一行的高度，默认为表格默认行高40`px`                       | [虚拟滚动](demo#virtual-scroll)                  |
|  virtualMinBufferPx   |           `number`            | 80     |                    可选，虚拟滚动时缓冲区最小像素高度，低于该值时将加载新结构                    | [虚拟滚动](demo#virtual-scroll)                  |
|  virtualMaxBufferPx   |           `number`            | 200    |                                可选，虚拟滚动时缓冲区最大像素高度                                | [虚拟滚动](demo#virtual-scroll)                  |
|   tableWidthConfig    |     [`TableWidthConfig[]`](#tablewidthconfig)      | []     |                                       可选，配置表格的列宽,在含有子表格如树形表格的情况下必选                                       | [基本用法](demo#basic-usage)                     |
|       checkable       |           `boolean`           | --     |                               可选，Datatable是否提供勾选行的功能                                | [表格交互](demo#table-interaction)               |
|     checkOptions      |     [`TableCheckOptions[]`](#tablecheckoptions)     | --     |                                   可选，表头选中的下拉项及操作                                   | [自定义表格选中操作](demo#table-check-options)   |
|     checkOptionsIndex      |     `number`     |   1050    |            可选，表头选中的下拉的z-index               | --   |
|  headerCheckDisabled  |           `boolean`           | --     |                                  可选，表头checkbox是否disabled                                  |
|  headerCheckVisible   |           `boolean`           | true   |                                    可选，表头checkbox是否可见                                    |
|   showExpandToggle    |           `boolean`           | --     |            可选，是否提供显示扩展行的功能，为true则在配置了扩展行的行前面生成操作按钮            | [扩展行](demo#expand-row)                        |
|     showSortIcon      |           `boolean`           | fasle   |                              可选，是否显示排序未激活图标，默认不显示                              | [表格交互](demo#table-interaction)               |
|     showFilterIcon      |           `boolean`           | fasle   |                              可选，是否显示筛选未激活图标，默认不显示                              | [表格交互](demo#table-interaction)               |
|  showOperationArea    |           `boolean`           | false   |                     可选，配置表头操作未激活状态下是否显示操作区域，默认不显示                              | [表格交互](demo#table-interaction)               |
|      hideColumn       |          `string[]`           | --     |                                         可选，用于隐藏列,传入对应的field字段                                         |
|    pageAllChecked     |           `boolean`           | --     |                                     可选，选中当前页所有row                                      |
|   onlyOneColumnSort   |           `boolean`           | --     |                              可选，是否限制多列排序的输出限制为一项                              | [表格交互](demo#table-interaction)               |
|       multiSort       |       [`SortEventArg[]`](#sorteventarg)      | []     |                            可选，多列选择数组，用来指导那几列会被排序,仅column模式下有效                            | [表格交互](demo#table-interaction)               |
|      resizeable       |           `boolean`           | --     |                                    可选，是否可以拖拽调整列宽                                    | [表格交互](demo#table-interaction)               |
|        timeout        |           `number`            | 300    | 可选，同时绑定单击、双击事件时，用于区分点击的时间间隔, 默认300`ms`，两个事件不同时使用可以指定为0 |
|  headerExpandConfig   |      [`TableExpandConfig`](#tableexpandconfig)      | --     |                                   可选，配置header下的额外内容                                   | [扩展行](demo#expand-row)                        |
|    beforeCellEdit     |           `(rowItem: any, column: any) => Promise<any>`           | --     |         可选，单元格编辑前的拦截方法, <br>resolve(extraOptions)将更新该列的extraOptions          | [编辑单元格](demo#edit-cell)                     |
|    beforeCellEditEnd     |           `(rowItem: any, column: any) => boolean`           | --     |         可选，单元格编辑结束时的拦截方法，返回true结束编辑，用于添加编辑校验规则，暂不支持异步校验          | [编辑单元格](demo#edit-cell)                     |
|    headerBg     |           `boolean`           | false     |         可选，表头是否显示背景色         | [表格样式](demo#mutil-styles)                     |
|    tableLayout     |           `'fixed'\|'auto'`           | 'fixed'     |         可选，表格布局         | [表格样式](demo#mutil-styles)                     |
|    borderType     |           `''\|'bordered'\|'borderless'`           | ''     |         可选，表格边框类型，默认有行边框，bordered：全边框，borderless：无边框         | [表格样式](demo#mutil-styles)                     |
|    striped     |           `boolean`           | false     |         可选，表格是否展示为斑马纹间隔         | [表格样式](demo#mutil-styles)                     |
|    shadowType     |           `'normal' \| 'embed'`          | 'embed'     |         可选，表格为阴影类型还是内嵌类型        | [表格样式](demo#mutil-styles)                     |
|    tableOverflowType     |           `'overlay' \| 'auto'`          | 'auto'     |         可选，表格滚动条类型，overlay情况下鼠标悬浮才会显示滚动条       | [表格样式](demo#mutil-styles)                     |

### d-data-table 事件

|         事件          |                  类型                  |                           描述                           |                        跳转 Demo                         |
| :-------------------: | :------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
|    rowCheckChange     | `EventEmitter<RowCheckChangeEventArg>` |                 某一行的勾选状态变化事件                 |
|    checkAllChange     |        `EventEmitter<boolean>`         |                当前页码全勾选状态变化事件                |
|        resize         |  `EventEmitter<ColumnResizeEventArg>`  |               列宽变化事件，返回单元格信息               | [表格交互](demo#table-interaction) |
|  childrenTableClose   |          `EventEmitter<any>`           |              子列表关闭事件，返回列表行信息              |
| allChildrenTableClose |          `EventEmitter<any>`           |                    全部子列表关闭事件                    |
|    multiSortChange    |     `EventEmitter<SortEventArg[]>`     | 多列选择Change事件，用来更新多列选择数组，返回单元格信息, 仅column模式下生效 | [表格交互](demo#table-interaction) |
|       cellClick       |  `EventEmitter<CellSelectedEventArg>`  |            表格单元格点击事件，返回单元格信息            | [表格交互](demo#table-interaction) |
|      cellDBClick      |  `EventEmitter<CellSelectedEventArg>`  |            表格单元格双击事件，返回单元格信息            | [表格交互](demo#table-interaction) |
|       rowClick        |  `EventEmitter<RowSelectedEventArg>`   |                表格行点击事件，返回行信息, 左右键都会触发, 如果有单元格内点击元素需要拦截触发，需要拦截mouseup事件                | [表格交互](demo#table-interaction) |
|      rowDBClick       |  `EventEmitter<RowSelectedEventArg>`   |                表格行双击事件，返回行信息                | [表格交互](demo#table-interaction) |
|     detialToggle      |          `EventEmitter<any>`           |     使用配置column方式时扩展行展开收起事件，返回行状态信息 | [扩展行](demo#expand-row)|
|     cellEditStart     |  `EventEmitter<CellSelectedEventArg>`  |          表格单元格开始编辑事件，返回单元格信息          |
|      cellEditEnd      |  `EventEmitter<CellSelectedEventArg>`  |          表格单元格结束编辑事件，返回单元格信息          |    [编辑单元格](demo#edit-cell)    |
|   tableScrollEvent    |         `EventEmitter<Event>`          |                     表格内部滚动事件                     | |
|   columnDragEnd  |    `EventEmitter<{form: index, to: index}>`    |                列拖拽结束事件                     |   [列拖拽](demo#column-dragging) |
|   loadMore  |    `EventEmitter<{any}>`    |                延迟懒加载完成事件                     |   [懒加载](demo#lazy-loading-of-list-data) |

### d-data-table 公共方法

|            方法名            |           参数            | 默认值 |                                 描述                                 |                        跳转 Demo                         |
| :--------------------------: | :-----------------------: | :----- | :------------------------------------------------------------------: | :------------------------------------------------------: |
|        getCheckedRows        |            --             | --     |                         获取当前选中的行数据                         | [表格交互](demo#table-interaction) |
|      setRowCheckStatus       | [`RowCheckChangeEventArg`](#rowcheckchangeeventarg)  | --     |        设置某一行的选中状态，可以处理表头、父子表格的选中关系        | [表格交互](demo#table-interaction) |
|     setTableCheckStatus      |   [`TableCheckStatusArg`](#tablecheckstatusarg)   | --     |                     设置当前表格的全选、半选状态                     |
|   setRowChildToggleStatus    | [`RowToggleStatusEventArg`](#RowToggleStatusEventArg) | --     | 设置某一行的子表格展开、收起状态，处理异步加载子表格的选中状态时调用 |     [树形表格](demo#tree-form)     |
| setTableChildrenToggleStatus |      `open: boolean`      | --     |                设置当前表格的所有子表格展开、收起状态                |     [树形表格](demo#tree-form)     |
|     cancelEditingStatus      |            --             | --     |                     取消正在编辑单元格的编辑状态                     |    [编辑单元格](demo#edit-cell)    |

### rowItem参数(行数据rowItem为dataSource的数组元素，可以初始化行数据的以下字段配置表格的行为)

|       参数        |   类型    | 默认值 |             描述             |                        跳转 Demo                         |
| :---------------: | :-------: | :----- | :--------------------------: | :------------------------------------------------------: |
|     $checked      | `boolean` | false  |      可选，该行是否选中      | [表格交互](demo#table-interaction) |
|   $halfChecked    | `boolean` | false  |      可选，该行是否半选      | [表格交互](demo#table-interaction) |
| $isChildTableOpen | `boolean` | false  | 可选，该行下的子表格是否展开 |     [树形表格](demo#tree-form)     |
|     children      |   `array`   | --     |    配置该行的子table数据     |     [树形表格](demo#tree-form)     |
|  $checkDisabled   | `boolean` | false  |    可选，该行是否禁止选中    | [表格交互](demo#table-interaction) |
|   $checkBoxTips   | `string`  | --     | 可选，配置该行checkbox的提示 | [表格交互](demo#table-interaction) |

# dTableHead

## dTableHead 参数

|    参数名     |         类型          | 默认值 |                                 描述                                 | 跳转 Demo                                                            |
| :-----------: | :-------------------: | :----- | :------------------------------------------------------------------: | :------------------------------------------------------------------- |
|   checkable   |       `boolean`       | --     | 可选，在表头第一列显示checkbox，用于全选，可以跟行数据的选中状态联动 | [表格交互](demo#table-interaction)             |
| checkOptions  | `TableCheckOptions[]` | --     |                     可选，表头选中的下拉项及操作                     | [自定义表格选中操作](demo#table-check-options) |
|     checkOptionsIndex      |     `number`     |   1050    |            可选，表头选中的下拉的z-index               | --   |
| checkDisabled |       `boolean`       | --     |                    可选，表头checkbox是否disabled                    |


## dHeadCell 参数

|        参数名        |                    类型                    | 默认值 |                             描述                              | 跳转 Demo                                                |
| :------------------: | :----------------------------------------: | :----- | :-----------------------------------------------------------: | :------------------------------------------------------- |
|    resizeEnabled     |                 `boolean`                  | --     |                   可选，该列宽度是否可调整                    | [表格交互](demo#table-interaction) |
|       maxWidth       |                `string`                 | --     |                  可选，拖动调整宽度时的最大宽度，单位`px`                   |
|       minWidth       |                `string`                 | --     |                  可选，拖动调整宽度时的最小宽度，单位`px`                   |
|      filterable      |                 `boolean`                  | --     |                   可选，该列是否可过滤                    | [表格交互](demo#table-interaction) |
|  closeFilterWhenScroll   |            `boolean`            | --  |                   可选，表格或者body滚动时是否关闭过滤框       | [表格交互](demo#table-interaction) |
| customFilterTemplate |               `TemplateRef`                | --     |                 可选，过滤弹出框的自定义模板                  | [表格交互](demo#table-interaction) |
| extraFilterTemplate |               `TemplateRef`                | --     |                 可选，过滤弹出框扩展区域自定义模板                | [表格交互](demo#table-interaction) |
|       searchFn       | `(term: string) => Observable<Array<any>>` |        |               可选，过滤时输入关键字的匹配方法                |
|      filterList      |                  `array`                   | --     |              过滤列表，当filterable为true时必选               | [表格交互](demo#table-interaction) |
|    filterMultiple    |                 `boolean`                  | --     |      可选，设置该列为多选或单选, true为多选，false为单选      | [表格交互](demo#table-interaction) |
|    filterBoxWidth    |                  `string`                  | --     |                 过滤弹出框的宽度，如：‘300px’                 |
|   filterBoxHeight    |                  `string`                  | --     |                 过滤弹出框的高度，如：‘400px’                 |
|     beforeFilter     | `(value) => boolean \| Promise<boolean> \| Observable<boolean>` | --     | 可选，表格过滤弹出框弹出前的回调函数，返回false可阻止弹框弹出 | [表格交互](demo#table-interaction) |
|       sortable       |                 `boolean`                  | --     |                     可选，该列是否可排序                      | [表格交互](demo#table-interaction) |
|    sortDirection     |              `SortDirection`               | --     |                  可选，设置该列的已排序状态                   | [表格交互](demo#table-interaction) |
|     nestedColumn     |                 `boolean`                  | --     |           可选，是否展示树形表格的表头展开\折叠图标           | [树形表格](demo#tree-form)         |
|    iconFoldTable     |                `DOMString`                 | --     |                可选，自定义树形表格的折叠图标,传入自定义html字符串                 | [树形表格](demo#tree-form)         |
|   iconUnFoldTable    |                `DOMString`                 | --     |                可选，自定义树形表格的展开图标,传入自定义html字符串                  | [树形表格](demo#tree-form)         |
|      fixedLeft       |                  `string`                  | --     |            可选，该列固定到左侧的距离，如：‘100px’            | [固定列](demo#fixed-column)        |
|      fixedRight      |                  `string`                  | --     |            可选，该列固定到右侧的距离，如：‘100px’            | [固定列](demo#fixed-column)        |
|     showSortIcon      |           `boolean`           | fasle   |                              可选，是否显示排序未激活图标，默认不显示                              | [表格交互](demo#table-interaction)               |
|     showFilterIcon      |           `boolean`           | fasle   |                              可选，是否显示筛选未激活图标，默认不显示                              | [表格交互](demo#table-interaction)               |
|     column      |           `any`           | --   |                              可选，可以将数据透传至filterList的自定义模板中                              |               |

## dHeadCell 事件

|           事件           |        类型         |                        描述                         | 跳转 Demo                                                |
| :----------------------: | :-----------------: | :-------------------------------------------------: | :------------------------------------------------------- |
|       filterChange       |  `EventEmitter<FilterConfig[]>`   |        确认筛选回调事件，返回选中的筛选数组         | [表格交互](demo#table-interaction) |
|       filterToggle       |  `EventEmitter<{isOpen: boolean;checklist: FilterConfig[];}>`   |        筛选面板的展开收起事件         | [表格交互](demo#table-interaction) |
|        sortChange        |   `EventEmitter<SortEventArg>`    |           排序回调事件，返回该列排序信息            | [表格交互](demo#table-interaction) |
|     resizeStartEvent     |    `EventEmitter<MouseEvent>`     |              该列宽度调整开始时的事件               |
|      resizingEvent       | `EventEmitter<{ width: string }>` |              该列宽度调整进行中的事件               |
|      resizeEndEvent      | `EventEmitter<{ width: string }>` |              该列宽度调整结束时的事件               | [表格交互](demo#table-interaction) |
| toggleChildrenTableEvent |      `EventEmitter<boolean>`      | 所有子表格展开收起事件，true表示展开，false表示收起 | |
| sortDirectionChange |      `EventEmitter<SortDirection>`      | 排序顺序方向变化事件 |

# dTableCell

## dTableCell 参数

|     参数名      |              类型               | 默认值 |                              描述                              | 跳转 Demo                                          |
| :-------------: | :-----------------------------: | :----- | :------------------------------------------------------------: | :------------------------------------------------- |
|    editable     |            `boolean`            | --     |                     可选，单元格是否可编辑                     | [编辑单元格](demo#edit-cell) |
|   editableTip   |        `'hover'\|'btn'`         | --     |         可选，编辑提示，hover背景变色，btn展示编辑按钮         | [编辑单元格](demo#edit-cell) |
|  nestedColumn   |            `boolean`            | --     |        可选，树形表格下该行有子表格时展示展开、折叠图标        | [树形表格](demo#tree-form)   |
|   nestedLayer   |            `number`             |        |           树形表格下的层级,nestedColumn为true时必选            | [树形表格](demo#tree-form)   |
|     rowItem     |             `array`             | --     | 行数据，nestedColumn为true时必选，也可作为单元格编辑的回调参数 | [树形表格](demo#tree-form)   |
| beforeEditStart | `function\|Promise\|Observable` | --     |    可选，单元格开始编辑前回调，返回false阻止单元格开始编辑     | [编辑单元格](demo#edit-cell) |
|  beforeEditEnd  | `function\|Promise\|Observable` | --     |   可选，单元格结束编辑前的回调，返回false阻止单元格结束编辑    | [编辑单元格](demo#edit-cell) |
|  iconFoldTable  |           `DOMString`           | --     |                 可选，自定义树形表格的折叠图标                 | [树形表格](demo#tree-form)   |
| iconUnFoldTable |           `DOMString`           | --     |                 可选，自定义树形表格的展开图标                 | [树形表格](demo#tree-form)   |
|    fixedLeft    |            `string`             | --     |            可选，该列固定到左侧的距离，如：‘100px’             | [固定列](demo#fixed-column)  |
|   fixedRight    |            `string`             | --     |            可选，该列固定到右侧的距离，如：‘100px’             | [固定列](demo#fixed-column)  |
|     editing     |            `boolean`            | --     |         可选，使用[(editing)]获取和控制单元格编辑状态          | [编辑单元格](demo#edit-cell) |
|      field      |            `string`             | --     |  单元格所属列的字段，作为beforeEditStart、beforeEditEnd的参数  | [编辑单元格](demo#edit-cell) |
| nestedColumnIndent|         `number`                | 16     |  单元格中子表格的缩进距离，单位px                              | [树形表格](demo#tree-form) |

## 单元格公共class

|     参数名       |                              描述                              | 跳转 Demo                                          |
| :-------------: | :------------------------------------------------------------: | :------------------------------------------------- |
|    devui-operation-cell    |                     单元格内放置input，d-icon等操作类组件时需要加上，会调整padding适应行高                     |  |
|    devui-table-link    |                     单元格内放置链接时需要加上                     |  |
|    devui-table-title    |                     单元格内放置表头信息时需要加上，会自动加粗                     |  |


## dTableCell 事件

|         事件          |   类型    |                          描述                           | 跳转 Demo                                          |
| :-------------------: | :-------: | :-----------------------------------------------------: | :------------------------------------------------- |
|    editStatusEvent    | `EventEmitter<boolean>` |                   单元格编辑状态事件                    | [编辑单元格](demo#edit-cell) |
| toggleChildTableEvent | `EventEmitter<boolean>` | 当前行的子表格展开收起事件，true表示展开，false表示收起 | [树形表格](demo#tree-form)   |

#### 使用自定义模板方式时配置dTableBody的行模板

实现参考**[树形表格](demo#tree-form)**

``` html
<ng-template
  let-rowItem="rowItem"
  let-rowIndex="rowIndex"
  let-nestedLayer="nestedLayer"
  let-nestedIndex="nestedIndex">
  <tr dTableRow></tr>
</ng-template>
// rowItem: 行数据
// rowIndex: 行序号
// nestedLayer: 树形表格下该行所属表格的层级，由组件生成，最外层表格为0，自增长
// nestedIndex: 树形表格下的行索引，由组件生成
```

#### 配置数据为空的时候的提示模板

表格接受 `#noResultTemplateRef` 模板，实现参考**[异步加载数据](demo#async-loading)**

#### 自定义过滤弹出框

实现参考**[表格交互](demo#table-interaction)**

``` html
<ng-template
 let-filterList ="filterListDisplay"
 let-dropdown="dropdown"
 let-column="column">
  <!--cell 内容-->
</ng-template>

// filterListDisplay: 传入的filterList的值
// dropdown: 获取dropdown的引用，主要用于控制弹出框的打开和关闭
// column: 使用配置column实现的,当前列的元信息，对应DataTableColumnTmplComponent类
```

## CheckableRelation

``` ts
export interface CheckableRelation {
  upward: boolean; // 选中子关联父
  downward: boolean; // 选中父关联子
}
```

## TableWidthConfig

```ts
export interface TableWidthConfig {
  field: string; // 列名
  width: string; // 宽度，单位px
}
```

## TableCheckOptions

```ts
export interface TableCheckOptions {
  label: string;
  onChecked: Function;
}
```

## SortEventArg

```ts
export interface SortEventArg {
  field?: string; // 列名
  direction: SortDirection; // 顺序
}
```

## TableExpandConfig

```ts
export interface TableExpandConfig {
    expand ? : boolean, // 是否展开
    expandTemplateRef ? : ElementRef, //自定义模板
    description ? : string // 简单描述文字
}
```

## RowCheckChangeEventArg

```ts
export interface RowCheckChangeEventArg {
  rowIndex: number; // 行序号
  nestedIndex: string; // 树形表格下的行索引，由组件生成
  rowItem: any; // 行数据
  checked: boolean; // 是否选中
}
```

## TableCheckStatusArg

```ts
export interface TableCheckStatusArg {
  pageAllChecked?: boolean; // 全选
  pageHalfChecked?: boolean; // 半选
}
```

## RowToggleStatusEventArg

```ts
export interface RowToggleStatusEventArg {
  rowItem: any; // 行数据
  open: boolean; // 子表格是否展开
}
```

## FilterConfig

```ts
export interface FilterConfig {
  id: number | string;
  name: string;
  value: any;
  checked?: boolean; // 多选时控制选中
  selected?: boolean; // 单选时控制选中
}
```

## SortDirection

```ts
export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  default = ''
}
```

# d-table-option-toggle

动态列及样式配置器，数据驱动，返回配置生成的数据；
## d-table-option-toggle 参数

|     参数名      |              类型               | 默认值 |                              描述                              | 跳转 Demo                                          |
| :-------------: | :-----------------------------: | :----- | :------------------------------------------------------------: | :------------------------------------------------- |
|    columnsData     |            `Array<ColData>`            | []     |                     必选，配置列表头数据                    | [动态列及样式](demo#dynamic-cols) |
|    colSort     |            `boolean`            | true     |                     可选，是否允许列排序                    | [动态列及样式](demo#dynamic-cols) |
|    styleSetting     |            `TableStyleData`            | {}     |                     可选，添加相应样式配置及初始值                    | [动态列及样式](demo#dynamic-cols) |
|    toggleMode     |            `'dropdown' \| 'modal'`            | 'dropdown'     |                     触发类型，下拉或者弹窗，列数过多建议使用弹窗                    | [动态列及样式](demo#dynamic-cols) |
|    modalWidth     |            `string`            | '600px'     |                    弹窗宽度                    | [动态列及样式](demo#dynamic-cols) |

## d-table-option-toggle 事件

|         事件          |   类型    |                          描述                           | 跳转 Demo                                          |
| :-------------------: | :-------: | :-----------------------------------------------------: | :------------------------------------------------- |
|    colChanges    | `EventEmitter<Array<ColData>>` |                   列状态变化                    | [动态列及样式](demo#dynamic-cols) |
|    styleChanges    | `EventEmitter<TableStyleData>` |                   表格样式变化返回                    | [动态列及样式](demo#dynamic-cols) |

## ColData

```ts
export interface ColData {
  header: string;
  checked: boolean;
  category?: string;
  disabled?: boolean;
  [prop: string]: any;
}
```

## TableStyleData

```ts
export interface TableStyleData {
  size?: 'xs' | 'sm' | 'md';
  borderType?: '' | 'borderless';
  striped?: boolean;
  shadowType?: 'embed' | 'normal';
}
```

# 以下为通过配置column来实现table时的才有的参数和方法

## d-column 参数 

|               参数                |              类型               | 默认值            |                                          描述                                           | 跳转 Demo                                                |
| :-------------------------------: | :-----------------------------: | :---------------- | :-------------------------------------------------------------------------------------: | :------------------------------------------------------- |
|             editable              |            `boolean`            | false             |                          可选，在d-column上指定该列是否可编辑                           | [编辑单元格](demo#edit-cell)       |
|             maxWidth              |           `string px`           | --                |                                     可选，拖动调整宽度时的最大宽度                                      |
|             minWidth              |           `string px`           | --                |                                     可选，拖动调整宽度时的最小宽度                                      |
|               field               |            `string`             | --                |                                        该列字段                                         | [基本用法](demo#basic-usage)       |
|              header               |            `string`             | --                |                                      该列表头文字                                       | [基本用法](demo#basic-usage)       |
|             sortable              |            `boolean`            | --                |                                    可选，是否可排序                                     | [表格交互](demo#table-interaction) |
|             editable              |            `boolean`            | --                |                                    可选，是否可编辑                                     | [表格交互](demo#table-interaction) |
|               width               |         `string px、%`          | --                |                                          宽度                                           | [基本用法](demo#basic-usage)       |
|           nestedColumn            |            `Boolean`            | false             |       可选，指定该列作为树形表格的操作列，即有展开\折叠按钮和内容缩进表明层级关系       | [树形表格](demo#tree-form)         |
|     extraOptions.editableTip      |           `'btn'、''`           | --                | 可选，可编辑提示，'btn'表示鼠标悬浮单元格出现编辑按钮，未配置时鼠标悬浮单元格背景色变化 | [编辑单元格](demo#edit-cell)       |
|    extraOptions.iconFoldTable     |           `Template`            | --                |                            可选，自动定义树形表格的折叠图标                             | [树形表格](demo#tree-form)         |
|   extraOptions.iconUnFoldTable    |           `Template`            | --                |                            可选，自动定义树形表格的展开图标                             | [树形表格](demo#tree-form)         |
| extraOptions.showHeadTableToggler |            `boolean`            | false             |                       可选，树形表格是否在header出现展开\折叠图标                       | [树形表格](demo#tree-form)         |
|               order               |            `number`             | Number. MAX_VALUE |                                      可选，列序号                                       | [基本用法](demo#basic-usage)       |
|            filterable             |            `boolean`            | --                |                                    可选，是否可筛选                                     | [表格交互](demo#table-interaction) |
|  closeFilterWhenScroll     |                 `boolean`            | --  |                   可选，表格或者body滚动时是否关闭过滤框       | [表格交互](demo#table-interaction) |
|            filterList             |             `array`             | --                |                    传入需要操作的筛选列表，当filterable为true时必选                     | [表格交互](demo#table-interaction) |
|          filterMultiple           |            `boolean`            | true              |                 可选，选择筛选列表为多选或单选, true为多选，false为单选                 | [表格交互](demo#table-interaction) |
|          filterIconActive           |            `boolean`            | false              |                 可选，主动设置filter 图标是否激活                 | [表格交互](demo#table-interaction) |
|       customFilterTemplate        |          `TemplateRef`          | --                |            可选，表格过滤弹出框的自定义模板，参考DOC下‘自定义过滤弹出框’使用            | [表格交互](demo#table-interaction) |
|       extraFilterTemplate        |          `TemplateRef`          | --                |            可选，表格过滤弹出框扩展区域自定义模板                                      | [表格交互](demo#table-interaction) |
|           beforeFilter            | `(value) => boolean \| Promise<boolean> \| Observable<boolean>` | --                |              可选，表格过滤弹出框弹出前的回调函数，返回false可阻止弹框弹出              | [表格交互](demo#table-interaction) |
|             cellClass             |            `string`             | --                |                                  该列单元格自定义class                                  |
|             fixedLeft             |            `string`             | --                |                            该列固定到左侧的距离，如：‘100px’                            | [固定列](demo#fixed-column)        |
|            fixedRight             |            `string`             | --                |                            该列固定到右侧的距离，如：‘100px’                            | [固定列](demo#fixed-column)        |
|          filterBoxWidth           |              `any`              | --                |                              过滤弹出框的宽度，如：‘300px’                              |
|          filterBoxHeight          |              `any`              | --                |                              过滤弹出框的高度，如：‘400px’                              |
|        nestedColumnIndent           |           `number`              | 16                |                            单元格中子表格的缩进距离，单位px                              | [树形表格](demo#tree-form) |
|        advancedHeader           |           `advancedHeader`              |      --          |                            column类型的表格中实现表头单元格合并                              | [表头分组](demo#header-grouping) |
|        headCellApplyAll           |           `boolean`              |      false          |                            column类型的表格中head-cell模板是否作用于每一层表头，false时只作用于最后一层                           | |

## d-column 事件

|     事件     |       类型       |                 描述                 | 跳转 Demo                                                |
| :----------: | :--------------: | :----------------------------------: | :------------------------------------------------------- |
| filterChange | `FilterConfig[]` | 确认筛选回调事件，返回选中的筛选数组 | [表格交互](demo#table-interaction) |
|       filterToggle       |  `EventEmitter<{isOpen: boolean;checklist: FilterConfig[];}>`   |        筛选面板的展开收起事件         | [表格交互](demo#table-interaction) |

## rowItem参数
|       参数        |        类型         | 默认值 |                                                   描述                                                    |
| :---------------: | :-----------------: | :----- | :-------------------------------------------------------------------------------------------------------: |
| $editDeniedConfig |       `array`       | --     | 可选，与column配合配置该行的某些单元格的编辑权限, <br>例如: 配置为['age']，表示field为age的单元格不可编辑 |
|   $expandConfig   | [`TableExpandConfig`](#tableexpandconfig) | --     |                                        可选，配置该行下的额外内容                                         |
|     $rowClass     |      `string`       | --     |                                        可选，配置该行的自定义class                                        |
|     $hovered      |      `boolean`      | false  |                          鼠标悬浮该行元素时该值为true, <br>离开该行时该值为false                          |

#### 自定义单元格

单元格数据(cellItem, 通过rowItem[column.field]取值)为string类型时，组件可直接展示，当单元格数据为object类型，或者想定义该列单元格的特殊行为时，需要自定义单元格来进行展示；
例如：我们想 `Gender` 这一列的数据大写展示, 并在鼠标移动上去展示一个提示，相关节选代码如下

``` 
<d-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <d-cell>
    <ng-template let-cellItem="cellItem">
      <span dTooltip [content]='cellItem' [position]="'bottom'">
        {{cellItem.toUpperCase()}}
      </span>
    </ng-template>
  </d-cell>
</d-column>
```

#### 自定义单元格编辑模板

Datatable支持通过模板自定义单元格编辑功能

``` 
<d-column field="lastName" header="Last Name" [fieldType]="'customized'" [editable]="true">
  <d-cell-edit>
    <ng-template let-rowItem="rowItem" let-column="column">
      <input [(ngModel)]="rowItem[column.field]" maxlength="5" />
    </ng-template>
  </d-cell-edit>
</d-column>
```

自定义单元格和配置单元格编辑时的完整template如下

``` xml
<ng-template
  let-rowIndex="rowIndex"
  let-colIndex="colIndex"
  let-rowItem="rowItem"
  let-column="column"
  let-cellItem="cellItem"
  let-tableLevel="tableLevel">
  <!--cell 内容-->
</ng-template>

// rowIndex: 行序号
// colIndex: 列序号
// rowItem: 当前行的数据，对应 filed 和 cellItem的键值对
// column: 当前列的元信息，对应DataTableColumnTmplComponent类
// cellItem: 当前单元格的值, 通过rowItem[column.field]取值
// tableLevel: 树形表格下所属表格的层级，最外层为0，自增长
```

#### 自定义表头单元格

如果需要表头单元格，列入想展示效果为鼠标移动在表格上方会提示 `Gender is a head cell template` .

``` xml
<d-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <d-head-cell>
    <ng-template let-column="column">
      <span dTooltip [content]="column.header + ' is a head cell template'" [position]="'bottom'">
        {{column.header}}
      </span>
    </ng-template>
  </d-head-cell>
</d-column>

// column: 为column输入值，对应 `DataTableColumnTmplComponent` 类
```

#### 多行表头和表头合并单元格

* 需要在d-column使用时候，增加

``` javascript
advancedHeader: Array < {
    header: string;
    rowspan: number;
    colspan: number;
}
```

注意: 空单元格也需要表示，并根据内容把rowspan/colspan置为0，如果同时使用列宽拖拽和多行表头，请为列内容附上宽度width，如果第一行的列宽度不正确，请手动为advancedHeader[rowNumber]增加一个属性$width

#### 大数据量树形表格

## virtual-scroll-tree-table 参数
|       参数        |        类型         | 默认值 |                                                   描述                                                    |       跳转 Demo       |
| :---------------: | :-----------------: | :----- | :-------------------------------------------------------------------------------------------------------: |:-----------------:  |
|    dataSource     |       `any[]`      | --     |                                        必选，铺平的数据源，用于渲染表格数据，可以使用公共方法flatTreeData将树形结构铺平                                        |[大数据量树形表格基本用法](demo#virtual-scroll-tree-table-basic)|
|  editOption |       `any[]`      | --     |                                        可选，用于配置修改时下拉选项资源                                      |[大数据量树形表格操作功能](demo#virtual-scroll-tree-table-operation)|
|     displayRowNum      |      `number`      | 10     |                                        可选，用于配置表格显示行数,表格高度由行数乘以行高决定                                    |[大数据量树形表格基本用法](demo#virtual-scroll-tree-table-basic)|
|     rowHeight      |      `number`      |  -    |                                        可选，用于配置表格行高，不传的话取DataTablePropertiesInterface.size的值                                   |[大数据量树形表格基本用法](demo#virtual-scroll-tree-table-basic)|
|     dataTableProperties      |      [`DataTablePropertiesInterface`](#DataTablePropertiesInterface)      | --     |         可选，对dataTable原有参数的支持，可支持定义在DataTablePropertiesInterface中的参数                            |[大数据量树形表格交互](demo#virtual-scroll-tree-table-interaction)|
|     draggable      |      `boolean`      | false     |                                        可选，表格是否开启行拖拽                                    |[大数据量树形表格交互](demo#virtual-scroll-tree-table-interaction)|
|     checkableRelation      |      `CheckableRelation`      | { upward: true, downward: true }     |                                        可选，表格的树形父子选中逻辑关系                                  | - |
|     dragDomTemplate      |      `TemplateRef<any>`      |  -  |            拖拽dom模板，暴露两个参数rowItemList和columns                | - |

## virtual-scroll-tree-table 事件
|         事件          |                  类型                  |                           描述                           |                        跳转 Demo                         |
| :-------------------: | :------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
|        save         |  `EventEmitter<any>`  |               返回操作改变之后的数据               | [大数据量树形表格基本用法](demo#virtual-scroll-tree-table-basic) |
|        allChecked         |  `EventEmitter<any>`  |               返回表头复选框状态               | [大数据量树形表格交互](demo#virtual-scroll-tree-table-interaction) |
|        dropRow         |  `EventEmitter<dataList: any[];dropIndex: number;>`  |               表格行拖拽的投放事件               | [大数据量树形表格拖拽](demo#virtual-scroll-tree-table-multi-drag) |
|        tableRenderEnd         |  `EventEmitter<void>`  |               表格数据变更后渲染完成的回调事件               | |

原datatable事件都可以透传，支持multiSortChange，cellClick，cellDBClick，rowClick，rowDBClick，cellEditStart，cellEditEnd，resize事件。

## 使用d-column方式自定义模板和操作列

``` xml
<d-column field="category" header="类别" [order]="1"
[width]="'70px'" [editable]="true" [extraOptions]="{editableTip:'btn'}">
    <d-cell>
    <ng-template let-rowItem="rowItem">
        <span>{{ rowItem.category }}</span>
    </ng-template>
    </d-cell>
    <d-cell-edit>
    <ng-template let-rowItem="rowItem" let-column="column">
        <div class="customized-editor edit-padding-fix">
        <d-select
            [options]="editOption.category"
            autoFocus="true"
            toggleOnFocus="true"
            [appendToBody]="true"
            [(ngModel)]="rowItem.category"
            (ngModelChange)="onEditEnd(rowItem, 'categoryEdit')"
        >
        </d-select>
        </div>
    </ng-template>
    </d-cell-edit>
</d-column>

<d-column field="operation" header="操作" [width]="'130px'" [order]="6">
    <d-cell>
    <ng-template let-rowItem="rowItem">
        <span>
        <ng-container *ngIf="!isSearch">
            <div *ngIf="rowItem.node_type" class="operationIcon icon-add-directory" title="添加文件夹" (click)="addTreeNodeByRowItem(rowItem, 'addChild', 1)"></div>
            <div *ngIf="rowItem.node_type" class="operationIcon icon-add-file" title="添加节点" (click)="addTreeNodeByRowItem(rowItem , 'addChild', 0)"></div>
            <div class="operationIcon icon-add-sub-node" title="插入文件夹" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 1)"></div>
            <div class="operationIcon icon-add-sub-module" title="插入节点" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 1)"></div>

            <div class="operationIcon icon-copy" title="复制" (click)="copyAndCut(rowItem, 'copy')"></div>
            <div class="operationIcon icon-cut" title="剪切" (click)="copyAndCut(rowItem, 'cut')"></div>
            <div *ngIf="rowItem.node_type && saveCopyClickNode" class="operationIcon icon-copy-to-new" title="粘贴" (click)="paste(rowItem, 'child')"></div>
            <div *ngIf="rowItem.node_id === saveCopyClickNode" class="operationIcon icon-add-manual-use-case" title="粘贴到根" (click)="paste(rowItem, 'root')"></div>
        </ng-container>
        <div class="operationIcon icon-delete" title="移除" (click)="delete(rowItem)"></div>
        </span>
    </ng-template>
    </d-cell>
</d-column>
```

## 大数据量树形表格全部展开/收起

使用@ViewChild方式调用全部展开/收起功能

``` xml
<d-button [disabled]="isSearch" *ngIf="!isOpenAll" class="golbalBtn allNodesExpand" icon="icon-expand-info" bsStyle="common" (click)="toggleAllNodesExpand(true)">全部展开</d-button>
<d-button [disabled]="isSearch" *ngIf="isOpenAll" class="golbalBtn allNodesCollapse" icon="icon-collapse-info" bsStyle="common" (click)="toggleAllNodesExpand(false)">全部收起</d-button>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

toggleAllNodesExpand(e) {
    this.VirtualTableTree.toggleAllNodesExpand(e);
    this.isOpenAll = e;
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的toggleAllNodesExpand方法
```

## 大数据量树形表格搜索

使用@ViewChild方式调用搜索功能

``` xml
<div class="searchSelect">
    <d-select [options]="searchSelectSource" [filterKey]="'name'" [(ngModel)]="searchAttr" (ngModelChange)="searchSelectChange()"> </d-select>
</div>
<d-search
    style="width: 300px"
    [placeholder]="'搜索'"
    [isKeyupSearch]="true"
    (searchFn)="search($event)"
></d-search>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

// 搜索所有列字段为'all', 搜索指定几个列字段用['name', 'attr']
searchAttr: 'all' | string[];

searchSelectChange() {
  this.BigTableTree.searchAttr = this.searchAttr;
  this.BigTableTree.searchSelectChange();
}

search(event) {
  this.VirtualTableTree.search(event);
  if(event) {
    this.isSearch = true;
  } else {
    this.isSearch = false;
  }
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的searchSelectChange和search方法
```

## 大数据量树形表格添加

使用@ViewChild方式调用添加功能

``` xml
// 全局添加
<d-button [disabled]="isAddGlobalData || isSearch" class="golbalBtn addNode" icon="icon-add-file" bsStyle="primary" (click)="addRootNode('node')">添加节点</d-button>
<d-button [disabled]="isAddGlobalData || isSearch" class="golbalBtn addFolder" icon="icon-add-directory" bsStyle="common" (click)="addRootNode('folder')">添加文件夹</d-button>

// 操作列添加
<div *ngIf="rowItem.node_type" class="operationIcon icon-add-directory" title="添加文件夹" (click)="addTreeNodeByRowItem(rowItem, 'addChild', 1)"></div>
<div *ngIf="rowItem.node_type" class="operationIcon icon-add-file" title="添加节点" (click)="addTreeNodeByRowItem(rowItem , 'addChild', 0)"></div>
<div class="operationIcon icon-add-sub-node" title="插入文件夹" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 1)"></div>
<div class="operationIcon icon-add-sub-module" title="插入节点" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 0)"></div>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

// 可自定义添加数据模板
addTemplate: any = {
  "property": "addPro",
  "description": "addDes",
  "category": "Dynamic"
}

// 全局添加
addRootNode(status) {
  this.isAddGlobalData = true;
  this.VirtualTableTree.addRootNode(status, this.addTemplate);
  this.isAddGlobalData = false;
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的addGolbal方法

// 操作列添加
addTreeNodeByRowItem(rowItem: TreeNodeInterface, action: 'addChild' | 'insertBefore' | 'insertAfter', nodeType: VirtualTreeNodeType) {
  this.VirtualTableTree.addTreeNodeByRowItem(rowItem, action, this.addTemplate);
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的addOperation方法
```

## 大数据量树形表格复制/粘贴

使用@ViewChild方式调用复制/粘贴功能

``` xml
<div class="operationIcon icon-copy" title="复制" (click)="copyAndCut(rowItem, 'copy')"></div>
<div class="operationIcon icon-cut" title="剪切" (click)="copyAndCut(rowItem, 'cut')"></div>
<div *ngIf="rowItem.node_type && saveCopyClickNode" class="operationIcon icon-copy-to-new" title="粘贴" (click)="paste(rowItem, 'child')"></div>
<div *ngIf="rowItem.node_id === saveCopyClickNode" class="operationIcon icon-add-manual-use-case" title="粘贴到根" (click)="paste(rowItem, 'root')"></div>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

copyAndCut(rowItem, status) {
  this.saveCopyClickNode = rowItem.node_id;
  if(status === 'cut') {
    this.isCut = true;
  }
  this.VirtualTableTree.copyAndCut(rowItem, status);
}

// 粘贴三种模式，粘贴到子节点，粘贴到根节点最后，粘贴到兄弟节点
paste(rowItem, status: 'child' | 'root' | 'next') {
  this.VirtualTableTree.paste(rowItem, status);
  if(this.isCut) {
    this.saveCopyClickNode = "";
    this.isCut = false;
  }
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的copyAndCut和paste方法
```

## 大数据量树形表格移除

使用@ViewChild方式调用移除功能

``` xml
<div class="operationIcon icon-delete" title="移除" (click)="delete(rowItem)"></div>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

delete(rowItem) {
  this.VirtualTableTree.delete(rowItem);
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的delete方法
```

## 大数据量树形表格拖拽

使用@ViewChild方式调用拖拽功能

``` xml
<d-column field="drag" header="" [width]="'15px'" [order]="1">
  <d-cell>
    <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
      <span [ngClass]="{ 'table-drag-row-handle': rowItem.node_type === 0 }">
        <div class="icon-drag-small dragLine" *ngIf="rowItem.node_type === 0" (mousedown)="dragDown($event, rowItem, rowIndex)"></div>
      </span>
    </ng-template>
  </d-cell>
</d-column>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

dragDown(downEvent, rowItem, rowIndex) {
  this.VirtualTableTree.customDragDown(
    [rowItemList], true,
    this.customDragMove,
    this.customDrop
  );
}

customDragMove = (event, rowItemList) => {
  // 自定义移动逻辑，可以添加相关区域悬浮触发的效果
}

customDrop(event, rowItemList) => {
  // 自定义投放逻辑
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的customDragDown方法
```

## 大数据量树形表格自定义拖拽逻辑，可实现向表外拖拽

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

dragDown(rowItem, rowIndex) {
  this.VirtualTableTree.dragDown(downEvent, rowItem, rowIndex, document);
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的dragDown方法
```


## 大数据量树形表格复选

使用@ViewChild方式调用复选功能

``` xml
<d-column field="checked" [header]="" [width]="'30px'" [order]="0">
  <d-head-cell>
    <ng-template let-column="column">
      <d-checkbox
        id="virtual-scroll-tree-table-allCheck"
        [isShowTitle]="false"
        (change)="onAllCheckChange($event)"
        [halfchecked]="halfCheck"
        [(ngModel)]="allCheck"
      >
      </d-checkbox>
    </ng-template>
  </d-head-cell>
  <d-cell>
    <ng-template let-rowItem="rowItem" let-rowIndex="rowIndex">
      <d-checkbox
        [ngModelOptions]="{ standalone: true }"
        [ngModel]="rowItem.checked"
        [halfchecked]="rowItem.halfChecked"
        [disabled]="rowItem.disabled"
        (ngModelChange)="onRowCheckChange($event, rowItem)"
        dTooltip
        [content]="rowItem.$checkBoxTips"
        [position]="['top', 'right', 'bottom', 'left']"
        [showAnimation]="false"
      >
      </d-checkbox>
    </ng-template>
  </d-cell>
</d-column>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

onRowCheckChange(event, rowItem) {
  this.VirtualTableTree.onRowCheckChange(event, rowItem);
}

onAllCheckChange(event) {
  this.VirtualTableTree.onAllCheckChange(event, this.customAllCheckFunc); // onAllCheckChange第二个参数可选，可自定义全选逻辑
}

const customAllCheckFunc = (treeArray, checked) => { // 操作全量铺平数据checked属性，自定义全选逻辑
  treeArray.forEach(() => .....)
}

allChecked(event) {
  this.allCheck = event.allCheck;
  this.halfCheck = event.halfCheck;
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的onRowCheckChange和onAllCheckChange方法

getRowCheckData() {
  const saveCheck = this.VirtualTableTree.saveCheck;
  const saveHalfCheck = this.VirtualTableTree.saveHalfCheck;
}

// 使用@ViewChild获取VirtualScrollTreeTableComponent中的saveCheck全选数组和saveHalfCheck半选数组

ngOnInit() {
  this.dataSource = JSON.parse(this.dataSource);
  this.dataSource[2].disabled = true;
  this.dataSource[163].disabled = true;
  this.dataSource = JSON.stringify(this.dataSource);
}

// 复选框可根据数据中的disabled属性进行禁用，注意：父节点禁用时，下方所有子集均会被置为禁用状态，在添加、复制/剪切、拖拽时，放置在其下方的子节点也会被置为禁用状态
```

## 大数据量树形表格批量删除

使用@ViewChild方式调用批量删除功能

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

batchDelete() {
  this.VirtualTableTree.batchDelete();
}

// 使用@ViewChild调用VirtualScrollTreeTableComponent中的batchDelete方法
```

## DataTablePropertiesInterface

```ts
export interface DataTablePropertiesInterface {
    maxWidth?: string;
    maxHeight?: string;
    size?: string | number;
    rowHoveredHighlight?: boolean;
    generalRowHoveredData?: boolean;
    cssClass?: string;
    tableWidth?: string;
    fixHeader?: boolean;
    colDraggable?: boolean;
    colDropFreezeTo?: number;
    tableWidthConfig?: TableWidthConfig[];
    showSortIcon?: boolean;
    showFilterIcon?: boolean;
    showOperationArea?: boolean;
    hideColumn?: string[];
    pageAllChecked?: boolean;
    onlyOneColumnSort?: boolean;
    multiSort?: any;
    resizeable?: boolean;
    timeout?: number;
    beforeCellEdit?: any;
    headerBg?: boolean;
    tableLayout?: string;
    borderType?: string;
    striped?: boolean;
    shadowType?: 'normal' | 'embed';
}
```