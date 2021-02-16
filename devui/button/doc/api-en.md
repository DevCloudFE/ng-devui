### d-button parameter

|   Parameter    |   Type |  Default |      Description          |  Jump to Demo |
| :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | |
| id      | `string` | -- | Optional. button ID | |
| type    | `IButtonType` | button | Optional. The type is 'button' \|'submit' \|'reset' |
| bsStyle | `IButtonStyle` | primary | Optional. The style is 'primary '\|'common '\|'text '\|'text-dark' \|'danger' | [Primary Buttons](demo#button-primary) |
| bsSize | `IButtonSize` | 'md' | Optional. The size is 'lg'\|'md'\|'sm'\|'xs' | [Button Size](demo#button-size) |
| bsPosition |`IButtonPosition` |'default '| Optional. The button position is 'default'\|'left'\|'right' | [Left & Right Buttons](demo#button-left-right) |
| Bordered | `boolean` | false | Optional. Indicating whether a border exists | |
| icon | `string` | -- | Optional. Customized button icon | [Icon Buttons](demo#button-icon) |
| showLoading | `boolean` | false | Optional. Indicating whether to display the loading prompt | [Loading Buttons](demo#button-loading) |
| width | `number` | -- | Optional. Button width | | |
| disabled | `boolean` | false | Optional. Indicating whether to disable the button | [Primary Buttons](demo#button-primary) |
| autofocus | `boolean` | false | Optional. Indicating whether to automatically obtain the focus during button loading | [Auto-focus Buttons](demo#button-auto-focus) |

### D-button Event

| Parameter | Type | Description | Jump to Demo |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| btnClick | `EventEmitter<any>` | Optional. When the Internet Explorer is disabled, click is triggered. After the mouse is clicked, the mouse event object is returned |

### d-button-group parameters

| Parameter | Type | Default | Description | Jump to Demo |
| :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | |
| size | `IButtonGroupSize` | 'md' | Optional. The size is'lg'\|'md'\|'sm' \|'xs' | [Button Group](demo#button-groups) | |
