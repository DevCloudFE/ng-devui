# 如何使用
在 module 中引入：

```tsy-MM-dd
import { DatepickerProModule } from 'ng-devui/datepicker-pro';
```

在页面中使用：

```
<d-datepicker-pro [(ngModel)]="value1"></d-datepicker-pro>
```

# d-datepicker-pro

## d-datepicker-pro 参数

|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| cssClass   |  `string` |  -- |  可选，自定义 class   |  |
| format   |  [ng 自定义日期格式](https://angular.cn/api/common/DatePipe#custom-format-options)  |  'y-MM-dd' \| 'y-MM-dd HH:mm:ss' |  可选，传入格式化，根据是否 showTime 区别不同默认值    | [基本用法](demo#basic-usage) |
| showTime   |  `boolean` |  false |  可选，是否显示时分秒   | [显示时间](demo#show-time) |
| disabled   |  `boolean` |  false |  可选，选择器是否禁用   | [基本用法](demo#basic-usage) |
| autoOpen   |  `boolean` |  false |  可选，初始化是否直接展开   | [显示时间](demo#show-time) |
| calenderRange   |  `number[]` |  [1970, 2099] |  可选，传入日历的年份范围   | [基本用法](demo#basic-usage) |
| minDate   |  `Date` |  new Date(calenderRange[0]) |  可选，限制最小可选日期   | [基本用法](demo#basic-usage) |
| maxDate   |  `Date` |  new Date(calenderRange[1]) |  可选，限制最大可选日期   | [基本用法](demo#basic-usage) |
| showAnimation | `boolean` | true |  可选，是否开启动画 | |
| width | `string` | - |  可设置选择器的宽度 | |
| allowClear | `boolean` | true |  是否允许用户清除日期，即显示清除按钮 | |
| placeholder | `string` | - |  输入框的placeholder | |
| mode | `'year' \| 'month' \| 'date'` | 'date' |  面板模式 | [年月选择器](demo#monthYear)|
| markedDateList | `Date[]` | [] |  标记日期列表，可以配合MarkDateInfoTemplate模板展示提示信息 | [标记信息](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] |  标记范围日期列表 | [标记信息](demo#date-marked)|
|   showGlowStyle    |       `boolean`        |   true   |       可选，是否显示悬浮发光效果    |

## d-datepicker-pro 事件

|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| dropdownToggle   |  `EventEmitter<boolean>` |  -- |  下拉面板开启关闭时触发，返回开启(true)或关闭(false)   |  |
| confirmEvent   |  `EventEmitter<Date>` |  -- |  点击确定按钮后触发，返回当前的Date值   |  |

# d-range-datepicker-pro

## d-range-datepicker-pro 参数

|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| cssClass   |  `string` |  -- |  可选，自定义 class   |  |
| format   |  [ng 自定义日期格式](https://angular.cn/api/common/DatePipe#custom-format-options)  |  'y-MM-dd' \| 'y-MM-dd HH:mm:ss' |  可选，传入格式化，根据是否 showTime 区别不同默认值    | [基本用法](demo#basic-usage) |
| showTime   |  `boolean` |  false |  可选，是否显示时分秒   | [范围选择器](demo#range-picker) |
| disabled   |  `boolean` |  false |  可选，选择器是否禁用   | [基本用法](demo#basic-usage) |
| autoOpen   |  `boolean` |  false |  可选，初始化是否直接展开   | [显示时间](demo#show-time) |
| calenderRange   |  `number[]` |  [1970, 2099] |  可选，传入日历的年份范围   | [基本用法](demo#basic-usage) |
| minDate   |  `Date` |  new Date(calenderRange[0]) |  可选，限制最小可选日期   | [基本用法](demo#basic-usage) |
| maxDate   |  `Date` |  new Date(calenderRange[1]) |  可选，限制最大可选日期   | [基本用法](demo#basic-usage) |
| splitter | `string` | `-` |  可设置范围日期之间的连接符 | |
| showAnimation | `boolean` | true |  可选，是否开启动画 | |
| width | `string` | - |  可设置范围选择器的宽度 | |
| placeholder | `string[]` | - |  输入框的placeholder数组，需要传入开始和结束两个 | |
| mode | `'year' \| 'month' \| 'date' \| 'week'` | 'date' |  面板模式 | [范围选择器](demo#range-picker)|
| startIndexOfWeek | `number` | 0 |  周选择时候，每周的开始时间，0表示周日，6表示周六，与Date.getDay()相同 | [范围选择器](demo#range-picker)|
| markedDateList | `Date[]` | [] |  标记日期列表，可以配合MarkDateInfoTemplate模板展示提示信息 | [标记信息](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] |  标记范围日期列表 | [标记信息](demo#date-marked)|

## d-range-datepicker-pro 事件

|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| dropdownToggle   |  `EventEmitter<boolean>` |  -- |  下拉面板开启关闭时触发，返回开启(true)或关闭(false)   |  |
| confirmEvent   |  `EventEmitter<Date[]>` |  -- |  点击确定按钮后触发，返回当前的Date范围值   |  |

# d-datepicker-static-panel

## d-datepicker-static-panel 参数
|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| isRangeType   |  `boolean` |  false |  可选，是否展示范围模式   |  |
| mode   |  `'year' \| 'month' \| 'date' \| 'week'` |  'date' |  可选，展示类型   |  |
| showTime   |  `boolean` |  false |  可选，date模式下是否可配置时间   |  |
| startIndexOfWeek | `number` | 0 |  周选择时候，每周的开始时间，0表示周日，6表示周六，与Date.getDay()相同 | |
| activeRangeType   |  `'start' \| 'end'` |  'start' |  可选，范围模式下激活开始或者结束日期  |  |
| showRangeHeader   |  `boolean` |  'true' |  可选，在范围模式下是否显示header头来展示范围切换的input  |  |
| splitter   |  `string` |  '-' |  可选，在范围模式下的日期分隔符 |  |
| markedDateList | `Date[]` | [] |  标记日期列表，可以配合MarkDateInfoTemplate模板展示提示信息 | [标记信息](demo#date-marked)|
| markedRangeDateList | `Date[][]` | [] |  标记范围日期列表 | [标记信息](demo#date-marked)|
| minDate   |  `Date` |  - |  可选，限制最小可选日期   | [基本用法](demo#basic-usage) |
| maxDate   |  `Date` | - |  可选，限制最大可选日期   | [基本用法](demo#basic-usage) |

## d-datepicker-static-panel 事件

|     参数   |    类型     |     默认   |    说明   |   跳转 Demo   |
| :-------:  | :-------: | :-------: | :-------: | :-------: |
| confirmEvent   |  `EventEmitter<Date[]>` |  -- |  点击确定按钮后触发，返回当前的Date范围值   |  |
| cancelEvent   |  `EventEmitter<void>` |  -- |  点击取消按钮后触发  |  |


# ngModel

ngModel 在单日期模式下绑定为`Date`。

ngModel 在范围模式下绑定为`Date[]`。

ngModelChange 可监听其变化。

# 自定义模板
|         参数         |        类型        |       默认值        |           描述           | 跳转 Demo |
| :------------------: | :----------------: | :---------------: | :----------------------: | :----------: |
|     customTemplate     | `TemplateRef<any>` |        --         |  可选，右侧区域自定义模板  | [传入模板](demo#template) |
|     footerTemplate     | `TemplateRef<any>` |        --         | 可选，footer自定义模板 | [传入模板](demo#template) |
|     hostTemplate     | `TemplateRef<any>` |        --         | 可选，datepicker宿主的自定义模板 | [传入模板](demo#host-template) |
|     markDateInfoTemplate     | `TemplateRef<any>` |        --         | 可选，标记日期的提示信息模板，信息会以popover展示 | [标记信息](demo#date-marked) |
