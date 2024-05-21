# How to use
Import into module:

```ts
import { DatepickerProModule } from' ng-devui/datepicker-pro';
```

In the page:

```
<d-datepicker-pro [(ngModel)]="value1"></d-datepicker-pro>
```

# d-datepicker-pro

## d-datepicker-pro Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| cssClass | `string` | -- | Optional, custom class | |
| format | [ng Customized date format] (https://angular.cn/api/common/DatePipe#custom-format-options) | 'y-MM-dd'\| 'y-MM-dd HH:mm:ss' | Optional. The format is transferred, the default value varies depending on whether showTime is set. | [Basic usage](demo#basic-usage) |
| showTime | `boolean` | false | Optional, indicating whether to display hour, minute, and second | [display time](demo#show-time) |
| disabled | `boolean` | false | Optional, indicating whether the selector is disabled | [Basic usage](demo#basic-usage) |
| autoOpen | `boolean` | false | Optional, indicating whether to expand the initialization directly. | [Display time](demo#show-time) |
| calenderRange | `number[]` | [1970, 2099] |: specifies the year range of the calendar. This parameter is optional. | [Basic usage] (demo#basic-usage) |
| minDate | `Date` | new Date(calenderRange[0]) | (optional) Restricts the minimum available date. | [Basic usage](demo#basic-usage) |
| maxDate | `Date` | new Date(calenderRange[1]) | (optional) Restricts the maximum date that can be selected. | [Basic usage](demo#basic-usage) |
| showAnimation | `boolean` | true | (optional) Whether to enable animation | |
| width | `string` | - | Width of the selector. | |
| allowClear | `boolean` | true | Whether to allow the user to clear the date, that is, display the clear button. | |
| placeholder | `string` | - |  host input's placeholder | |
| mode | `'year' \| 'month' \| 'date'` | 'date' | panel mode | [year and month selector](demo#monthYear)|
| markedDateList | `Date[]` | [] | Marked date list, which can be used with the MarkDateInfoTemplate template to display prompt information | [mark information](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] | Marking Range Date List|[Marking Information](demo#date-marked)|
| showGlowStyle | `boolean` | true | (Optional) Indicates whether to display the floating glow effect.|

## d-datepicker-pro event

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
Triggered when the | dropdownToggle | `EventEmitter<boolean>` | -- | drop-down panel is enabled or disabled. The options are true or false. | |
| confirmEvent | `EventEmitter<Date>` | -- | Triggered after the OK button is clicked. The current Date value is returned. | |

# d-range-datepicker-pro

## d-range-datepicker-pro Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| cssClass | `string` | -- | Optional, custom class | |
| format | [ng Customized date format] (https://angular.cn/api/common/DatePipe#custom-format-options) | 'y-MM-dd'\| 'y-MM-dd HH:mm:ss' | Optional. The format is transferred, the default value varies depending on whether showTime is set. | [Basic usage](demo#basic-usage) |
| showTime | `boolean` | false | Optional, indicating whether to display hour, minute, and second | [range selector](demo#range-picker) |
| disabled | `boolean` | false | Optional, indicating whether the selector is disabled | [Basic usage](demo#basic-usage) |
| autoOpen | `boolean` | false | Optional, indicating whether to expand the initialization directly. | [Display time](demo#show-time) |
| calenderRange | `number[]` | [1970, 2099] |: specifies the year range of the calendar. This parameter is optional. | [Basic usage] (demo#basic-usage) |
| minDate | `Date` | new Date(calenderRange[0]) | (optional) Restricts the minimum available date. | [Basic usage](demo#basic-usage) |
| maxDate | `Date` | new Date(calenderRange[1]) | (optional) Restricts the maximum date that can be selected. | [Basic usage](demo#basic-usage) |
| splitter | `string` | `-` | The separator between dates can be set. | |
| showAnimation | `boolean` | true | (optional) Whether to enable animation | |
| width | `string` | - | Width of the range selector. | |
| placeholder | `string[]` | - |  host input's placeholder,need start and end string | |
| mode | `year' \| 'month' \| 'date'\| 'week'`| 'date' | panel mode | [range selector](demo#range-picker)|
| startIndexOfWeek | `number` | 0 |: start time of a week. 0 indicates Sunday and 6 indicates Saturday, which is the same as Date.getDay().|[range selector](demo#range-picker)|
| markedDateList | `Date[]` | [] | Marked date list, which can be used with the MarkDateInfoTemplate template to display prompt information | [mark information](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] | Marking Range Date List|[Marking Information](demo#date-marked)|

## d-range-datepicker-pro event

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| dropdownToggle | `EventEmitter<boolean>` | -- | Triggered when the drop-down panel is enabled or disabled. The options are true or false. | |
| confirmEvent | `EventEmitter<Date[]>` | -- | Triggered after the OK button is clicked. The current Date range is returned. | |

# d-datepicker-static-panel

## d-datepicker-static-panel parameters
| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| isRangeType | `boolean` | false |: indicates whether to display the scope mode. This parameter is optional. | |
| mode | `'year' \| 'month' \| 'date' \| 'week'` | 'date' | (Optional) Display type | | |
| showTime | `boolean` | false | Optional. Indicates whether the time can be configured in date mode. | |
| startIndexOfWeek | `number` | 0 |: start time of a week. The value 0 indicates Sunday and 6 indicates Saturday. The value is the same as that of Date.getDay(). | |
| activeRangeType | `start' \| 'end'`|'start' | Optional. Activation start or end date in range mode | |
| showRangeHeader | `boolean` | 'true' | Indicates whether to display the header to display the input of range switching in range mode. | |
| Splitter | `string` | '-' | Optional, date separator in range mode | |
| markedDateList | `Date[]` | [] | Marked date list, which can be used with the MarkDateInfoTemplate template to display prompt information | [mark information](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] | Marking Range Date List|[Marking Information](demo#date-marked)|
| minDate | `Date` | - | (optional) Restricts the minimum available date. | [Basic usage](demo#basic-usage) |
| maxDate | `Date` | - | (optional) Restricts the maximum date that can be selected. | [Basic usage](demo#basic-usage) |

## d-datepicker-static-panel event

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-------: | :-------: | :-------: | :-------: |
| confirmEvent | `EventEmitter<Date[]>` | -- | Triggered after the OK button is clicked. The current Date range is returned. | |
| cancelEvent | `EventEmitter<void>` | -- | Triggered after the Cancel button is clicked | |

# ngModel

In single-date mode, ngModel is bound as `Date`.

ngModel is bound as `Date[]` in range mode.

ngModelChange can listen to the change.

# Customize a template.
| Parameter | Type | Default Value | Description | Jump to Demo |
| :------------------: | :----------------: | :---------------: | :----------------------: | :----------: |
| customTemplate | `TemplateRef<any>` | -- |: optional. Customize a template in the right pane. | [Input template](demo#template) |
| footerTemplate | `TemplateRef<any>` | -- |: optional. Footer customized template | [Input template](demo#template) |
| hostTemplate | `TemplateRef<any>` | -- | Optional. Custom template of the datepicker host | [Incoming template] (demo#host-template) |
| markDateInfoTemplate | `TemplateRef<any>` | -- | Optional, Template for marking date prompt information. The information is displayed in popover format.|[mark information](demo#date-marked)|
