# 如何使用

在module中引入：

```
import { TimePickerModule } from 'ng-devui/time-picker';
```
在页面中使用：
```
<input dTimePicker (focus)="timePicker3.toggle()" #timePicker3="timePicker" />
```
# TimePicker

## TimePicker参数

| 参数                      | 类型            | 默认       |   说明                                      | 跳转Demo                                                           |
| :-----------------------: | :------------: | :--------: | :-------------------------------------------| :-----------------------------------------------------------------|
|          disabled         |    `boolean`   |   false    | 可选，禁用选择                               |[基本用法](demo#basic-usage)                |
|       timePickerWidth       |    `number`    |     --     | 可选，下拉框的宽度                           |[基本用法](demo#basic-usage)                |
|          autoOpen         |    `boolean`   |   false    | 可选，初始化是否直接展开                      |[基本用法](demo#basic-usage)                |
|           format          |    `string`    | 'hh:mm:ss' | 可选，传入格式化，控制时间格式                 |[格式化](demo#format)                      |
|          minTime          |    `string`    | '00:00:00' | 可选，限制最小可选时间                        |[格式化](demo#format)                      |
|          maxTime          |    `string`    | '23:59:59' | 可选，限制最大可选时间                        |[格式化](demo#format)                      |
|    customViewTemplate     |   `TemplateRef`   |     --     | 可选，自定义快捷设置时间或自定义操作区内容      |[传入模板](demo#custom)                    |
|  appendToBodyDirections   | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 方向数组优先采用数组里靠前的位置 |  --  |

## TimePicker事件

|        事件        |           类型          |                     说明                     | 跳转Demo                                                           |
| :----------------: | :--------------------: | :------------------------------------------: | :------------------------------------------------------------------|
| selectedTimeChange | `EventEmitter<string>` | 可选，确定的时候会发出新激活的子项的数据         |[基本用法](demo#basic-usage)                 |

## 可调用的组件内部方法

详情参见[传入模板](demo#custom)

```TypeScript
// 参数timeObj为必传，选择对应时间，触发selectedTimeChange
chooseTime(timeObj)
// 其中必须包含time：他是一个时间字符串，若不传type，则time必须是完整的时间，并且会直接选中对应时间，若传type，则time必须是单个时间，并且会选中对应的事件
// type为可选：他是一个字符串，并且只能传'hh'、'mm'、'ss'的其中一个，大小写不敏感，需要和上述time结合使用
TimeObj {
  time: string;
  type?: string;
}
// 参数timeObj为必传，选择对应时间，触发confirmTimeChange
confirmTime(timeObj)
// 清空已选择的时间
clearAll()
// 隐藏选择器，在调用chooseTime的时候不会触发关闭，需要自行手动关闭，在调用confirmTime的时候会直接关闭
hide()
```
