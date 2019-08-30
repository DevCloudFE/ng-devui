### TreeSelect 参数

| 参数 | 类型 | 默认 | 说明 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| placeholder        | string | ` `     | 占位字符串 |
| disabled       | boolean | `false`     | 禁止输入态 |
| expandTree    | boolean| `false`  | 是否自动展开树 |
| multiple    | boolean | `false`     | 多选开关 |
| treeNodeIdKey       | string | `id` | id键值名 |
| treeNodeChildrenKey    | string| `children`  | children子节点键值名 |
| disabledKey    | string| `disabled`  | disabled节点禁选键值名 |
| leafOnly | boolean | false | 仅叶节点可选开关 |
| delimiter    | string| `, ` | 选中结果分隔符（用于多选） |
| iconParentOpen | string| DefaultIcons.iconParentOpen | 树节点图标 |
| iconParentClose | string| DefaultIcons.iconParentClose | 树节点图标 |
| iconLeaf | string | DefaultIcons.iconLeaf | 树节点图标 |
| closeOnNodeSelected | boolean| `true` | 选中节点时关闭下拉框的开关（仅用于单选） |
| width | string| `auto` or `~px` or `~%` | 下拉框宽度 |
| searchable | boolean | `false` | 是否可搜索树 |
| onReady | function| (treeSelect: TreeSelectComponent) => {} | 当组件初始化完成时可调用的钩子函数 |
| appendTo | string| `undefined` | 将下拉框附着到输入值的DOM选择器节点中，值为空时下拉框在此组件内 |
| allowUnselect | boolean | `true` | 是否允许单选模式下反选已选中的项目 |
| iconTemplatePosition | string | `before-checkbox`or `after-checkbox` | 自定义template的位置 |
