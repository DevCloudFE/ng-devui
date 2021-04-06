# How to use

Import into module:

```
import {TimePickerModule} from' ng-devui/time-picker';
```
In the page:
```
<input dTimePicker (focus)="timePicker3.toggle()" #timePicker3="timePicker" />
```

# TimePicker

## TimePicker Parameters

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :-----------------------: | :------------: | :--------: | :-------------------------------------------| :-----------------------------------------------------------------|
| disabled | `boolean` | false | Optional. Disable selection. | [Basic usage](demo#basic-usage) |
| timePickerWidth | `number` | -- | Optional, width of the drop-down list box | [Basic usage](demo#basic-usage) |
| autoOpen | `boolean` | false | Optional, indicating whether to expand the initialization directly. | [Basic usage](demo#basic-usage) |
| format | `string` | 'hh:mm:ss' | Optional. The input format is used to control the time format. | [Format](demo#format) |
| minTime | `string` | '00:00:00' | Optional. The minimum available time is limited. | [formatting](demo#format) |
| maxTime | `string` | '23:59:59' | Optional. The maximum time allowed is limited. | [formatting](demo#format) |
| customViewTemplate | `TemplateRef` | -- | Optional. Customize the time or content in the operation area. | [Input template](demo#custom) |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | ` ['rightDown','leftDown','rightUp','leftUp']` | The first position in the array is preferred for the direction array. | -- |
| showAnimation | `boolean` | true | optional. Whether to enable animation. |   | ✔ |

## TimePicker Event

| Event | Type | Description | Jump Demo |
| :----------------: | :--------------------: | :------------------------------------------: | :------------------------------------------------------------------|
| selectedTimeChange | `EventEmitter<string>` |: optional. When you confirm it, the data of the newly activated subitem is sent. | [Basic usage](demo#basic-usage) |

## Internal methods that can be invoked

For details, see(demo#custom).

```TypeScript
// The timeObj parameter is mandatory. Select the corresponding time to trigger selectedTimeChange.
chooseTime(timeObj)
// The value must contain time: a time character string. If type is not transferred, the value of time must be a complete time and the corresponding time is selected. If type is transferred, the value of time must be a single time and the corresponding event is selected.
// type is optional. It is a character string and can only be hh, mm, or ss. The value is case-insensitive and must be used together with time.
TimeObj {
time: string;
type? : string;
}
// The timeObj parameter is mandatory. Select the corresponding time to trigger confirmTimeChange.
confirmTime(timeObj)
// Clear the selected time.
clearAll()
// Hide the selector. The selector is not closed when chooseTime is called. You need to manually close the selector. The selector is directly closed when confirmTime is called.
hide()
```
