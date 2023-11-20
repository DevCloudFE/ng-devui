# 如何使用

在 module 中引入：

```ts
import { TreeSelectModule } from 'ng-devui/tree-select';
```

在页面中使用：

```html
<d-tree-select [treeData]="data"></d-tree-select>
```

## d-tree-select

### d-tree-select 参数

| 参数                     | 类型                                                               | 默认                                    | 说明                                                                                                                                                             | 跳转 Demo                                                                                         | 全局配置项 |
| ------------------------ | ------------------------------------------------------------------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| treeData                 | `Array`                                                            | --                                      | 必选，需要展示的源数据                                                                                                                                           | [基本用法](demo#basic-usage)                                                                      |
| placeholder              | `string`                                                           | --                                      | 可选，占位字符串                                                                                                                                                 | [基本用法](demo#basic-usage)                                                                      |
| searchPlaceholder        | `string`                                                           | ''                                      | 可选，搜索功能输入框的 placeholder                                                                                                                               | [可简易搜索树](demo#simple-search)                                                                |
| disabled                 | `boolean`                                                          | false                                   | 可选，禁止输入态                                                                                                                                                 | [基本用法](demo#basic-usage)                                                                      |
| expandTree               | `boolean`                                                          | false                                   | 可选，是否自动展开树                                                                                                                                             | [基本用法](demo#basic-usage)                                                                      |
| multiple                 | `boolean`                                                          | false                                   | 可选，多选开关                                                                                                                                                   | [基本用法](demo#basic-usage)                                                                      |
| treeNodeIdKey            | `string`                                                           | 'id'                                    | 可选，id 键值名                                                                                                                                                  | [设置 key](demo#keys)                                                                             |
| treeNodeChildrenKey      | `string`                                                           | 'children'                              | 可选，children 子节点键值名                                                                                                                                      | [设置 key](demo#keys)                                                                             |
| treeNodeTitleKey         | `string`                                                           | 'title'                                 | 可选，title 键值名                                                                                                                                               | [设置 key](demo#keys)                                                                             |
| disabledKey              | `string`                                                           | 'disabled'                              | 可选，disabled 节点禁选键值名                                                                                                                                    | [基本用法](demo#basic-usage)                                                                      |
| leafOnly                 | `boolean`                                                          | false                                   | 可选，仅叶节点可选开关                                                                                                                                           | [仅叶节点可选](demo#leaf-only)                                                                    |
| delimiter(废弃)          | `string`                                                           | `,`                                     | 可选，选中结果分隔符（用于多选）                                                                                                                                 |
| iconParentOpen           | `string`                                                           | DefaultIcons.iconParentOpen             | 可选，树节点打开时图标                                                                                                                                           | [设置节点展开关闭图标](demo#icon-parent)                                                          |
| iconParentClose          | `string`                                                           | DefaultIcons.iconParentClose            | 可选，树节点关闭时图标                                                                                                                                           | [设置节点展开关闭图标](demo#icon-parent)                                                          |
| iconLeaf                 | `string`                                                           | DefaultIcons.iconLeaf                   | 可选，节点图标                                                                                                                                                   | [设置 key](demo#keys)                                                                             |
| closeOnNodeSelected      | `boolean`                                                          | true                                    | 可选，选中节点时关闭下拉框的开关（仅用于单选）                                                                                                                   | [设置 key](demo#keys)                                                                             |
| width                    | `'auto' \| '~px' \| '~%'`                                          | --                                      | 可选，下拉框宽度                                                                                                                                                 | [基本用法](demo#basic-usage)                                                                      |
| searchable               | `boolean`                                                          | false                                   | 可选，是否可搜索树                                                                                                                                               | [可简易搜索树](demo#simple-search)                                                                |
| readyEvent               | `function`                                                         | (treeSelect: TreeSelectComponent) => {} | 可选，当组件初始化完成时可调用的钩子函数                                                                                                                         | [初始化完成时调用的钩子](demo#init-hooks)                                                         |
| appendTo                 | `string`                                                           | --                                      | 可选，将下拉框附着到输入值的 DOM 选择器节点中，值为空时下拉框在此组件内                                                                                          | [Append To Element 能力](demo#append-to-element)                                                  |
| allowUnselect            | `boolean`                                                          | true                                    | 可选，是否允许单选模式下反选已选中的项目                                                                                                                         | [基本用法](demo#basic-usage)                                                                      |
| iconTemplatePosition     | `'before-checkbox' \| 'after-checkbox'`                            | 'before-checkbox'                       | 可选，自定义 template 的位置                                                                                                                                     | [自定义列表选项的 icon 及已选中选项](demo#custom-icon)                                            |
| allowClear               | `boolean`                                                          | false                                   | 可选，是否允许单选模式下点击输入框上的清除按钮来清空已选中的项目。`allowUnselect`必须为`true`，否则将破坏体验一致性规则。`enableLabelization`为`false`时才会生效 | [基本用法](demo#basic-usage)                                                                      |
| enableLabelization       | `boolean`                                                          | true                                    | 可选，是否启用标签化展示效果，配合公有云视觉默认启用。                                                                                                           | [不使用标签化](demo#labelization)                                                                 |
| iconTemplateInput        | `TemplateRef`                                                      | --                                      | 可选，自定义 icon 的 template                                                                                                                                    | [自定义列表选项的 icon 及已选中选项](demo#custom-icon)                                            |
| customItemTemplate       | `TemplateRef`                                                      | --                                      | 可选, 支持自定义已选中的选项显示内容定制                                                                                                                         | [自定义列表选项的 icon 及已选中选项](demo#custom-icon)                                            |
| customNoDataTemplate     | `TemplateRef`                                                      | --                                      | 可选, 支持无数据显示内容定制，可通过模板参数 isSearchResult 判断是否为搜索结果                                                                                   | [可简易搜索树](demo#simple-search)                                                                |
| customSearchFn           | `(treeData: TreeNode[], keyword: string) => boolean \| TreeNode[]` | --                                      | 可选, 自定义搜索函数，返回 true 或空数组时显示无搜索结果                                                                                                         | [可简易搜索树](demo#simple-search)                                                                |
| customViewTemplate       | `TemplateRef`                                                      | --                                      | 可选, 支持自定义区域显示内容定制                                                                                                                                 | [自定义区域](demo#custom-template)                                                                |
| customViewDirection      | `'bottom' \| 'right'\| 'left'`                                     | 'bottom'                                | 可选, customViewTemplate 所处的相对下拉列表的位置                                                                                                                | [自定义区域](demo#custom-template)                                                                |
| virtualScroll            | `boolean`                                                          | false                                   | 可选，是否开启虚拟滚动，常用于大数据量场景                                                                                                                       | [虚拟滚动](demo#virtual-scroll)                                                                   |
| virtualScrollHeightPx    | `number`                                                           | 300                                     | 可选，设置虚拟滚动内容区域的高度 ，单位为`px`                                                                                                                    | [虚拟滚动](demo#virtual-scroll)                                                                   |
| virtualScrollMinBufferPx | `number`                                                           | 600                                     | 可选,设置虚拟滚动时的最小 buffer 尺寸，单位为`px` ，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                       | [虚拟滚动](demo#virtual-scroll)                                                                   |
| virtualScrollMaxBufferPx | `number`                                                           | 900                                     | 可选, 设置虚拟滚动时的最大 buffer 尺寸，单位为`px` ，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                      | [虚拟滚动](demo#virtual-scroll)                                                                   |
| virtualScrollItemSize    | `number`                                                           | 30                                      | 可选, 设置虚拟滚动内元素的尺寸，单位为`px` ，参考https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items                              | [虚拟滚动](demo#virtual-scroll)                                                                   |
| showAnimation            | `boolean`                                                          | true                                    | 可选，是否开启动画                                                                                                                                               |                                                                                                   | ✔          |
| checkableRelation        | `'upward' \| 'downward' \| 'both' \| 'none'`                       | 'both'                                  | 可选，设置父子节点的 check 规则                                                                                                                                  | [树组件 checkableRelation](/components/zh-cn/tree/demo#check-control-tree) |
| showGlowStyle            | `boolean`                                                          | true                                    | 可选，是否显示悬浮发光效果                                                                                                                                       |

### d-tree-select 事件

| 事件            | 类型                                             | 说明                                               | 跳转 Demo                    |
| --------------- | ------------------------------------------------ | -------------------------------------------------- | ---------------------------- |
| valueChanged    | `EventEmitter<Array<`[`TreeNode`](#treenode)`>>` | 可选，选择节点时触发的变化，返回值为当前选中的节点 | [基本用法](demo#basic-usage) |
| toggleChange    | `EventEmitter<boolean>`                          | 可选，返回下拉打开关闭状态                         | [基本用法](demo#basic-usage) |
| nodeToggleEvent | `EventEmitter<`[`TreeNode`](#treenode)`>`        | 可选，展开收起节点时触发，返回值为触发的节点       | [基本用法](demo#basic-usage) |

## 接口 & 类型定义

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
