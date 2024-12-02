# How to use

Import into module:

```ts
import { TreeModule } from 'ng-devui/tree';
```

In the page:

```html
<d-tree [tree]="data"></d-tree> <d-operable-tree [tree]="data"></d-operable-tree>
```

## d-tree

### d-tree parameters

#### Basic tree, without adding, deleting, modifying, and querying

| Parameter           | Type                                 | Default         | Description                                                                                                                                                          | Jump to Demo                                               | Global Config |
| ------------------- | ------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------- |
| tree                | `Array<`[`ITreeItem`](#itreeitem)`>` | --              | Required. It is used to render the tree based on the input data.                                                                                                     | [Basic Usage](demo#basic-usage)                            |
| treeNodeIdKey       | `string`                             | 'id'            | Optional. ID key value name, which uniquely identifies a node.                                                                                                       | [Custom Display Fields](demo#custom-display-field)         |
| treeNodeChildrenKey | `string`                             | 'items'         | Optional. key value name of the subnode array                                                                                                                        | [Custom Display Fields](demo#custom-display-field)         |
| treeNodeTitleKey    | `string`                             | 'title'         | Optional. This parameter indicates the key value of the data displayed on the node.                                                                                  | [Custom Display Fields](demo#custom-display-field)         |
| checkboxDisabledKey | `string`                             | 'disabled'      | Optional. Do not select the key value of the check box on the node.                                                                                                  | [Customized field](demo#custom-display-field)              |
| selectDisabledKey   | `string`                             | 'disabled'      | Optional. It indicates the name of a key value that cannot be selected on the node.                                                                                  | [Checkable Tree](demo#checkable-tree)                      |
| toggleDisabledKey   | `string`                             | 'disableToggle' | Optional. Collapsed key names cannot be expanded on the node.                                                                                                        | [Checkable Tree](demo#checkable-tree)                      |
| iconParentOpen      | `string`                             | --              | Optional. Customize the icon when the parent node is expanded.                                                                                                       | [Custom Icon](demo#custom-icon)                            |
| iconParentClose     | `string`                             | --              | Optional. Customize the icon when the parent node is folded.                                                                                                         | [Custom Icon](demo#custom-icon)                            |
| iconLeaf            | `string`                             | --              | Optional. Custom leaf node icon                                                                                                                                      | [Custom Icon](demo#custom-icon)                            |
| treeNodesRef        | `TemplateRef<any>`                   | --              | Optional. It specifies the display template of a customized node.                                                                                                    |
| loadingTemplateRef  | `TemplateRef<any>`                   | --              | Optional. Customizing the template being loaded                                                                                                                      | [Customizing a Loading Template](demo#custom-loading)      |
| virtualScroll       | `boolean`                            | false           | Optional. Whether to enable virtual scrolling. This parameter is used to process a large amount of data.                                                             | [Operation tree of large data volume](demo#virtual-scroll) |
| itemSize            | `number`                             | 30              | Optional. Specifies the number of benchmarks after virtual scrolling is enabled.                                                                                     |
| virtualScrollHeight | `string`                             | '800px'         | Optional. Sets the tree height during virtual scrolling.                                                                                                             | [Operation tree of large data volume](demo#virtual-scroll) |
| minBufferPx         | `number`                             | 600             | Optional. Sets the minimum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Operation tree of large data volume](demo#virtual-scroll) | .             |
| maxBufferPx         | `number`                             | 900             | Optional. Sets the maximum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Operation tree of large data volume](demo#virtual-scroll) | .             |
| showAnimation       | `boolean`                            | true            | Optional. Indicating whether to display animations.                                                                                                                  | [Without Animation](demo#without-animation)                | ✔             |
| indent              | `string`                             | '16px'          | Optional. Sets the indentation between tree levels                                                                                                                   | [Basic Usage](demo#basic-usage)                            |               |
| operatorAlign       | `'start'\|'end'`                     | 'start'         | Optional. Sets the align of operators                                                                                                                                | [Custom Icon](demo#custom-icon)                            |               |

## d-tree Event

| Parameter        | Type                                                              | Description                                                                                                                                                                                                                                               | Jump to Demo                                                                                                           |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| nodeSelected     | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | Optional. Callback function for node selection. It returns the data of the selected node.                                                                                                                                                                 | [Basic Usage](demo#basic-usage)                                                                                        |
| nodeDblClicked   | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | Optional. Callback function used when a node is double-clicked. It returns the data of the current node.                                                                                                                                                  | [Custom Display Fields](demo#custom-display-field)                                                                     |
| nodeRightClicked | `EventEmitter<{event:MouseEvent,node:`[`TreeNode`](#treenode)`}>` | Optional. Callback function used when a node is right-clicked. It returns the data and mouse event of the current node.                                                                                                                                   | [Custom Display Fields](demo#custom-display-field)                                                                     |
| nodeToggled      | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | Optional. Callback function for expanding and folding a node. It returns the data of the current node.                                                                                                                                                    | [Basic Usage](demo#basic-usage)                                                                                        |
| afterTreeInit    | `EventEmitter<Dictionary<`[`TreeNode`](#treenode)`>>`             | Optional. It is a callback event after tree nodes are generated. It returns information about all nodes in the current tree. This event is mainly used to perform specific operations after rendering is completed in the case of a large amount of data. | The function is the same as that of [Operation tree of large data volume](demo#virtual-scroll) in the d-operable-tree. |

## d-operable-tree

### d-operable-tree parameter

#### Add, delete, and modify buttons when you move the mouse over or select them.

| Parameter               | Type                                      | Default         | Description                                                                                                                                                                                                   | Jump to Demo                                                           | Global Config |
| ----------------------- | ----------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------- |
| tree                    | `Array<`[`ITreeItem`](#itreeitem)`>`      | --              | Required. Renders the tree based on the input data.                                                                                                                                                           | [Checkable Tree](demo#checkable-tree)                                  |
| treeNodeIdKey           | `string`                                  | 'id'            | Optional. ID key value name, which is used to identify the uniqueness of a node.                                                                                                                              | [Checkable Tree](demo#checkable-tree)                                  |
| treeNodeChildrenKey     | `string`                                  | 'items'         | Optional. key value name of the subnode array                                                                                                                                                                 | [Checkable Tree](demo#checkable-tree)                                  |
| treeNodeTitleKey        | `string`                                  | 'title'         | Optional. It indicates the key value of the data displayed on the node.                                                                                                                                       | [Checkable Tree](demo#checkable-tree)                                  |
| checkboxDisabledKey     | `string`                                  | 'disabled'      | Optional. Key value names that cannot be selected on a node.                                                                                                                                                  | [Checkable Tree](demo#checkable-tree)                                  |
| selectDisabledKey       | `string`                                  | 'disabled'      | Optional. It indicates the name of a key value that cannot be selected on the node.                                                                                                                           | [Checkable Tree](demo#checkable-tree)                                  |
| toggleDisabledKey       | `string`                                  | 'disableToggle' | Optional. Collapsed key names cannot be expanded on the node.                                                                                                                                                 | [Checkable Tree](demo#checkable-tree)                                  |
| iconParentOpen          | `string`                                  | --              | Optional. Customize the icon when the parent node is expanded.                                                                                                                                                | [Custom Icon](demo#custom-icon)                                        |
| iconParentClose         | `string`                                  | --              | Optional. Customize the icon when the parent node is folded.                                                                                                                                                  | [Custom Icon](demo#custom-icon)                                        |
| iconLeaf                | `string`                                  | --              | Optional. Custom leaf node icon                                                                                                                                                                               | [Custom Icon](demo#custom-icon)                                        |
| checkable               | `boolean`                                 | true            | Optional. Whether to display the checkbox, that is, whether the checkbox is in multi-selection mode.                                                                                                          | [Operation button](demo#operation-button)                              |
| addable                 | `boolean`                                 | false           | Optional. Indicating whether to display the button for adding a child node.                                                                                                                                   | [Operation button](demo#operation-button)                              |
| editable                | `boolean`                                 | false           | Optional. Indicating whether to display the edit subnode button                                                                                                                                               | [Operation button](demo#operation-button)                              |
| deleteable              | `boolean`                                 | false           | Optional. Whether to display the button for deleting subnodes.                                                                                                                                                | [Operation button](demo#operation-button)                              |
| draggable               | `boolean`                                 | false           | Optional. Indicating whether a tree node supports drag and drop operations.                                                                                                                                   | [Draggable tree](demo#drag-and-drop-tree)                              |
| checkboxInput           | `ICheckboxInput`                          | {}              | Optional. Sets the attributes of the checkbox.                                                                                                                                                                | [Checkable Tree](demo#checkable-tree)                                  |
| canActivateNode         | `boolean`                                 | true            | Optional. Indicating whether a node can be selected. If the value is false, the nodeChecked event is triggered when a node is clicked.                                                                        | [Checkable Tree](demo#checkable-tree)                                  |
| canActivateParentNode   | `boolean`                                 | true            | Optional. Indicating whether a parent node is optional. If the value is false, the nodeToggled event is triggered when a node is clicked.                                                                     | [Checkable Tree](demo#checkable-tree)                                  |
| canActivateMultipleNode | `boolean`                                 | false           | Optional. Specifies whether multiple nodes can be selected by pressing Ctrl or Shift. This parameter is used with canActivateNode and canActivateParentNode.                                                  | [Draggable tree](demo#drag-and-drop-tree)                              |
| iconTemplatePosition    | `string`                                  | --              | Optional. Sets the position of the icon, which can be `before-checkbox'` or `after-checkbox'`                                                                                                                 | [Custom Icon](demo#custom-icon)                                        |
| checkableRelation       | `'upward' \|'downward' \|'both' \|'none'` | 'both'          | Optional. Sets the check rule of the parent-child node                                                                                                                                                        | [Control the parent-child check relationship](demo#check-control-tree) |
| beforeAddNode           | `Promise<any>`                            | --              | Optional. Call back before adding a subnode (the parameter is the current node). The return value can specify the index of the added node.                                                                    | [Operation button](demo#operation-button)                              |
| beforeDeleteNode        | `Promise<any>`                            | --              | Optional. Callback before deleting a node (parameter: current node)                                                                                                                                           | [Operation button](demo#operation-button)                              |
| beforeNodeDrop          | `Promise<any>`                            | --              | Optional. Callback before dragging a subnode (parameters are the currently dragged node, release node, and placement type (`prev`, `inner`, and `next`))                                                      | [drragable tree](demo#drag-and-drop-tree)                              |
| beforeEditNode          | `Promise<any>`                            | --              | Optional. callback before editing a subnode (parameters are the currently edited node)                                                                                                                        | [Operation button](demo#operation-button)                              |
| beforeSelectNode        | `Promise<any>`                            | --              | Optional. callback before selecting a node (parameter: current node)                                                                                                                                          | [Operation button](demo#operation-button)                              |
| postAddNode             | `Promise<any>`                            | --              | Optional. Callback after a node is added (parameters are added)                                                                                                                                               | [Operation button](demo#operation-button)                              |
| dropType                | `IDropType`                               | --              | Optional. Sets the position where a node is to be dragged. `dropPrev` indicates to be placed before a node, `dropNext` indicates to be placed after a node, and `dropInner` indicates to be placed in a node. | [Draggable tree](demo#drag-and-drop-tree)                              |
| virtualScroll           | `boolean`                                 | false           | Optional. Whether to enable virtual scrolling. This parameter is used to process a large amount of data.                                                                                                      | [Operation tree of large data volume](demo#virtual-scroll)             |
| itemSize                | `number`                                  | 30              | Optional. Specifies the number of benchmarks after virtual scrolling is enabled.                                                                                                                              |
| virtualScrollHeight     | `string`                                  | '800px'         | Optional. Sets the tree height during virtual scrolling.                                                                                                                                                      | [Operation tree of large data volume](demo#virtual-scroll)             |
| minBufferPx             | `number`                                  | 600             | Optional. Sets the minimum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                                          | [Operation tree of large data volume](demo#virtual-scroll)             | .             |
| maxBufferPx             | `number`                                  | 900             | Optional. Sets the maximum buffer size during virtual scrolling. For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                                          | [Operation tree of large data volume](demo#virtual-scroll)             | .             |
| disableMouseEvent       | `boolean`                                 | false           | Optional. Sets whether to disable the mouse move-in event. This parameter is used when the appendTobody function is used and the content in the drop-down list box cannot be hovered.                         | [Custom Icon](demo#custom-icon)                                        |
| indent                  | `string`                                  | '16px'          | Optional. Sets the indentation between tree levels                                                                                                                                                            | [Basic Usage](demo#basic-usage)                                        |               |
| showAnimation           | `boolean`                                 | true            | Optional. Indicating whether to display animations.                                                                                                                                                           | [Without Animation](demo#without-animation)                            | ✔             |
| loadingTemplateRef      | `TemplateRef<any>`                        | --              | Optional. Customizing the template being loaded                                                                                                                                                               |
| treeNodesRef            | `TemplateRef<any>`                        | --              | Optional. It specifies the display template of a customized node.                                                                                                                                             |

### d-operable-tree event

| Parameter          | Type                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                              | Jump to Demo                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| nodeSelected       | `EventEmitter<`[`TreeNode \| TreeNode[]`](#treenode)`>`                                                         | Optional. The node click event is called back to return the data of the currently selected node.                                                                                                                                                                                                                                                         | [Checkable Tree](demo#checkable-tree)                  |
| nodeDblClicked     | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. Callback function used when a node is double-clicked. It returns the data of the current node.                                                                                                                                                                                                                                                 | [Checkable Tree](demo#checkable-tree)                  |
| nodeRightClicked   | `EventEmitter<{event:MouseEvent,node:`[`TreeNode`](#treenode)`}>`                                               | Optional. Callback function used when a node is right-clicked. It returns the data and mouse event of the current node.                                                                                                                                                                                                                                  | [Search filtering](demo#search-filtering)              |
| nodeDeleted        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. Callback of the node deletion event to return the data of the deleted node.                                                                                                                                                                                                                                                                    | [Operation button](demo#operation-button)              |
| nodeToggled        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. It is the callback function of the node expansion and collapse event. The data of the current node is returned.                                                                                                                                                                                                                                | [Checkable Tree](demo#checkable-tree)                  |
| nodeChecked        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. Callback of the node selection event to return data of all selected nodes.                                                                                                                                                                                                                                                                     | [Checkable Tree](demo#checkable-tree)                  |
| currentNodeChecked | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. Callback of the node selection event to return the data of the currently selected node.                                                                                                                                                                                                                                                        | [Checkable Tree](demo#checkable-tree)                  |
| nodeEdited         | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | Optional. This parameter is used to call back the node title editing event to return the currently edited node data.                                                                                                                                                                                                                                     | [Operation button](demo#operation-button)              |
| editValueChange    | `EventEmitter<{ value: string, callback: Function }>`                                                           | Optional. Callback function for data changes during node editing. It returns the verified value. The callback function in the return value can be invoked to verify the error message. (The callback function receives two parameters, where `errTips` indicates the error information and `errTipsPosition` indicates the information pop-up position.) | [Operation button](demo#operation-button)              |
| nodeOnDrop         | `EventEmitter<{ event: DragEvent, treeNode:`[`TreeNode`](#treenode)`, dropType:`[`IDropType`](#idroptype)`}>`   | Optional. It is the node onDrop event callback function (drop any dragable element). It returns the drag event and releases the node data in the position. The placement type is (`prev`, `inner`, `next`)                                                                                                                                               | [Draggable tree](demo#drag-and-drop-tree)              |
| nodeDragStart      | `EventEmitter<{ event: DragEvent, treeNode:`[`TreeNode`](#treenode)`, treeNodes?:`[`TreeNode[]`](#treenode)`}>` | Optional. It is the node dragStart event callback function. It returns the drag event and the dragging node info, when multiple nodes are selected, the system returns the array of dragged nodes.                                                                                                                                                       | [可拖拽树](demo#drag-and-drop-tree)                    |
| afterTreeInit      | `EventEmitter<Dictionary<`[`TreeNode`](#treenode)`>`                                                            | Optional. This is a callback event after tree nodes are generated. It returns information about all nodes in the current tree. This event is mainly used when a large amount of data needs to be rendered and specific operations need to be performed after the rendering is complete.                                                                  | [Large-volume-data-operable tree](demo#virtual-scroll) |

**Note**

- `treeNodeIdKey`: Unique ID of a node. The default value is `id`. If the node does not need to be loaded asynchronously, you do not need to transfer this parameter. The component automatically allocates a unique ID.
- `treeNodeChildrenKey`: indicates the child name of the transferred data child node. The default value is `items`.
- `checkboxDisabledKey`: indicates whether a subnode is optional. The default value is Disabled.
- `treeNodeTitleKey`: key value of the node display field. The default value is `title`.
- `checkboxInput`: Sets related attributes for the checkbox. The default value is `{color: 'F38826'}`. ~~disableType is used to unify disableType of all subnodes.

## Interface & Type Definition

### **TreeFactoryAPI**

The component provides a TreeFactory. You can perform the following operations on the TreeFactory instance:
see: [Common treeFactory functions](demo#tree-factory)

```ts

`treeRoot`: Obtains the entire tree data.

`mapTreeItems({treeItems,parentId, treeNodeChildrenKey = 'items',treeNodeIdKey ='id',checkboxDisabledKey ='disabled',
selectDisabledKey = 'disableSelect', toggleDisabledKey = 'disableToggle', treeNodeTitleKey = 'title'})`: Converts the original treeItems data to the tree node required by the component and adds the tree node to the specified parent node. This method is used for lazy loading and other functions.

The `getNodeById(id: number | string): TreeNode`: obtains the node information based on the node ID and returns the information.

`getCompleteNodeById(id: number | string): TreeNode`: Obtains node information based on the node ID, including the node ID and parent ID.

`addChildNode(parentNode:TreeNode, childNode:TreeNode, index?)`: Adds a specified child node to a specified parent node. The location of the child node can be controlled by index.

`deleteNodeById(id: number | string)`: Deleting a Specified Node by ID

`toggleNodeById(id: number | string)`: Expands and collapses specified nodes based on IDs.

`openNodesById(id: number | string) `: Expanding a Specified Node by ID

`closeNodesById(id: number | string, closeChildren = false)`: Collapses specified nodes based on IDs and determines whether to collapse subnodes based on the value of closeChildren.

The `disabledNodesById(id: number | string)`: disables the checkbox of a node based on the node ID.

`checkNodesById(id: number | string, checked: boolean, checkableRelation:'upward '|'downward '| 'both' | 'none' = 'both'): Array<Object> `:
Determines the check status of a specified node based on the id. CheckableRelation can be transferred to control the parent-child node selection relationship and return all selected nodes.

`getCheckedNodes()`: Returns all nodes whose check status is true.

`getDisabledNodes()`: Returns all nodes whose check is forbidden.

The `activeNodeById(id: number | string)`: changes the status of a specified node to active based on the node ID.

`getChildrenById(id: number | string): Array<TreeNode> `: Obtains the subnodes of a specified node based on the ID and returns the array of the subnodes.

`startLoading(id: number | string)`: Displays the loading status of a specified node based on the node ID.

`endLoading(id: number | string)`: Disables the loading status of a specified node based on the ID.

`searchTree(target: string, hideUnmatched = false, keyword='title', pattern?:RegExp)`:
Searches for nodes that match the target field in the tree. hideUnmatched controls whether to hide unmatched nodes. The keyword parameter specifies the keyword to be searched. Pattern Controls the Mode of Matching Targets

`hideNodeById(id: number | string, hide: boolean)`: Hide or Display Nodes by ID

`deactivateAllNodes()`: cancels the active state of all nodes.

The `checkAllNodes(checked:boolean)`: determines the check status of all nodes based on the checked value.

`mergeTreeNodes(targetNode:TreeNode)`: indicates the node to be combined. The default value is the entire tree. This operation combines the parent node with only one child node to optimize the tree display. This method changes the parent-child relationship of tree nodes and can be used only when the tree is read-only. If the node changes dynamically, this method is invoked each time after the source data is modified.

`getNodeIndex(node: TreeNode)`: Obtains the position of a specified node in the parent node.

`editNodeTitle(id: number | string)`: Editing a Specified Node by ID

`disableAllNodesChecked(disable:boolean = true)`: Do not change the check status of all nodes.

`disableAllNodesSelected(disable:boolean = true)`:  Do not change the select status of all nodes.

`disableAllNodesToggled(disable:boolean = true)`: Do not change the expand and collapse status of all nodes.

`transferToTreeNode(originNode, parentId = undefined,treeNodeChildrenKey?,treeNodeIdKey?,checkboxDisabledKey?,selectDisabledKey?,toggleDisabledKey?,treeNodeTitleKey?)`: Transfer origin node data to the structure of the tree needed .

`toggleAllNodes(toggle:boolean = true)`: If toggle is true, all nodes are expanded. If toggle is false, all nodes are collapsed.

```

### Customizing a Template

Parameters for customizing extra icons are as follows:

| Parameter            | Type                                   | Default          | Description                                                                                                                                                                  | Jump to Demo                    |
| -------------------- | -------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| iconTemplatePosition | `'before-checkbox' \|'after-checkbox'` | 'after-checkbox' | Optional. Sets the position where the icon is placed. `before-checkbox` indicates that the icon is placed before the checkbox, `after-checkbox` is placed after the checkbox | [Custom Icon](demo#custom-icon) |
| iconTemplate         | `TemplateRef<any>`                     | --               | Optional. Custom icon display                                                                                                                                                | [Custom Icon](demo#custom-icon) |
| nodeTemplate         | `TemplateRef<any>`                     | --               | Optional. Custom tree node display                                                                                                                                           | [Custom Icon](demo#custom-icon) |
| operatorTemplate     | `TemplateRef<any>`                     | --               | : Optional. customized operation icon area                                                                                                                                   | [Custom Icon](demo#custom-icon) |
| statusTemplate       | `TemplateRef<any>`                     | --               | : Optional. customized status information                                                                                                                                    | [Custom Icon](demo#custom-icon) |

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

### ITreeItem

```ts
export interface ITreeItem {
  title: string; // Display name of the node.
  open?: boolean; // Indicates whether the node is expanded.
  loading?: boolean; //Whether the node is being loaded
  isMatch?: boolean; // Whether the node is matched in the search scenario.
  items?: ITreeItem[]; // Subnode of the node
  isParent?: boolean; // Indicates whether a node is a parent node and whether to display the expand and collapse button.
  data?: any; // Stores extra node data.
  id?: any; // Node ID.
  isHide?: boolean; // Indicates whether the node is hidden.
  isActive?: boolean; // Check whether the node is in the selected state.
  isChecked?: boolean; // Check whether the node is in the checked state.
  halfChecked?: boolean; //Whether the node is in the half-selected state
  disabled?: boolean; //Indicates whether to disable the check function on the node
  disableAdd?: boolean; // Indicates whether to disable the add function on the node.
  disableEdit?: boolean; // Indicates whether the node cannot be edited.
  disableDelete?: boolean; // Indicates whether the node cannot be deleted.
  disableSelect?: boolean; // Indicates whether to disable the select function on the node.
  disableToggle?: boolean; // Indicates whether the node is not expanded or collapsed.
  [prop: string]: any;
}
```

### ICheckboxInput

```ts
export interface ICheckboxInput {
  color?: string;
}
```

### IDropType

```ts
export interface IDropType {
  dropPrev?: boolean; // Indicates whether to allow the node to be placed before the node.
  dropNext?: boolean; // Indicates whether to allow placement after a node.
  dropInner?: boolean; // Indicates whether to allow the node to be placed in the node and become the child node of the node.
}
```

### TreeNode

```ts
export class TreeNode implements ITreeNodeData {
  constructor(public id, public parentId, public data) {}
}

export interface ITreeNodeData {
  id?: number | string;
  parentId?: number | string;
  title?: string;
  isOpen?: boolean;
  data?: any;
  isParent?: boolean;
  loading?: boolean;
  isMatch?: boolean;
  isHide?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;

  children?: [];
}
```
