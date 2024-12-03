# 如何使用

在 module 中引入：

```ts
import { TreeModule } from 'ng-devui/tree';
```

在页面中使用：

```html
<d-tree [tree]="data"></d-tree> <d-operable-tree [tree]="data"></d-operable-tree>
```

## d-tree

### d-tree 参数

#### 基本的树，没有增删改查等操作

| 参数                | 类型                                 | 默认值          | 描述                                                                                                                           | 跳转 Demo                               | 全局配置项 |
| ------------------- | ------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ---------- |
| tree                | `Array<`[`ITreeItem`](#itreeitem)`>` | --              | 必选，根据传入的数据进行树的渲染                                                                                               | [基本用法](demo#basic-usage)            |
| treeNodeIdKey       | `string`                             | 'id'            | 可选，id 键值名，用来标识节点的唯一性                                                                                          | [自定义键值名](demo#custom-key)         |
| treeNodeChildrenKey | `string`                             | 'items'         | 可选，子节点数组的键值名                                                                                                       | [自定义键值名](demo#custom-key)         |
| treeNodeTitleKey    | `string`                             | 'title'         | 可选，节点显示数据的键值名                                                                                                     | [自定义键值名](demo#custom-key)         |
| checkboxDisabledKey | `string`                             | 'disabled'      | 可选，节点禁止点选 checkbox 的键值名                                                                                           | [自定义键值名](demo#custom-key)         |
| selectDisabledKey   | `string`                             | 'disabled'      | 可选，节点禁止选中的键值名                                                                                                     | [自定义键值名](demo#custom-key)         |
| toggleDisabledKey   | `string`                             | 'disableToggle' | 可选，节点禁止展开收起的键值名                                                                                                 | [自定义键值名](demo#custom-key)         |
| iconParentOpen      | `string`                             | --              | 可选，自定义父节点展开时的图标                                                                                                 | [自定义图标](demo#custom-icon)          |
| iconParentClose     | `string`                             | --              | 可选，自定义父节点收起时的图标                                                                                                 | [自定义图标](demo#custom-icon)          |
| iconLeaf            | `string`                             | --              | 可选，自定义叶子节点图标                                                                                                       | [自定义图标](demo#custom-icon)          |
| treeNodesRef        | `TemplateRef<any>`                   | --              | 可选，自定义节点的显示模板                                                                                                     |
| loadingTemplateRef  | `TemplateRef<any>`                   | --              | 可选，自定义加载中的模板                                                                                                       | [节点懒加载](demo#custom-loading)       |
| virtualScroll       | `boolean`                            | false           | 可选，是否开启虚拟滚动，用于处理大数据量的情形                                                                                 | [大数据量可操作树](demo#virtual-scroll) |
| itemSize            | `number`                             | 30              | 可选，开启虚拟滚动后基准数量                                                                                                   |
| virtualScrollHeight | `string`                             | '800px'         | 可选，设置虚拟滚动时树的高度                                                                                                   | [大数据量可操作树](demo#virtual-scroll) |
| minBufferPx         | `number`                             | 600             | 可选，设置虚拟滚动时的最小 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](demo#virtual-scroll) |
| maxBufferPx         | `number`                             | 900             | 可选，设置虚拟滚动时的最大 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](demo#virtual-scroll) |
| showAnimation       | `boolean`                            | true            | 可选，是否展示动画                                                                                                             | [无动画](demo#without-animation)        | ✔          |
| indent              | `string`                             | '16px'          | 可选，设置树各层级之间的缩进                                                                                                   | [基本用法](demo#basic-usage)            |            |
| operatorAlign       | `'start'\|'end'`                     | 'start'         | 可选，设置树节点操作按钮的对齐方式                                                                                             | [自定义图标](demo#custom-icon)          |            |

## d-tree 事件

| 参数             | 类型                                                              | 描述                                                                                                       | 跳转 Demo                                                            |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| nodeSelected     | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | 可选，节点选中的回调函数，返回当前选中节点的数据                                                           | [基本用法](demo#basic-usage)                                         |
| nodeDblClicked   | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | 可选，节点双击时的回调函数，返回当前操作的节点的数据                                                       | [自定义键值名](demo#custom-key)                                      |
| nodeRightClicked | `EventEmitter<{event:MouseEvent,node:`[`TreeNode`](#treenode)`}>` | 可选，节点鼠标右键点击时的回调函数，返回当前操作的节点的数据以及鼠标事件                                   | [自定义键值名](demo#custom-key)                                      |
| nodeToggled      | `EventEmitter<`[`TreeNode`](#treenode)`>`                         | 可选，节点展开收起的回调函数，返回当前操作的节点的数据                                                     | [基本用法](demo#basic-usage)                                         |
| afterTreeInit    | `EventEmitter<Dictionary<`[`TreeNode`](#treenode)`>>`             | 可选，树节点生成完毕后的回调事件，返回当前树的所有节点信息，多用于大数据量情况下需要渲染完成后执行特定操作 | 与 d-operable-tree 的[大数据量可操作树](demo#virtual-scroll)使用一致 |

## d-operable-tree

### d-operable-tree 参数

#### 鼠标滑过或者选中支持增删改按钮操作

| 参数                    | 类型                                         | 默认值          | 描述                                                                                                                           | 跳转 Demo                                      | 全局配置项 |
| ----------------------- | -------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ---------- |
| tree                    | `Array<`[`ITreeItem`](#itreeitem)`>`         | --              | 必选，根据传入的数据进行树的渲染                                                                                               | [自定义键值名](demo#custom-key)                |
| treeNodeIdKey           | `string`                                     | 'id'            | 可选，id 键值名，用来标识节点的唯一性                                                                                          | [自定义键值名](demo#custom-key)                |
| treeNodeChildrenKey     | `string`                                     | 'items'         | 可选，子节点数组的键值名                                                                                                       | [自定义键值名](demo#custom-key)                |
| treeNodeTitleKey        | `string`                                     | 'title'         | 可选，节点显示数据的键值名                                                                                                     | [自定义键值名](demo#custom-key)                |
| checkboxDisabledKey     | `string`                                     | 'disabled'      | 可选，节点禁止点选的键值名                                                                                                     | [自定义键值名](demo#custom-key)                |
| selectDisabledKey       | `string`                                     | 'disabled'      | 可选，节点禁止选中的键值名                                                                                                     | [自定义键值名](demo#custom-key)                |
| toggleDisabledKey       | `string`                                     | 'disableToggle' | 可选，节点禁止展开收起的键值名                                                                                                 | [自定义键值名](demo#custom-key)                |
| iconParentOpen          | `string`                                     | --              | 可选，自定义父节点展开时的图标                                                                                                 | [自定义图标](demo#custom-icon)                 |
| iconParentClose         | `string`                                     | --              | 可选，自定义父节点收起时的图标                                                                                                 | [自定义图标](demo#custom-icon)                 |
| iconLeaf                | `string`                                     | --              | 可选，自定义叶子节点图标                                                                                                       | [自定义图标](demo#custom-icon)                 |
| checkable               | `boolean`                                    | true            | 可选，是否显示 checkbox，即是否为多选模式                                                                                      |                                                |
| addable                 | `boolean`                                    | false           | 可选，是否显示新增子节点按钮                                                                                                   | [操作按钮](demo#operation-button)              |
| editable                | `boolean`                                    | false           | 可选，是否显示编辑子节点按钮                                                                                                   | [操作按钮](demo#operation-button)              |
| deletable               | `boolean`                                    | false           | 可选，是否显示删除子节点按钮                                                                                                   | [操作按钮](demo#operation-button)              |
| draggable               | `boolean`                                    | false           | 可选，树节点是否支持 drag、drop 操作                                                                                           | [可拖拽树](demo#drag-and-drop-tree)            |
| checkboxInput           | [`ICheckboxInput`](#icheckboxinput)          | {}              | 可选，设置 checkbox 的相关属性                                                                                                 |                                                |
| canActivateNode         | `boolean`                                    | true            | 可选，是否可以选中节点 ,false 时点击节点触发 nodeChecked 事件，不触发 nodeSelected 事件                                        |                                                |
| canActivateParentNode   | `boolean`                                    | true            | 可选，父节点是否可选中,false 时点击节点触发 nodeToggled 事件，不触发 nodeSelected 事件                                         |                                                |
| canActivateMultipleNode | `boolean`                                    | false           | 可选，是否可以按住 ctrl 或 shift 时选择多个节点，配合 canActivateNode 和 canActivateParentNode 使用                            | [可拖拽树](demo#drag-and-drop-tree)            |
| iconTemplatePosition    | `string`                                     | --              | 可选，设置图标的位置，可选`'before-checkbox'`或`'after-checkbox'`                                                              | [自定义图标](demo#custom-icon)                 |
| checkableRelation       | `'upward' \| 'downward' \| 'both' \| 'none'` | 'both'          | 可选，设置父子节点的 check 规则                                                                                                | [控制父子 check 关系](demo#check-control-tree) |
| beforeAddNode           | `Promise<any>`                               | --              | 可选，新增子节点前回调(参数为当前节点), 返回值中可指定添加节点的 index                                                         | [操作按钮](demo#operation-button)              |
| beforeDeleteNode        | `Promise<any>`                               | --              | 可选，删除节点前回调(参数为当前节点)                                                                                           | [操作按钮](demo#operation-button)              |
| beforeNodeDrop          | `Promise<any>`                               | --              | 可选，子节点内部拖动 drop 前回调(参数为当前拖动的节点，释放位置的节点，放置类型（`prev`，`inner`，`next`）)                    | [可拖拽树](demo#drag-and-drop-tree)            |
| beforeEditNode          | `Promise<any>`                               | --              | 可选，子节点编辑前回调(参数为当前编辑的节点)                                                                                   | [操作按钮](demo#operation-button)              |
| beforeSelectNode        | `Promise<any>`                               | --              | 可选，节点点选前回调(参数为当前节点)                                                                                           | [操作按钮](demo#operation-button)              |
| postAddNode             | `Promise<any>`                               | --              | 可选，新增节点后回调(参数为新增节点)                                                                                           | [操作按钮](demo#operation-button)              |
| dropType                | [`IDropType`](#idroptype)                    | --              | 可选，设置拖拽放置的位置，`dropPrev`为放置在节点前，`dropNext`为放置在节点后，`dropInner`为放置在节点中                        | [可拖拽树](demo#drag-and-drop-tree)            |
| virtualScroll           | `boolean`                                    | false           | 可选，是否开启虚拟滚动，用于处理大数据量的情形                                                                                 | [大数据量可操作树](demo#virtual-scroll)        |
| itemSize                | `number`                                     | 30              | 可选，开启虚拟滚动后基准数量                                                                                                   |
| virtualScrollHeight     | `string`                                     | '800px'         | 可选，设置虚拟滚动时树的高度                                                                                                   | [大数据量可操作树](demo#virtual-scroll)        |
| minBufferPx             | `number`                                     | 600             | 可选，设置虚拟滚动时的最小 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](demo#virtual-scroll)        |
| maxBufferPx             | `number`                                     | 900             | 可选，设置虚拟滚动时的最大 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](demo#virtual-scroll)        |
| disableMouseEvent       | `boolean`                                    | false           | 可选，设置是否禁用鼠标的移入移出事件，主要用于兼容使用 appendTobody 时无法悬停到下拉框内容的情况                               | [自定义图标](demo#custom-icon)                 |
| showAnimation           | `boolean`                                    | true            | 可选，是否展示动画                                                                                                             | [无动画](demo#without-animation)               | ✔          |
| loadingTemplateRef      | `TemplateRef<any>`                           | --              | 可选，自定义加载中的模板                                                                                                       |
| treeNodesRef            | `TemplateRef<any>`                           | --              | 可选，自定义节点的显示模板                                                                                                     |
| indent                  | `string`                                     | '16px'          | 可选，设置树各层级之间的缩进                                                                                                   | [基本用法](demo#basic-usage)                   |            |

## d-operable-tree 事件

| 参数               | 类型                                                                                                            | 描述                                                                                                                                                                                    | 跳转 Demo                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| nodeSelected       | `EventEmitter<`[`TreeNode \| TreeNode[]`](#treenode)`>`                                                         | 可选，节点点击事件回调,返回当前选中节点的数据                                                                                                                                           | [基本用法](demo#basic)                  |
| nodeDblClicked     | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点双击时的回调函数，返回当前操作的节点的数据                                                                                                                                    |                                         |
| nodeRightClicked   | `EventEmitter<{event:MouseEvent,node:`[`TreeNode`](#treenode)`}>`                                               | 可选，节点鼠标右键点击时的回调函数，返回当前操作的节点的数据以及鼠标事件                                                                                                                |                                         |
| nodeDeleted        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点删除事件回调,返回当前删除节点的数据                                                                                                                                           |                                         |
| nodeToggled        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点展开收起事件回调,返回当前操作的节点的数据                                                                                                                                     |                                         |
| nodeChecked        | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点选中事件回调，返回所有选中的节点数据                                                                                                                                          |
| currentNodeChecked | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点选中事件回调，返回当前选中的节点数据                                                                                                                                          |
| nodeEdited         | `EventEmitter<`[`TreeNode`](#treenode)`>`                                                                       | 可选，节点 title 编辑事件回调，返回当前编辑的节点数据                                                                                                                                   | [操作按钮](demo#operation-button)       |
| editValueChange    | `EventEmitter<{ value: string, callback: Function }>`                                                           | 可选，节点编辑中数据变化的回调函数，返回校验后的值；可通过对返回值中的 callback 函数的调用实现校验错误提示(callback 接收两个参数，`errTips`为错误信息，`errTipsPosition`为信息弹出位置) | [操作按钮](demo#operation-button)       |
| nodeOnDrop         | `EventEmitter<{ event: DragEvent, treeNode:`[`TreeNode`](#treenode)`, dropType:`[`IDropType`](#idroptype)`}>`   | 可选，节点 onDrop 事件回调(任意可拖动元素 drop)，返回拖拽事件，释放位置的节点数据，放置类型（`prev`,`inner`,`next`）                                                                    | [可拖拽树](demo#drag-and-drop-tree)     |
| nodeDragStart      | `EventEmitter<{ event: DragEvent, treeNode:`[`TreeNode`](#treenode)`, treeNodes?:`[`TreeNode[]`](#treenode)`}>` | 可选，节点 dragStart 事件回调，返回拖拽事件，当前拖拽节点；多选时返回拖拽节点数组                                                                                                       | [可拖拽树](demo#drag-and-drop-tree)     |
| afterTreeInit      | `EventEmitter<Dictionary<`[`TreeNode`](#treenode)`>`                                                            | 可选，树节点生成完毕后的回调事件，返回当前树的所有节点信息，多用于大数据量情况下需要渲染完成后执行特定操作                                                                              | [大数据量可操作树](demo#virtual-scroll) |

**注意**

- `treeNodeIdKey`: 用来作为节点的唯一表示，默认情况下取 `id`，如果不需要异步加载节点，可以不用传入，组件会自动分配一个唯一标识
- `treeNodeChildrenKey`: 用来表示传入数据子节点的 children 名称，默认取 `items`
- `checkboxDisabledKey`: 用来标识子节点是否可选，默认取 `disabled`作为标识
- `treeNodeTitleKey`: 用来标识节点显示字段的键值，默认为 `title`
- `checkboxInput`: 用来给 checkbox 设置相关属性，其默认值为 `{ color: 'F38826' }`, ~~disableType 属性用来统一所有子节点的 disableType~~。

## 接口 & 类型定义

### TreeFactoryAPI

组件提供一个 TreeFactory，你可以从 TreeFactory 的实例上拿到下列方法来进行操作:
参考：[常用 TreeFactory 函数](demo#tree-factory)

```ts

`treeRoot`: 获取整颗树

`mapTreeItems({treeItems,parentId, treeNodeChildrenKey = 'items',treeNodeIdKey = 'id',checkboxDisabledKey = 'disabled',
 selectDisabledKey = 'disableSelect',toggleDisabledKey = 'disableToggle',treeNodeTitleKey = 'title'})`: 将原始的treeItems数据转为组件所需TreeNode后添加到指定的父节点上，常用于懒加载等功能

`getNodeById(id: number | string): TreeNode`: 根据 id 获取节点信息并返回

`getCompleteNodeById(id: number | string): TreeNode`: 根据 id 获取节点信息，包含节点的 id，parentId

`addChildNode(parentNode:TreeNode,childNode:TreeNode,index?)`: 添加指定子节点到指定父节点上，可通过index控制子节点所处位置

`deleteNodeById(id: number | string)`:  根据id删除指定节点

`toggleNodeById(id: number | string)`: 根据id展开收起指定节点

`openNodesById(id: number | string) `: 根据id展开指定节点

`closeNodesById(id: number | string, closeChildren = false)`: 根据id收起指定节点，可根据closeChildren的值决定子节点是否需要收起

`disabledNodesById(id: number | string)`: 根据 id 使某个节点的 checkbox 变为不可选

`checkNodesById(id: number | string, checked: boolean, checkableRelation: 'upward' | 'downward' | 'both' | 'none' = 'both'): Array<Object> `:
 根据 id 决定指定节点的check状态，可传入checkableRelation控制父子节点选中关系，返回所有选中节点

`getCheckedNodes()`: 返回所有check状态为true的节点

`getDisabledNodes()`: 返回所有禁止check的节点

`activeNodeById(id: number | string)`: 根据 id 使指定节点的状态变为active

`getChildrenById(id: number | string): Array<TreeNode> `: 根据 id 获得指定节点的子节点，返回子节点的数组

`startLoading(id: number | string)`: 根据id使指定节点显示加载状态

`endLoading(id: number | string)`: 根据id关闭指定节点加载状态

`searchTree(target: string, hideUnmatched = false, keyword='title', pattern?:RegExp)`:
 在树中搜索是否存在匹配target字段的节点. hideUnmatched控制是否隐藏不匹配的节点；keyword控制在指定关键字中搜索；pattern控制与target匹配的方式

`hideNodeById(id: number | string, hide: boolean)`: 根据 id 选择隐藏或显示节点

`deactivateAllNodes()`: 取消所有节点的active状态

`checkAllNodes(checked:boolean)`: 根据checked决定所有节点的check状态

`mergeTreeNodes(targetNode:TreeNode)`: 传入需要合并显示的节点，默认为整个树，此操作将合并只有一个子节点的父节点，用于优化树形显示。 本方法将改变树节点的父子关系，仅可在树只读的条件下使用，若节点动态变化，则修改源数据后每次重新调用此方法

`getNodeIndex(node: TreeNode)`: 获取指定节点处于父节点中位置

`editNodeTitle(id: number | string)`: 根据id编辑指定节点

`disableAllNodesChecked(disable:boolean = true)`: 禁止所有节点的check状态修改

`disableAllNodesSelected(disable:boolean = true)`: 禁止所有节点的select状态修改

`disableAllNodesToggled(disable:boolean = true)`: 禁止所有节点的展开收起状态修改

`transferToTreeNode(originNode, parentId = undefined,
    treeNodeChildrenKey?,
    treeNodeIdKey?,
    checkboxDisabledKey?,
    selectDisabledKey?,
    toggleDisabledKey?,
    treeNodeTitleKey?)`: 将原始节点转化为树节点

`toggleAllNodes(toggle:boolean = true)`: toggle 为 true 展开所有节点， 为 false 收起所有节点

```

### 自定义模板

自定义额外图标相关参数如下

| 参数                 | 类型                                    | 默认值           | 描述                                                                                                    | 跳转 Demo                      |
| -------------------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| iconTemplatePosition | `'before-checkbox' \| 'after-checkbox'` | 'after-checkbox' | 可选，设置 icon 放置的位置，`before-checkbox`为放置在 checkbox 前，`after-checkbox`为放置在 checkbox 后 | [自定义图标](demo#custom-icon) |
| iconTemplate         | `TemplateRef<any>`                      | --               | 可选，自定义图标的展示                                                                                  | [自定义图标](demo#custom-icon) |
| nodeTemplate         | `TemplateRef<any>`                      | --               | 可选，自定义树节点的显示                                                                                | [自定义图标](demo#custom-icon) |
| operatorTemplate     | `TemplateRef<any>`                      | --               | 可选，自定义操作图标区域                                                                                | [自定义图标](demo#custom-icon) |
| statusTemplate       | `TemplateRef<any>`                      | --               | 可选，自定义状态等信息                                                                                  | [自定义图标](demo#custom-icon) |

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

**Note**
The `node` parameter in `let-node="node"` in iconTemplate and nodeTemplate does not include id and parentId. Use `completeNode` in `let-completeNode="completeNode"`

### ITreeItem

```ts
export interface ITreeItem {
  title: string; // 节点显示名称
  open?: boolean; // 节点是否展开
  loading?: boolean; // 节点是否显示加载中
  isMatch?: boolean; // 搜索场景下，节点是否匹配
  items?: ITreeItem[]; // 节点的子节点
  isParent?: boolean; // 节点是否为父节点，控制是否出现展开收起按钮
  data?: any; // 额外的节点数据存放处
  id?: any; // 节点id
  isHide?: boolean; // 节点是否隐藏
  isActive?: boolean; // 节点是否为selected状态
  isChecked?: boolean; // 节点是否为checked状态
  halfChecked?: boolean; // 节点是否为半选状态
  showCheckbox?: boolean; // 是否显示checkbox，常用于父节点仅作为分类，不具备可操作的场景
  disabled?: boolean; // 节点是否禁止check
  disableAdd?: boolean; // 节点是否禁止添加
  disableEdit?: boolean; // 节点是否禁止编辑
  disableDelete?: boolean; // 节点是否禁止删除
  disableSelect?: boolean; // 节点是否禁止select
  disableToggle?: boolean; // 节点是否禁止展开收起
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
  dropPrev?: boolean; // 是否允许放置在节点前
  dropNext?: boolean; // 是否允许放置在节点后
  dropInner?: boolean; // 是否允许放置在节点中，成为该节点的子节点
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
