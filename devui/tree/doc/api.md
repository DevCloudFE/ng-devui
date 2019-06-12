**Tree**

本组件为`@avenueui/core`扩展组件，如需使用，请参考如下引入方法注册在Module上

```javascript
import { NgModule } from '@angular/core';

import { TreeModule } from '@avenueui/core/add-ons/tree-new';

@NgModule({
  imports: [TreeModule],
  // other Configuration
})
export class TreeModuleDemoModule {
}

```

#### APIDoc

- [TreeModule](/apidoc/modules/TreeModule.html)
- [TreeComponent](/apidoc/components/TreeComponent.html)
- [TreeNodesComponent](/apidoc/components/TreeNodesComponent.html)
- [OperableTreeComponent](/apidoc/components/OperableTreeComponent.html)

##### **注意**

* `treeNodeIdKey`: 用来作为节点的唯一表示，默认情况下取 `id`，如果不需要异步加载节点，可以不用传入，组件会自动分配一个唯一标识
* `treeNodeChildrenKey`: 用来表示传入数据子节点的 children 名称，默认取 `items`
* `checkboxDisabledKey`: 用来标识子节点是否可选，默认取 `disabled`作为标识
* `checkboxInput`: 用来给 checkbox 设置相关属性，其默认值为 `{ color: 'F38826' }`, disableType属性用来统一所有子节点的disableType。


##### **API**

-

组件提供一个 TreeFactory，你可以从 TreeFactory 的实例上拿到下列方法来进行操作:

- `mapTreeItems`: 添加新的数据到某个特定节点上
- `addNode`: 添加单个节点
- `deleteNodeById`: 删除具体节点
- `toggleNodeById`: 开关某个具体节点
- `openNodesById`: 根据 id 展开特定节点
- `closeNodesById`: 根据 id 关闭特定节点
- `disabledNodesById`: 根据 id 使某个节点的 checkbox 变为不可选
- `checkNodesById`: 根据 id 选中某个节点
- `getCheckedNodes`: 获取所有选中节点
- `getDisabledNodes`: 获取所有不可选的节点
- `activeNodeById`: 根据 id 使特定节点的状态变为 active
- `getChildrenById`: 根据 id 获得特定节点的子节点
- `startLoading`: 开始 loading
- `endLoading`: 关闭 loading
- `isMatchNode`: 输入是否匹配节点中的数据




#### **OperableTree**  

##### 鼠标滑过或者选中支持增删改按钮操作

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| addable  | boolean       | false| 可选，是否显示新增子节点按钮  |
| editable  | boolean       | false| 可选，是否显示编辑子节点按钮  |
| deletable  | boolean       | false| 可选，是否显示删除子节点按钮  |
| nodeSelected  | function       | (none)| 可选，节点点击事件回调  |
| nodeDeleted  | function       | (none)| 可选，节点删除事件回调  |
| nodeToggled  | function       | (none)| 可选，节点展开事件回调  |
| nodeChecked  | function       | (none)| 可选，节点选中事件回调  |
| nodeEdited  | function       | (none)| 可选，节点title编辑事件回调  |
| nodeOnDrop  | function       | (none)| 可选，节点onDrop事件回调(任意可拖动元素drop)  |
| beforeAddNode  | Promise       | (none)| 可选，新增子节点前回调(参数为当前节点)  |
| beforeDeleteNode  | Promise       | (none)| 可选，删除节点前回调(参数为当前节点)  |
| draggable  | boolean       | false| 可选，树节点是否支持drag、drop操作  |
| beforeNodeDrop  | Promise       | (none)| 可选，子节点内部拖动drop前回调  |
| editValueChange  | function       | {value: xxx, callback: func} |可选，支持节点title编辑校验，使用时校验不通过callback({errTips: 'xxxxxx'}),通过callback()  |

#####自定义模板
- 自定义额外图标相关参数如下

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| iconTemplatePosition  | string       | 'after-checkbox'| 可选，支持[[ 'before-checkbox','after-checkbox' ]]  |
| #iconTemplate         | 内嵌的模板    | (none)          | 可选，支持自定义html                                   |

- 使用方法： 在operatable-tree内自定义模板`<ng-template>`并给模板标记为`#iconTemplate`, 如`<ng-template #iconTemplate>...</ng-template>`

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| #operatorTemplate         | 内嵌的模板    | (none)          | 可选，支持自定义html                 |
| #statusTemplate         | 内嵌的模板    | (none)          | 可选，支持自定义html,用于自定义状态等信息                 |

- 在operatable-tree内自定义模板`<ng-template>`并给模板标记为`#operatorTemplate`, 如`<ng-template #operatorTemplate>...</ng-template>`
- 在operatable-tree内自定义模板`<ng-template>`并给模板标记为`#statusTemplate`, 如`<ng-template #statusTemplate let-node="node">...</ng-template>`
