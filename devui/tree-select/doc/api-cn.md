## dTreeSelect 参数

|         参数         |                  类型                   |                  默认                   | 说明                                                                                                                      | 跳转 Demo                                            |
| :------------------: | :-------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
|     placeholder      |                `string`                 |                   --                    | 可选，占位字符串                                                                                                          | [基本用法](demo#basic-usage)       |
|       treeData       |                 `Array`                 |                   --                    | 必选，需要展示的源数据                                                                                                    | [基本用法](demo#basic-usage)       |
|       disabled       |                `boolean`                |                  false                  | 可选，禁止输入态                                                                                                          | [基本用法](demo#basic-usage)       |
|      expandTree      |                `boolean`                |                  false                  | 可选，是否自动展开树                                                                                                      | [基本用法](demo#basic-usage)       |
|       multiple       |                `boolean`                |                  false                  | 可选，多选开关                                                                                                            | [基本用法](demo#basic-usage)       |
|    treeNodeIdKey     |                `string`                 |                  'id'                   | 可选，id 键值名                                                                                                           | [设置key](demo#keys)       |
| treeNodeChildrenKey  |                `string`                 |               'children'                | 可选，children 子节点键值名                                                                                               | [设置key](demo#keys)       |
|  treeNodeTitleKey    |                `string`                 |               'title'                | 可选，title 键值名                                                                                               | [设置key](demo#keys)       |
|     disabledKey      |                `string`                 |               'disabled'                | 可选，disabled 节点禁选键值名                                                                                             | [基本用法](demo#basic-usage)       |
|       leafOnly       |                `boolean`                |                  false                  | 可选，仅叶节点可选开关                                                                                                    | [仅叶节点可选](demo#leaf-only)         |
|    delimiter(废弃)     |                `string`                 |                   `,`                   | 可选，选中结果分隔符（用于多选）                                                                                          |
|    iconParentOpen    |                `string`                 |       DefaultIcons.iconParentOpen       | 可选，树节点打开时图标                                                                                                    | [设置节点展开关闭图标](demo#icon-parent)       |
|   iconParentClose    |                `string`                 |      DefaultIcons.iconParentClose       | 可选，树节点关闭时图标                                                                                                    | [设置节点展开关闭图标](demo#icon-parent)       |
|       iconLeaf       |                `string`                 |          DefaultIcons.iconLeaf          | 可选，节点图标                                                                                                            | [设置key](demo#keys)       |
| closeOnNodeSelected  |                `boolean`                |                  true                   | 可选，选中节点时关闭下拉框的开关（仅用于单选）                                                                            | [设置key](demo#keys)       |
|        width         |        `'auto' \| '~px' \| '~%'`        |                   --                    | 可选，下拉框宽度                                                                                                          | [基本用法](demo#basic-usage)       |
|      searchable      |                `boolean`                |                  false                  | 可选，是否可搜索树                                                                                                        | [可简易搜索树](demo#simple-search)     |
|      readyEvent      |               `function`                | (treeSelect: TreeSelectComponent) => {} | 可选，当组件初始化完成时可调用的钩子函数                                                                                  | [初始化完成时调用的钩子](demo#init-hooks)        |
|       appendTo       |                `string`                 |                   --                    | 可选，将下拉框附着到输入值的 DOM 选择器节点中，值为空时下拉框在此组件内                                                   | [Append To Element 能力](demo#append-to-element) |
|    allowUnselect     |                `boolean`                |                  true                   | 可选，是否允许单选模式下反选已选中的项目                                                                                  | [基本用法](demo#basic-usage)       |
| iconTemplatePosition | `'before-checkbox' \| 'after-checkbox'` |            'before-checkbox'            | 可选，自定义 template 的位置                                                                                              | [自定义icon能力](demo#custom-icon)       |
|      allowClear      |                `boolean`                |                  false                  | 可选，是否允许单选模式下点击输入框上的清除按钮来清空已选中的项目。`allowUnselect`必须为`true`，否则将破坏体验一致性规则。`enableLabelization`为`false`时才会生效 | [基本用法](demo#basic-usage)       |
|  enableLabelization  |                `boolean`                |                  true                   | 可选，是否启用标签化展示效果，配合公有云视觉默认启用。 | [不使用标签化](demo#labelization)       |
|  iconTemplateInput   |               `TemplateRef`             |                   --                    | 可选，自定义 icon 的 template                                                                                               | [自定义icon能力](demo#custom-icon)       |


## dTreeSelect 事件

|      事件      |      类型      |                  说明                  | 跳转 Demo |
| :------------: | :------------: | :------------------------------------: | --------- |
| (valueChanged) | `EventEmitter` | 选择节点时触发的变化，参数为数组或对象 | [基本用法](demo#basic-usage)       |
| (nodeToggleEvent) | `EventEmitter` | 展开收起节点时触发，参数为触发的节点 | [基本用法](demo#basic-usage)       |
