## Checkbox Usage Instructions

### d-checkbox parameters

| Parameter | Type | Default | Description | Jump to Demo |
| :-----------: | :-----------: | :---: | :----------------------------------: | ------------------------------------------------ |
| name | `string` | -- | Optional. Form domain name. The native name attribute is input. | [Basic usage](demo#checkbox-basic) |
| label | `string` | -- | Optional. Display labels. | [Basic usage](demo#checkbox-basic) |
| isShowTitle | `boolean` | true | Optional. Indicates whether to display the title prompt. The value of the `label` parameter is displayed by default. | [Basic usage](demo#checkbox-basic) |
| title | `string` | -- | Optional. Display the customized title prompt content. | [Basic usage](demo#checkbox-basic) |
| disabled | `boolean` | false | Optional. Indicating whether to disable it. | [Basic usage](demo#checkbox-basic) |
| labelTemplate Template | `TemplateRef` | -- | Optional. Custom template of the label | [Basic usage](demo#checkbox-basic) |
| halfchecked | `boolean` | false | Optional. Half-selected state | [Basic usage](demo#checkbox-basic) |
| color | `string` | -- | Optional. Check box color | [Basic usage](demo#checkbox-basic) |
| showAnimation | `boolean` | true | Optional. Controls whether to display animations. | [Basic usage](demo#checkbox-basic) |
| beforeChange | `Function\|Promise\|Observable` | -- |Callback function before checkbox switching, which returns the boolean type. If false is returned, checkbox switching is prevented. | [Checkbox Callback Switching](demo#condition-change) |

### d-checkbox event

| Event | Type | Description | Jump to Demo |
| :----: | :---------------------: | :--------------------------------------: | ------------------------------------------------ |
| change | `EventEmitter<boolean>` | Event that is raised when the value of the check box changes. The value is the current state. | [Basic usage](demo#checkbox-basic) |

### d-checkbox-group parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-----------: | :---------------: | :------: | :------------------------------------------------: | -------------------------------------------- |
| name | `string` | -- | Optional. Form domain name. The native name attribute is input. | [Using CheckBoxGroup](demo#tabs-group) |
| direction | `row '\|'column'` | 'column' | Optional. Display direction | [Using CheckBoxGroup](demo#tabs-group) |
| itemWidth | `number` | -- | Optional. Indicating the width of each checkbox (used for aligning items with different lengths when there are multiple lines of checkboxes). | [Using CheckBoxGroup](demo#tabs-group) |
| isShowTitle | `boolean` | true | Optional. Whether to display the title prompt | [Using CheckBoxGroup](demo#tabs-group) |
| options | `Array<any>` | [] | Optional. Check box option array | [Using CheckBoxGroup](demo#tabs-group) |
| filterKey | `string` | -- | Optional. When options is an object array, this parameter identifies the key value of the unique ID of the option. | [Using CheckBoxGroup](demo#tabs-group) |
| labelTemplate Template | `TemplateRef` | -- | Optional. Custom template of the label | [Using CheckBoxGroup](demo#tabs-group) |
| halfchecked | `boolean` | false | Optional. Half-selected | |
| color | `string` | -- | Optional. Check box color | [Using CheckBoxGroup](demo#tabs-group) |
| showAnimation | `boolean` | true | Optional. Controls whether to display animations. | [Using CheckBoxGroup](demo#tabs-group) |
| beforeChange | `Function\|Promise\|Observable` | -- |Callback function before checkbox switching, which returns the boolean type. If false is returned, checkbox-group switching is prevented. | [Checkbox Callback Switching](demo#condition-change) |
| disabled | `boolean` | false | Optional. Whether to disable the entire button group. | [Using CheckBoxGroup](demo#tabs-group) |

### d-checkbox-group event

| Event | Type | Description | Jump to Demo |
| :----: | :---------------------: | :-----------------: | -------------------------------------------- |
| change | `EventEmitter<boolean>` | Checkbox value change event | [Using CheckBoxGroup](demo#tabs-group) |
