## dTreeSelect Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :------------------: | :-------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| placeholder | `string` | -- | Optional, placeholder string | [Basic usage](demo#basic-usage) |
| treeData | `Array` | -- | Mandatory, Source data to be displayed. | [Basic usage](demo#basic-usage) |
| disabled | `boolean` | false | Optional, The input state is forbidden. | [Basic usage](demo#basic-usage) |
| expandTree | `boolean` | false | Optional, indicating whether to expand the tree automatically. | [Basic usage](demo#basic-usage) |
| multiple | `boolean` | false | Optional, It indicates the multi-choice switch. | [Basic usage](demo#basic-usage) |
| treeNodeIdKey | `string` | 'id' | Optional, ID key name | [Custom key](demo#keys) |
| treeNodeChildrenKey | `string` | 'children' | Optional, child node key name | [Custom key](demo#keys) |
| treeNodeTitleKey | `string` | 'title' | Optional, title key name | [Custom key](demo#keys) |
| disabledKey | `string` | 'disabled' | Optional, The disabled node cannot be selected. | [Basic usage](demo#basic-usage) |
| leafOnly | `boolean` | false | Optional, This parameter is optional only for leaf nodes. | [Only leaf nodes can be selected](demo#leaf-only) |
| delimiter (deprecated) | `string` | `,` | Optional, Selected result separator (used for multiple selections) |
| iconParentOpen | `string` | DefaultIcons.iconParentOpen | Optional, Icon when a tree node is opened | [Expand and close the icon](demo#icon-parent) |
| iconParentClose | `string` | DefaultIcons.iconParentClose | Optional, Icon when a tree node is closed | [Expand and close the icon](demo#icon-parent) |
| iconLeaf | `string` | DefaultIcons.iconLeaf | Optional, node icon.  | [Custom key](demo#keys) |
| closeOnNodeSelected | `boolean` | true | Optional, When a node is selected, the drop-down list box is disabled (only for single selection). | [Custom key](demo#keys) |
| width | `'auto' \| '~px' \| '~%'` | -- | Optional, width of the drop-down list box | [Basic usage](demo#basic-usage) |
| searchable | `boolean` | false | Optional, indicating whether a tree can be searched. | [Simple search tree](demo#simple-search) |
| readyEvent | `function` | (treeSelect: TreeSelectComponent) => {} | Optional, Hook function that can be called when the component initialization is complete | [Hook called upon completion of initialization](demo#init-hooks) |
| appendTo | `string` | -- | Optional, Attach the drop-down list box to the DOM selector node of the input value. If the value is empty, the drop-down list box is in the component. | [Append To Element Capability](demo#append-to-element) |
| allowUnselect | `boolean` | true | Optional, Whether to allow deselecting selected items in single-select mode. | [Basic usage](demo#basic-usage) |
| iconTemplatePosition | `'before-checkbox' \|'after-checkbox'` | 'before-checkbox' | Optional, position of the customized template | [Customizing icons](demo#custom-icon) |
| allowClear | `boolean` | false | Optional, indicates whether to clear selected items by clicking the clear button in the text box in radio mode. The value of `allowUnselect` must be `true`. Otherwise, the experience consistency rule will be damaged. This parameter is valid only when the value of enableLabelization is false. | [Basic usage](demo#basic-usage) |
| enableLabelization | `boolean` | true | Optional, Indicates whether to enable the tagged display effect. This parameter is enabled by default when the public cloud visual function is used. | [Tag-based configuration](demo#labelization) |
| iconTemplateInput | `TemplateRef` | -- | Optional, Template of the customized icon | [Customizing icons](demo#custom-icon) |


## dTreeSelect Event

| Event | Type | Description | Jump to Demo |
| :------------: | :------------: | :------------------------------------: | --------- |
| (valueChanged) | `EventEmitter` | Changes triggered when a node is selected. The parameter is an array or an object. | [Basic usage](demo#basic-usage) |
| (nodeToggleEvent) | `EventEmitter` | Triggered when a node is expanded or collapsed. The parameter is the triggered node. | [Basic usage](demo#basic-usage) |
