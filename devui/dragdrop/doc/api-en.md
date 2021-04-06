# How to use

Import into module:

```typescript
import { DragDropModule } from' ng-devui/dragdrop';
```

## Dragdrop

Provides the dDraggable and dDroppable(dSortable) instructions.

## dDraggable directive

### dDraggable Parameter

| Parameter                     | Type                                                                                                             | Default Value | Description                                                                                                                                                                                                                                                                                                                              | Jump to Demo                                                         |Global Config| 
| :----------------: | :---------------------------- | :--------------------------------------------------------------------------------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| dragData                      | `any`                                                                                                            | --            | Optional. Data transmitted to the `DropEvent` event.                                                                                                                                                                                                                                                                                     | [Basic Usage](demo#basic-usage)                                      |
| dragScope                     | `string \| Array<string>`                                                                                        | 'default '    | Optional. Restricts the drop position. It must match the corresponding `dropScope`.                                                                                                                                                                                                                                                      | [Basic Usage](demo#basic-usage)                                      |
| dragOverClass                 | `string`                                                                                                         | --            | Optional. CSS of the dragged element.                                                                                                                                                                                                                                                                                                    | [Drag Entity Element to Follow](demo#drag-entity-elements-to-follow) |
| dragHandleClass               | `string`                                                                                                         | --            | Optional. Drag handle. CSS selector. Only selected elements can respond to drag events.                                                                                                                                                                                                                                                  | [Basic Usage](demo#basic-usage)                                      |
| disabled                      | `boolean`                                                                                                        | false         | Optional. Specifies whether the current element can be dragged. false: yes; true: no.                                                                                                                                                                                                                                                    | [Basic Usage](demo#basic-usage)                                      |
| enableDragFollow              | `boolean`                                                                                                        | false         | Optional. Whether to enable entity element follow (more special effects such as shadow can be added)                                                                                                                                                                                                                                     | [Drag Entity Element to Follow](demo#drag-entity-elements-to-follow) |
| dragFollowOption              | `{appendToBody?: boolean}`                                                                                       | --            | Optional. It is used to control some configuration of entity dragging.                                                                                                                                                                                                                                                                   | [Drag Entity Element to Follow](demo#drag-entity-elements-to-follow) |
| dragFollowOption.appendToBody | `boolean`                                                                                                        | false         | Optional. controls the position of the clone element to be inserted in entity dragging. The default value false is inserted at the end of all children of the source element's parent element, and the value true is attached to. See Note 1                                                                                             | [Drag Entity Element to Follow](demo#drag-entity-elements-to-follow) |
| originPlaceholder             | `{show?: boolean; tag?: string; style?: {cssProperties: string]: string}; text?: string; removeDelay?: number;}` | --            | Optional. Sets the Source Placeholder for the original position of the dragged element.                                                                                                                                                                                                                                                  | [Source Placeholder](demo#source-placeholder)                        |
| originPlaceholder.show        | `boolean`                                                                                                        | true          | Optional. It indicates whether to display the Source Placeholder. By default, the Source Placeholder is displayed if there is an input. You can disable the Source Placeholder in special cases.                                                                                                                                         |
| originPlaceholder.tag         | `string`                                                                                                         | 'div'         | Optional. Whether to display originPlaceholder. By default, originPlaceholder is displayed if there is an input. This parameter can be disabled in special cases.                                                                                                                                                                        |
| originPlaceholder.style       | `Object`                                                                                                         | --            | Optional. The style object is transferred. The key indicates the style attribute, and the value indicates the style value.                                                                                                                                                                                                               | [Source Placeholder](demo#source-placeholder)                        |
| originPlaceholder.text        | `string`                                                                                                         | --            | Optional. text in placeholder                                                                                                                                                                                                                                                                                                            | [Source Placeholder](demo#source-placeholder)                        |
| originPlaceholder.removeDelay | `number`                                                                                                         | --            | Optional. It is used to delete the Source Placeholder in the delay after dragging to facilitate animation. The unit is ms.                                                                                                                                                                                                               | [Source Placeholder](demo#source-placeholder)                        |
| dragIdentity                  | `any`                                                                                                            | --            | Optional. This parameter is used to restore virtual scrolling. During virtual scrolling, the element is deleted (overflow) and then regenerated to restore the element (back to the image). A unique identifier is required to restore the original event drag event listening and Source Placeholder.                                   |
| dragItemParentName            | `string`                                                                                                         | --            | Optional. Selector name. This parameter is used with dragItemChildrenName to truncate invisible elements in the list to improve performance, query elements matching dragItemChildrenName from the selector matching dragItemParentName. Generally, search for items in the list and delete items beyond the visible scope when cloning. | None                                                                 |
| dragItemChildrenName          | `string`                                                                                                         | --            | Optional. Selector name, used with dragItemParentName to drag and truncate the invisible elements in the list to improve performance, see the description of dragItemParentName for the function.                                                                                                                                        | None.                                                                |

Note 1: AppendToBody of dragFollowOptions is used as follows: If the parent object in the source position is destroyed after dragFollowOptions is dragged away, the clone must be attached to the body to prevent it from being destroyed. By default, the style of the entity to be cloned is copied to ensure that the style of the entity to be cloned is correct. However, some styles and attributes that depend on the DOM node location may fail. You need to manually adjust some styles.

### dDraggable Event

| Event          | Type                      | Description                               | Jump to Demo                    |
| :------------- | :------------------------ | :---------------------------------------- | :------------------------------ |
| dragStartEvent | `EventEmitter<DragEvent>` | DragStart event that starts to be dragged | [Basic Usage](demo#basic-usage) |
| dragEndEvent   | `EventEmitter<DragEvent>` | DragEnd event for ending dragging         | [Basic Usage](demo#basic-usage) |
| dropEndEvent   | `EventEmitter<DragEvent>` | Drop event when the placement ends        | [Basic Usage](demo#basic-usage) |

Drag DOM Events Details: [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)

### batchDrag Additional Instructions

Usage: dDraggable batchDrag

#### dDraggable batchDrag Attribute

| Name                                | Type                      | Default value     | Description                                                                                                                                                                                                                                                           | Jump to Demo                               |
| :---------------------------------- | :------------------------ | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------- |
| batchDragGroup                      | `string`                  | 'default'         | Optional. This parameter indicates the name of a group in which a group is dragged in batches. The group name varies according to the group name.                                                                                                                     |
| batchDragActive                     | `boolean`                 | false             | Optional. indicates whether to add elements to the batch dragging group. For details, see Note 1.                                                                                                                                                                     | [Batch dragging](demo#batch-drag-and-drop) |
| batchDragLastOneAutoActiveEventKeys | `Array<key in DragEvent>` | ['ctrlKey']       | Optional. You can activate the judgment of drag events selected in batches by dragging. See Note 2.                                                                                                                                                                   |
| batchDragStyle                      | `Array<badge\|stack>`     | ['badge','stack'] | Optional. This parameter indicates the effect of dragging data in batches. Badge indicates that statistics are displayed in the upper right corner, and stack indicates that stacking is displayed. This parameter is valid only when the string exists in the array. | [Batch dragging](demo#batch-drag-and-drop) |

Note 1: When `batchDragActive` is set to `true`, elements are added to the group in the sequence of changing to true. The elements added first are in front of the array. The first element confirms the names of the groups to be added in batches. If the name of the group to be added later is different from that of the group to be added earlier, the group cannot be added later.
Note 2: The default value of `batchDragLastOneAutoActiveEventKeys` is ['ctrlKey']. That is, you can hold down Ctrl and drag the last element. The element is automatically added to the group to be dragged in batches. The judgment condition is that the ctrlKey event in the dragStart event is true. Currently, only true or false is supported. This parameter is an array. This parameter is valid only when any attribute value is true and can be used for key declarations in different operating systems.

#### dDraggable batchDrag Event

| Name                 | Type                                     | Description                                                                                                         | Jump to Demo                               |
| :------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
| batchDragActiveEvent | `EventEmitter<{el: Element, data: any}>` | Adds an element to a batch dragging group through dragging and instructs the external system to select the element. | [Batch dragging](demo#batch-drag-and-drop) |

## dDropable Instruction

### dDroppable Parameter

| Parameter                   | Type                                           | Default Value                               | Description                                                                                                                                                                                                                                                             | Jump to Demo                                            |
| :-------------------------- | :--------------------------------------------- | :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| dropScope                   | `string \| Array<string>`                      | 'default'                                   | Optional. restricting the drop area, corresponding to dragScope.                                                                                                                                                                                                        | [Basic Usage](demo#basic-usage)                         |
| dragOverClass               | `string`                                       | --                                          | Optional. CSS applied on the drop element during dragover                                                                                                                                                                                                               |
| placeholderStyle            | `Object`                                       | {backgroundColor: '#6A98E3', opacity: '.4'} | Optional. It is used for placeholder display when sort is allowed.                                                                                                                                                                                                      | [Source Placeholder](demo#source-placeholder)           |
| placeholderText             | `string`                                       | ''                                          | Optional. This parameter is used to display internal text when sorting is allowed.                                                                                                                                                                                      |
| allowDropOnItem             | `boolean`                                      | false                                       | Optional. When sorting is allowed, this parameter can be dragged to an element so that the tree structure can be dragged as a subnode of an element.                                                                                                                    | [Multi-layer tree dragging](demo#multi-level-tree-drag) |
| dragOverItemClass           | `string`                                       | --                                          | Optional. This parameter is valid only when `allowDropOnItem` is set to `true` and is used to add styles to hit elements after dragging to elements.                                                                                                                    | [Multi-layer tree dragging](demo#multi-level-tree-drag) |
| nestingTargetRect           | `{height?: number, width?: number}`            | --                                          | Optional. It is used to increase the height of the parent item after the embedded list is corrected. Here, height and width are the height of the parent item (for dragging vertically) and width (for dragging horizontally)                                           | [Multi-layer tree dragging](demo#multi-level-tree-drag) |
| defaultDropPosition         | `'closest' \| 'before' \| 'after'`             | `'closest'`                                 | Optional. Sets the position where a device can be dragged to a place that is not in the list area, `closest'` indicates the nearest place, `before'` indicates the place to be added to the list header, and `after'` indicates the place to be added to the list tail. | [External Placement Position](demo#external-location)   |
| dropSortCountSelector       | `string`                                       | --                                          | Optional. This parameter specifies the name of the selector for counting content in the case of sortable containers. It can be used to filter out elements that should not be counted.                                                                                  |
| dropSortVirtualScrollOption | `{totalLength?: number; startIndex?: number;}` | --                                          | Optional. It is used to return a correct dropIndex in the virtual scrolling list. The value of totalLength is the actual total length of the list, and the value of startIndex is the index value of the first dom displayed in the current sorting area in the list.   |

### dDroppable Event

| Event          | Type                                            | Description                                                                                                                 | Jump to Demo                    |
| :------------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| dragEnterEvent | `EventEmitter<DragEvent>`                       | dragenter event entered by the drag element                                                                                 | [Basic Usage](demo#basic-usage) |
| dragOverEvent  | `EventEmitter<DragEvent>`                       | The dragover event of the drag element on the drop area                                                                     | [Basic Usage](demo#basic-usage) |
| dragLeaveEvent | `EventEmitter<DragEvent>`                       | dragleave event when the drag element leaves                                                                                | [Basic Usage](demo#basic-usage) |
| dropEvent      | `EventEmitter<DropEvent>`(See definition below) | Place an element and receive the event, where nativeEvent represents the native drop event, see definition notes for others | [Basic Usage](demo#basic-usage) |

### DropEventModel Definition

```typescript
type DropEvent = {
nativeEvent: any; // Native drop event
dragData: any; // dragData of the drag element
dropSubject: Subject<any>; //Subject of the drop event
dropIndex?: number; // The drop position is in the index of the list.
dragFromIndex?: number; // Index of the drag element in the original list. The virtual scrolling data is invalid.
dropOnItem?: boolean; // Indicates whether to drop the element. This parameter is used with allowDropOnItem.
```

## dSortable instruction

Specifies the parent Dom container that needs to be sorted. (The drop parameter specifies only the dragable area, and the rendering is controlled by the user.)

### dSortable Parameter

| Name           | Type       | Default value | Description                            | Jump to Demo |
| :------------- | :--------- | :------------ | :------------------------------------- | :----------- |
| dSortDirection | `v'\| 'h'` | 'v'           | 'v' vertical sort, 'h' horizontal sort |
| dSortableZMode | `boolean`  | false         | is in Z mode. For details, see Note 1. |

Note 1: Z is used to sort data based on the larger direction. If a line break occurs at the end of a row from left to right, use the vertical sorting +z mode because only partial data is from left to right.

### dDropScrollEnhanced Parameter

| Name               | Type                                                                                            | Default value     | Description                                                                                                                                                                                                           | Jump to Demo                                                                      |
| :----------------- | :---------------------------------------------------------------------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| direction          | [`DropScrollDirection`](#dropscrolldirection), that is, `'v'\|'h'`                              | 'v'               | scrolling direction. Vertical scrolling `'v'` and horizontal scrolling `'h'`                                                                                                                                          | [Drag and scroll container enhancement](demo#drag-and-roll-container-enhancement) |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                                         | '100px'           | Edge width of the response to automatic scrolling. The value of this parameter is the relative width of the list container in the same direction.                                                                     | [Drag and scroll container enhancement](demo#drag-and-roll-container-enhancement) |
| speedFn            | [`DropScrollSpeedFunction`](#dropscrolldirection)                                               | built-in function | Rate function. For details, see Remarks.                                                                                                                                                                              |
| minSpeed           | `DropScrollSpeed` indicates `number`                                                            | 50                | Minimum response speed. If the value is less than the value, the minimum response speed prevails.                                                                                                                     |
| maxSpeed           | `DropScrollSpeed` indicates `number`                                                            | 1000              | Maximum response speed. If the value is greater than this value, the maximum response speed prevails.                                                                                                                 |
| viewOffset         | {forward?: [`DropScrollAreaOffset`](#dropscrollareaOffset); backward?: `DropScrollAreaOffset`;} | --                | Sets the offset of the dragged area, which is used to correct some positions.                                                                                                                                         |
| dropScrollScope    | `string\| Array<string>`                                                                        | --                | allows scrolling. If this parameter is not configured, all scopes are received by default. If this parameter is configured, scrolling can be triggered only when `dragScope` and `dropScrollScope` of dragable match. | [Drag and scroll container enhancement](demo#drag-and-roll-container-enhancement) |
| backSpaceDroppable | `boolean`                                                                                       | true              | : whether to trigger elements that can be placed under the scroll panel. The default value is true. If the value is false, elements cannot be placed while scrolling.                                                 |

Note: The default speedFn function is `(x: number) => Math.ceil((1 - x) * 18) * 100`. The input digit `x` indicates the percentage of the distance between the mouse position and the edge to the full response width,
The final speed will be speedFn(x), but will not be less than the minimum speed `minSpeed` or greater than the maximum speed `maxSpeed`.
Definition of related types:

#### DropScrollDirection

```typescript
export type DropScrollDirection = 'h' | 'v';
```

#### DropScrollSpeed

```typescript
export type DropScrollEdgeDistancePercent = number; // unit: 1
export type DropScrollSpeed = number; // Unit: px/s
export type DropScrollSpeedFunction = (x: DropScrollEdgeDistancePercent) => DropScrollSpeed;
```

#### DropScrollAreaOffset

```typescript
export type DropScrollAreaOffset = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  widthOffset?: number;
  heightOffset?: number;
};

export enum DropScrollOrientation {
  forward, // Forward, right/bottom
  backward, // Backward, left/up
}
export type DropScrollTriggerEdge = 'left' | 'right' | 'top' | 'bottom';
```

`DropScrollAreaOffset` is valid only for the major and minor positioning edges. forward indicates scrolling to the right or downward, and backward indicates scrolling to the left or upward.

| direction                       | `v` Scroll up or down | `h` Scroll right or left |
| :------------------------------ | :-------------------- | :----------------------- |
| forward Down or right           | `left` ,`bottom`      | `top` ,`right`           |
| backward to the left or network | `left`,`top`          | `top`,`left`             |

### dDropScrollEnhancedSide Subsidiary Instructions

If scroll bars are required in both directions, you need to use both dDropScrollEnhanced and dDropScrollEnhancedSide. The parameter list is the same as that of the dDropScrollEnhanced command. The only difference is direction, if `v'`, the actual direction of the side subsidiary directive is `'h'`.

| Name               | Type                                                                   | Default value     | Description                                                                                                                                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| direction          | `DropScrollSpeed`, that is, `v'\|'h'`                                  | 'v'               | Scrolling direction, vertical scrolling `'v'`, horizontal scrolling `'h'`                                                                                                                                                                                 |
| responseEdgeWidth  | `string \| ((total: number) => string)`                                | '100px'           | Edge width of the response to automatic scrolling. The value is the relative width of the list container in the same direction.                                                                                                                           |
| speedFn            | `DropScrollSpeedFunction`                                              | built-in function | Rate function. For details, see Remarks.                                                                                                                                                                                                                  |
| minSpeed           | `DropScrollSpeed` indicates `number`                                   | 50                | Minimum response speed. If the value is less than the value, the minimum response speed prevails.                                                                                                                                                         |
| maxSpeed           | `DropScrollSpeed` indicates `number`                                   | 1000              | Maximum response speed. If the value is greater than this value, the maximum response speed prevails.                                                                                                                                                     |
| viewOffset         | {forward?: `DropScrollAreaOffset`; backward?: `DropScrollAreaOffset`;} | --                | Sets the offset of the dragged area, which is used to correct certain positions.                                                                                                                                                                          |
| dropScrollScope    | `string\| Array<string>`                                               | --                | allows the scrolling scope to be triggered. If this parameter is not configured, all scopes are received by default. If this parameter is configured, the scrolling scope can be triggered only when `dragScope` and `dropScrollScope` of dragable match. |
| backSpaceDroppable | `boolean`                                                              | true              | whether to trigger elements that can be placed under the scroll panel. The default value is true. If the value is false, elements cannot be placed while scrolling.                                                                                       |

## Using the `dDraggable` & `dDroppable` Directive

```html
<ul>
  <li dDraggable>Coffee</li>
  <li dDraggable>Tea</li>
  <li dDraggable>Milk</li>
</ul>
```

```html
<div dDroppable>
  <p>Drop items here</p>
</div>
```

## CSS

The `dDraggable` & `dDroppable` instruction has `[dragOverClass]` as the input.
Hover styles for drag and drop are provided. Note that the value is `string'.

```html
<div dDroppable [dragOverClass]="'drag-target-border'">
  <p>Drop items here</p>
</div>
```

## Restrict the Drop area.

Use [dragScope] and [dropScope] to restrict the drag area. The drag area can be a string or an array. Only the drag area and drop area can be placed.

```html
<ul>
  <li dDraggable [dragScope]="'drink'">Coffee</li>
  <li dDraggable [dragScope]="'drink'">Tea</li>
  <li dDraggable [dragScope]="'meal'">Biryani</li>
  <li dDraggable [dragScope]="'meal'">Kebab</li>
  ...
</ul>
```

```html
<div dDroppable [dropScope]="'drink'" [dragOverClass]="'drag-target-border'">
  <p>Only Drinks can be placed in this container.</p>
</div>
<div dDroppable [dropScope]=" ['drink','meal']" [dragOverClass]="'drag-target-border'">
  <p>Meal and Drinks can be placed in this container.</p>
</div>
```

## Transfer data.

`dDraggable` can use [dragData] to transfer data to `droppable`  
`dDropable` uses the `(dropEvent)` event to receive data.

```html
<ul class="list-group">
  <li dDraggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item.name}}</li>
</ul>
<div class="panel panel-default" dDroppable (dropEvent)="onItemDrop($event)">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```typescript
export class Component {
  items = [
    { name: 'Apple', type: 'fruit' },
    { name: 'Carrot', type: 'vegetable' },
    { name: 'Orange', type: 'fruit' },
  ];
  onItemDrop(e: any) {
    // Get the dropped data here
    this.droppedItems.push(e.dragData);
  }
  constructor() {}
}
```

## Drag Handle

The drag handle can specify the element that actually responds to the dragable event, not the dragable itself.
This parameter must be a string, and is actually a css selector.

```html
<li dDraggable [dragHandle]=" '.drag-handle'">
  Only .drag-handle can respond to drag events to drag li.
  <div class="pull-right"><i class="drag-handle fa fa-bars fa-lg" aria-hidden="true"></i></div>
</li>
```

## Asynchronous DropEnd, notifying the Drag element

The `dDraggable` event has a `dropEndEvent` event, which is not a default event of the browser but a user-defined event. The non-component automatic triggering mode is that the `dropEvent` event of the `dDropgable` contains a dropSubject, when the dropEndEvent event on the drag element needs to be triggered, call dropSubject.next(params) after the interface returns. For example:

```html
<ul class="list-group">
  <li dDraggable *ngFor="let item of items;let i=index;" (dropEndEvent)="dropEnd($event, i)" [dragData]="item">{{item.name}}</li>
</ul>
<div class="panel panel-default" dDroppable (dropEvent)="onItemDrop($event)">
  <div class="panel-heading">Drop Items here</div>
  <div class="panel-body">
    <li *ngFor="let item of droppedItems" class="list-group-item">{{item.name}}</li>
  </div>
</div>
```

```js
export class Component {
  onItemDrop(e: any) {
    ajax.onSuccess(() => {
      e.dropSubject.next(params); //The dropEnd of dragComponent is triggered and params corresponds to $event of onDropEnd.
    });
  }
  constructor() {}
}
export class dragComponent {
  onDropEnd($event, i) {}
}
```

# Collaborative dragging, used in two-dimensional dragging and cross-dimension dragging scenarios

## Collaborative drag dDragSync

Used for dDraggle objects and objects that can be dragged at the same time.

### dDragSync Parameter

| Parameter | Type     | Default Value | Description                                                                                                                                                                | Jump to Demo                                                      |
| :-------- | :------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| dDragSync | `string` | ''            | Mandatory, Name of the group to be synchronized. This parameter is invalid when the parameter is left blank or an empty string and is not synchronized with other content. | [Two-dimensional drag and preview](demo#2D-drag-and-drop-preview) |

## Collaborative distribution dDropSortSync

Used for the dDropable object and the sortable area with the same structure as the sortable area in the dropable object. Note that dDropSortSync is registered on the same object as the dDropable object, the AND without dDropable is placed in the sorting area.

### dDropSortSync Parameter

| Parameter          | Type      | Default Value | Description                                                                                                                      | Jump to Demo                                                      |
| :----------------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| dDropSortSync      | `string`  | ''            | Mandatory, Name of the group to be synchronized. This parameter is invalid when the value is empty or an empty string. The value | [Two-dimensional drag and preview](demo#2D-drag-and-drop-preview) | is not synchronized to other content. |
| dDropSyncDirection | `v'\|'h'` | 'v'           | Optional. orthogonal to the direction of dSortable                                                                               |

## Collaborative listening box dDragDropSyncBox

Used to collect statistics on the common parent ancestors of dDragSync and dDropSortSync.
No parameter is available. You can place the parameter in the public statistical area.

# Drag and preview, which is used in the scenario where drag and preview need to be replaced.

## Drag and preview dDragPreview

This parameter is used together with dDraggable to drag an object template.

### dDragPreview Parameter

| Parameter                           | Type                          | Default Value | Description                                                                                                                                                             | Jump to Demo                                                      |
| :---------------------------------- | :---------------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| dDragPreview                        | `TemplateRef<any>`            | --            | Required. The preview profile references                                                                                                                                | [Two-dimensional drag and preview](demo#2D-drag-and-drop-preview) |
| dragPreviewData                     | `any`                         | --            | Optional. Customized data, which is obtained from template variables.                                                                                                   |
| dragPreviewOptions                  | `{skipBatchPreview: boolean}` | --            | Optional. preview option                                                                                                                                                |
| dragPreviewOptions.skipBatchPreview | `boolean`                     | false         | Optional. preview option, whether to skip the batch preview style processing. It is recommended that you can skip the batch drag and drop preview template by yourself. |

### Available variables in the dDragPreview template

|      Variable       |         Type         |                                                               Variable Description                                                                |
| :-----------------: | :------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
|        data         |        `any`         |                                                dragPreviewData data transferred from drag preview                                                 |
|      draggedEl      |    `HTMLElement`     |                                                                Dragged DOM element                                                                |
|      dragData       |        `any`         |                                                       DragData carried by the drag element                                                        |
|    batchDragData    |     `Array<any>`     | An array of dragData data of the objects being dragged in batches, including dragData of the dragged element, and dragData is in the first place. |
| dragSyncDOMElements | `Array<HTMLElement>` |                         DOM elements that are dragged collaboratively, excluding the DOM elements pointed to by draggedEl                         |

## Dragging and previewing the auxiliary clone node <d-drag-preview-clone-dom-ref>

You can restore the cloned object of the DOM from the node's reference as a preview.

| Parameter | Type          | Default Value | Description                                                            | Jump to Demo |
| :-------- | :------------ | :------------ | :--------------------------------------------------------------------- | :----------- |
| domRef    | `HTMLElement` | --            | Mandatory, Otherwise meaningless, clone the DOM reference of the node. |
| copyStyle | `boolean`     | true          | Optional. whether to clone nodes in sequence when cloning nodes.       |
