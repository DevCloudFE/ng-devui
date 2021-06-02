# How to use

Import into module:

```ts
import { ButtonModule } from 'ng-devui/button';
```

In the page:

```xml
<d-button></d-button>
```
# d-button
## d-button Parameter

|   Parameter    |   Type |  Default |      Description          |  Jump to Demo |Global Config| 
| :----------------: | :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | |
|     id      |             `string`            |   --   | Optional. ID of the button. | [Primary Buttons](demo#button-primary)|
|     type    |  [`IButtonType`](#ibuttontype)  |  'button' | Optional. The type is `'button' \| 'submit' \| 'reset'` |[Danger Buttons](demo#button-danger)   |
|   bsStyle   | [`IButtonStyle`](#ibuttonstyle) |  'primary' | Optional. The style is `'primary' \| 'common' \| 'text' \| 'text-dark' \| 'danger'` | [Common Buttons](demo#button-common) |
|   bsSize    |  [`IButtonSize`](#ibuttonsize)   |   'md'  | Optional. The size is `'lg' \| 'md' \| 'sm' \| 'xs'` | [Button Size](demo#button-size) |
|  bsPosition |[`IButtonPosition`](#ibuttonposition) |'default'| Optional. The button position is `'default' \| 'left' \| 'right'` | [Left & Right Buttons](demo#button-left-right) |
|  bordered   |   `boolean`  |   false   | Optional. Indicating whether a border exists |  [Auto-focus Buttons](demo#button-auto-focus)|
|    icon     |   `string`   |   --   | Optional. Customized button icon | [Icon Buttons](demo#button-icon) |
| showLoading |   `boolean`  |   false   | Optional. Indicating whether to display the loading prompt | [Loading Buttons](demo#button-loading) |
|    width    |   `string`   |     --    | Optional. Button width |[Combinations of Primary & Common Buttons](demo#button-primary-and-common) |
|  disabled   |   `boolean`  |   false   | Optional. Indicating whether to disable the button | [Primary Buttons](demo#button-primary) |
|  autofocus  |   `boolean`  |   false   | Optional. Indicating whether to automatically obtain the focus during button loading | [Auto-focus Buttons](demo#button-auto-focus) |

## d-button Event

| Parameter | Type | Description | Jump to Demo |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| btnClick | `EventEmitter<MouseEvent>` | Optional. Solve the click event is triggered when button is disabled. After the mouse is clicked, the mouse event object is returned | [Loading Buttons](demo#button-loading)|

# d-button-group

## d-button-group parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | |
| size | [`IButtonGroupSize`](#ibuttongroupsize) | 'md' | Optional. The size is `'lg' \| 'md' \| 'sm' \| 'xs'` | [Button Group](demo#button-groups) |

# Interface & Type Definition
### IButtonType

The default value is 'button', indicating the button type.

```ts
export type IButtonType = 'button' | 'submit' | 'reset';
```

### IButtonStyle

The default value is 'primary', indicating the button style.

```ts
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
```

### IButtonPosition

The default value is 'default', indicating the button position.

```ts
export type IButtonPosition = 'left' | 'right' | 'default';
```

### IButtonSize
The default value is 'md', indicating the button size.

```ts
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';
```

### IButtonGroupSize
The default value is 'md', indicating the button-group size.

```ts
export type IButtonGroupSize = 'lg' | 'md' | 'sm' | 'xs';
```
