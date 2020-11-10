## d-tree 参数

##### 基本的树，没有增删改查等操作

|        参数         |        类型        |      默认       |                                                              说明                                                              | 跳转 Demo                                                   |
| :-----------------: | :----------------: | :-------------: | :----------------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------- |
|        tree         | `Array<ITreeItem>` |       --        |                                                必选，根据传入的数据进行树的渲染                                                | [基本用法](/components/tree/demo#basic-usage)               |
|    treeNodeIdKey    |      `string`      |      'id'       |                                             可选，id 键值名，用来标识节点的唯一性                                              | [自定显示字段](/components/tree/demo#custom-display-field)  |
| treeNodeChildrenKey |      `string`      |     'items'     |                                                    可选，子节点数组的键值名                                                    | [自定显示字段](/components/tree/demo#custom-display-field)  |
|  treeNodeTitleKey   |      `string`      |     'title'     |                                                   可选，节点显示数据的键值名                                                   | [自定显示字段](/components/tree/demo#custom-display-field)  |
| checkboxDisabledKey |      `string`      |   'disabled'    |                                              可选，节点禁止点选 checkbox 的键值名                                              | [自定显示字段](/components/tree/demo#custom-display-field)  |
|  selectDisabledKey  |      `string`      |   'disabled'    |                                                   可选，节点禁止选中的键值名                                                   | [可勾选树](/components/tree/demo#checkable-tree)            |
|  toggleDisabledKey  |      `string`      | 'disableToggle' |                                                 可选，节点禁止展开收起的键值名                                                 | [可勾选树](/components/tree/demo#checkable-tree)            |
|   iconParentOpen    |      `string`      |       --        |                                                 可选，自定义父节点展开时的图标                                                 | [自定义图标](/components/tree/demo#custom-icon)             |
|   iconParentClose   |      `string`      |       --        |                                                 可选，自定义父节点收起时的图标                                                 | [自定义图标](/components/tree/demo#custom-icon)             |
|      iconLeaf       |      `string`      |       --        |                                                    可选，自定义叶子节点图标                                                    | [自定义图标](/components/tree/demo#custom-icon)             |
|    treeNodesRef     | `TemplateRef<any>` |       --        |                                                   可选，自定义节点的显示模板                                                   |
| loadingTemplateRef  | `TemplateRef<any>` |       --        |                                                    可选，自定义加载中的模板                                                    | [自定义 loading 模板](/components/tree/demo#custom-loading) |
|    virtualScroll    |     `boolean`      |      false      |                                         可选，是否开启虚拟滚动，用于处理大数据量的情形                                         | [大数据量可操作树](/components/tree/demo#virtual-scroll)    |
| virtualScrollHeight |      `string`      |     '800px'     |                                                  可选，设置虚拟滚动时树的高度                                                  | [大数据量可操作树](/components/tree/demo#virtual-scroll)    |
|     minBufferPx     |      `number`      |       760       | 可选，设置虚拟滚动时的最小 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](/components/tree/demo#virtual-scroll)    |
|     maxBufferPx     |      `number`      |      1140       | 可选，设置虚拟滚动时的最大 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](/components/tree/demo#virtual-scroll)    |

## d-tree 事件

|       参数       |        类型         | 说明                                                                     | 跳转 Demo                                                  |
| :--------------: | :-----------------: | :----------------------------------------------------------------------- | ---------------------------------------------------------- |
|   nodeSelected   | `EventEmitter<any>` | 可选，节点选中的回调函数，返回当前选中节点的数据                         | [基本用法](/components/tree/demo#basic-usage)              |
|  nodeDblClicked  | `EventEmitter<any>` | 可选，节点双击时的回调函数，返回当前操作的节点的数据                     | [自定显示字段](/components/tree/demo#custom-display-field) |
| nodeRightClicked | `EventEmitter<any>` | 可选，节点鼠标右键点击时的回调函数，返回当前操作的节点的数据以及鼠标事件 | [自定显示字段](/components/tree/demo#custom-display-field) |
|   nodeToggled    | `EventEmitter<any>` | 可选，节点展开收起的回调函数，返回当前操作的节点的数据                   | [基本用法](/components/tree/demo#basic-usage)              |

## d-operableTree 参数

##### 鼠标滑过或者选中支持增删改按钮操作

|         参数          |                     类型                     |      默认       |                                                              说明                                                              | 跳转 Demo                                                       |
| :-------------------: | :------------------------------------------: | :-------------: | :----------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------- |
|         tree          |              `Array<ITreeItem>`              |       --        |                                                必选，根据传入的数据进行树的渲染                                                | [可勾选树](/components/tree/demo#checkable-tree)                |
|     treeNodeIdKey     |                   `string`                   |      'id'       |                                             可选，id 键值名，用来标识节点的唯一性                                              | [可勾选树](/components/tree/demo#checkable-tree)                |
|  treeNodeChildrenKey  |                   `string`                   |     'items'     |                                                    可选，子节点数组的键值名                                                    | [可勾选树](/components/tree/demo#checkable-tree)                |
|   treeNodeTitleKey    |                   `string`                   |     'title'     |                                                   可选，节点显示数据的键值名                                                   | [可勾选树](/components/tree/demo#checkable-tree)                |
|  checkboxDisabledKey  |                   `string`                   |   'disabled'    |                                                   可选，节点禁止点选的键值名                                                   | [可勾选树](/components/tree/demo#checkable-tree)                |
|   selectDisabledKey   |                   `string`                   |   'disabled'    |                                                   可选，节点禁止选中的键值名                                                   | [可勾选树](/components/tree/demo#checkable-tree)                |
|   toggleDisabledKey   |                   `string`                   | 'disableToggle' |                                                 可选，节点禁止展开收起的键值名                                                 | [可勾选树](/components/tree/demo#checkable-tree)                |
|    iconParentOpen     |                   `string`                   |       --        |                                                 可选，自定义父节点展开时的图标                                                 | [自定义图标](/components/tree/demo#custom-icon)                 |
|    iconParentClose    |                   `string`                   |       --        |                                                 可选，自定义父节点收起时的图标                                                 | [自定义图标](/components/tree/demo#custom-icon)                 |
|       iconLeaf        |                   `string`                   |       --        |                                                    可选，自定义叶子节点图标                                                    | [自定义图标](/components/tree/demo#custom-icon)                 |
|       checkable       |                  `boolean`                   |      true       |                                           可选，是否显示 checkbox，即是否为多选模式                                            | [操作按钮](/components/tree/demo#operation-button)              |
|        addable        |                  `boolean`                   |      false      |                                                  可选，是否显示新增子节点按钮                                                  | [操作按钮](/components/tree/demo#operation-button)              |
|       editable        |                  `boolean`                   |      false      |                                                  可选，是否显示编辑子节点按钮                                                  | [操作按钮](/components/tree/demo#operation-button)              |
|       deletable       |                  `boolean`                   |      false      |                                                  可选，是否显示删除子节点按钮                                                  | [操作按钮](/components/tree/demo#operation-button)              |
|       draggable       |                  `boolean`                   |      false      |                                              可选，树节点是否支持 drag、drop 操作                                              | [可拖拽树](/components/tree/demo#drag-and-drop-tree)            |
|     checkboxInput     |               `ICheckboxInput`               |       {}        |                                                 可选，设置 checkbox 的相关属性                                                 | [可勾选树](/components/tree/demo#checkable-tree)                |
|    canActivateNode    |                  `boolean`                   |      true       |                    可选，是否可以选中节点 ,false 时点击节点触发 nodeChecked 事件，不触发 nodeSelected 事件                     | [操作按钮](/components/tree/demo#operation-button)              |
| canActivateParentNode |                  `boolean`                   |      true       |                     可选，父节点是否可选中,false 时点击节点触发 nodeChecked 事件，不触发 nodeSelected 事件                     | [操作按钮](/components/tree/demo#operation-button)              |
| iconTemplatePosition  |                   `string`                   |       --        |                               可选，设置图标的位置，可选`'before-checkbox'`或`'after-checkbox'`                                | [自定义图标](/components/tree/demo#custom-icon)                 |
|   checkableRelation   | `'upward' \| 'downward' \| 'both' \| 'none'` |     'both'      |                                                可选，设置父子节点的 check 规则                                                 | [控制父子 check 关系](/components/tree/demo#check-control-tree) |
|     beforeAddNode     |                `Promise<any>`                |       --        |                             可选，新增子节点前回调(参数为当前节点), 返回值中可指定添加节点的 index                             | [操作按钮](/components/tree/demo#operation-button)              |
|   beforeDeleteNode    |                `Promise<any>`                |       --        |                                              可选，删除节点前回调(参数为当前节点)                                              | [操作按钮](/components/tree/demo#operation-button)              |
|    beforeNodeDrop     |                `Promise<any>`                |       --        |          可选，子节点内部拖动 drop 前回调(参数为当前拖动的节点，释放位置的节点，放置类型（`prev`，`inner`，`next`）)           | [可拖拽树](/components/tree/demo#drag-and-drop-tree)            |
|    beforeEditNode     |                `Promise<any>`                |       --        |                                          可选，子节点编辑前回调(参数为当前编辑的节点)                                          | [操作按钮](/components/tree/demo#operation-button)              |
|      postAddNode      |                `Promise<any>`                |       --        |                                              可选，新增节点后回调(参数为新增节点)                                              | [操作按钮](/components/tree/demo#operation-button)              |
|       dropType        |                 `IDropType`                  |       --        |            可选，设置拖拽放置的位置，`dropPrev`为放置在节点前，`dropNext`为放置在节点后，`dropInner`为放置在节点中             | [可拖拽树](/components/tree/demo#drag-and-drop-tree)            |
|     virtualScroll     |                  `boolean`                   |      false      |                                         可选，是否开启虚拟滚动，用于处理大数据量的情形                                         | [大数据量可操作树](/components/tree/demo#virtual-scroll)        |
|  virtualScrollHeight  |                   `string`                   |     '800px'     |                                                  可选，设置虚拟滚动时树的高度                                                  | [大数据量可操作树](/components/tree/demo#virtual-scroll)        |
|      minBufferPx      |                   `number`                   |       760       | 可选，设置虚拟滚动时的最小 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](/components/tree/demo#virtual-scroll)        |
|      maxBufferPx      |                   `number`                   |      1140       | 可选，设置虚拟滚动时的最大 buffer 尺寸，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [大数据量可操作树](/components/tree/demo#virtual-scroll)        |
|      disableMouseEvent      |                   `boolean`                   |      false       | 可选，设置是否禁用鼠标的移入移出事件，主要用于兼容使用appendTobody时无法悬停到下拉框内容的情况 | [自定义图标](/components/tree/demo#custom-icon)        |

## d-operableTree 事件

|        参数        |        类型         | 说明                                                                                                                 | 跳转 Demo                                            |
| :----------------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
|    nodeSelected    | `EventEmitter<any>` | 可选，节点点击事件回调,返回当前选中节点的数据                                                                        | [可勾选树](/components/tree/demo#checkable-tree)     |
|   nodeDblClicked   | `EventEmitter<any>` | 可选，节点双击时的回调函数，返回当前操作的节点的数据                                                                 | [可勾选树](/components/tree/demo#checkable-tree)     |
|  nodeRightClicked  | `EventEmitter<any>` | 可选，节点鼠标右键点击时的回调函数，返回当前操作的节点的数据以及鼠标事件                                             | [可勾选树](/components/tree/demo#checkable-tree)     |
|    nodeDeleted     | `EventEmitter<any>` | 可选，节点删除事件回调,返回当前删除节点的数据                                                                        | [操作按钮](/components/tree/demo#operation-button)   |
|    nodeToggled     | `EventEmitter<any>` | 可选，节点展开收起事件回调,返回当前操作的节点的数据                                                                  | [可勾选树](/components/tree/demo#checkable-tree)     |
|    nodeChecked     | `EventEmitter<any>` | 可选，节点选中事件回调，返回所有选中的节点数据                                                                       | [可勾选树](/components/tree/demo#checkable-tree)     |
| currentNodeChecked | `EventEmitter<any>` | 可选，节点选中事件回调，返回当前选中的节点数据                                                                       | [可勾选树](/components/tree/demo#checkable-tree)     |
|     nodeEdited     | `EventEmitter<any>` | 可选，节点 title 编辑事件回调，返回当前编辑的节点数据                                                                | [操作按钮](/components/tree/demo#operation-button)   |
|  editValueChange   | `EventEmitter<any>` | 可选，节点编辑中数据变化的回调函数，返回校验后的值                                                                   | [操作按钮](/components/tree/demo#operation-button)   |
|     nodeOnDrop     | `EventEmitter<any>` | 可选，节点 onDrop 事件回调(任意可拖动元素 drop)，返回拖拽事件，释放位置的节点数据，放置类型（`prev`,`inner`,`next`） | [可拖拽树](/components/tree/demo#drag-and-drop-tree) |

##### **注意**

- `treeNodeIdKey`: 用来作为节点的唯一表示，默认情况下取 `id`，如果不需要异步加载节点，可以不用传入，组件会自动分配一个唯一标识
- `treeNodeChildrenKey`: 用来表示传入数据子节点的 children 名称，默认取 `items`
- `checkboxDisabledKey`: 用来标识子节点是否可选，默认取 `disabled`作为标识
- `treeNodeTitleKey`: 用来标识节点显示字段的键值，默认为 `title`
- `checkboxInput`: 用来给 checkbox 设置相关属性，其默认值为 `{ color: 'F38826' }`, ~~disableType 属性用来统一所有子节点的 disableType~~。

##### ITreeItem：每个树节点的数据组成，可通过 xxxKey 参数修改对应键值

```javascript
ITreeItem {
  title: string;
  open?: boolean;
  loading?: boolean;
  isMatch?: boolean;
  items?: ITreeItem[];
  isParent?: boolean;
  data?: any;
  id?: any;
  isHide?: boolean;
  isActive?: boolean;
  isChecked?: boolean;
  halfChecked?: boolean;
  disabled?: boolean;

  [prop: string]: any;

  disableAdd?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
}

export interface ICheckboxInput {
  color?: string;
}

export interface IDropType {
  dropPrev?: boolean;
  dropNext?: boolean;
  dropInner?: boolean;
}

```

#### **TreeFactoryAPI**

组件提供一个 TreeFactory，你可以从 TreeFactory 的实例上拿到下列方法来进行操作:

`appendTreeItems`: 添加新的数据到某个特定节点上
`addNode`: 添加单个节点
`deleteNodeById`: 删除具体节点
`toggleNodeById`: 开关某个具体节点
`openNodesById`: 根据 id 展开特定节点
`closeNodesById`: 根据 id 关闭特定节点
`disabledNodesById`: 根据 id 使某个节点的 checkbox 变为不可选
`checkNodesById`: 根据 id 选中某个节点
`getCheckedNodes`: 获取所有选中节点
`getDisabledNodes`: 获取所有不可选的节点
`activeNodeById`: 根据 id 使特定节点的状态变为 active
`getChildrenById`: 根据 id 获得特定节点的子节点
`startLoading`: 开始 loading
`endLoading`: 关闭 loading
`search`: 输入是否匹配节点中的数据
`getNodeById`: 根据 id 获取节点信息
`hideNodeById`: 根据 id 选择隐藏或显示节点
`search`: 搜索树（可设置过滤或高亮）
`deactivateAllNodes`: 取消选择所有节点
`checkAllNodes`: 传入`true`或`false`,check 所有节点或取消 check 所有节点

#### 自定义模板

自定义额外图标相关参数如下

|         参数         |    类型    |       默认       |                        说明                        |
| :------------------: | :--------: | :--------------: | :------------------------------------------------: |
| iconTemplatePosition |   string   | 'after-checkbox' | 可选，支持[[ 'before-checkbox','after-checkbox' ]] |
|    #iconTemplate     | 内嵌的模板 |        --        |               可选，支持自定义 html                |

使用方法： 在 operable-tree 内自定义模板`<ng-template>`并给模板标记为`#iconTemplate`, 如`<ng-template #iconTemplate>...</ng-template>`

|       参数        |    类型    | 默认 |                     说明                     |
| :---------------: | :--------: | :--: | :------------------------------------------: |
|   #nodeTemplate   | 内嵌的模板 |  --  | 可选，支持自定义 html,用于自定义树节点的显示 |
| #operatorTemplate | 内嵌的模板 |  --  |            可选，支持自定义 html             |
|  #statusTemplate  | 内嵌的模板 |  --  |  可选，支持自定义 html,用于自定义状态等信息  |

在 operable-tree 内自定义模板`<ng-template>`并给模板标记为`#operatorTemplate`, 如`<ng-template #operatorTemplate>...</ng-template>`
在 operable-tree 内自定义模板`<ng-template>`并给模板标记为`#statusTemplate`, 如`<ng-template #statusTemplate let-node="node">...</ng-template>`

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

node: 当前节点的数据
