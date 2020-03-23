## DatePicker 使用说明

### dDatepicker 参数

| 参数                  | 类型                             | 默认            |   说明                                                |
| :-------------------: | :-----------------------------: | :-------------: | :--------------------------------------------------:  |
| cssClass              | `string`                        | --              | 可选，自定义class                                      |
| locale                 | `string`                        | 'zh-cn'         | 可选，时区                                             |
| showTime              | `boolean`                       | false           | 可选，是否显示时分秒                                    |
| yearNumber            | `number`                        | 12              | 可选，下拉年份显示数量                                  |
| disabled              | `boolean`                       | false           | 可选，禁用选择                                         |
| direction             | `'up' \| 'down'`                | 'down'          | 可选，日期弹出方向                                      |
| dateConverter         | `function`                      | DefaultDateConverter | 可选，日期格式化、解析函数                         |
| dateConfig            | `any`                           | 见下方介绍       | 可选，配置参数                                         |
| dateFormat            | `any`                           | 'YYYY-MM-DD' \| 'YYYY-MM-DD HH:mm' | 可选，传入格式化，根据是否showTime区别不同默认值|
| minDate               | `Date`                          | new Date('01/01/1900 00:00:00') | 可选，限制最小可选日期                  |
| maxDate               | `Date`                          | new Date('11/31/2099 23:59:59') | 可选，限制最大可选日期                  |
| autoOpen              | `boolean`                       | false           | 可选，初始化是否直接展开                                 |
| customViewTemplate    | `template`                      | --              | 可选，自定义快捷设置日期或自定义操作区内容，用法见demo     |

### dDatepicker 事件

| 事件                  | 类型                                        |    说明                                          |
| :-------------------: | :----------------------------------------: | :----------------------------------------------: |
| selectedDateChange    | `EventEmitter<object>`                        | 可选，子项切换的时候会发出新激活的子项的数据    |

## appendToBody(dDatepicker附加指令组件)

搭配dDatepicker使用该指令后，会被附加到body，可以防止datepicker在滚动条内被遮挡。

| 参数                  | 类型          | 默认            |   说明                          |
| :-------------------: | :----------: | :-------------: | :----------------------------: |
| appendToBodyDirections| `Array<AppendToBodyDirection \| ConnectedPosition>`   |`['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 方向数组优先采用数组里靠前的位置 |

注意： 使用appendToBody后需要在有滚动条的地方使用`cdkScrollable`

``` terminal
npm install @angular/cdk --save
```

``` TypeScript
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    // ...
    ScrollDispatchModule,
    // ...
  ]
})
```

``` html
<div class="foo-bar-baz" cdkScrollable>
 <!--滚动条容器的其他内容-->
</div>
```

### ConnectedPosition 类型定义

引用自`@angular/cdk/overlay`

``` TypeScript
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

``` typescript
export type AppendToBodyDirection= 'rightDown'| 'rightUp' | 'leftUp'| 'leftDown' | 'centerDown' | 'centerUp';
```

简化的几个基础的方向为名字

| 简化名          | 意义         |
| :-------------: | :----------: |
| rightDown       | 相对于对齐对象显示在`右下`方向， 即左对齐，显示在下方（注意右下是左对齐的）   |
| rightUp         | 相对于对齐对象显示在`右上`方向， 即左对齐，显示在上方   |
| leftUp          | 相对于对齐对象显示在`左上`方向， 即右对齐，显示在上方   |
| leftDown        | 相对于对齐对象显示在`左下`方向， 即右对齐，显示在下方   |
| centerDown      | 相对于对齐对象显示在`居中下`方向， 即居中对齐，显示在下方   |
| centerUp        | 相对于对齐对象显示在`居中上`方向， 即居中对齐，显示在上方   |

简化了6个方向的命名，其余方向可以通过angular/cdk/overlay的ConnectedPosition进行使用

appendToBodyDirections默认的显示顺序为 ['rightDown', 'leftDown', 'rightUp', 'leftUp']，
会尝试第一个位置，第一个位置放不下会尝试第二个位置，依此类推。


### 配置参考下面配置，并传递给dateConfig属性
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
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| cssClass | `string` | -- | 可选，自定义class|
| locale | `string` | 'zh-cn' | 可选，时区 |
| showTime | `boolean` | false | 可选，是否显示时分秒 |
| disabled | `boolean` | false | 可选，禁用选择 |
| dateConverter | `function` | DefaultDateConverter | 可选，日期格式化、解析函数 |
| dateConfig | `any` | 见下方介绍 | 可选，配置参数 |
| dateFormat | `any` | `'YYYY-MM-DD' \| 'YYYY-MM-DD HH:mm'` | 可选，传入格式化 |
| minDate | `Date` | `new Date('01/01/1900 00:00:00')` | 可选，限制最小可选日期 |
| maxDate | `Date` | `new Date('11/31/2099 23:59:59')` | 可选，限制最大可选日期 |
| splitter | `string` | `  -  ` | 可选，两日期间的分隔符 |
| selectedRange | `[Date, Date]` | `[null, null]` | 可选，时选择的日期 |
| customViewTemplate | `template` | -- |  可选，自定义快捷设置日期或自定义操作区内容，用法见demo	|


### dDateRangePicker 事件
| 事件 | 类型  | 说明 |
| :---: | :---:| :---|
| selectedRangeChange | `EventEmitter<object>` | 日期发生变化回调 |
