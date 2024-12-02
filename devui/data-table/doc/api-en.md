# How to use

Import the following information into the module:

```ts
import {DataTableModule} from' ng-devui/data-table';
```

On the page:

```html
<d-data-table></d-data-table>
```

# d-data-table

## d-data-table parameter
| Parameter name | Type | Default value | Description | Jump to Demo |Global Config| 
| :----------------: | :-------------------: | :---------------------------: | :----- | :----------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
| dataSource | `any[]` | -- | Required. Data source, used to render table data | [Basic usage](demo#basic-usage) |
| lazy | `boolean` | -- | Optional. Indicating whether to lazy load data | [Low load list data](demo#lazy-loading-of-list-data) |
| scrollable | `boolean` | -- | Optional. Whether the table content can be viewed by scrolling when the table exceeds the container. | [Table interaction](demo#table-interaction) |
| maxWidth | `string px` | -- | Optional. Limit the maximum table width. By default, the parent container is full. |
| maxHeight | `string px` | -- | Optional. The maximum height is limited. The default value is | [fixed table header](demo#table-fixing) |
| minHeight | `string px` | -- | Optional, limit the minimum height | -- |
| size      | `'mini'\| 'xs' \|'sm'\|'md'\|'lg'` | 'sm'  | Optional. Specifies the table size | [Table style](demo#mutil-styles) |
| rowHoveredHighlight | `boolean` | true | Optional. Indicating whether to highlight a line when the cursor is hovering. The default value is highlighted. |
| generalRowHoveredData | `boolean` | false | Optional. It is used to configure columns to implement the table. When the cursor is moved to a row, $hovered is recorded to the row item. By default, $hovered is not recorded. |
| cssClass | `string` | -- | Optional. Customize the table style |
| tableWidth | `string` | 100% | Optional. Table width |
| tableHeight | `string` | -- | Optional. Table height. The value 100% depends on the height of the table parent container. | [Virtual scrolling](demo#virtual-scroll) |
| containFixHeaderHeight | `boolean` | false | Optional. whether the height specified by the fixed header includes the height of the header, the height set by tableHeight is the height of the table body by default | [Fixed table header virtual scrolling](demo#fixed-virtual-scroll) |
| fixHeader | `boolean` | false | Optional. Whether the table header is fixed | [Fixed table header virtual scrolling](demo#fixed-virtual-scroll) |
| checkableRelation | [`CheckableRelation`](#checkablerelation) | -- | Optional. This parameter specifies whether the parent and child selections in the tree table are associated. | [Tree table](demo#tree-form) |
| loadChildrenTable | ``(rowItem: any) => Promise<any>` | -- | Optional. It is the callback of subtable expansion, which is used to asynchronously load subtables. | [Tree table](demo#tree-form) |
| loadAllChildrenTable | `() => Promise<any>` | -- | Optional. It is the callback for expanding all subtables in the table header. It is used to asynchronously load all subtables. | [Tree table](demo#tree-form) |
| colDraggable | `boolean` | false | Optional. Whether columns can be dragged or sorted | [Column dragging](demo#column-dragging) |
| colDropFreezeTo | `number` | 0 | Optional. The first n columns cannot be dragged when the table columns can be sorted. | [Column dragging](demo#column-dragging) |
| virtualScroll | `boolean` | false | Optional. Specifies whether to enable virtual scrolling. Virtual scrolling parameters do not take effect for tree tables. To use tree-shaped virtual scrolling, see the implementation of the demo for tree tables with a large amount of data. | [Virtual scrolling](demo#virtual-scroll) |
| virtualItemSize | `number` | 40 | Optional. Height of each row during virtual scrolling. The default value is 40`px`. | [Virtual scrolling](demo#virtual-scroll) |
| virtualMinBufferPx | `number` | 80 | Optional. Minimum pixel height of the buffer during virtual scrolling. If the pixel height is less than this value, the new structure is loaded. | [Virtual scrolling](demo#virtual-scroll) |
| virtualMaxBufferPx | `number` | 200 | Optional. Maximum pixel height of the buffer during virtual scrolling | [virtual scrolling](demo#virtual-scroll) |
| tableWidthConfig | [`TableWidthConfig[]`](#tablewidthconfig) | [] | Optional. It is used to configure the column width of the table.This parameter is mandatory when subtables such as tree tables are included. | [Basic usage](demo#basic-usage) |
| checkable | `boolean` | -- | Optional. Whether the Datatable provides the function of selecting rows. | [Table interaction](demo#table-interaction) |
| checkOptions | [`TableCheckOptions[]`](#tablecheckoptions) | -- | Optional. drop-down list box in the table header and operations | [Customized table selection](demo#table-check-options) |
| checkOptionsIndex | `number` | 1050 | (Optional) z-index in the drop-down list box selected in the table header | -- |
| headerCheckDisabled | `boolean` | -- | Optional. Indicates whether the header checkbox is disabled. |
| headerCheckVisible | `boolean` | true | Optional. Indicates whether the checkbox in the header is visible. |
| showExpandToggle | `boolean` | -- |: Indicates whether to display extended rows. If the value is true, an operation button is generated before the row where extended rows are configured. | [Extended row](demo#expand-row) |
| showSortIcon | `boolean` | false | Optional. Indicates whether to display the inactive sorting icon. The icon is not displayed by default. | [Table interaction](demo#table-interaction) |
| showFilterIcon | `boolean` | false | Optional. Indicates whether to display the inactive filter icon. The icon is not displayed by default. | [Table interaction](demo#table-interaction) |
| showOperationArea | `boolean` | false | Optional. Indicates whether to display the operation area when the table header operation is not activated. Not displayed by default. | [Table interaction](demo#table-interaction) |
| hideColumn | `string[]` | -- | Optional. Used to hide columns, Transfer the corresponding field. |
| pageAllChecked | `boolean` | -- | Optional. Select all rows on the current page. |
| onlyOneColumnSort | `boolean` | -- | Optional. Whether to restrict the output of multi-column sorting to one item | [Table interaction](demo#table-interaction) |
| multiSort | [`SortEventArg[]`](#sorteventarg) | [] | Optional. It is a multi-column selection array, which is used to guide the columns to be sorted.This parameter is valid only in column mode. | [Table interaction](demo#table-interaction) |
| resizeable | `boolean` | -- | Optional. Whether the column width can be adjusted by dragging. | [Table interaction](demo#table-interaction) |
| timeout | `number` | 300 | Optional. This parameter is used to distinguish the click interval when the click and double-click events are bound at the same time. The default value is 300`ms`. You can set this parameter to 0 when the two events are used at the same time. |
| headerExpandConfig | [`TableExpandConfig`](#tableexpandconfig) | -- | Optional. Extra content under the header | [Extended line](demo#expand-row) |
| beforeCellEdit | `(rowItem: any, column: any) => Promise<any>` | -- | Optional. Interception method before cell editing. <br>resolve(extraOptions) updates extraOptions of the column. | [edit cell](demo#edit-cell) |
| headerBg | `boolean` | false | Optional. Indicating whether to display the background color in the table header | [Table style](demo#mutil-styles) |
| beforeCellEditEnd | `(rowItem: any, column: any) => boolean` | -- | is optional. This parameter indicates the interception method when cell editing ends. If true is returned, the editing ends. This parameter is used to add editing validation rules. Asynchronous validation is not supported currently. | [edit cell](demo#edit-cell) |
| tableLayout | `'fixed'\|'auto'` | 'fixed' | Optional. Table layout | [Table style](demo#mutil-styles) |
| borderType | `''\|'bordered'\|'borderless'` | '' | Optional. Table border type. The default value is row border. The options are bordered (full border) and borderless (no border). | [Table style](demo#mutil-styles) |
| striped | `boolean` | false | Optional. Whether to display the table with zebra stripes. | [Table style](demo#mutil-styles)                      |
| shadowType | `'normal' \| 'embed' ` | 'embed' | Optional. Whether the table is of the shadow or embedded type | [table style](demo#mutil-styles) |
| tableOverflowType | ``Overlay'\ | 'auto' `|'auto' | Optional. The scroll bar is displayed only when the cursor is hovered in overlay mode. | [Table style](demo#mutil-styles) |

## d-data-table event

| Event | Type | Description | Jump to Demo |
| :-------------------: | :------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| rowCheckChange | `EventEmitter<RowCheckChangeEventArg>` | Selected status change event of a line |
| checkAllChange | `EventEmitter<boolean>` | Event of Selecting All Current Pages |
| resize | `EventEmitter<ColumnResizeEventArg>` | Column Width Change Event, Returning Cell Information | [Table Interaction](demo#table-interaction) |
| childrenTableClose | `EventEmitter<any>` | Event for closing a sublist. The list row information is returned. |
| allChildrenTableClose | `EventEmitter<any>` | All Sublist Close Event |
| multiSortChange | `EventEmitter<SortEventArg[]>` | Change event, which is used to update the multi-column selection array and return cell information.This parameter is valid only in column mode. | [Table interaction](demo#table-interaction) |
| cellClick | `EventEmitter<CellSelectedEventArg>` | Cell Click Event, Returning Cell Information | [Table Interaction](demo#table-interaction) |
| cellDBClick | `EventEmitter<CellSelectedEventArg>` | Cell Double-click Event, Returning Cell Information | [Table Interaction](demo#table-interaction) |
| rowClick | `EventEmitter<RowSelectedEventArg>` | The mouseup event is triggered when a row is clicked in the table. The row information is returned. The mouseup event needs to be intercepted if an element is clicked in a cell. | [Table interaction](demo#table-interaction) |
| rowDBClick | `EventEmitter<RowSelectedEventArg>` | Double-clicking a table row. Row information is returned. | [Table interaction](demo#table-interaction) |
| detialToggle | `EventEmitter<any>` | Extended row expansion/collapse event. The row status information is returned. |
| cellEditStart | `EventEmitter<CellSelectedEventArg>` | Cell Editing Start Event, Returning Cell Information |
| cellEditEnd | `EventEmitter<CellSelectedEventArg>` | Table cell editing end event. Cell information is returned. | [Edit cell](demo#edit-cell) |
| tableScrollEvent | `EventEmitter<Event>` | Table Internal Rolling Event | |
|   columnDragEnd  |    `EventEmitter<{form: index, to: index}>`    |            Column Drag End Event        |   [Column dragging](demo#column-dragging) |
| loadMore | `EventEmitter<{any}>` | Lazy Loading Completion Event|[Lazy Loading](demo#lazy-loading-of-list-data) |

## d-data-table public method

| Method name | Parameter | Default value | Description | Jump to Demo |
| :--------------------------: | :-----------------------: | :----- | :------------------------------------------------------------------: | :------------------------------------------------------: |
| getCheckedRows | -- | -- | Obtain the data of the selected row. | [Table interaction](demo#table-interaction) |
| setRowCheckStatus | [`RowCheckChangeEventArg`](#rowcheckchangeeventarg) | -- | Sets the selection status of a row, and can process the selection relationship between table headers and parent-child tables. | [Table interaction](demo#table-interaction) |
| setTableCheckStatus | [`TableCheckStatusArg`](#tablecheckstatusarg) | -- | Sets the status of all or half selection of the current table. |
| setRowChildToggleStatus | [`RowToggleStatusEventArg`](#RowToggleStatusEventArg) | -- | Sets the expanded or collapsed status of a subtable in a row. This command is invoked to process the selected status of the subtable in asynchronous loading mode. | [Tree table](demo#tree-form) |
| setTableChildrenToggleStatus | `open: boolean` | -- | Sets the expansion and collapse status of all subtables in the current table. | [Tree table](demo#tree-form) |
| cancelEditingStatus | -- | -- | Cancel the editing status of the cell being edited. | [Editing cell](demo#edit-cell) |

## rowItem parameter (rowItem is the array element of dataSource. You can initialize the following fields to configure the table behavior.)

| Parameter | Type | Default value | Description | Jump to Demo |
| :---------------: | :-------: | :----- | :--------------------------: | :------------------------------------------------------: |
| $checked | `boolean` | false | Optional. Whether the row is selected. | [Table interaction](demo#table-interaction) |
| $halfChecked | `boolean` | false | Optional. Whether to select half of the row | [Table interaction](demo#table-interaction) |
| $isChildTableOpen | `boolean` | false | Optional. Whether to expand the subtable in the row | [Tree table](demo#tree-form) |
| children | array | -- | Optional. Configure the subtable data of the row. | [Tree table](demo#tree-form) |
| $checkDisabled | `boolean` | false | Optional. Whether to disable this row | [Table interaction](demo#table-interaction) |
| $checkBoxTips | `string` | -- | Optional. Configure the checkbox prompt for this row. | [Table interaction](demo#table-interaction) |

# dTableHead

## dTableHead Parameter

| Parameter name | Type | Default value | Description | Jump to Demo |
| :-----------: | :-------------------: | :----- | :------------------------------------------------------------------: | :------------------------------------------------------------------- |
| checkable | `boolean` | -- | Optional. The checkbox is displayed in the first column of the table header for selecting all data. The checkbox can be associated with the selection status of the row data. | [Table interaction](demo#table-interaction) |
| checkOptions | `TableCheckOptions[]` | -- | Optional. Drop-down list box in the table header and operations | [Customized table selection](demo#table-check-options) |
| checkOptionsIndex | `number` | 1050 | (Optional) z-index in the drop-down list box selected in the table header | -- |
| checkDisabled | `boolean` | -- | Optional. Indicates whether the header checkbox is disabled. |

## dHeadCell Parameter

| Parameter name | Type | Default value | Description | Jump to Demo |
| :------------------: | :----------------------------------------: | :----- | :-----------------------------------------------------------: | :------------------------------------------------------- |
| resizeEnabled | `boolean` | -- | Optional. Whether the column width can be adjusted | [Table interaction](demo#table-interaction) |
| maxWidth | `string` | -- | Optional. Maximum width when you drag it to adjust the width. Unit: `px`.|
| minWidth | `string` | -- | Optional. Minimum width when you drag it to adjust the width. Unit: `px`|
| filterable | `boolean` | -- | Optional. Whether the column width can be filtered. | [Table interaction](demo#table-interaction) |
| closeFilterWhenScroll | `boolean` | -- | Optional. Specifies whether to close the filter box when a table or body is scrolled. | [Table interaction](demo#table-interaction) |
| customFilterTemplate | `TemplateRef` | -- | Optional. This parameter specifies the customized template for filtering pop-up boxes. | [Table interaction](demo#table-interaction) |
| extraFilterTemplate | `TemplateRef` | -- | Optional. This parameter specifies the extra template for filtering pop-up boxes. | [Table interaction](demo#table-interaction) |
| searchFn | `(term: string) => Observable<Array<any>>` | | Optional. The matching method of input keywords when filtering |
| filterList | `array` | -- | Optional. Filter list. This parameter is mandatory when filterable is set to true. | [Table interaction](demo#table-interaction) |
| filterMultiple | `boolean` | -- | Optional. Sets the column to be selected. true indicates that multiple choices are selected, and false indicates that only one choice is selected. | [Table interaction](demo#table-interaction) |
| filterBoxWidth | `string` | -- | Optional. Width of the filter dialog box, for example, 300px. |
| filterBoxHeight | `string` | -- | Optional. Height of the filter dialog box, for example, 400px. |
| beforeFilter | `(value) => boolean \| Promise<boolean> \| Observable<boolean>` | -- | Optional. Callback function before the table filtering dialog box is displayed. If false is returned, the dialog box is blocked. | [Table interaction](demo#table-interaction) |
| sortable | `boolean` | -- | Optional. Whether the column can be sorted | [Table interaction](demo#table-interaction) |
| sortDirection | `SortDirection` | -- | Optional. Sets the sorting status of the column. | [Table interaction](demo#table-interaction) |
| nestedColumn | `boolean` | -- | Optional. Indicates whether to display the expand or collapse icon of the table header in the tree table. | [Tree table](demo#tree-form) |
| iconFoldTable | `DOMString` | -- | Optional. Customize the collapse icon of the tree table | [Tree table](demo#tree-form) |
| iconUnFoldTable | `DOMString` | -- | Optional. Customize the expansion icon of the tree table | [Tree table](demo#tree-form) |
| fixedLeft | `string` | -- | Optional. The value is fixed to the left of the column, for example, 100px. | [Fixed column](demo#fixed-column) |
| fixedRight | `string` | -- | Optional. The value is fixed to the right of the column, for example, 100px | [fixed column](demo#fixed-column) |
| showSortIcon | `boolean` | false | Optional. Indicates whether to display the inactive sorting icon. The icon is not displayed by default. | [Table interaction](demo#table-interaction) |
| showFilterIcon | `boolean` | false | Optional. Indicates whether to display the inactive filter icon. The icon is not displayed by default. | [Table interaction](demo#table-interaction) |
|     column      |           `any`           | --   |                              Optional. Data can be transparently transmitted to the user-defined template of filterList.                              |               |

## dHeadCell Event

| Event | Type | Description | Jump to Demo |
| :----------------------: | :-----------------: | :-------------------------------------------------: | :------------------------------------------------------- |
| filterChange | `EventEmitter<FilterConfig[]>` | Callback event for confirming the filtering and returning the selected filtering array. | [Table interaction](demo#table-interaction) |
| filterToggle | `EventEmitter<{isOpen: boolean;checklist: FilterConfig[];}>` | Filter Panel Expansion and Collapse Event | [Table Interaction](demo#table-interaction) |
| sortChange | `EventEmitter<SortEventArg>` | Sorting callback event, which returns the sorting information of the column. | [Table interaction](demo#table-interaction) |
| resizeStartEvent | `EventEmitter<MouseEvent>` | Event when the column width adjustment starts |
| resizingEvent | `EventEmitter<{ width: string }>` | Event that the column width is being adjusted |
| resizeEndEvent | `EventEmitter<{ width: string }>` | Event when the column width adjustment ends | [Table interaction](demo#table-interaction) |
| toggleChildrenTableEvent | `EventEmitter<boolean>` | Event for expanding and collapsing all subtables. The value true indicates expanding, and the value false indicates collapse. |
| sortDirectionChange | `EventEmitter<SortDirection>` | Sort Order Direction Change Event|


# dTableCell

## dTableCell Parameter

| Parameter name | Type | Default value | Description | Jump to Demo |
| :-------------: | :-----------------------------: | :-----: | :------------------------------------------------: | :----------------------: |
| editable | `boolean` | -- | Optional. Whether a cell can be edited | [edit cell](demo#edit-cell) |
| editableTip | `'hover'\|'btn'` | -- | Optional. This parameter indicates the editing prompt. The background color of the hover changes. The edit button is displayed in the btn. | [edit cell](demo#edit-cell) |
| nestedColumn | `boolean` | -- | Optional. Display the expansion and collapse icons when the row in the tree table contains subtables. | [Tree table](demo#tree-form) |
| nestedLayer | `number` | | Layer in a tree table. This parameter is mandatory when nestedColumn is set to true. | [Tree table](demo#tree-form) |
| rowItem | `array` | -- | Row data. This parameter is mandatory when nestedColumn is set to true and can also be used as the callback parameter for cell editing. | [Tree table](demo#tree-form) |
| beforeEditStart | `function\|Promise\|Observable` | -- | Optional. Callback before the cell starts editing. If false is returned, the cell starts editing. | [Edit cell](demo#edit-cell) |
| beforeEditEnd | `function\|Promise\|Observable` | -- | Optional. Callback function before the cell edit ends. If false is returned, the cell edit stops. | [Edit cell](demo#edit-cell) |
| iconFoldTable | `DOMString` | -- | Optional. Customize the collapse icon of the tree table | [Tree table](demo#tree-form) |
| iconUnFoldTable | `DOMString` | -- | Optional. Customize the expansion icon of the tree table | [Tree table](demo#tree-form) |
| fixedLeft | `string` | -- | Optional. The value is fixed to the left of the column, for example, 100px. | [Fixed column](demo#fixed-column) |
| fixedRight | `string` | -- | Optional. The value is fixed to the right of the column, for example, 100px | [fixed column](demo#fixed-column) |
| editing | `boolean` | -- | Optional. Use [(editing)] to obtain and control the cell editing status. | [editing cell](demo#edit-cell) |
| field | `string` | -- | Field in the column to which the cell belongs, which is used as the parameter beforeEditStart and beforeEditEnd. | [Edit cell](demo#edit-cell) |
| nestedColumnIndent | `number` | 16 | Indentation distance of a subtable in a cell, in px | [tree table](demo#tree-form) |

## dTableCell Event

| Event | Type | Description | Jump to Demo |
| :-------------------: | :-------: | :-----------------------------------------------------: | :------------------------------------------------- |
| editStatusEvent | `EventEmitter<boolean>` | Cell editing status event | [edit cell](demo#edit-cell) |
| toggleChildTableEvent | `EventEmitter<boolean>` | Event for expanding and collapsing the subtable in the current row. The options are true and false. | [Tree table](demo#tree-form) |

## Cell common class

| Parameter name | Description | Jump to Demo |
| :-------------: | :------------------------------------------------------------: | :------------------------------------------------- |
| devui-operation-cell | When operation components such as input and d-icon are placed in a cell, padding is adjusted to fit the row height. | |
| devui-table-link | Add | when placing links in cells.
| devui-table-title | When table header information is placed in a cell, it is automatically bolded. | |

#### Configure the row template of the dTableBody when the user-defined template is used.

For details, see (demo#tree-form)**.

``` html
<ng-template
let-rowItem="rowItem"
let-rowIndex="rowIndex"
let-nestedLayer="nestedLayer"
let-nestedIndex="nestedIndex">
<tr dTableRow></tr>
</ng-template>
// rowItem: row data
// rowIndex: row number.
// nestedLayer: level of the table to which the row belongs in the tree table, which is generated by the component. The outermost table is 0 and increases ascending order.
// nestedIndex: row index in the tree table, which is generated by the component.
```

#### Template for prompting that the configuration data is empty

The table accepts the `#noResultTemplateRef` template. For details, see **[Asynchronous data loading](demo#async-loading)**.

#### Custom Filter dialog box

For details, see (demo#table-interaction)**.

``` html
<ng-template
let-filterList ="filterListDisplay"
let-dropdown="dropdown"
let-column="column">
<! --cell content-->
</ng-template>
// filterListDisplay: value of the input filterList.
// dropdown: Obtains the dropdown reference, which is used to control whether to enable or disable the pop-up dialog box.
// column: metadata of the current column, which is implemented using the column configuration, corresponding to the DataTableColumnTmplComponent class.
```

## CheckableRelation

``` ts
export interface CheckableRelation {
  upward: boolean; // Select the child association parent.
  downward: boolean; // Select the parent associated child.
}
```

## TableWidthConfig

```ts
export interface TableWidthConfig {
  field: string; // Column name
  width: string; // Width, in px.
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
  field?: string; // Column name
  direction: SortDirection; // Sequence
}
```

## TableExpandConfig

```ts
export interface TableExpandConfig {
    expand ? : boolean, // Whether to expand
    expandTemplateRef ? : ElementRef, // Custom template
    description ? : string // Simple description
}
```

## RowCheckChangeEventArg

```ts
export interface RowCheckChangeEventArg {
  rowIndex: number; // Row No.
  nestedIndex: string; // Row index in the tree table, which is generated by the component.
  rowItem: any; // Row data
  checked: boolean; // Indicates whether to select the check box.
}
```

## TableCheckStatusArg

```ts
export interface TableCheckStatusArg {
  pageAllChecked?: boolean; // Select all.
  pageHalfChecked?: boolean; // Partially selected
}
```

## RowToggleStatusEventArg

```ts
export interface RowToggleStatusEventArg {
  rowItem: any; // Row data
  open: boolean; // Indicates whether to expand the subtable.
}
```

## FilterConfig

```ts
export interface FilterConfig {
  id: number | string;
  name: string;
  value: any;
  checked?: boolean; // multiple select
  selected?: boolean; // single select
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

Dynamic column and style configurator, which is data-driven and returns the data generated by configuration.
## d-table-option-toggle parameter

| Parameter name | Type | Default value | Description | Jump to Demo |
| :-------------: | :-----------------------------: | :----- | :------------------------------------------------------------: | :------------------------------------------------- |
| columnsData | `Array<ColData>` | [] | is mandatory. This parameter is used to configure the column header data.|[Dynamic Column and Style](demo#dynamic-cols)|
| colSort | `boolean` | true | (Optional) Indicates whether to allow column sorting. | [Dynamic Columns and Styles] (demo#dynamic-cols) |
| styleSetting | `TableStyleData` | {} | Optional. Add style configurations and initial values. | [Dynamic columns and styles] (demo#dynamic-cols) |
| toggleMode | `dropdown' \| 'modal' ` | 'dropdown' | Trigger type, drop-down or pop-up window. If there are too many columns, pop-up windows are recommended. | [Dynamic Columns and Styles] (demo#dynamic-cols) |
| modalWidth | `string` | '600px' | Pop-up window width | [Dynamic column and style] (demo#dynamic-cols) |

## d-table-option-toggle event

| Event | Type | Description | Jump to Demo |
| :-------------------: | :-------: | :-----------------------------------------------------: | :------------------------------------------------- |
| colChanges | `EventEmitter<Array<ColData>>` | column status change | [Dynamic column and style] (demo#dynamic-cols) |
| styleChanges | `EventEmitter<TableStyleData>` | Table Style Change Return | [Dynamic Columns and Styles] (demo#dynamic-cols) |

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
size?:'xs' |'sm' |'md';
borderType?: ''|'borderless';
striped?: boolean;
shadowType?:'embed' |'normal';
}
```

# The following table describes the parameters and methods that are available only when a table is implemented by configuring columns.

## d-column parameter
| Parameter | Type | Default value | Description | Jump to Demo |
| :-------------------------------: | :-----------------------------: | :---------------- | :-------------------------------------------------------------------------------------: | :------------------------------------------------------- |
| editable | `boolean` | false | Optional. Specifies whether the column can be edited on the d-column. | [edit cell](demo#edit-cell) |
| maxWidth | `string px` | -- | Optional.  Maximum width when you drag it to adjust the width, Unit: `px` |
| minWidth | `string px` | -- | Optional.  Minimum width when you drag it to adjust the width, Unit: `px` |
| field | `string` | -- | Required. Fields in this column | [Basic usage](demo#basic-usage) |
| header | `string` | -- | Text in the column header | [Basic usage](demo#basic-usage) |
| sortable | `boolean` | -- | Optional. indicating whether to sort data | [Table interaction](demo#table-interaction) |
| editable | `boolean` | -- | Optional. Whether the table can be edited | [Table interaction](demo#table-interaction) |
| width | `string px,%` | -- | width | [basic usage](demo#basic-usage) |
| nestedColumn | `Boolean` | false | Optional. Specifies the column as the operation column of the tree table. That is, the expand/collapse button and the content indentation button are available to indicate the hierarchy. | [Tree table](demo#tree-form) |
| extraOptions.editableTip | `btn', ''` | -- | Optional. This parameter is optional and can be edited. 'btn' indicates that the edit button is displayed when you move the mouse pointer over a cell. When this parameter is not configured, the background color of the cell changes. | [Edit cell](demo#edit-cell) |
| extraOptions.iconFoldTable | `Template` | -- | Optional. The collapse icon of the tree table is automatically defined. | [Tree table](demo#tree-form) |
| extraOptions.iconUnFoldTable | `Template` | -- | Optional. The expansion icon of the tree table is automatically defined. | [Tree table](demo#tree-form) |
| extraOptions.showHeadTableToggler | `boolean` | false | Optional. Indicates whether to display the expand/collapse icon in the header of the tree table. | [Tree table](demo#tree-form) |
| order | `number` | Number. MAX_VALUE | Optional. Column number | [Basic usage](demo#basic-usage) |
| filterable | `boolean` | -- | Optional. indicating whether to filter. | [Table interaction](demo#table-interaction) |
| closeFilterWhenScroll | `boolean` | -- | Optional. Specifies whether to close the filter box when a table or body is scrolled. | [Table interaction](demo#table-interaction) |
| filterList | `array` | -- | Optional. Transfer the filtering list to be operated. This parameter is mandatory when filterable is set to true. | [Table interaction](demo#table-interaction) |
| filterMultiple | `boolean` | true | Optional. The options are as follows: true: multi-choice; false: single-choice. | [Table interaction](demo#table-interaction) |
| customFilterTemplate | `TemplateRef` | -- | Optional. This parameter specifies the customized template of the table filtering dialog box. For details, see the "Customized Filtering Dialog Box" in the DOC. | [Table Interaction](demo#table-interaction) |
| extraFilterTemplate | `TemplateRef` | -- | Optional. This parameter specifies the extra template of the table filtering dialog box. | [Table Interaction](demo#table-interaction) |
| beforeFilter | `function, Promise, Observable` | -- | Optional. Callback function before the table filtering dialog box is displayed. If false is returned, the dialog box is blocked. | [Table interaction](demo#table-interaction) |
| cellClass | `string` | -- | Optional. Custom class of the cell in the column |
| fixedLeft | `string` | -- | Optional. Fixed distance from the column to the left, for example, '100px' | [Fixed column](demo#fixed-column) |
| fixedRight | `string` | -- | Optional. Fixed distance from the column to the right, for example, '100px' | [Fixed column](demo#fixed-column) |
| filterBoxWidth | `any` | -- | Optional. Width of the filter dialog box, for example, 300px. |
| filterBoxHeight | `any` | -- | Optional. Height of the filter dialog box, for example, 400px. |
| nestedColumnIndent | `number` | 16 | Indentation distance of a subtable in a cell, in px | [tree table](demo#tree-form) |
| advancedHeader | `advancedHeader` | -- | column Tables | [Header Grouping](demo#header-grouping) |
| headCellApplyAll | `boolean` | false | column table applies to the table header at each layer. The value false indicates that the head-cell template applies only to the last layer. | |

## d-column event

| Event | Type | Description | Jump to Demo |
| :----------: | :--------------: | :----------------------------------: | :------------------------------------------------------- |
| filterChange | `FilterConfig[]` | Callback event for confirming the filtering and returning the selected filtering array. | [Table interaction](demo#table-interaction) |
| filterToggle | `EventEmitter<{isOpen: boolean;checklist: FilterConfig[];}>` | Filter Panel Expansion and Collapse Event | [Table Interaction](demo#table-interaction) |

## rowItem parameter

| Parameter | Type | Default value | Description |
| :---------------: | :-----------------: | :----- | :-------------------------------------------------------------------------------------------------------: |
| $editDeniedConfig | `array` | -- | Optional. This parameter is used with column to configure the edit permission on some cells in the row. For example, if this parameter is set to ['age'], the cell whose field is age cannot be edited. |
| $expandConfig | [`TableExpandConfig`](#tableexpandconfig) | -- | Optional. Configure additional content in this line. |
| $rowClass | `string` | -- | Optional. Configure the user-defined class of the line. |
| $hovered | `boolean` | false | The value is true when the cursor moves over the element in the row, and false when <br> leaves the row. |

#### Custom Cells

When the cell data (cellItem, which is obtained by rowItem[column.field]) is of the string type, the widget can be directly displayed. When the cell data is of the object type or the special behavior of the cell needs to be defined, the cell needs to be customized for display.
For example, we want to capitalize the data in the `Gender' column and display a prompt when you move the mouse. The relevant code is as follows:
```
<d-column field="gender" header="Gender" [sortable]="true" [width]=" '100px'">
<d-cell>
<ng-template let-cellItem="cellItem">
<span dTooltip [content]='cellItem' [position]="'bottom'">
{{cellItem.toUpperCase()}}
</span>
</ng-template>
</d-cell>
</d-column>
```

#### Customizing a Cell Editing Template

The Datatable allows users to customize cell editing using a template.
```
<d-column field="lastName" header="Last Name" [fieldType]="'customized'" [editable]="true">
<d-cell-edit>
<ng-template let-rowItem="rowItem" let-column="column">
<input [(ngModel)]="rowItem[column.field]" maxlength="5" />
</ng-template>
</d-cell-edit>
</d-column>
```
The complete template for editing customized cells and configuration cells is as follows:
``` xml
<ng-template
let-rowIndex="rowIndex"
let-colIndex="colIndex"
let-rowItem="rowItem"
let-column="column"
let-cellItem="cellItem"
let-tableLevel="tableLevel">
<! --cell content-->
</ng-template>
// rowIndex: row number.
// colIndex: column sequence number
// rowItem: data in the current row, corresponding to the key-value pair of filed and cellItem.
// column: metadata of the current column, corresponding to the DataTableColumnTmplComponent class
// cellItem: value of the current cell. The value is obtained from rowItem[column.field].
// tableLevel: indicates the level of the table in the tree table. The outermost value is 0. The value increases automatically.
```
#### Customizing a Table Header Cell
If a table header cell is required, the system displays the message "Gender is a head cell template" when you move the mouse over the table.
``` xml
<d-column field="gender" header="Gender" [sortable]="true" [width]=" '100px'">
<d-head-cell>
<ng-template let-column="column">
<span dTooltip [content]="column.header +'is a head cell template'" [position]="'bottom'">
{{column.header}}
</span>
</ng-template>
</d-head-cell>
</d-column>
// column: Enter a column value, corresponding to the `DataTableColumnTmplComponent` class.
```
#### Multi-row Header and Table Header Combine Cells
* Add this parameter when the d-column is used.
``` javascript
advancedHeader: Array < {
header: string;
rowspan: number;
colspan: number;
}
```
Note: Empty cells also need to be indicated. Set rowspan/colspan to 0 based on the content. If column width dragging and multi-row headers are used at the same time, attach the width to the column content. If the column width of the first row is incorrect, manually add the $width attribute for advancedHeader[rowNumber].

#### Tree table with a large amount of data

## virtual-scroll-tree-table parameter
| Parameter name | Type | Default value | Description | Jump to Demo |
| :---------------: | :-----------------: | :----- | :-------------------------------------------------------------------------------------------------------: |:-----------------:  |
|    dataSource     |       `any[]`      | --     |                                        Required. Flattened data source, used to render table data. The public method flatTreeData can be used to flatten the tree structure.        |[Tree table with a large amount of data Basic](demo#virtual-scroll-tree-table-basic)|
|  editOption |       `any[]`      | --     |                                        Optional. Used to configure the resource of the drop-down list box during modification.        |[Tree table with a large amount of data Operation](demo#virtual-scroll-tree-table-operation)|
|     displayRowNum      |      `number`      | 10     |                                        Optional. Used to configure the initial number of rows to be displayed in a table.      |[Tree table with a large amount of data Basic](demo#virtual-scroll-tree-table-basic)|
|     rowHeight      |      `number`      |  -    |                                        This parameter is optional. It is used to configure the table row height. If this parameter is not transferred, the value of DataTablePropertiesInterface.size is used.                                   |[Tree table with a large amount of data Basic](demo#virtual-scroll-tree-table-basic)|
|     dataTableProperties      |      [`DataTablePropertiesInterface`](#DataTablePropertiesInterface)      | --     |         Optional. Support for original parameters of dataTable, Parameters defined in DataTablePropertiesInterface can be supported.                           |[Tree table with a large amount of data Interaction](demo#virtual-scroll-tree-table-interaction)|
|     draggable      |      `boolean`      | false     |                   Optional. Indicates whether to enable row dragging in the table.    |[Tree table with a large amount of data Interaction](demo#virtual-scroll-tree-table-interaction)|
|     checkableRelation      | `CheckableRelation`  | { upward: true, downward: true }  |       Optional, Logical relationship between parent and child in the table tree      | - |
| dragDomTemplate | `TemplateRef<any>` | - | Drag the DOM template to expose two parameters rowItemList and columns | - |

## virtual-scroll-tree-table event
| Event | Type | Description | Jump to Demo |
| :-------------------: | :------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
|        save         |  `EventEmitter<any>`  |               Returns the data after the operation is changed.               | [Tree table with a large amount of data Basic](demo#virtual-scroll-tree-table-basic) |
|        allChecked         |  `EventEmitter<any>`  |               Return to Table Header Checkbox Status.               | [Tree table with a large amount of data Interaction](demo#virtual-scroll-tree-table-interaction) |
|        dropRow         |  `EventEmitter<dataList: any[];dropIndex: number;>`  |               Placement event of dragging a table row               | [Dragging a tree table with a large amount of data](demo#virtual-scroll-tree-table-multi-drag) |
| tableRenderEnd | `EventEmitter<void>` | Callback event indicating that rendering is complete after table data is changed. | |

The original datatable events can be transparently transmitted. The multiSortChange, cellClick, cellDBClick, rowClick, rowDBClick, cellEditStart, cellEditEnd, and resize events are supported.

## Customizing Templates and Operation Columns in d-column Mode

``` xml
<d-column field="category" header="Category" [order]="1"
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

<d-column field="operation" header="Operation" [width]="'130px'" [order]="6">
    <d-cell>
    <ng-template let-rowItem="rowItem">
        <span>
        <ng-container *ngIf="!isSearch">
            <div *ngIf="rowItem.node_type" class="operationIcon icon-add-directory" title="Add Folder" (click)="addTreeNodeByRowItem(rowItem, 'addChild', 1)"></div>
            <div *ngIf="rowItem.node_type" class="operationIcon icon-add-file" title="Add Node" (click)="addTreeNodeByRowItem(rowItem , 'addChild', 0)"></div>
            <div class="operationIcon icon-add-sub-node" title="Insert Folder" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 1)"></div>
            <div class="operationIcon icon-add-sub-module" title="Insert Node" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 0)"></div>

            <div class="operationIcon icon-copy" title="Copy" (click)="copyAndCut(rowItem, 'copy')"></div>
            <div class="operationIcon icon-cut" title="Cut" (click)="copyAndCut(rowItem, 'cut')"></div>
            <div *ngIf="rowItem.node_type && saveCopyClickNode" class="operationIcon icon-copy-to-new" title="Paste" (click)="paste(rowItem, 'paste')"></div>
            <div *ngIf="rowItem.node_id === saveCopyClickNode" class="operationIcon icon-add-manual-use-case" title="Paste to Root" (click)="paste(rowItem, 'toRoot')"></div>
        </ng-container>
        <div class="operationIcon icon-delete" title="delete" (click)="delete(rowItem)"></div>
        </span>
    </ng-template>
    </d-cell>
</d-column>
```

## Expanding or collapsing a tree table with a large amount of data

Use @ViewChild to invoke the expand/collapse all function

``` xml
<d-button [disabled]="isSearch" *ngIf="!isOpenAll" class="golbalBtn allNodesExpand" icon="icon-expand-info" bsStyle="common" (click)="toggleAllNodesExpand(true)">
Expand All</d-button>
<d-button [disabled]="isSearch" *ngIf="isOpenAll" class="golbalBtn allNodesCollapse" icon="icon-collapse-info" bsStyle="common" (click)="toggleAllNodesExpand(false)">Fold All</d-button>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

toggleAllNodesExpand(e) {
    this.VirtualTableTree.toggleAllNodesExpand(e);
    this.isOpenAll = e;
}

// Use @ViewChild to call toggleAllNodesExpand method in VirtualScrollTreeTableComponent
```

## Tree table search for a large amount of data

Use @ViewChild to invoke the search function

``` xml
<div class="searchSelect">
    <d-select [options]="searchSelectSource" [filterKey]="'name'" [(ngModel)]="searchAttr" (ngModelChange)="searchSelectChange()"> </d-select>
</div>
<d-search
    style="width: 300px"
    [placeholder]="'search'"
    [isKeyupSearch]="true"
    (searchFn)="search($event)"
></d-search>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

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

// Call the searchSelectChange and search methods in VirtualScrollTreeTableComponent using @ViewChild
```

## Adding a large amount of data to a tree table

Use @ViewChild to invoke the add function

``` xml
// Global Add
<d-button [disabled]="isAddGlobalData || isSearch" class="golbalBtn addNode" icon="icon-add-file" bsStyle="primary" (click)="addRootNode('node')">Add Node</d-button>
<d-button [disabled]="isAddGlobalData || isSearch" class="golbalBtn addFolder" icon="icon-add-directory" bsStyle="common" (click)="addRootNode('folder')">Add Folder</d-button>

// Add Operation Column
<div *ngIf="rowItem.node_type" class="operationIcon icon-add-directory" title="Add Folder" (click)="addTreeNodeByRowItem(rowItem, 'addChild', 1)"></div>
<div *ngIf="rowItem.node_type" class="operationIcon icon-add-file" title="Add Node" (click)="addTreeNodeByRowItem(rowItem , 'addChild', 0)"></div>
<div class="operationIcon icon-add-sub-node" title="Insert Folder" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 1)"></div>
<div class="operationIcon icon-add-sub-module" title="Insert Node" (click)="addTreeNodeByRowItem(rowItem, 'insertAfter', 0)"></div>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

// Users can customize data templates.
addTemplate: any = {
  "property": "addPro",
  "description": "addDes",
  "category": "Dynamic"
}

// Global Add
addRootNode(status) {
  this.isAddGlobalData = true;
  this.VirtualTableTree.addRootNode(status, this.addTemplate);
  this.isAddGlobalData = false;
}

// Call the addGolbal method in VirtualScrollTreeTableComponent using @ViewChild

// Add Operation Column
addTreeNodeByRowItem(rowItem: TreeNodeInterface, action: 'addChild' | 'insertBefore' | 'insertAfter', nodeType: VirtualTreeNodeType) {
  this.VirtualTableTree.addTreeNodeByRowItem(rowItem, status, this.addTemplate);
}

// Call the addOperation method in VirtualScrollTreeTableComponent using @ViewChild
```

## Copying and Pasting Tree Tables with a Large Amount of Data

Use @ViewChild to invoke the copying and pasting function

``` xml
<div class="operationIcon icon-copy" title="Copy" (click)="copyAndCut(rowItem, 'copy')"></div>
<div class="operationIcon icon-cut" title="Cut" (click)="copyAndCut(rowItem, 'cut')"></div>
<div *ngIf="rowItem.node_type && saveCopyClickNode" class="operationIcon icon-copy-to-new" title="Paste" (click)="paste(rowItem, 'paste')"></div>
<div *ngIf="rowItem.node_id === saveCopyClickNode" class="operationIcon icon-add-manual-use-case" title="Paste to Root" (click)="paste(rowItem, 'toRoot')"></div>
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

paste(rowItem, status) {
  this.VirtualTableTree.paste(rowItem, status);
  if(this.isCut) {
    this.saveCopyClickNode = "";
    this.isCut = false;
  }
}

// Use @ViewChild to call copyAndCut and paste methods in VirtualScrollTreeTableComponent
```

## Removing a large amount of data from a tree table

Use @ViewChild to invoke the delete function
``` xml
<div class="operationIcon icon-delete" title="delete" (click)="delete(rowItem)"></div>
```

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

delete(rowItem) {
  this.VirtualTableTree.delete(rowItem);
}

// Call the delete method in VirtualScrollTreeTableComponent using @ViewChild
```

## Drag a large amount of data from a tree table

Use @ViewChild to invoke the drag function

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
  this.VirtualTableTree.dragDown(downEvent, rowItem, rowIndex, document);
}

// Use @ViewChild to call dragDown method in VirtualScrollTreeTableComponent
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
//Customize the movement logic. You can add the effect of floating triggering in related areas.
}

customDrop(event, rowItemList) => {
//Customize the placement logic.
}

//Use @ViewChild to call the customDragDown method in VirtualScrollTreeTableComponent.
```

## check a large amount of data from a tree table

Use @ViewChild to invoke the check function

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
  this.VirtualTableTree.onAllCheckChange(event);
}

allChecked(event) {
  this.allCheck = event.allCheck;
  this.halfCheck = event.halfCheck;
}

// Use @ViewChild to call the onRowCheckChange and onAllCheckChange methods in VirtualScrollTreeTableComponent

getRowCheckData() {
  const saveCheck = this.VirtualTableTree.saveCheck;
  const saveHalfCheck = this.VirtualTableTree.saveHalfCheck;
}

// Use @ViewChild to obtain the saveCheck all and saveHalfCheck half-selected arrays in VirtualScrollTreeTableComponent

ngOnInit() {
  this.dataSource = JSON.parse(this.dataSource);
  this.dataSource[2].disabled = true;
  this.dataSource[163].disabled = true;
  this.dataSource = JSON.stringify(this.dataSource);
}

// The check box can be disabled based on the disabled attribute in the data. Note: When a parent node is disabled, all subsets under the parent node are disabled. When a child node is added, copied, cut, or dragged, the child nodes under the parent node are also disabled.
```

## Batch delete a large amount of data from a tree table

Use @ViewChild to invoke the batch delete function

``` javascript
@ViewChild('VirtualTableTree') VirtualTableTree: VirtualScrollTreeTableComponent;

batchDelete() {
  this.VirtualTableTree.batchDelete();
}

// Use @ViewChild to call batchDelete method in VirtualScrollTreeTableComponent
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