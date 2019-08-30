#### d-data-table
|参数|说明|类型|默认值|
|--|--|--|--|
|checkable|【可选】Datatable是否提供勾选行的功能|`boolean`|--|
|showDetail|【可选】是否提供显示行详情的功能|`boolean`|--|
|fixHeader|【可选】是否固定表头（在表格超过容器最大高度时，表格可滚动时生效）|`boolean`|--|
|showSortIcon|【可选】是否显示排序未激活图标，默认显示|`boolean`|true|
|dataSource|数据源，用于渲染表格数据|`any[]`|--|
|hideColumn|【可选】用于隐藏列|`string[]`|--|
|lazy|【可选】是否懒加载数据|`boolean`|false|
|pageAllChecked|【可选】选中当前页所有row|`boolean`|--|
|pager|【可选】内置分页|`DataTablePager`|--|
|scrollable|【可选】表格在超出容器时，是否可以通过滚动查看表格内容|`boolean`|--|
|maxWidth|【可选】限制表格最大宽度，默认撑满父容器|`string`|--|
|maxHeight|【可选】限制最大高度，默认|`string`|--|
|type|【可选】表格类型|`'striped'`|''|
|hover|【可选】表格是否开启鼠标hover行高亮效果|`boolean`|true|
|cssClass|【可选】表格自定义样式|`string`|--|
|tableWidth|【可选】表格宽度|`string`|100%|
|columnDefs|【可选】列引用，用于列渲染|`ColumnDefs[]`|--|
|onlyOneColumnSort|【可选】是否限制多列排序的输出限制为一项|`boolean`|--|
|multiSort|【可选】多列选择数组，用来指导那几列会被排序|`SortEventArg`[]|[]|
|resizeable|【可选】是否可以拖拽调整列宽|`boolean`|--|
|detailTemplateRef|【可选】用来自定义详情页的模板|`TemplateRef`|--|
|timeout|【可选】同时绑定单击、双击事件时，用于区分点击的时间间隔,默认300ms，两个事件不同时使用可以指定为0|`number`|300|
|headerExpandConfig|【可选】配置header下的额外内容|`TableExpandConfig`|--|
|checkableRelation|【可选】配置树形表格的父子选中是否互相关联 upward：选中子关联父 downward： 选中父关联子|`CheckableRelation`|--|
|loadChildrenTable|【可选】展开子表格的回调，用于异步加载子表格|`Promise`|--|
|loadAllChildrenTable|【可选】表头展开所有子表格的回调，用于异步加载所有子表格|`Promise`|--|

#### d-data-table 事件
|事件|说明|参数|默认值|
|--|--|--|--|
|multiSortChange|多列选择Change事件，用来更新多列选择数组|`SortEventArg[]`|--|
|cellClick|表格单元格点击事件|`CellSelectedEventArg`|--|
|cellDBClick|表格单元格双击事件|`CellSelectedEventArg`|--|
|rowClick|表格行点击事件|`RowSelectedEventArg`|--|
|rowDBClick|表格行双击事件|`RowSelectedEventArg`|--|
|detialToggle|扩展行展开收起事件|`ExpandConfig`|--|
|cellEditStart|表格单元格开始编辑事件|`CellSelectedEventArg`|--|
|cellEditEnd|表格单元格结束编辑事件|`CellSelectedEventArg`|--|
|rowCheckChange|某行的勾选状态变化事件|`RowCheckChangeEventArg`|--|
|checkAllChange|当前页码全勾选状态变化事件|`boolean`|--|
|pageIndexChange|页码变化事件|`{pageIndex,pageSize}`|--|
|resize|列宽变化事件|`DataTableColumnTmplComponent`|--|

#### d-column
|参数|说明|类型|默认值|
|--|--|--|--|
|editable|【可选】在d-column上指定该列是否可编辑|`boolean`|false
|tableLevel|【可选】当前表格层级,在树形表格场景下自增长|`number`|0
|fieldType|【可选】单元格类型|`string`|text
|maxWidth|【可选】最大宽度|`string`|--
|minWidth|【可选】最小宽度|`string`|--
|field|该列字段|`string`|--
|header|该列表头文字|`string`|--
|sortable|【可选】是否可排序|`boolean`|--
|editable|【可选】是否可编辑|`boolean`|--
|width|宽度|`string px、%`|--
|nestedColumn|【可选】指定该列作为树形表格的操作列，即有展开\折叠按钮和内容缩进表明层级关系|`Boolean`|false
|extraOptions|【可选】主要配置单元格编辑时编辑组件的inputs|`any{}`|--
|extraOptions.editableTip|【可选】可编辑提示，'btn'表示鼠标悬浮单元格出现编辑按钮，未配置时鼠标悬浮单元格背景色变化|`string`|--
|extraOptions.iconFoldTable|【可选】自动定义树形表格的折叠图标|`Template`|--
|extraOptions.iconUnFoldTable|【可选】自动定义树形表格的展开图标|`Template`|--
|extraOptions.showHeadTableToggler|【可选】树形表格是否在header出现展开\折叠图标|`boolean`|false
|order|【可选】列序号|`number`|Number.MAX_VALUE
|filterable|【可选】是否可筛选|`boolean`|--
|filterList|传入需要操作的筛选列表，当filterable为true时必选|`array`|--
|filterMultiple|【可选】选择筛选列表为多选或单选,true为多选，false为单选|`boolean`|true
|customFilterTemplate|【可选】表格过滤弹出框的自定义模板，参考DOC下‘自定义过滤弹出框’使用|`TemplateRef`|--
|beforeFilter|【可选】表格过滤弹出框弹出前的回调函数，返回false可阻止弹框弹出|`function、Promise、Observable`|--

