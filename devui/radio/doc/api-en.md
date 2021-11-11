# How to use

Import into module：

```ts
import { RadioModule } from 'ng-devui';
```

In the page:

```html
<d-radio [name]="radio" [value]="value"></d-radio>
<d-radio-group [name]="radioGroup" [values]="[]"></d-radio-group>
```

# d-radio
## d-radio Parameters

|  Parameter   |              Type               | Default | Description                                                                                                                                  | Jump to Demo                                   |Global Config| 
| :----------------: | :----------: | :-----------------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
|     name     |            `string`             |   --    | Required. Single-option name                                                                                                                 | [Independent Radios](demo#basic-usage) |
|    value     |            `string`             |   --    | Required. Single-option value                                                                                                                | [Independent Radios](demo#basic-usage) |
|   disabled   |            `boolean`            |  false  | Optional. Whether to disable this option.                                                                                                    | [Disabled Radios](demo#disabled)                      |
| beforeChange | `Function \| Promise \| Observable` |   --    | Callback function before radio switching, which is optional. The return type is boolean. If false is returned, radio switching is prevented. | [Switch with Condition](demo#condition-change)   |

## d-radio Event

|     Event     |        Type         | Description                                                                                                    | Jump Demo                                      |
| :-----------: | :-----------------: | :------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| ngModelChange | `EventEmitter<string>` | Form event. This event is triggered when the value of a single option changes. The selected value is returned. | [Independent Radios](demo#basic-usage) |

# d-radio-group
## d-radio-group Parameters

|  Parameter   |              Type               | Default  | Description                                                                                                                                        | Jump to Demo                                                        |
| :----------: | :-----------------------------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
|     name     |            `string`             |    --    | Required. Single-option name (unique identifier of the radio)                                                                                      | [Vertical Arrangement](demo#vertical)                               |
|    values    |             `array`             |    --    | Required. Single-choice data group                                                                                                                 | [Vertical Arrangement](demo#vertical)                               |
|   disabled   |            `boolean`            | false | Optional. Whether to disable this radio-group                                                          | [Switch With Condition in A Radio Group](demo#condition-radio-group)                |
| ~~cssStyle~~ |       `'row' \| 'column'`        | 'column' | Optional. Set the horizontal or vertical arrangement（`deprecated，Use direction`）                                                                                               | [Horizontal Arrangement](demo#horizontal)                           |
|   direction  |       `'row' \| 'column'`        | 'column' | Optional. Set the horizontal or vertical arrangement                                                                                               | [Horizontal Arrangement](demo#horizontal)                           |
| beforeChange | `Function \| Promise \| Observable` |    --    | Callback function before radio-group switching. The return value is of the boolean type. If false is returned, radio-group switching is prevented. | [Switch With Condition in A Radio Group](demo#condition-radio-group) |

## d-radio-group Event

| Event  |        Type         | Description                                                                             | Jump to Demo                          |
| :----: | :-----------------: | :-------------------------------------------------------------------------------------- | ------------------------------------- |
| change | `EventEmitter<string \| object>` | Triggered when the value of a single option changes and the selected value is returned. | [Vertical Arrangement](demo#vertical) |
