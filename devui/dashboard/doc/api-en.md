# How to Use

The following information is added to the module:

```ts
import {DashboardModule} from 'ng-devui/dashboard';
```

Used in the page:

```html
<d-dashboard>
<d-dashboard-widget [(width)]="3" [(height)]="1" [(x)]="x" [(y)]="y" [widgetData]="data"></d-dashboard-widget>
<d-dashboard-widget [(width)]="3" [(height)]="2" [(x)]="x2" [(y)]="y2" [widgetData]="data2"></d-dashboard-widget>
</d-dashboard>
```

Dependencies Required by Components

```json
"gridstack": "2.0.1",
```

## d-dashboard component

This component defines a dashboard.

### d-dashboard parameters

| Parameter | Type | Default | Description |
| :-------------: | :----------------: | :---: | :------------------------------------------------------------------------------ |
| initOptions | `GridstackOptions` | -- | is optional. By default, the configuration is built-in. Users do not need to overwrite the configuration. This option is used to maintain scalability.|
| static | `boolean` | false | Optional. Indicates whether to enable read-only. true indicates read-only and false indicates editable. The default value is false. |
| float | `boolean` | true | Optional. This parameter indicates whether to allow the widget to be placed under a blank widget. The default value is true. |
| animate | `boolean` | true | Optional. Whether to enable the animation when adjusting the width and height and moving cards. The default value is true. |
| widgetMoveable | `boolean` | true |: indicates whether the internal widget can be moved. This parameter is valid only when static is set to false.|
| widgetResizable | `boolean` | true | is optional. Can the size of the internal widget be changed? |
| showGridBlock | `boolean` | false | (Optional) Indicates whether to display the grid.|
| column | `number` | 12 | Optional. The default value is 12. If the value is greater than 12, use gridstack.extra.scss to extend the CSS. |
| minRow | `number` | -- | Optional. Minimum number of rows. The value 0 indicates no limit. |
| maxRow | `number` | -- | Optional. Maximum number of rows. The value 0 indicates no limit.|
| cellHeight | `number\|string` | -- | Optional. Row height (including margins\ * 2). The unit is px for `number`. |
| Margin | `number\|string` | -- | Space between the card and the grid. The unit is px when the card is of the `number` type. |

### d-dashboard event

| Event | Type | Description |
| :-----------: | :----------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
Event triggered by adding a widget on the UI, such as | widgetAdded | `EventEmitter<DashboardWidgetEvent>` | dragging. A single data node in the array is the added node and contains widgetData information. willItFit indicates whether there is sufficient space. origNode indicates the original node.|
Event triggered by widget change on the UI, such as | widgetChanged | `EventEmitter<DashboardWidgetEvent>` | dragging. In the array, a single data node is the changed node, and the widget is the dragged DashboardWidgetComponent.
Event triggered when a widget is deleted on the UI, such as | widgetRemoved | `EventEmitter<DashboardWidgetEvent>` | dragging. A single data node in the array is the deleted node and contains trashData information. The widget is the dragged DashboardWidgetComponent.
| dashboardInit | `EventEmitter<DashboardWidgetEvent>` | dashboard initialization complete|

```typescript
export type DashboardWidgetEvent = Array<{
widget?: DashboardWidgetComponent; // change, remove
node?: GridStackNode & {
widgetData?: any; // add
willItFit?: boolean;
trashData?: any; // remove
};
origNode?: GridStackNode; // add(optional)
} >;
```


### d-dashboard function

Exporting a dDashboard

```html
<d-dashboard #dashboard="dDashboard"> </d-dashboard>
` ` `

`public getCurrentColumn():number`Query the current column value and the number of columns.

`public getCurrentRow():number`Query the current row value and the number of rows.

`public getCurrentColumnWidth():number`: indicates the width of a single column. The unit is pixel.

`public getCurrentCellHeight():number`Query the current cell height, in pixels.

`public getCurrentMargin():number`Query the current margin spacing, in pixels.

`public compact():void`Compactly arranges pendants in the current dashboard

`public willItFit(x: number, y: number, width: number, height: number, autoPosition = false):boolean` Query whether a new component with width and height can be placed on x and y.

## d-dashboard-widget component

This component defines a dashboard widget.

### d-dashboard-widget parameters

| Parameter | Type | Default | Description |
| :----------: | :-------: | :---: | :-------------------------------------------------: |
| x | `number` | 0 | Optional, coordinate x (line x), first line line 0 |
| y | `number` | 0 | Optional. The coordinate is y (column y). The first column is column 0. |
| width | `number` | 1 | Optional. Widget width (unit column) |
| height | `number` | 1 | Optional. Widget height (unit: line) |
| id | `number` | -- | Optional. This parameter indicates the ID of the widget node, which corresponds to the ID of the GridStackNode generated. |
| maxWidth | `number` | 0 | Optional. This parameter indicates the maximum width of the widget to be adjusted. The value 0 indicates that the size is not limited. |
| maxHeight | `number` | 0 | This parameter is optional. The value 0 indicates that the maximum height of the widget is not limited. |
| minWidth | `number` | 0 | Optional. The value 0 indicates that the minimum width of the widget is not limited. |
| minHeight | `number` | 0 | Optional. This parameter indicates the minimum height of the widget. The value 0 indicates no limit. |
| noResize | `boolean` | false | Optional. Indicates whether the widget can be resized. |
| noMove | `boolean` | false | Optional. Indicates whether the widget can be moved. |
| autoPosition | `boolean` | false | (Optional) Indicates whether to ignore x and y to automatically search for vacant bits. This parameter is valid only for initialization.|
| locked | `boolean` | false | Optional. Indicates whether the Widget is locked and not squeezed by other Widget positions. |
| WidgetData | `any` | -- | Optional. User-defined data can be used for differentiated transmission. |

