## DatePicker 使用说明

### dDatepicker 参数

|        参数        |       类型       |              默认               |                          说明                           | 跳转 Demo                                                     |
| :----------------: | :--------------: | :-----------------------------: | :-----------------------------------------------------: | ------------------------------------------------------------- |
|      cssClass      |     `string`     |               --                |                   可选，自定义 class                    | [基本用法](/components/datepicker/demo#datepicker-default) |
|locale(国际化后暂无作用)|    `string`    |             'zh-cn'             |                       可选，时区                        |
|      showTime      |    `boolean`     |              false              |                  可选，是否显示时分秒                   | [格式化](/components/datepicker/demo#datepicker-format)         |
|      disabled      |    `boolean`     |              false              |                     可选，禁用选择                      | [基本用法](/components/datepicker/demo#datepicker-default) |
|     direction      | `'up' \| 'down'` |             'down'              |                   可选，日期弹出方向                    | [格式化](/components/datepicker/demo#datepicker-format)         |
|   dateConverter    |    `function`    |      DefaultDateConverter       |               可选，日期格式化、解析函数                |
|     dateConfig     |      `any`       |           见下方介绍            |                     可选，配置参数                      | [基本用法](/components/datepicker/demo#datepicker-default) |
|     dateFormat     |      `any`       |  'y/MM/dd' \| 'y/MM/dd HH:mm'   |   可选，传入格式化，根据是否 showTime 区别不同默认值    | [格式化](/components/datepicker/demo#datepicker-format)         |
|      minDate       |      `Date`      | new Date('01/01/1900 00:00:00') |                 可选，限制最小可选日期                  | [限制最大最小日期](/components/datepicker/demo#datepicker-min-max) |
|      maxDate       |      `Date`      | new Date('11/31/2099 23:59:59') |                 可选，限制最大可选日期                  | [限制最大最小日期](/components/datepicker/demo#datepicker-min-max) |
|      autoOpen      |    `boolean`     |              false              |                可选，初始化是否直接展开                 | [限制最大最小日期](/components/datepicker/demo#datepicker-min-max) |
| customViewTemplate |    `template`    |               --                | 可选，自定义快捷设置日期或自定义操作区内容，用法见 demo | [自定义操作区](/components/datepicker/demo#custom-view-template)      |

### dDatepicker 事件

|        事件        |          类型          |                     说明                     | 跳转 Demo                                              |
| :----------------: | :--------------------: | :------------------------------------------: | ------------------------------------------------------ |
| selectedDateChange | `EventEmitter<object>` | 可选，子项切换的时候会发出新激活的子项的数据 | [基本用法](/components/datepicker/demo#datepicker-default) |

## appendToBody(dDatepicker 附加指令组件)

搭配 dDatepicker 使用该指令后，会被附加到 body，可以防止 datepicker 在滚动条内被遮挡。

|          参数          |                        类型                         |                       默认                       |               说明               | 跳转 Demo |
| :--------------------: | :-------------------------------------------------: | :----------------------------------------------: | :------------------------------: | --------- |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 方向数组优先采用数组里靠前的位置 | [附着在body上](/components/datepicker/demo#datepicker-append-to-body) |

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

### ConnectedPosition 类型定义

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

### AppendToBodyDirection 类型定义

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

简化了 6 个方向的命名，其余方向可以通过 angular/cdk/overlay 的 ConnectedPosition 进行使用

appendToBodyDirections 默认的显示顺序为 ['rightDown', 'leftDown', 'rightUp', 'leftUp']，
会尝试第一个位置，第一个位置放不下会尝试第二个位置，依此类推。

### 配置参考下面配置，并传递给 dateConfig 属性

```
{
  timePicker: false,
  dateConverter: null,
  min: 1900,
  max: 2099,
  format: {
    date: 'y/MM/dd',
    time: 'y/MM/dd HH:mm:ss'
  }
}
```

### dDateRangePicker 参数

|        参数        |      类型      |               默认                | 说明                                                    | 跳转 Demo                                                             |
| :----------------: | :------------: | :-------------------------------: | :------------------------------------------------------ | --------------------------------------------------------------------- |
|      cssClass      |    `string`    |                --                 | 可选，自定义 class                                      | [范围日期选择器 集成模式](/components/datepicker/demo#datepicker-range-basic)                  |
|locale(国际化后暂无作用)|    `string`    |              'zh-cn'              | 可选，时区                                              |
|      showTime      |   `boolean`    |               false               | 可选，是否显示时分秒                                    | [日期范围选择器 选择时间](/components/datepicker/demo#datepicker-range-time)             |
|      disabled      |   `boolean`    |               false               | 可选，禁用选择                                          | [禁止输入态](/components/datepicker/demo#datepicker-range-disabled)             |
|   dateConverter    |   `function`   |       DefaultDateConverter        | 可选，日期格式化、解析函数                              |
|     dateConfig     |     `any`      |            见下方介绍             | 可选，配置参数                                          | [日期范围选择器 格式化](/components/datepicker/demo#datepicker-range-format) |
|     dateFormat     |     `any`      |  `'y/MM/dd' \| 'y/MM/dd HH:mm'`   | 可选，传入格式化                                        | [日期范围选择器 格式化](/components/datepicker/demo#datepicker-range-format) |
|      minDate       |     `Date`     | `new Date('01/01/1900 00:00:00')` | 可选，限制最小可选日期                                  | [日期范围选择器 可选范围](/components/datepicker/demo#datepicker-range-restricted-range) |
|      maxDate       |     `Date`     | `new Date('11/31/2099 23:59:59')` | 可选，限制最大可选日期                                  | [日期范围选择器 可选范围](/components/datepicker/demo#datepicker-range-restricted-range) |
|      splitter      |    `string`    |             `'  -  '`             | 可选，两日期间的分隔符                                  | [日期范围选择器 格式化](/components/datepicker/demo#datepicker-range-format) |
|   selectedRange    | `[Date, Date]` |          `[null, null]`           | 可选，时选择的日期                                      | [范围日期选择器 集成模式](/components/datepicker/demo#datepicker-range-basic)                  |
| customViewTemplate |   `template`   |                --                 | 可选，自定义快捷设置日期或自定义操作区内容，用法见 demo | [自定义操作区](/components/datepicker/demo#datepicker-clear-button)                  |
|hideOnRangeSelected |   `boolean`    |              false                | 可选，是否在选择完日期后隐藏面板 | [范围日期选择器 集成模式](/components/datepicker/demo#datepicker-range-basic)                  |

### dDateRangePicker 事件

|        事件         |          类型          | 说明             | 跳转 Demo |
| :-----------------: | :--------------------: | :--------------- | --------- |
| selectedRangeChange | `EventEmitter<object>` | 日期发生变化回调 |

### 使用 reason 限制插件 emit 的 reason 导出

datepicker 通过

```TypeScript
import { SelectDateChangeReason } from 'ng-devui/datepicker';
```

dateRangePicker 通过

```TypeScript
import { SelectDateRangeChangeReason } from 'ng-devui/datepicker';
```

来引入 reason 限制插件，如何使用可以自由发挥，清除按钮 demo 就提供了一种方式
reason 当前可选值：

```TypeScript
enum SelectDateRangeChangeReason {
  date,
  time,
  button,
  format,
  custom
}
```

### dTwoDatePicker 参数

|        参数        |      类型      |               默认                | 说明                                                    | 跳转 Demo                                                             |
| :----------------: | :------------: | :-------------------------------: | :------------------------------------------------------ | --------------------------------------------------------------------- |
|      cssClass      |    `string`    |                --                 | 可选，自定义 class                                      | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |
|locale(国际化后暂无作用)|    `string`    |              'zh-cn'              | 可选，时区                                              |
|      disabled      |   `boolean`    |               false               | 可选，禁用选择                                          | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |
|   dateConverter    |   `function`   |       DefaultDateConverter        | 可选，日期格式化、解析函数                              |
|     dateConfig     |     `any`      |            见下方介绍             | 可选，配置参数                                          | [双日期选择器 格式化](/components/datepicker/demo#two-date-picker-format)                  |
|     dateFormat     |     `any`      |  `'y/MM/dd' \| 'y/MM/dd HH:mm'`   | 可选，传入格式化                                        | [双日期选择器 格式化](/components/datepicker/demo#two-date-picker-format)                  |
|      minDate       |     `Date`     | `new Date('01/01/1900 00:00:00')` | 可选，限制最小可选日期                                  | [双日期选择器 格式化](/components/datepicker/demo#two-date-picker-format)                  |
|      maxDate       |     `Date`     | `new Date('11/31/2099 23:59:59')` | 可选，限制最大可选日期                                  | [双日期选择器 格式化](/components/datepicker/demo#two-date-picker-format)                  |
|hideOnRangeSelected |   `boolean`    |              true                | 可选，是否在选择完日期后隐藏面板 | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |

### dTwoDatePicker 事件

|        事件         |          类型          | 说明             | 跳转 Demo |
| :-----------------: | :--------------------: | :--------------- | --------- |
| selectedRangeChange | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |

### dTwoDatePickerStart 事件

|        事件         |          类型          | 说明             | 跳转 Demo |
| :-----------------: | :--------------------: | :--------------- | --------- |
|     selectStart     | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |

### dTwoDatePickerEnd 事件

|        事件         |          类型          | 说明             | 跳转 Demo |
| :-----------------: | :--------------------: | :--------------- | --------- |
|      selectEnd      | `EventEmitter<object>` | 日期发生变化回调 | [双日期选择器](/components/datepicker/demo#two-date-picker-basic)                  |
