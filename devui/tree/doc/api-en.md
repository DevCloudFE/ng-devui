## d-tree parameters

##### Basic tree, without adding, deleting, modifying, and querying

|      Parameter      |        Type        |     Default     |                                                                             Description                                                                              | Jump to Demo                                                                           |
| :-----------------: | :----------------: | :-------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------- |
|        tree         | `Array<ITreeItem>` |       --        |                                        Required. It is used to render the tree based on the input data.                                         | [Basic Usage](demo#basic-usage)                                      |
|    treeNodeIdKey    |      `string`      |      'id'       |                                                    Optional. ID key value name, which uniquely identifies a node.                                                    | [Custom Display Fields](demo#custom-display-field)                |
| treeNodeChildrenKey |      `string`      |     'items'     |                                                            Optional. key value name of the subnode array                                                             | [Custom Display Fields](demo#custom-display-field)                |
|  treeNodeTitleKey   |      `string`      |     'title'     |                                         Optional. This parameter indicates the key value of the data displayed on the node.                                          | [Custom Display Fields](demo#custom-display-field)                |
| checkboxDisabledKey |      `string`      |   'disabled'    |                                                 Optional. Do not select the key value of the check box on the node.                                                  | [Customized field](demo#custom-display-field)                        |
|  selectDisabledKey  |      `string`      |   'disabled'    |                                         Optional. It indicates the name of a key value that cannot be selected on the node.                                          | [Checkable Tree](demo#checkable-tree)                               |
|  toggleDisabledKey  |      `string`      | 'disableToggle' |                                                    Optional. Collapsed key names cannot be expanded on the node.                                                     | [Checkable Tree](demo#checkable-tree)                                 |
|   iconParentOpen    |      `string`      |       --        |                                                    Optional. Customize the icon when the parent node is expanded.                                                    | [Custom Icon](demo#custom-icon)                                  |
|   iconParentClose   |      `string`      |       --        |                                                     Optional. Customize the icon when the parent node is folded.                                                     | [Custom Icon](demo#custom-icon)                                  |
|      iconLeaf       |      `string`      |       --        |                                                                   Optional. Custom leaf node icon                                                                    | [Custom Icon](demo#custom-icon)                                  |
|    treeNodesRef     | `TemplateRef<any>` |       --        |                                                 Optional. It specifies the display template of a customized node.                                                  |
| loadingTemplateRef  | `TemplateRef<any>` |       --        |                                                           Optional. Customizing the template being loaded                                                           | [Customizing a Loading Template](demo#custom-loading)              |
|    virtualScroll    |     `boolean`      |      false      |                              Optional. Whether to enable virtual scrolling. This parameter is used to process a large amount of data.                               | [Operation tree of large data volume](demo#virtual-scroll) |
| virtualScrollHeight |      `string`      |     '800px'     |                                                       Optional. Sets the tree height during virtual scrolling.                                                       | [Operation tree of large data volume](demo#virtual-scroll)                |
|     minBufferPx     |      `number`      |       760       | Optional. Sets the minimum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Operation tree of large data volume](demo#virtual-scroll)     | . |
|     maxBufferPx     |      `number`      |      1140       | Optional. Sets the maximum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Operation tree of large data volume](demo#virtual-scroll)                                                 | . |

## d-tree Event

|    Parameter     |        Type         | Description                                                                                                                                                                                                                                                 | Jump to Demo                                                                                       |
| :--------------: | :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
|   nodeSelected   | `EventEmitter<any>` | Optional. Callback function for node selection.  It returns the data of the selected node.                                                                                                                                               | [Basic Usage](demo#basic-usage)                                                  |
|  nodeDblClicked  | `EventEmitter<any>` | Optional. Callback function used when a node is double-clicked. It returns the data of the current node.                                                                                                                                                            | [Custom Display Fields](demo#custom-display-field)                            |
| nodeRightClicked | `EventEmitter<any>` | Optional. Callback function used when a node is right-clicked. It returns the data and mouse event of the current node.                                                                                                                                             | [Custom Display Fields](demo#custom-display-field)                            |
|   nodeToggled    | `EventEmitter<any>` | Optional. Callback function for expanding and folding a node. It returns the data of the current node.                                                                                                                                                     |                                                                                                    | [Basic Usage](demo#basic-usage) |
|  afterTreeInit   | `EventEmitter<any>` | Optional. It is a callback event after tree nodes are generated. It returns information about all nodes in the current tree. This event is mainly used to perform specific operations after rendering is completed in the case of a large amount of data. | The function is the same as that of [Operation tree of large data volume](demo#virtual-scroll) in the d-operable-tree. |

## d-operable-tree parameter

##### Add, delete, and modify buttons when you move the mouse over or select them.

|       Parameter       |                   Type                    |     Default     |                                                                                                  Description                                                                                                  | Jump to Demo                                                                             |
| :-------------------: | :---------------------------------------: | :-------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------- |
|         tree          |            `Array<ITreeItem>`             |       --        |                                                                             Required. Renders the tree based on the input data.                                                                             | [Checkable Tree](demo#checkable-tree)                                   |
|     treeNodeIdKey     |                 `string`                  |      'id'       |                                                               Optional. ID key value name, which is used to identify the uniqueness of a node.                                                                | [Checkable Tree](demo#checkable-tree)                                   |
|  treeNodeChildrenKey  |                 `string`                  |     'items'     |                                                                                 Optional. key value name of the subnode array                                                                                 | [Checkable Tree](demo#checkable-tree)                                 |
|   treeNodeTitleKey    |                 `string`                  |     'title'     |                                                                    Optional. It indicates the key value of the data displayed on the node.                                                                    | [Checkable Tree](demo#checkable-tree)                                 |
|  checkboxDisabledKey  |                 `string`                  |   'disabled'    |                                                                         Optional. Key value names that cannot be selected on a node.                                                                          | [Checkable Tree](demo#checkable-tree)                                 |
|   selectDisabledKey   |                 `string`                  |   'disabled'    |                                                              Optional. It indicates the name of a key value that cannot be selected on the node.                                                              | [Checkable Tree](demo#checkable-tree)                                 |
|   toggleDisabledKey   |                 `string`                  | 'disableToggle' |                                                                         Optional. Collapsed key names cannot be expanded on the node.                                                                         | [Checkable Tree](demo#checkable-tree)                                   |
|    iconParentOpen     |                 `string`                  |       --        |                                                                        Optional. Customize the icon when the parent node is expanded.                                                                         | [Custom Icon](demo#custom-icon)                                    |
|    iconParentClose    |                 `string`                  |       --        |                                                                         Optional. Customize the icon when the parent node is folded.                                                                          | [Custom Icon](demo#custom-icon)                                    |
|       iconLeaf        |                 `string`                  |       --        |                                                                                        Optional. Custom leaf node icon                                                                                        | [Custom Icon](demo#custom-icon)                                    |
|       checkable       |                 `boolean`                 |      true       |                                                     Optional. Whether to display the checkbox, that is, whether the checkbox is in multi-selection mode.                                                      | [Operation button](demo#operation-button)                              |
|        addable        |                 `boolean`                 |      false      |                                                                  Optional. indicating whether to display the button for adding a child node.                                                                  | [Operation button](demo#operation-button)                              |
|       editable        |                 `boolean`                 |      false      |                                                                        Optional. indicating whether to display the edit subnode button                                                                        | [Operation button](demo#operation-button)                              |
|      deleteable       |                 `boolean`                 |      false      |                                                                        Optional. Whether to display the button for deleting subnodes.                                                                         | [Operation button](demo#operation-button)                              |
|       draggable       |                 `boolean`                 |      false      |                                                                  Optional. indicating whether a tree node supports drag and drop operations.                                                                  | [Draggable tree](demo#drag-and-drop-tree)                               |
|     checkboxInput     |             `ICheckboxInput`              |       {}        |                                                                                Optional. Sets the attributes of the checkbox.                                                                                | [Checkable Tree](demo#checkable-tree)                                   |
|    canActivateNode    |                 `boolean`                 |      true       |                                         : indicates whether a node can be selected. If the value is false, the nodeChecked event is triggered when a node is clicked.                                         | [Operation button](demo#operation-button)                              |
| canActivateParentNode |                 `boolean`                 |      true       |                                  Optional. indicates whether a parent node is optional. If the value is false, the nodeChecked event is triggered when a node is clicked.                                   | [Operation button](demo#operation-button)                              |
| iconTemplatePosition  |                 `string`                  |       --        |                                                         Optional. Sets the position of the icon, which can be `before-checkbox'` or `after-checkbox'`                                                         | [Custom Icon](demo#custom-icon)                                    |
|   checkableRelation   | `'upward' \|'downward' \|'both' \|'none'` |     'both'      |                                                                            Optional. Sets the check rule of the parent-child node                                                                             | [Control the parent-child check relationship](demo#check-control-tree) |
|     beforeAddNode     |              `Promise<any>`               |       --        |                                  Optional. Call back before adding a subnode (the parameter is the current node). The return value can specify the index of the added node.                                  | [Operation button](demo#operation-button)                              |
|   beforeDeleteNode    |              `Promise<any>`               |       --        |                                                                     Optional. Callback before deleting a node (parameter: current node)                                                                      | [Operation button](demo#operation-button)                              |
|    beforeNodeDrop     |              `Promise<any>`               |       --        |                           Optional. Callback before dragging a subnode (parameters are the currently dragged node, release node, and placement type (`prev`, `inner`, and `next`))                           | [drragable tree](demo#drag-and-drop-tree)                              |
|    beforeEditNode     |              `Promise<any>`               |       --        |                                                           Optional. callback before editing a subnode (parameters are the currently edited node)                                                            | [Operation button](demo#operation-button)                              |
|      postAddNode      |              `Promise<any>`               |       --        |                                                                       Optional. Callback after a node is added (parameters are added)                                                                       | [Operation button](demo#operation-button)                              |
|       dropType        |                `IDropType`                |       --        | Optional. Sets the position where a node is to be dragged. `dropPrev` indicates to be placed before a node, `dropNext` indicates to be placed after a node, and `dropInner` indicates to be placed in a node. | [Draggable tree](demo#drag-and-drop-tree)                               |
|     virtualScroll     |                 `boolean`                 |      false      |                                                   Optional. Whether to enable virtual scrolling. This parameter is used to process a large amount of data.                                                   | [Operation tree of large data volume](demo#virtual-scroll)   |
|  virtualScrollHeight  |                 `string`                  |     '800px'     |                                                                           Optional. Sets the tree height during virtual scrolling.                                                                            | [Operation tree of large data volume](demo#virtual-scroll)                  |
|      minBufferPx      |                 `number`                  |       760       |                     Optional. Sets the minimum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                      | [Operation tree of large data volume](demo#virtual-scroll)       | . |
|      maxBufferPx      |                 `number`                  |      1140       |                     Optional. Sets the maximum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                      | [Operation tree of large data volume](demo#virtual-scroll)       | . |
|   disableMouseEvent   |                 `boolean`                 |      false      |            Optional. Sets whether to disable the mouse move-in event. This parameter is used when the appendTobody function is used and the content in the drop-down list box cannot be hovered.             | [Custom Icon](demo#custom-icon)                                    |

## d-operable-tree event

|     Parameter      |        Type         | Description                                                                                                                                                                                                                                                                                                                                                | Jump to Demo                                                             |
| :----------------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
|    nodeSelected    | `EventEmitter<any>` | Optional. The node click event is called back to return the data of the currently selected node.                                                                                                                                                                                                                                                         | [Checkable Tree](demo#checkable-tree)                 |
|   nodeDblClicked   | `EventEmitter<any>` | Optional. Callback function used when a node is double-clicked. It returns the data of the current node.                                                                                                                                                                                                                                                  | [Checkable Tree](demo#checkable-tree)                 |
|  nodeRightClicked  | `EventEmitter<any>` | Optional. Callback function used when a node is right-clicked. It returns the data and mouse event of the current node.                                                                                                                                                                                                                                            | [Checkable Tree](demo#checkable-tree)                 |
|    nodeDeleted     | `EventEmitter<any>` | Optional. Callback of the node deletion event to return the data of the deleted node.                                                                                                                                                                                                                                                                     | [Operation button](demo#operation-button)              |
|    nodeToggled     | `EventEmitter<any>` | Optional. It is the callback function of the node expansion and collapse event. The data of the current node is returned.                                                                                                                                                                                                                                | [Checkable Tree](demo#checkable-tree)                 |
|    nodeChecked     | `EventEmitter<any>` | Optional. Callback of the node selection event to return data of all selected nodes.                                                                                                                                                                                                                                                                      | [Checkable Tree](demo#checkable-tree)                 |
| currentNodeChecked | `EventEmitter<any>` | Optional. Callback of the node selection event to return the data of the currently selected node.                                                                                                                                                                                                                                                         | [Checkable Tree](demo#checkable-tree)                 |
|     nodeEdited     | `EventEmitter<any>` | Optional. This parameter is used to call back the node title editing event to return the currently edited node data.                                                                                                                                                                                                                                     | [Operation button](demo#operation-button)              |
|  editValueChange   | `EventEmitter<any>` | Optional. Callback function for data changes during node editing. It returns the verified value. The callback function in the return value can be invoked to verify the error message. (The callback function receives two parameters, where `errTips` indicates the error information and `errTipsPosition` indicates the information pop-up position.) | [Operation button](demo#operation-button)              |
|     nodeOnDrop     | `EventEmitter<any>` | Optional. It is the node onDrop event callback function (drop any dragable element). It returns the drag event and releases the node data in the position. The placement type is (`prev`, `inner`, `next`)                                                                                                                                               | [Draggable tree](demo#drag-and-drop-tree)               |
|   afterTreeInit    | `EventEmitter<any>` | Optional. This is a callback event after tree nodes are generated. It returns information about all nodes in the current tree. This event is mainly used when a large amount of data needs to be rendered and specific operations need to be performed after the rendering is complete.                                                                  | [Large-volume-data-operable tree](demo#virtual-scroll) |

#### **Note**

- `treeNodeIdKey`: Unique ID of a node. The default value is `id`. If the node does not need to be loaded asynchronously, you do not need to transfer this parameter. The component automatically allocates a unique ID.
- `treeNodeChildrenKey`: indicates the child name of the transferred data child node. The default value is `items`.
- `checkboxDisabledKey`: indicates whether a subnode is optional. The default value is Disabled.
- `treeNodeTitleKey`: key value of the node display field. The default value is `title`.
- `checkboxInput`: Sets related attributes for the checkbox. The default value is `{color: 'F38826'}`. ~~disableType is used to unify disableType of all subnodes.

##### ITreeItem: data composition of each tree node. You can change the key value by using the xxxKey parameter.

```javascript
ITreeItem {
title: string;
open? : boolean;
loading? : boolean;
isMatch? : boolean;
items? : ITreeItem[];
isParent? : boolean;
data? : any;
id? : any;
isHide? : boolean;
isActive? : boolean;
isChecked? : boolean;
halfChecked? : boolean;
disabled? : boolean;

[prop: string]: any;

disableAdd? : boolean;
disableEdit? : boolean;
disableDelete? : boolean;
}

export interface ICheckboxInput {
color? : string;
}

export interface IDropType {
dropPrev? : boolean;
dropNext? : boolean;
dropInner? : boolean;
}

```

#### **TreeFactoryAPI**

The component provides a TreeFactory. You can perform the following operations on the TreeFactory instance:

`appendTreeItems`: Adds new data to a specified node.

`addNode`: adds a single node.

`deleteNodeById`: deletes a specific node.

`toggleNodeById`: indicates whether to enable or disable a specific node.

`openNodesById`: expands a specified node by ID.

`closeNodesById`: closes a specified node by ID.

`disabledNodesById`: disables the checkbox of a node based on the node ID.

`checkNodesById`: Selects a node by ID.

`getCheckedNodes`: Obtains all selected nodes.

`getDisabledNodes`: Obtains all non-selectable nodes.

`activeNodeById`: changes the status of a specified node to active based on the node ID.

`getChildrenById`: Obtains the subnode of a specified node based on the ID.

`startLoading`: starting loading

`endLoading`: disables loading.

`search`: indicates whether the input matches the data in the node.

`getNodeById`: Obtains node information by ID.

`getCompleteNodeById`: Obtains node information by ID，including 'id','parentId'.

`hideNodeById`: hides or displays a node based on the node ID.

`search`: search tree (filtering or highlighting can be configured)

`deactivateAllNodes`: Deselect all nodes.

`checkAllNodes`: Enter `true` or `false` to check all nodes or cancel the check of all nodes.

`mergeTreeNodes`: indicates the node to be merged and displayed. The default value is the entire tree. This operation combines the parent node with only one child node to optimize the tree display.

#### Customizing a Template

Parameters for customizing extra icons are as follows:

|      Parameter       |       Type        |     Default      |                          Description                           |
| :------------------: | :---------------: | :--------------: | :------------------------------------------------------------: |
| iconTemplatePosition |      string       | 'after-checkbox' | Optional. [['before-checkbox','after-checkbox']] is supported. |
|    #iconTemplate     | Embedded template |        --        |              Optional. Custom HTML is supported.               |

Usage: Customize the template `<ng-template>` in operable-tree and mark the template as `#iconTemplate`, for example, `<ng-template #iconTemplate>...</ng-template>`.

|     Parameter     |       Type        | Default |                                  Description                                  |
| :---------------: | :---------------: | :-----: | :---------------------------------------------------------------------------: |
|   #nodeTemplate   | Embedded template |   --    | Optional. Custom HTML is supported for customizing the display of tree nodes. |
| #operatorTemplate | Embedded template |   --    |                      Optional. Custom HTML is supported.                      |
|  #statusTemplate  | Embedded template |   --    |   Optional. You can customize the HTML for customizing status information.    |

Customize the template `<ng-template>` in operable-tree and mark the template as `#operatorTemplate`, for example, `<ng-template #operatorTemplate>...</ng-template>`.
Customize the template `<ng-template>` in operable-tree and mark the template as `#statusTemplate`, for example, `<ng-template #statusTemplate let-node="node">...</ng-template>`.

```xml
<ng-template #iconTemplate let-node="node" let-completeNode="completeNode">
</ng-template>
<ng-template #nodeTemplate let-node="node" let-completeNode="completeNode">
</ng-template>
<ng-template #operatorTemplate let-node="node">
</ng-template>
<ng-template #statusTemplate let-node="node">
</ng-template>
```

node: data of the current node