#### d-column 事件
|事件|说明|参数|默认值|
|--|--|--|--|
|filterChange|确认筛选回调事件，返回选中的筛选数组|`FilterConfig[]`|--

#### rowItem(配置dataSource时，可以初始化行数据的以下字段配置表格的行为)
|参数|说明|类型|默认值|
|--|--|--|--|
|$isChildTableOpen|【可选】该行下的子表格是否默认展开|`boolean`|false
|$checked|【可选】该行是否选中|`boolean`|false
|$halfChecked|【可选】该行是否半选|`boolean`|false
|$disabled|【可选】该行是否禁止选中|`boolean`|false

##### 自定义单元格

Datatable支持通过目标自定义单元格，简单使用参考本页面`Data table and Upper Gender Column`示例，我们想`Gender`这一列的数据大写展示, 并在鼠标移动上去展示一个提示，相关节选代码如下

```
<d-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <d-cell>
    <ng-template let-cellValue="cellValue">
      <span dTooltip [content]='cellValue' [position]="'bottom'">
        {{cellValue.toUpperCase()}}
      </span>
    </ng-template>
  </d-cell>
</d-column>
```

完整的template如下

```xml
<ng-template 
  let-rowIndex="rowIndex"
  let-colIndex="colIndex"
  let-rowItem="rowItem"
  let-column="column"
  let-cellItem="cellItem"
  let-cellValue="cellValue">
  <!--cell 内容-->
</ng-template>
```

其中每项值代表：

- rowIndex: 行序
- colIndex: 列序
- rowItem: 当前行的数据，对应 filed 和 cellItem的键值对
- column: 当前列的一些元信息，对应DataTableColumnTmplComponent类，相关调用请在APIDoc中查阅相关类
- cellItem: 当前单元格的值
- cellValue: `d-column`接受的`formatter`函数处理后的值。默认情况系下，和`cellItem`一致，date数据会根据`extraOptions`输入中的`dateFormat`相关格式格式化。


##### 自定义表头单元格

如果需要表头单元格，简单使用同样参考本页面`Data table and Upper Gender Column`示例，效果为鼠标移动在表格上方会提示`Gender is a head cell template`.

```xml
<d-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <d-head-cell>
    <ng-template let-column="column">
      <span dTooltip [content]="column.header + ' is a head cell template'" [position]="'bottom'">
        {{column.header}}
      </span>
    </ng-template>
  </d-head-cell>
</d-column>
```

完整的template如下

```xml
<ng-template 
  let-column="column"
  let-head=""
  let-cellValue="cellValue">
  <!--cell 内容-->
</ng-template>
```

其中每项值代表：

- column: 为column输入值，详细属性可以参考`apidoc`中`DataTableColumnTmplComponent`的属性字段
- ""(let-head=的那段)，隐式引用，可以拿到整个head的引用，相关属性参考`apidoc`里面的`DataTableHeadComponent`类

##### 自定义过滤弹出框

```xml
<ng-template 
 let-filterList ="filterListDisplay" 
 let-head="" 
 let-column="column" 
 let-dropdown="dropdown">
  <!--cell 内容-->
</ng-template>
```
其中每项值代表：

- filterListDisplay: 为传入的filterList的值
- ""(let-head=的那段)，隐式引用，可以拿到整个head的引用，相关属性参考apidoc里面DataTableHeadComponent类
- column: 为column输入值，详细属性可以参考apidoc中DataTableColumnTmplComponent的属性字段
- dropdown:获取dropdown的引用，主要用于控制弹出框的打开和关闭
#### 关于拖拽调整列宽

`d-data-table`可以设置[resizeable]属性，即可允许用户拖拽调整列宽。

`d-column`接受[maxWidth]和[minWidth]属性，可以控制用户可调整的宽度范围，推荐设置上宽度范围，宽度调整过度会导致表格变形。

可以在`d-data-table`监听(resize)事件，事件参数为resize发生的列引用，类型为`DataTableTmplsComponent`

> 注意：因为用户不能直接设置`shouDetail`和`checkable`列，此两列现在不运用用户调整列宽

#### 表格字段支持鼠标hover时显示 tips

通过目标可以实现此功能，请参考Demo —— **Resizeable Data table and Upper Gender Column**的Gender列

#### 接口数据未返回的时候，显示Loading

本功能结合`d-loading`组件即可实现，实现参考**Async Data Loading**

#### 支持数据为空的时候显示界面

表格接受`#noResultTemplateRef`模板，实现参考**Async Data Loading**

#### 斑马色和hover行高亮效果

- `d-data-table`可以设置[type]属性，其中值为`striped`为斑马色配色
- `d-data-table`可以设置[hover]属性，默认开启鼠标hover，行高亮效果，设置为false可关闭此效果

#### 状态保持

因本组件为状态--关，所有状态变化均会回传给组件使用者，业务开发人员需要自己处理相关数据的存储。

#### 多行表头和表头合并单元格

- 需要在d-column使用时候，增加
- ``` javascript
advancedHeader: Array<{
      header: string;
      rowspan: number;
      colspan: number;
}
```
> 注意: 空单元格也需要表示，并根据内容吧rowspan/colspan置为0
> 如果同时使用列宽拖拽和多行表头，请为列内容附上宽度width
> 如果第一行的列宽度不正确，请手动为advancedHeader[rowNumber]增加一个属性$width
#### 配置header、row的额外内容
header使用headerExpandConfig配置，row使用rowItem中的expandConfig配置，配置说明：
- ``` javascript
TableExpandConfig {
  expand?: boolean, // 是否展开
  expandTemplateRef?: ElementRef, //自定义模板
  description?: string // 简单描述文字
}
