# 如何使用

在 module 中引入：

```ts
import { DatepickerModule } from 'ng-devui/datepicker';
```

在页面中使用：

```
<input #datePicker1="datepicker" (focus)="datePicker1.toggle()" dDatepicker />
```

# dDatepicker

## dDatepicker 参数

|           参数           |                                       类型                                        |              默认               |                          说明                           | 跳转 Demo                                        |全局配置项| 
| :----------------: | :----------------------: | :-------------------------------------------------------------------------------: | :-----------------------------: | :-----------------------------------------------------: | ------------------------------------------------ |
|         cssClass         |                                     `string`                                      |               --                |                   可选，自定义 class                    | [基本用法](demo#datepicker-default)              |
|           mode           |                           `'year' \| 'month' \| 'date'`                           |             'date'              |    可选，类型，根据 `dateFormat`参数设置不同的格式化    | [设置日期选择器的类型](demo#datepicker-set-mode) |
| locale(国际化后暂无作用) |                                     `string`                                      |             'zh-cn'             |                       可选，时区                        |
|         showTime         |                                     `boolean`                                     |              false              |                  可选，是否显示时分秒                   | [格式化](demo#datepicker-format)                 |
|         disabled         |                                     `boolean`                                     |              false              |                     可选，禁用选择                      | [基本用法](demo#datepicker-default)              |
|        direction         |                                 `'up' \| 'down'`                                  |             'down'              |                   可选，日期弹出方向                    | [格式化](demo#datepicker-format)                 |
|      dateConverter       |                                    `function`                                     |      DefaultDateConverter       |               可选，日期格式化、解析函数                |
|        dateConfig        |                                   `DateConfig`                                    |           见下方介绍            |                     可选，配置参数                      | [基本用法](demo#datepicker-default)              |
|        dateFormat        | [ng 自定义日期格式](https://angular.cn/api/common/DatePipe#custom-format-options) |  'y/MM/dd' \| 'y/MM/dd HH:mm'   |   可选，传入格式化，根据是否 showTime 区别不同默认值    | [格式化](demo#datepicker-format)                 |
|         minDate          |                                      `Date`                                       | new Date('01/01/1900 00:00:00') |                 可选，限制最小可选日期                  | [限制最大最小日期](demo#datepicker-min-max)      |
|         maxDate          |                                      `Date`                                       | new Date('11/31/2099 23:59:59') |                 可选，限制最大可选日期                  | [限制最大最小日期](demo#datepicker-min-max)      |
|         autoOpen         |                                     `boolean`                                     |              false              |                可选，初始化是否直接展开                 | [限制最大最小日期](demo#datepicker-min-max)      |
|    customViewTemplate    |                                    `template`                                     |               --                | 可选，自定义快捷设置日期或自定义操作区内容，用法见 demo | [自定义操作区](demo#custom-view-template)        |
|  showAnimation   |             `boolean`              |                                 true                                  |  可选，是否开启动画 |   | ✔ |

## dDatepicker 事件

|        事件        |          类型          |                     说明                     | 跳转 Demo                           |
| :----------------: | :--------------------: | :------------------------------------------: | ----------------------------------- |
| selectedDateChange | `EventEmitter<object>` | 可选，子项切换的时候会发出新激活的子项的数据 | [基本用法](demo#datepicker-default) |

## appendToBody(dDatepicker 附加指令组件)

搭配 dDatepicker 使用该指令后，会被附加到 body，可以防止 datepicker 在滚动条内被遮挡。

|          参数          |                        类型                         |                       默认                       |               说明               | 跳转 Demo                                        |
| :--------------------: | :-------------------------------------------------: | :----------------------------------------------: | :------------------------------: | ------------------------------------------------ |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 方向数组优先采用数组里靠前的位置 | [附着在 body 上](demo#datepicker-append-to-body) |

注意： 使用 appendToBody 后需要在有滚动条的地方使用`cdkScrollable`

```terminal
npm install @angular/cdk --save
```

```TypeScript
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    // ...
    ScrollDispatchModule,
    // ...
  ]
})
```

```html
<div class="foo-bar-baz" cdkScrollable>
  <!--滚动条容器的其他内容-->
</div>
```

## ConnectedPosition 类型定义

引用自`@angular/cdk/overlay`

```TypeScript
export interface ConnectedPosition {
  originX: 'start' | 'center' | 'end';
  originY: 'top' | 'center' | 'bottom';

  overlayX: 'start' | 'center' | 'end';
  overlayY: 'top' | 'center' | 'bottom';

  weight?: number;
  offsetX?: number;
  offsetY?: number;
  panelClass?: string | string[];
}
```

## AppendToBodyDirection 类型定义

```typescript
export type AppendToBodyDirection = 'rightDown' | 'rightUp' | 'leftUp' | 'leftDown' | 'centerDown' | 'centerUp';
```

简化的几个基础的方向为名字

|   简化名   |                                    意义                                     |
| :--------: | :-------------------------------------------------------------------------: |
| rightDown  | 相对于对齐对象显示在`右下`方向， 即左对齐，显示在下方（注意右下是左对齐的） |
|  rightUp   |            相对于对齐对象显示在`右上`方向， 即左对齐，显示在上方            |
|   leftUp   |            相对于对齐对象显示在`左上`方向， 即右对齐，显示在上方            |
|  leftDown  |            相对于对齐对象显示在`左下`方向， 即右对齐，显示在下方            |
| centerDown |          相对于对齐对象显示在`居中下`方向， 即居中对齐，显示在下方          |
|  centerUp  |          相对于对齐对象显示在`居中上`方向， 即居中对齐，显示在上方          |

简化了 6 个方向的命名，其余方向可以通过 angular/cdk/overlay 的 ConnectedPosition 进行使用。

appendToBodyDirections 默认的显示顺序为 ['rightDown', 'leftDown', 'rightUp', 'leftUp']，
会尝试第一个位置，第一个位置放不下会尝试第二个位置，依此类推。

## DateConfig

```
interface DateConfig{
  timePicker: boolean, // 默认false
  dateConverter: any,
  min: number, // 默认1900
  max: number, // 默认 2099
  format: {
    date: string, // 默认 'y/MM/dd'
    time: string  // 默认 'y/MM/dd HH:mm'
  }
}
```

# dDateRangePicker

## dDateRangePicker 参数

|           参数           |                                       类型                                        |               默认                | 说明                                                    | 跳转 Demo                                                         |全局配置项| 
| :----------------: | :----------------------: | :-------------------------------------------------------------------------------: | :-------------------------------: | :------------------------------------------------------ | ----------------------------------------------------------------- |
|         cssClass         |                                     `string`                                      |                --                 | 可选，自定义 class                                      | [范围日期选择器 集成模式](demo#datepicker-range-basic)            |
| locale(国际化后暂无作用) |                                     `string`                                      |              'zh-cn'              | 可选，时区                                              |
|         showTime         |                                     `boolean`                                     |               false               | 可选，是否显示时分秒                                    | [日期范围选择器 选择时间](demo#datepicker-range-time)             |
|         disabled         |                                     `boolean`                                     |               false               | 可选，禁用选择                                          | [禁止输入态](demo#datepicker-range-disabled)                      |
|      dateConverter       |                                    `function`                                     |       DefaultDateConverter        | 可选，日期格式化、解析函数                              |
|        dateConfig        |                                   `DateConfig`                                    |            见下方介绍             | 可选，配置参数                                          | [日期范围选择器 格式化](demo#datepicker-range-format)             |
|        dateFormat        | [ng 自定义日期格式](https://angular.cn/api/common/DatePipe#custom-format-options) |  `'y/MM/dd' \| 'y/MM/dd HH:mm'`   | 可选，传入格式化                                        | [日期范围选择器 格式化](demo#datepicker-range-format)             |
|         minDate          |                                      `Date`                                       | `new Date('01/01/1900 00:00:00')` | 可选，限制最小可选日期                                  | [日期范围选择器 可选范围](demo#datepicker-range-restricted-range) |
|         maxDate          |                                      `Date`                                       | `new Date('11/31/2099 23:59:59')` | 可选，限制最大可选日期                                  | [日期范围选择器 可选范围](demo#datepicker-range-restricted-range) |
|         splitter         |                                     `string`                                      |              `' - '`              | 可选，两日期间的分隔符                                  | [日期范围选择器 格式化](demo#datepicker-range-format)             |
|      selectedRange       |                                  `[Date, Date]`                                   |          `[null, null]`           | 可选，时选择的日期                                      | [范围日期选择器 集成模式](demo#datepicker-range-basic)            |
|    customViewTemplate    |                                    `template`                                     |                --                 | 可选，自定义快捷设置日期或自定义操作区内容，用法见 demo | [自定义操作区](demo#datepicker-clear-button)                      |
|   hideOnRangeSelected    |                                     `boolean`                                     |               false               | 可选，是否在选择完日期后隐藏面板                        | [范围日期选择器 集成模式](demo#datepicker-range-basic)            |
|  showAnimation   |             `boolean`              |                                 true                                  |  可选，是否开启动画 |   | ✔ |

## dDateRangePicker 事件

|        事件         |          类型          | 说明             | 跳转 Demo |
| :-----------------: | :--------------------: | :--------------- | --------- |
| selectedRangeChange | `EventEmitter<object>` | 日期发生变化回调 |

## 使用 reason 限制插件 emit 的 reason 导出

datepicker 通过

```TypeScript
import { SelectDateChangeReason } from 'ng-devui/zh-cn/datepicker';
```

dateRangePicker 通过

```TypeScript
import { SelectDateRangeChangeReason } from 'ng-devui/zh-cn/datepicker';
```

来引入 reason 限制插件，如何使用可以自由发挥，清除按钮 demo 就提供了一种方式

如下所示，reason 是枚举类型，所以需要根据`selectedDateChange`(dateRangePicker 为`selectedRangeChange`)返回的`reason`字段的数字进行判断，reason 当前可选值：

```TypeScript
enum SelectDateChangeReason {
  date, // 返回值为`reason：0`，代表选择日期时触发的reason
  time, // 返回值为`reason：1`，代表showTime时修改时间触发的reason
  button, // 返回值为`reason：2`，代表自带的按钮(例如清除和确定)触发时的reason
  format, // 返回值为`reason：3`，代表改变格式化时触发的reason
  custom // 返回值为`reason：4`，代表用户传入的变更触发的reason
}
```

SelectDateRangeChangeReason 与上述用法相同

# dTwoDatePicker

## dTwoDatePicker 参数

|           参数           |                                       类型                                        |               默认                | 说明                             | 跳转 Demo                                          |全局配置项| 
| :----------------: | :----------------------: | :-------------------------------------------------------------------------------: | :-------------------------------: | :------------------------------- | -------------------------------------------------- |
|         cssClass         |                                     `string`                                      |                --                 | 可选，自定义 class               | [双日期选择器](demo#two-date-picker-basic)         |
| locale(国际化后暂无作用) |                                     `string`                                      |              'zh-cn'              | 可选，时区                       |
|         disabled         |                                     `boolean`                                     |               false               | 可选，禁用选择                   | [双日期选择器](demo#two-date-picker-basic)         |
|      dateConverter       |                                    `function`                                     |       DefaultDateConverter        | 可选，日期格式化、解析函数       |
|        dateConfig        |                                   `DateConfig`                                    |            见下方介绍             | 可选，配置参数                   | [双日期选择器 格式化](demo#two-date-picker-format) |
|        dateFormat        | [ng 自定义日期格式](https://angular.cn/api/common/DatePipe#custom-format-options) |  `'y/MM/dd' \| 'y/MM/dd HH:mm'`   | 可选，传入格式化                 | [双日期选择器 格式化](demo#two-date-picker-format) |
|         minDate          |                                      `Date`                                       | `new Date('01/01/1900 00:00:00')` | 可选，限制最小可选日期           | [双日期选择器 格式化](demo#two-date-picker-format) |
|         maxDate          |                                      `Date`                                       | `new Date('11/31/2099 23:59:59')` | 可选，限制最大可选日期           | [双日期选择器 格式化](demo#two-date-picker-format) |
|   hideOnRangeSelected    |                                     `boolean`                                     |               true                | 可选，是否在选择完日期后隐藏面板 | [双日期选择器](demo#two-date-picker-basic)         |
|  showAnimation   |             `boolean`              |                                 true                                  |  可选，是否开启动画 |   | ✔ |

## dTwoDatePicker 事件

|        事件         |          类型          | 说明             | 跳转 Demo                                  |
| :-----------------: | :--------------------: | :--------------- | ------------------------------------------ |
| selectedRangeChange | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](demo#two-date-picker-basic) |

## dTwoDatePickerStart 事件

|    事件     |          类型          | 说明             | 跳转 Demo                                  |
| :---------: | :--------------------: | :--------------- | ------------------------------------------ |
| selectStart | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](demo#two-date-picker-basic) |

## dTwoDatePickerEnd 事件

|   事件    |          类型          | 说明             | 跳转 Demo                                  |
| :-------: | :--------------------: | :--------------- | ------------------------------------------ |
| selectEnd | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](demo#two-date-picker-basic) |