### d-dashboard-widget event

| Event | Type | Description |
| :-----------: | :--------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
If the | xChange | `EventEmitter<number>` | x value changes, you are advised to bind the | xChange | `EventEmitter<number>` | x value to the corresponding x value bidirectionally. If the | xChange | `EventEmitter<number>` | x value is not bound to the x value, the internal x value will be forcibly changed (see the description).|
If the | yChange | `EventEmitter<number>` | y value changes, you are advised to bind the | yChange | `EventEmitter<number>` | y value to the corresponding x value bidirectionally. If the | yChange | `EventEmitter<number>` | y value is not bound to the y value, the internal y value will be forcibly changed (see the description).|
If the | widthChange | `EventEmitter<number>` | width value changes, you are advised to bind the | widthChange | `EventEmitter<number>` | width value to the corresponding width value bidirectionally. If the | widthChange | `EventEmitter<number>` | width value is not bound to the width value, the internal width value will be forcibly changed (see the description).|
If the | heightChange | `EventEmitter<number>` | height value changes, it is recommended that the | heightChange | `EventEmitter<number>` | height value be bidirectionally bound to the corresponding height value. If the | heightChange | `EventEmitter<number>` | height value is not bound to the height value, the internal height value will be forcibly changed (see the description). | |
| WidgetInit | `EventEmitter` | Optional. It is transmitted when the Widget initialization is complete. |
| WidgetResize | `EventEmitter` | Optional. This parameter is triggered when the size of the widget is adjusted. In single-column mode, the value of width is the width of the widget (unit: column), and the value of height is the height of the widget (unit: row). |
| widgetDestroy | `EventEmitter` | is optional. It is transmitted when the widget is destroyed.|

- Note: If the original data value is not bound, the internal value is forcibly updated to adapt to the GUI function. Users can perform unified processing in the widgetChange event of the dashboard.

## dDashboardLibraryWidget Directive

This component defines an external pendant that can be dragged into the dashboard.

### dDashboardLibraryWidget Parameters

| Parameter | Type | Default | Description |
| :-------------: | :------------------: | :----: | :---------------------------------------------------------------- |
| targetDashboard | `DashboardComponent` | -- | Mandatory. Target dashboards that can be dragged into |
| width | `number` | 1 | Width of the widget to be dragged (unit: column) |
| height | `number` | 1 | Height of the widget to be dragged (unit: row) |
| dragMode | `'copy'\ | 'move' `| 'copy' | Optional, move or copy|
| dragTemplate | `TemplateRef<any>` | -- | is optional. The dragged content template is displayed when the content template is dragged. For details about available variables in the template, see the following section.
| dragCopyStyle | `boolean` | -- | Optional. Indicates whether to copy all styles during dragging. |
| dragDisabled | `boolean` | false | (Optional) Whether to disable dragging. This parameter is used to temporarily disable dragging into the dashboard.|

### outlet parameter of dragTemplate

| Parameter | Type | Description |
| :--------: | :------: | :-------------------------------- |
| \$implicit | `any` | WidgetData transferred by the user |
| width | `number` | Width of the widget (unit: column) |
| height | `number` | Height of the widget (unit: line) |

## dDashboardLibraryPanel Directive

This component defines a container for external widgets that can be dragged to the dashboard to obtain information about widget dragging.

### dDashboardLibraryPanel Events

| Event | Type | Description |
| :-------------: | :------------: | :------------------------------- |
| widgetDragStart | `EventEmitter` | is optional. It is emitted when the widget starts to drag.|
| widgetDragStop | `EventEmitter` | is optional. It is transmitted when the widget ends dragging.|

## dDashboardLibraryTrash Directive

This component defines a recycle bin that can be dragged into by the dashboard pendant.

### dDashboardLibraryTrash parameters

| Parameter | Type | Default | Description |
| :-------------: | :------------------: | :---: | :--------------------------------------------------- |
| targetDashboard | `DashboardComponent` | -- | (Mandatory) Delete the target dashboard associated with the operation.|
| trashData | `any` | -- | Optional. User-defined recycle bin information can be used to distinguish different recycle bins. |
| dropDisabled | `boolean` | false | (Optional) Indicates whether to disable the Dashboard attachment. This parameter is used to temporarily disable the Dashboard attachment.|