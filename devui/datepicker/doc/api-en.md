# How to use

Import into module:

```ts
import { DatepickerModule } from 'ng-devui/datepicker';
```

In the page:

```
<input #datePicker1="datepicker" (focus)="datePicker1.toggle()" dDatepicker />
```

# dDatepicker

## dDatepicker parameter

|                           Parameter                            |                                          Type                                          |             Default             |                                               Description                                               | Jump to Demo                                           |Global Config| 
| :----------------: | :------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------: | :-----------------------------------------------------------------------------------------------------: | ------------------------------------------------------ |
|                            cssClass                            |                                        `string`                                        |               --                |                                      Optional, user-defined class                                       | [Basic usage](demo#datepicker-default)                 |
|                              mode                              |                             `'year' \| 'month' \| 'date'`                              |             'date'              |               Optional, Mode, Formatting based on the value of the `dateFormat` parameter               | [Set Mode](demo#datepicker-set-mode)                   |
| locale (This parameter is invalid after internationalization.) |                                        `string`                                        |             'zh-cn'             |                                           Optional, Time zone                                           |
|                            showTime                            |                                       `boolean`                                        |              false              |                    Optional, indicating whether to display hour, minute, and second.                    | [Format](demo#datepicker-format)                       |
|                            disabled                            |                                       `boolean`                                        |              false              |                                      Optional, Disable selection.                                       | [Basic usage](demo#datepicker-default)                 |
|                           direction                            |                                    `'up '\|'down'`                                     |             'down'              |                                     Optional, date pop-up direction                                     | [formatting](demo#datepicker-format)                   |
|                         dateConverter                          |                                       `function`                                       |      DefaultDateConverter       |                               Optional, formatting and parsing functions.                               |
|                           dateConfig                           |                                      `DateConfig`                                      | See the following description.  |                               Optional, It is a configuration parameter.                                | [Basic usage](demo#datepicker-default)                 |
|                           dateFormat                           | [ng cunstom date format](https://angular.cn/api/common/DatePipe#custom-format-options) |   'y/MM/dd'\| 'y/MM/dd HH:mm'   | Optional, Formatting is supported. The default value varies depending on whether showTime is specified. | [Format](demo#datepicker-format)                       |
|                            minDate                             |                                         `Date`                                         | new Date('01/01/1900 00:00:00') |                               Optional, The minimum date can be selected.                               | [Maximum and minimum dates](demo#datepicker-min-max)   |
|                            maxDate                             |                                         `Date`                                         | new Date('11/31/2099 23:59:59') |                       Optional, The maximum number of available dates is limited.                       | [Maximum and minimum dates](demo#datepicker-min-max)   |
|                            autoOpen                            |                                       `boolean`                                        |              false              |                      Optional, indicating whether to expand during initialization.                      | [Maximum and minimum dates](demo#datepicker-min-max)   |
|                       customViewTemplate                       |                                       `template`                                       |               --                |          Optional, Customize the date or content in the operation area. For details, see demo           | [Customized operation area](demo#custom-view-template) |
| showAnimation | `boolean` | true | optional. Whether to enable animation. |   | ✔ |

## dDatepicker Event

|       Event        |          Type          |                                       Description                                        | Jump to Demo                           |
| :----------------: | :--------------------: | :--------------------------------------------------------------------------------------: | -------------------------------------- |
| selectedDateChange | `EventEmitter<object>` | Optional, When a sub-item is switched, the data of the newly activated sub-item is sent. | [Basic usage](demo#datepicker-default) |

## appendToBody (dDatepicker additional instruction component)

When this command is used together with dDatepicker, it is attached to the body to prevent datepicker from being blocked in the scroll bar.

|       Parameter        |                        Type                         |                    Default                     |                              Description                              | Jump to Demo                                                                        |
| :--------------------: | :-------------------------------------------------: | :--------------------------------------------: | :-------------------------------------------------------------------: | ----------------------------------------------------------------------------------- |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | ` ['rightDown','leftDown','rightUp','leftUp']` | The first position in the array is preferred for the direction array. | [Attached to the body](/componentsen-us//datepicker/demo#datepicker-append-to-body) |

Note: After appendToBody is used, use `cdkScrollable` where the scroll bar exists.

```terminal
npm install @angular/cdk --save
```

```TypeScript
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
imports: [
//...
ScrollDispatchModule,
//...
]
})
```

```html
<div class="foo-bar-baz" cdkScrollable>
  <!-- Other contents of the scroll bar container-->
</div>
```

## ConnectedPosition Type Definition

Quoted from `@angular/cdk/overlay`

```TypeScript
export interface ConnectedPosition {
originX: 'start' | 'center' | 'end';
originY: 'top' | 'center' | 'bottom';

overlayX: 'start' | 'center' | 'end';
overlayY: 'top' | 'center' | 'bottom';

weight? : number;
offsetX? : number;
offsetY? : number;
panelClass? : string | string[];
}
```

## AppendToBodyDirection Type Definition

```typescript
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

Simplify several basic directions for the name.

| Simplified name |                                                                        Meaning                                                                         |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|    rightDown    | Display in the lower right direction relative to the aligned object, that is, the object is left aligned. (Note that the lower right is left aligned.) |
|     rightUp     |           Display in the upper right direction relative to the aligned object. That is, the object is left aligned and displayed at the top.           |
|     leftUp      |                     Display in the `up-left' direction relative to the aligned object, that is, right-aligned and displayed above.                     |
|    leftDown     |                    Display in the lower-left direction relative to the aligned object, that is, right-aligned and displayed below.                     |
|   centerDown    |          Display in the `center-bottom' direction relative to the aligned object. That is, the object is center-aligned and displayed below.           |
|    centerUp     |                 Display in the "center-up" direction relative to the aligned object, that is, display in the center-aligned direction.                 |

The naming of six directions is simplified. Other directions can be used by using the ConnectedPosition of angular/cdk/overlay.

appendToBodyDirections: The default display sequence is ['rightDown','leftDown','rightUp','leftUp'].
Try the first position, try the second position, and so on.

## DateConfig

```
interface DateConfig{
  timePicker: boolean, // default false
  dateConverter: any,
  min: number, // default 1900
  max: number, // default 2099
  format: {
    date: string, // default 'y/MM/dd'
    time: string  // default 'y/MM/dd HH:mm'
  }
}
```

# dDateRangePicker

## dDateRangePicker Parameter

|                           Parameter                            |                                          Type                                          |              Default              | Description                                                                          | Jump to Demo                                                                      |Global Config| 
| :----------------: | :------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-------------------------------: | :----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
|                            cssClass                            |                                        `string`                                        |                --                 | Optional, customized class                                                           | [Integration mode of the range date selector](demo#datepicker-range-basic)        |
| locale (This parameter is invalid after internationalization.) |                                        `string`                                        |              'zh-cn'              | Optional, Time zone                                                                  |
|                            showTime                            |                                       `boolean`                                        |               false               | Optional, indicating whether to display the hour, minute, and second.                | [Time selected by the date range selector](demo#datepicker-range-time)            |
|                            disabled                            |                                       `boolean`                                        |               false               | Optional, Disable selection.                                                         | [Forbidden input](demo#datepicker-range-disabled)                                 |
|                         dateConverter                          |                                       `function`                                       |       DefaultDateConverter        | Optional, date formatting and parsing functions.                                     |
|                           dateConfig                           |                                      `DateConfig`                                      |  See the following description.   | Optional, It is a configuration parameter.                                           | [Date range selector formatting](demo#datepicker-range-format)                    |
|                           dateFormat                           | [ng cunstom date format](https://angular.cn/api/common/DatePipe#custom-format-options) |   `'y/MM/dd'\|'y/MM/dd HH:mm'`    | Optional, Formatting the input data                                                  | [Date range selector formatting](demo#datepicker-range-format)                    |
|                            minDate                             |                                         `Date`                                         | `new Date('01/01/1900 00:00:00')` | Optional, The minimum available date is restricted.                                  | [The date range selector can be selected](demo#datepicker-range-restricted-range) |
|                            maxDate                             |                                         `Date`                                         | `new Date('11/31/2099 23:59:59')` | Optional, The maximum date can be selected is restricted.                            | [The date range selector can be selected](demo#datepicker-range-restricted-range) |
|                            splitter                            |                                        `string`                                        |              `' - '`              | Optional, separator of two days                                                      | [Date range selector formatting](demo#datepicker-range-format)                    |
|                         selectedRange                          |                                     `[Date, Date]`                                     |          `[null, null]`           | Optional, Date selected when                                                         | [Integration mode of the range date selector](demo#datepicker-range-basic)        |
|                       customViewTemplate                       |                                       `template`                                       |                --                 | Optional, Customize the date or content in the operation area. For details, see demo | [Customized operation area](demo#datepicker-clear-button)                         |
|                      hideOnRangeSelected                       |                                       `boolean`                                        |               false               | Optional, Whether to hide the panel after selecting a date                           | [Integration mode of the range date selector](demo#datepicker-range-basic)        |
| showAnimation | `boolean` | true | optional. Whether to enable animation. |   | ✔ |

## dDateRangePicker Event

|        Event        |          Type          | Description          | Jump to Demo |
| :-----------------: | :--------------------: | :------------------- | ------------ |
| selectedRangeChange | `EventEmitter<object>` | Date Change Callback |

## Use reason to restrict the reason export of the plug-in emit.

The datepicker passes the test.

```TypeScript
import {SelectDateChangeReason} from' ng-devui/datepicker';
```

dateRangePicker Pass

```TypeScript
import {SelectDateRangeChangeReason} from' ng-devui/datepicker';
```

To introduce the reason limit plug-in, how can be used freely, the clear button demo provides a way.

As shown in the following figure, reason is of the enumerated type. Therefore, the value of reason must be determined based on the value of reason returned by `selectedDateChange` (dateRangePicker is `selectedRangeChange`). The value of reason is available.

```TypeScript
enum SelectDateChangeReason {
date, // The return value is `reason:0`, which indicates the reason triggered when a date is selected.
time, // The return value is `reason:1`, which indicates the reason triggered by time modification during showTime.
button, // The return value is `reason:2`, indicating the reason when the built-in button (such as clear and OK) is triggered.
format, // The return value is `reason:3`, indicating that the reason triggered during formatting is changed.
custom // The return value is `reason:4`, which indicates the change-triggered reason transferred by the user.
}
```

SelectDateRangeChangeReason is used in the same way as above

# dTwoDatePicker

## dTwoDatePicker Parameter

|                           Parameter                            |                                          Type                                          |              Default              | Description                                                    | Jump to Demo                                                 |Global Config| 
| :----------------: | :------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-------------------------------: | :------------------------------------------------------------- | ------------------------------------------------------------ |
|                            cssClass                            |                                        `string`                                        |                --                 | Optional, custom class                                         | [Dual date selector](demo#two-date-picker-basic)             |
| locale (This parameter is invalid after internationalization.) |                                        `string`                                        |              'zh-cn'              | Optional, Time zone                                            |
|                            disabled                            |                                       `boolean`                                        |               false               | Optional, The selection is disabled.                           | [Dual date selector](demo#two-date-picker-basic)             |
|                         dateConverter                          |                                       `function`                                       |       DefaultDateConverter        | Optional, formatting and parsing functions.                    |
|                           dateConfig                           |                                      `DateConfig`                                      |  See the following description.   | Optional, It is a configuration parameter.                     | [Dual date selector formatting](demo#two-date-picker-format) |
|                           dateFormat                           | [ng cunstom date format](https://angular.cn/api/common/DatePipe#custom-format-options) |   `'y/MM/dd'\|'y/MM/dd HH:mm'`    | Optional, Formatting the input data                            | [Dual-date selector formatting](demo#two-date-picker-format) |
|                            minDate                             |                                         `Date`                                         | `new Date('01/01/1900 00:00:00')` | Optional, The minimum date can be selected.                    | [Dual-date selector formatting](demo#two-date-picker-format) |
|                            maxDate                             |                                         `Date`                                         | `new Date('11/31/2099 23:59:59')` | Optional, The maximum date that can be selected is restricted. | [Dual-date selector formatting](demo#two-date-picker-format) |
|                      hideOnRangeSelected                       |                                       `boolean`                                        |               true                | Optional, Whether to hide the panel after a date is selected.  | [Dual-date selector](demo#two-date-picker-basic)             |
| showAnimation | `boolean` | true | optional. Whether to enable animation. |   | ✔ |

## dTwoDatePicker Event

|        Event        |          Type          | Description          | Jump to Demo                                     |
| :-----------------: | :--------------------: | :------------------- | ------------------------------------------------ |
| selectedRangeChange | `EventEmitter<object>` | Date Change Callback | [Dual Date Selector](demo#two-date-picker-basic) |

## dTwoDatePickerStart Event

|    Event    |          Type          | Description          | Jump to Demo                                     |
| :---------: | :--------------------: | :------------------- | ------------------------------------------------ |
| selectStart | `EventEmitter<object>` | Date Change Callback | [Dual Date Selector](demo#two-date-picker-basic) |

## dTwoDatePickerEnd Event

|   Event   |          Type          | Description          | Jump to Demo                                     |
| :-------: | :--------------------: | :------------------- | ------------------------------------------------ |
| selectEnd | `EventEmitter<object>` | Date Change Callback | [Dual Date Selector](demo#two-date-picker-basic) |
