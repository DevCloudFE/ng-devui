### d-radio-group parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----------: | :-----------------------------: | :------: | :-------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| name | `string` | -- | Required. Single-option name (unique identifier of the radio) | [Vertical Arrangement](demo#vertical) |
| values | `array` | -- | Required. Single-choice data group | [Vertical Arrangement](demo#vertical) |
| cssStyle | `row '\| 'column'` | 'column' | Optional. Set the horizontal or vertical arrangement | [Horizontal Arrangement](demo#horizontal) | |
| beforeChange | `Function\|Promise\|Observable` | -- |Callback function before radio-group switching. The return value is of the boolean type. If false is returned, radio-group switching is prevented. | [Conditional Switching of Radio Groups](demo#condition-radio-group) |

### d-radio-group event

| Event | Type | Description | Jump to Demo |
| :----: | :-----------------: | :------------------------------- | ------------------------------------------- |
| change | `EventEmitter<any>` | Triggered when the value of a single option changes and the selected value is returned. | [Vertical Arrangement](demo#vertical) |

### d-radio parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----------: | :-----------------------------: | :---: | :------------------------------------------------------------------------------ | ------------------------------------------------------- |
| name | `string` | -- | Required. Single-option name | [Independent Single Options](demo#basic-usage) |
| value | `string` | -- | Required. Single-option value | [Independent Single Options](demo#basic-usage) |
| disabled | `boolean` | false | Optional. Whether to disable this option. | [Disabled](demo#disabled) | |
| beforeChange | `Function\|Promise\|Observable` | -- |Callback function before radio switching, which is optional. The return type is boolean. If false is returned, radio switching is prevented. | [Condition Switching](demo#condition-change) |

### d-radio event

| Event | Type | Description | Jump Demo |
| :-----------: | :-----------------: | :----------------------------------------- | -------------------------------------------------- |
| ngModelChange | `EventEmitter<any>` | Form event. This event is triggered when the value of a single option changes. The selected value is returned. | [Independent Single Options](demo#basic-usage) |
