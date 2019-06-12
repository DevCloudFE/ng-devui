
|参数|说明|类型|默认值|
|--|--|--|--|
|checkable|【可选】Datatable是否提供勾选行的功能|boolean|无|
|showDetail|【可选】是否提供显示行详情的功能|boolean|无|
|fixHeader|【可选】是否固定表头（在表格超过容器最大高度时，表格可滚动时生效）|boolean|无|
|showSortIcon|【可选】是否显示排序未激活图标，默认显示|boolean|true|
|dataSource|数据源，用于渲染表格数据|any[]|无|
|hideColumn|【可选】用于隐藏列|string[] |无|
|lazy|是否懒加载数据|boolean|无|
|pageAllChecked|选中当前页所有row| boolean|无|
|pager|内置分页|DataTablePager|无|
|scrollable|【可选】表格在超出容器时，是否可以通过滚动查看表格内容|boolean|无|
|editModel|【可选】默认表格使用的表格类型，可选值为'cell'|string|cell|
|maxWidth|【可选】限制表格最大宽度，默认撑满父容器|string|无|
|maxHeight|【可选】限制最大高度，默认|string|无|
|type|表格类型|''|'striped'|'bordered'|'condensed'|''|
|hover|表格是否开启鼠标hover行高亮效果|boolean|true|
|cssClass|表格自定义样式|string|无|
|tableWidth|表格宽度|string|100%|
|columnDefs|【可选】列引用，用于列渲染|ColumnDefs[]|无|
|onlyOneColumnSort|【可选】是否限制多列排序的输出限制为一项|boolean|无|
|multiSort|【可选】多列选择数组，用来指导那几列会被排序|SortEventArg[]|[]|
|resizeable|【可选】是否可以拖拽调整列宽|boolean|无|
|detailTemplateRef|【可选】用来自定义详情页的模板|TemplateRef|无|
|timeout|【可选】同时绑定单击、双击事件时，用于区分点击的时间间隔,默认300ms，两个事件不同时使用可以指定为0|number|300|
|multiSortChange|多列选择Change事件，用来更新多列选择数组|出参|无|
|cellClick|表格单元格点击事件|出参|无|
|cellDBClick|表格单元格双击事件|出参|无|
|rowClick|表格行点击事件|出参|无|
|rowDBClick|表格行双击事件|出参|无|
|detialToggle|表格行双击事件|出参|无|
|cellEditStart|表格单元格开始编辑事件|出参|无|
|cellEditEnd|表格单元格结束编辑事件|出参|无|
|rowCheckChange|某行的勾选状态变化事件|出参|无|
|checkAllChange|当前页码全勾选状态变化事件|出参|无|
|pageIndexChange|页码变化事件|出参|无|
|resize|列宽变化事件|出参|无|

#### 关于使用模板

##### 自定义单元格

Datatable支持通过目标自定义单元格，简单使用参考本页面`Data table and Upper Gender Column`示例，我们想`Gender`这一列的数据大写展示, 并在鼠标移动上去展示一个提示，相关节选代码如下

```
<ave-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <ave-cell>
    <ng-template let-cellValue="cellValue">
      <span aveTooltip [content]='cellValue' [position]="'bottom'">
        {{cellValue.toUpperCase()}}
      </span>
    </ng-template>
  </ave-cell>
</ave-column>
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
- cellValue: `ave-column`接受的`formatter`函数处理后的值。默认情况系下，和`cellItem`一致，date数据会根据`extraOptions`输入中的`dateFormat`相关格式格式化。


##### 自定义表头单元格

如果需要表头单元格，简单使用同样参考本页面`Data table and Upper Gender Column`示例，效果为鼠标移动在表格上方会提示`Gender is a head cell template`.

```xml
<ave-column field="gender" header="Gender" [sortable]="true" [width]="'100px'">
  <ave-head-cell>
    <ng-template let-column="column">
      <span aveTooltip [content]="column.header + ' is a head cell template'" [position]="'bottom'">
        {{column.header}}
      </span>
    </ng-template>
  </ave-head-cell>
</ave-column>
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



#### 关于拖拽调整列宽

`ave-data-table`可以设置[resizeable]属性，即可允许用户拖拽调整列宽。

`ave-column`接受[maxWidth]和[minWidth]属性，可以控制用户可调整的宽度范围，推荐设置上宽度范围，宽度调整过度会导致表格变形。

可以在`ave-data-table`监听(resize)事件，事件参数为resize发生的列引用，类型为`DataTableTmplsComponent`

> 注意：因为用户不能直接设置`shouDetail`和`checkable`列，此两列现在不运用用户调整列宽

#### 表格字段支持鼠标hover时显示 tips

通过目标可以实现此功能，请参考Demo —— **Resizeable Data table and Upper Gender Column**的Gender列

#### 接口数据未返回的时候，显示Loading

本功能结合`ave-loading`组件即可实现，实现参考**Async Data Loading**

#### 支持数据为空的时候显示界面

表格接受`#noResultTemplateRef`模板，实现参考**Async Data Loading**

#### 斑马色和hover行高亮效果

- `ave-data-table`可以设置[type]属性，其中值为`striped`为斑马色配色
- `ave-data-table`可以设置[hover]属性，默认开启鼠标hover，行高亮效果，设置为false可关闭此效果

#### 状态保持

因本组件为状态无关，所有状态变化均会回传给组件使用者，业务开发人员需要自己处理相关数据的存储。

#### 多行表头和表头合并单元格

- 需要在ave-column使用时候，增加
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
