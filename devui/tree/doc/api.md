### d-tree 参数
| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| tree  | `Array<ITreeItem>`       | []| 树数组 |
| treeNodesRef  | `TemplateRef<any>`  | undefined | 可选，自定义节点模板  |
| treeNodeIdKey  | `string`       | id | 可选，标识节点唯一id的键值  |
| treeNodeChildrenKey  | `string`       | items | 可选，标识节点子节点数组的键值  |
| treeNodeTitleKey  | `string`       | title | 可选，标识节点显示字段的键值  |
| iconParentOpen  | `string`       | undefined | 可选，节点打开时显示的图标  |
| iconParentClose  | `string`       | undefined | 可选，节点关闭时显示的图标  |
| iconLeaf  | `string`       | undefined | 可选，节点为叶节点时显示的图标  |

### d-tree 事件
| 参数                  | 类型          |   说明                                                |
| :-------------------: | :---------- | :--------------------------------------------------: |
| nodeSelected | `TreeNode` | 节点点击事件回调，值为选中的节点 |
| nodeToggled  | `TreeNode` | 节点展开事件回调，值为展开节点 |

### d-tree 方法
| 参数                  | 参数          |   说明                                                |
| :-------------------: | :---------- | :--------------------------------------------------: |
| selectNode  | `(event, TreeNode)` | 选择节点 |
| toggleNode  | `(event, TreeNode)` | 展开节点 |
| appendTreeItems  | `([]<ITreeItem>, parentId)` | 添加树节点，参数和tree数组结构相同 |

### d-operable-tree 参数
| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| tree  | `Array<ITreeItem>` | []| 树数组 |
| treeNodeIdKey  | `string` | id | 可选，标识节点唯一id的键值  |
| treeNodeChildrenKey  | `string`  | items | 可选，标识节点子节点数组的键值  |
| treeNodeTitleKey | `string` | title | 可选，标识节点显示字段的键值 |
| checkboxDisabledKey | `string` | disabled | 可选，标识节点被禁用的键值 |
| iconParentOpen  | `string` | undefined | 可选，节点打开时显示的图标  |
| iconParentClose  | `string` | undefined | 可选，节点关闭时显示的图标  |
| iconLeaf  | `string` | undefined | 可选，节点为叶节点时显示的图标  |
| showLoading  | `boolean` | false | 可选，是否显示加载中状态  |
| addable  | `boolean` | false  | 可选，是否显示新增子节点按钮  |
| checkable  | `boolean` | true | 可选，是否显示复选框  |
| editable  | `boolean`  | false| 可选，是否显示编辑子节点按钮  |
| deletable  | `boolean` | false| 可选，是否显示删除子节点按钮  |
| beforeAddNode  | `Promise` | -- | 可选，新增子节点前回调(参数为当前节点)  |
| postAddNode | `Promise` | -- | 可选，新增节点后回调(参数为新增节点)|
| beforeDeleteNode  | `Promise`  | --| 可选，删除节点前回调(参数为当前节点)  |
| draggable  | `boolean` | false| 可选，树节点是否支持drag、drop操作  |
| beforeNodeDrop  | `Promise` | -- | 可选，子节点内部拖动drop前回调  |
| editValueChange  | `function` | {value: xxx, callback: func} |可选，支持节点title编辑校验，使用时校验不通过callback({errTips: 'xxxxxx'}),通过callback()  |
| canActivateNode | `boolean` | true | 可选，是否可以选中节点|
| canActivateParentNode | `boolean` | true | 可选，父节点是否可选中，false时触发toggle操作|
| checkboxInput | `ICheckboxInput` | {color: 'F38826'} | 可选，用来给复选框设置相关属性 |

### d-operable-tree 事件
| 参数                  | 类型 |   说明                                                |
| :-------------------: | :----------: | :--------------------------------------------------: |
| nodeSelected  | `TreeNode`  | 节点点击事件回调，值为选中的节点  |
| nodeDeleted  | `TreeNode`   | 节点删除事件回调，值为被删除的节点  |
| nodeToggled  | `TreeNode`   | 节点展开事件回调，值为展开节点  |
| nodeChecked  | `[]<TreeNode>`   | 节点选中事件回调，值为复选框操作的节点  |
| nodeEdited  | `TreeNode`    | 节点title编辑事件回调，值为被编辑的节点  |
| nodeOnDrop  | `{event, TreeNode}` | 节点onDrop事件回调(任意可拖动元素drop)，值为节点  |

### d-operable-tree 方法
| 参数                  | 参数          |   说明                                                |
| :-------------------: | :---------- | :--------------------------------------------------: |
| selectNode  | `(event, TreeNode)` | 选择节点 |
| toggleNode  | `(event, TreeNode)` | 展开节点 |
| appendTreeItems  | `([]<ITreeItem>, parentId)` | 添加树节点，参数和tree数组结构相同 |

### d-operable-tree 自定义模板

自定义额外图标相关参数如下

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| iconTemplatePosition  | `string`       | after-checkbox | 可选，支持 `before-checkbox`, `after-checkbox`  |
| #iconTemplate         | `TemplateRef`  | --            | 可选，支持自定义html                                   |

- 使用方法： 在`operatable-tree`内自定义模板`<ng-template>`并给模板标记为`#iconTemplate`, 如`<ng-template #iconTemplate>...</ng-template>`

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| #operatorTemplate     | `TemplateRef`  | --          | 可选，支持自定义html                 |
| #statusTemplate       | `TemplateRef`  | --          | 可选，支持自定义html,用于自定义状态等信息                 |

### TreeFactory API

组件由TreeFactory驱动，你可以从树组件实例上拿到TreeFactory实例并用下列方法或属性来实现精细操作:

- `addNode(ITreeNodeData)`: 添加单个节点
- `deleteNodeById(id)`: 删除具体节点
- `toggleNodeById(id)`: 开关某个具体节点
- `openNodesById(id)`: 根据 id 展开特定节点
- `closeNodesById(id)`: 根据 id 关闭特定节点
- `disabledNodesById(id)`: 根据 id 使某个节点的 checkbox 变为不可选
- `checkNodesById(id)`: 根据 id 选中某个节点
- `getCheckedNodes()`: 获取所有选中节点
- `getDisabledNodes()`: 获取所有不可选的节点
- `activeNodeById(id)`: 根据 id 使特定节点的状态变为 active
- `getChildrenById(id)`: 根据 id 获得特定节点的子节点
- `startLoading(id)`: 开始 loading
- `endLoading(id)`: 关闭 loading
- `getNodeById(id)`: 根据id获取节点信息
- `hideNodeById(id)`: 根据id选择隐藏或显示节点
- `searchTree(target: string, hideUnmatched: boolean)`: 搜索树（可设置过滤或高亮）
- `treeRoot`: 树的第一层节点，递归遍历children可以遍历整个树
