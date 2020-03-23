## TreeSelect 使用说明

### dTreeSelect 参数

| 参数 | 类型 | 默认 | 说明 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| placeholder        | `string` | --     | 可选，占位字符串 |
| disabled       | `boolean` | false     | 可选，禁止输入态 |
| expandTree    | `boolean`| false  | 可选，是否自动展开树 |
| multiple    | `boolean` | false     | 可选，多选开关 |
| treeNodeIdKey       | `string` | 'id' | 可选，id键值名 |
| treeNodeChildrenKey    | `string` | 'children'  | 可选，children子节点键值名 |
| disabledKey    | `string` | 'disabled'  | 可选，disabled节点禁选键值名 |
| leafOnly | `boolean` | false | 可选，仅叶节点可选开关 |
| delimiter    | `string` | `, ` | 可选，选中结果分隔符（用于多选） |
| iconParentOpen | `string` | DefaultIcons.iconParentOpen | 可选，树节点打开时图标 |
| iconParentClose | `string` | DefaultIcons.iconParentClose | 可选，树节点关闭时图标 |
| iconLeaf | `string` | DefaultIcons.iconLeaf | 可选，节点图标 |
| closeOnNodeSelected | `boolean` | true | 可选，选中节点时关闭下拉框的开关（仅用于单选） |
| width | `'auto' \| '~px' \| '~%'` | -- | 可选，下拉框宽度 |
| searchable | `boolean` | false | 可选，是否可搜索树 |
| readyEvent | `function` | (treeSelect: TreeSelectComponent) => {} | 可选，当组件初始化完成时可调用的钩子函数 |
| appendTo | `string` | -- | 可选，将下拉框附着到输入值的DOM选择器节点中，值为空时下拉框在此组件内 |
| allowUnselect | `boolean` | true | 可选，是否允许单选模式下反选已选中的项目 |
| iconTemplatePosition | `'before-checkbox' \| 'after-checkbox'` | 'before-checkbox' | 可选，自定义template的位置 |
| allowClear | `boolean` | false | 可选，是否允许单选模式下点击输入框上的清除按钮来清空已选中的项目。`allowUnselect`必须为`true`，否则将破坏体验一致性规则。 |

### dTreeSelect 事件

| 事件                  | 类型                                        |    说明                                          |
| :-------------------: | :----------------------------------------: | :----------------------------------------------: |
| (valueChanged)    | `EventEmitter`                        | 选择节点时触发的变化，参数为数组或对象    |
