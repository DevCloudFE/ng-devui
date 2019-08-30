### dDatepicker 参数
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| cssClass | `string` | '' | 可选，自定义class|
| local | `string` | 'zh-CN' | 可选，时区 |
| showTime | `boolean` | false | 可选，是否显示时分秒 |
| yearNumber | `number` | 12 | 可选，下拉年份显示数量 |
| disabled | `boolean` | false | 可选，禁用选择 |
| direnction| `'up' \| 'down'` | 'down' | 可选，日期弹出方向 |
| dateConverter | `function` | DefaultDateConverter | 可选，日期格式化、解析函数 |
| customViewTemplate | `tempalte` | - |  可选，自定义快捷设置日期或自定义操作区内容， 可以通过chooseDate(dateString: string)来设置日期	|


### dDatepicker 事件
| 事件 | 类型  | 说明 |
| :---: | :---:| :---|
| selectedDateChange | object |日期发生变化回调 |



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
