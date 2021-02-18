# How to use

Import into module:

```ts
import { TreeSelectModule } from 'ng-devui/treeSelect';
```

In the page:

```html
<d-tree-select [treeData]="data"></d-tree-select>
```
# d-tree-select 

## d-tree-select Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :------------------: | :-------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| placeholder | `string` | -- | Optional. placeholder string | [Basic usage](demo#basic-usage) |
| treeData | `Array` | -- | Required. Source data to be displayed. | [Basic usage](demo#basic-usage) |
| disabled | `boolean` | false | Optional. The input state is forbidden. | [Basic usage](demo#basic-usage) |
| expandTree | `boolean` | false | Optional. indicating whether to expand the tree automatically. | [Basic usage](demo#basic-usage) |
| multiple | `boolean` | false | Optional. It indicates the multi-choice switch. | [Basic usage](demo#basic-usage) |
| treeNodeIdKey | `string` | 'id' | Optional. ID key name | [Custom key](demo#keys) |
| treeNodeChildrenKey | `string` | 'children' | Optional. child node key name | [Custom key](demo#keys) |
| treeNodeTitleKey | `string` | 'title' | Optional. title key name | [Custom key](demo#keys) |
| disabledKey | `string` | 'disabled' | Optional. The disabled node cannot be selected. | [Basic usage](demo#basic-usage) |
| leafOnly | `boolean` | false | Optional. This parameter is optional only for leaf nodes. | [Only leaf nodes can be selected](demo#leaf-only) |
| delimiter (deprecated) | `string` | `,` | Optional. Selected result separator (used for multiple selections) |
| iconParentOpen | `string` | DefaultIcons.iconParentOpen | Optional. Icon when a tree node is opened | [Expand and close the icon](demo#icon-parent) |
| iconParentClose | `string` | DefaultIcons.iconParentClose | Optional. Icon when a tree node is closed | [Expand and close the icon](demo#icon-parent) |
| iconLeaf | `string` | DefaultIcons.iconLeaf | Optional. node icon.  | [Custom key](demo#keys) |
| closeOnNodeSelected | `boolean` | true | Optional. When a node is selected, the drop-down list box is disabled (only for single selection). | [Custom key](demo#keys) |
| width | `'auto' \| '~px' \| '~%'` | -- | Optional. width of the drop-down list box | [Basic usage](demo#basic-usage) |
| searchable | `boolean` | false | Optional. indicating whether a tree can be searched. | [Simple search tree](demo#simple-search) |
| readyEvent | `function` | (treeSelect: TreeSelectComponent) => {} | Optional. Hook function that can be called when the component initialization is complete | [Hook called upon completion of initialization](demo#init-hooks) |
| appendTo | `string` | -- | Optional. Attach the drop-down list box to the DOM selector node of the input value. If the value is empty, the drop-down list box is in the component. | [Append To Element Capability](demo#append-to-element) |
| allowUnselect | `boolean` | true | Optional. Whether to allow deselecting selected items in single-select mode. | [Basic usage](demo#basic-usage) |
| iconTemplatePosition | `'before-checkbox' \|'after-checkbox'` | 'before-checkbox' | Optional. position of the customized template | [Customizing icons](demo#custom-icon) |
| allowClear | `boolean` | false | Optional. indicates whether to clear selected items by clicking the clear button in the text box in radio mode. The value of `allowUnselect` must be `true`. Otherwise, the experience consistency rule will be damaged. This parameter is valid only when the value of enableLabelization is false. | [Basic usage](demo#basic-usage) |
| enableLabelization | `boolean` | true | Optional. Indicates whether to enable the tagged display effect. This parameter is enabled by default when the public cloud visual function is used. | [Tag-based configuration](demo#labelization) |
| iconTemplateInput | `TemplateRef` | -- | Optional. Template of the customized icon | [Customizing icons](demo#custom-icon) |
| customViewTemplate  | `TemplateRef` | -- | Optional. The display content of a customized region can be customized. | [Custom Area](demo#custom-template) |
| customViewDirection | `'bottom' \| 'right'\| 'left'` | 'bottom' | Optional, relative position of the customViewTemplate drop-down list box | [Custom Area](demo#custom-template) |
| virtualScroll | `boolean` | false | Optional. Specifies whether to enable virtual scrolling. This parameter is usually used in scenarios with a large amount of data. | [Virtual scrolling] (demo#virtual-scroll) |
| virtualScrollHeightPx | `number` | 300| Optional. Set the height of the virtual scrolling content area(`px`). | [Virtual scroll](demo#virtual-scroll) |
| virtualScrollMinBufferPx | `number` | 600 | Optional. Set the minimum buffer size during virtual scrolling(`px`). For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Virtual Scroll](demo#virtual-scroll) |
| virtualScrollMaxBufferPx | `number` | 900 | Optional. Set the maximum buffer size during virtual scrolling.(`px`) For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Virtual Scroll](demo#virtual-scroll) |
| virtualScrollItemSize | `number` | 30 | Optional. Set the element size in the virtual scrolling(`px`). For details, see https://material.angular.io/cdk/scrolling/overview#scrolling-over-fixed-size-items | [Virtual Scroll](demo#virtual-scroll) |

## d-tree-select Event

| Event | Type | Description | Jump to Demo |
| :------------: | :------------: | :------------------------------------: | --------- |
| valueChanged | `EventEmitter<Array<`[`TreeNode`](#treenode)`>>` | Optional.Changes triggered when a node is selected. The returned value is the currently selected node. | [Basic usage](demo#basic-usage) |
| nodeToggleEvent | `EventEmitter<`[`TreeNode`](#treenode)`>` | Optional.Triggered when a node is expanded or collapsed. The parameter is the triggered node. | [Basic usage](demo#basic-usage) |


# Interface & Type Definition
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