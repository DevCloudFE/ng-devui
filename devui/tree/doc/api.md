#### **d-tree参数**  

##### 基本的树，没有增删改查等操作

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| tree  | `Array<ITreeItem>`      | --| 必选，根据传入的数据进行树的渲染  |
| treeNodeIdKey  | `string`       | 'id'| 可选，id键值名，用来标识节点的唯一性  |
| treeNodeChildrenKey  | `string`       | 'items'| 可选，子节点数组的键值名 |
| treeNodeTitleKey  | `string`       | 'title'| 可选，节点显示数据的键值名 |
| checkboxDisabledKey  | `string`       | 'disabled'| 可选，节点禁止点选的键值名 |
| iconParentOpen  | `string`       | --| 可选，自定义父节点展开时的图标 |
| iconParentClose  | `string`       | --| 可选，自定义父节点收起时的图标 |
| iconLeaf  | `string`       | --| 可选，自定义叶子节点图标  |
| treeNodesRef  | `TemplateRef<any>`       | --| 可选，自定义节点的显示模板 |

#### **d-tree事件**  

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| nodeSelected | `EventEmitter<any>`| 可选，节点选中的回调函数，返回当前选中节点的数据 |
| nodeDblClicked | `EventEmitter<any>`| 可选，节点双击时的回调函数，返回当前操作的节点的数据 |
| nodeToggled | `EventEmitter<any>`| 可选，节点展开收起的回调函数，返回当前操作的节点的数据 |

#### **d-operableTree参数**  

##### 鼠标滑过或者选中支持增删改按钮操作

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| tree  | `Array<ITreeItem>`      | --| 必选，根据传入的数据进行树的渲染  |
| treeNodeIdKey  | `string`       | 'id'| 可选，id键值名，用来标识节点的唯一性  |
| treeNodeChildrenKey  | `string`       | 'items'| 可选，子节点数组的键值名 |
| treeNodeTitleKey  | `string`       | 'title'| 可选，节点显示数据的键值名 |
| checkboxDisabledKey  | `string`       | 'disabled'| 可选，节点禁止点选的键值名 |
| iconParentOpen  | `string`       | --| 可选，自定义父节点展开时的图标 |
| iconParentClose  | `string`       | --| 可选，自定义父节点收起时的图标 |
| iconLeaf  | `string`       | --| 可选，自定义叶子节点图标  |
| checkable  | `boolean`       | true| 可选，是否显示checkbox，即是否为多选模式|
| addable  | `boolean`       | false| 可选，是否显示新增子节点按钮  |
| editable  | `boolean`       | false| 可选，是否显示编辑子节点按钮  |
| deletable  | `boolean`       | false| 可选，是否显示删除子节点按钮  |
| draggable  | `boolean`       | false| 可选，树节点是否支持drag、drop操作  |
| checkboxInput  | `ICheckboxInput`       | {}| 可选，设置checkbox的相关属性  |
| canActivateNode | `boolean` | true | 可选，是否可以选中节点|
| canActivateParentNode | `boolean` | true | 可选，父节点是否可选中，false时触发toggle操作|
| iconTemplatePosition | `string` | -- | 可选，设置图标的位置，可选`'before-checkbox'`或`'after-checkbox'`|
| beforeAddNode  | `Promise<any>`      | 可选，新增子节点前回调(参数为当前节点)  |
| beforeDeleteNode  | `Promise<any>`       | 可选，删除节点前回调(参数为当前节点)  |
| beforeNodeDrop  | `Promise<any>`       | 可选，子节点内部拖动drop前回调(参数为当前拖动的节点与释放位置的节点)  |
| beforeEditNode  | `Promise<any>`       | 可选，子节点编辑前回调(参数为当前编辑的节点)  |
| postAddNode | `Promise<any>`  | 可选，新增节点后回调(参数为新增节点)|

#### **d-operableTree事件**  

| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| nodeSelected  | `EventEmitter<any>`       | 可选，节点点击事件回调,返回当前选中节点的数据 |
| nodeDblClicked | `EventEmitter<any>`| 可选，节点双击时的回调函数，返回当前操作的节点的数据 |
| nodeDeleted  | `EventEmitter<any>`       | 可选，节点删除事件回调,返回当前删除节点的数据  |
| nodeToggled  | `EventEmitter<any>`      | 可选，节点展开收起事件回调,返回当前操作的节点的数据 |
| nodeChecked  | `EventEmitter<any>`      | 可选，节点选中事件回调，返回选中的节点数据  |
| nodeEdited  | `EventEmitter<any>`       | 可选，节点title编辑事件回调，返回当前编辑的节点数据  |
| editValueChange  | `EventEmitter<any>`       | 可选，节点编辑中数据变化的回调函数，返回校验后的值  |
| nodeOnDrop  | `EventEmitter<any>`       | 可选，节点onDrop事件回调(任意可拖动元素drop)，返回拖拽事件与释放位置的节点数据  |

##### **注意**

* `treeNodeIdKey`: 用来作为节点的唯一表示，默认情况下取 `id`，如果不需要异步加载节点，可以不用传入，组件会自动分配一个唯一标识
* `treeNodeChildrenKey`: 用来表示传入数据子节点的 children 名称，默认取 `items`
* `checkboxDisabledKey`: 用来标识子节点是否可选，默认取 `disabled`作为标识
* `treeNodeTitleKey`: 用来标识节点显示字段的键值，默认为 `title`
* `checkboxInput`: 用来给 checkbox 设置相关属性，其默认值为 `{ color: 'F38826' }`, ~~disableType属性用来统一所有子节点的disableType~~。

##### ITreeItem：每个树节点的数据组成，可通过xxxKey参数修改对应键值

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
 `getNodeById`: 根据id获取节点信息
 `hideNodeById`: 根据id选择隐藏或显示节点
 `search`: 搜索树（可设置过滤或高亮）
 `deactivateAllNodes`: 取消选择所有节点

#### 自定义模板

 自定义额外图标相关参数如下

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| iconTemplatePosition  | string       | 'after-checkbox'| 可选，支持[[ 'before-checkbox','after-checkbox' ]]  |
| #iconTemplate         | 内嵌的模板    | --          | 可选，支持自定义html                                   |

 使用方法： 在operable-tree内自定义模板`<ng-template>`并给模板标记为`#iconTemplate`, 如`<ng-template #iconTemplate>...</ng-template>`

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| #nodeTemplate         | 内嵌的模板    | --          | 可选，支持自定义html,用于自定义树节点的显示               |
| #operatorTemplate         | 内嵌的模板    | --          | 可选，支持自定义html                 |
| #statusTemplate         | 内嵌的模板    | --          | 可选，支持自定义html,用于自定义状态等信息                 |

 在operable-tree内自定义模板`<ng-template>`并给模板标记为`#operatorTemplate`, 如`<ng-template #operatorTemplate>...</ng-template>`
 在operable-tree内自定义模板`<ng-template>`并给模板标记为`#statusTemplate`, 如`<ng-template #statusTemplate let-node="node">...</ng-template>`

``` xml
<ng-template #iconTemplate let-node="node">
</ng-template>
<ng-template #nodeTemplate let-node="node">
</ng-template>
<ng-template #operatorTemplate let-node="node">
</ng-template>
<ng-template #statusTemplate let-node="node">
</ng-template>
```

node: 当前节点的数据
