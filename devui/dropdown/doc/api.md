## dDropDown

> 使用指定的本地变量 #dropdown="d-dropdown"

### dDropDown 参数

| 参数                 | 类型             | 默认           |   说明                           |
| :------------------: | :-------------: | :------------: | :------------------------------: |
| isOpen               | `boolean`       | false          | 可选，可以显示指定dropdown是否打开       |
| disabled             | `boolean`       | false          | 可选，设置为true禁用dropdown            |
| trigger              | `'click'\|'hover'` | 'click'     | 可选，dropdown触发方式                  |
| closeScope           | `'all'\|'blank'\|'none'`| 'all'   |可选，点击关闭区域，blank点击非菜单空白才关闭, all点击菜单内外都关闭，none菜单内外均不关闭仅下拉按键可以关闭|
| closeOnMouseLeaveMenu| `boolean`       | false          | 可选，是否进入菜单后离开菜单的时候关闭菜单 |

### dDropDown 事件

| 事件                 | 类型         |   说明                          |
| :-------------------: | :----------: | :----------------------------: |
| toggleEvent           | `EventEmitter<boolean>`         | dropdown菜单展开和收起的布尔值，true表示将要展开，false表示将要关闭     |

## appendToBody(dDropDown附加指令组件)

搭配dDropDown使用该指令后，dDropDownMenu会被附加到body，可以防止dropdown在滚动条内被遮挡。

| 参数                  | 类型          | 默认            |   说明                          |
| :-------------------: | :----------: | :-------------: | :----------------------------: |
| alignOrigin           | `HTMLElement`   | 可选，dDropDownToggle所在对象 |指定对齐的对象      |
| appendToBodyDirections| `Array<AppendToBodyDirection \| ConnectedPosition>`   |`['rightDown', 'leftDown', 'rightUp', 'leftUp']` |可选， 方向数组优先采用数组里靠前的位置 |

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

## dDropDownToggle

用在菜单的控制对象上，参考demo

### dDropDownToggle 参数

| 参数                  | 类型          | 默认            |   说明                          |
| :-------------------: | :----------: | :-------------: | :----------------------------: |
| toggleOnFocus        | `boolean`    | false           | 可选，通过Tab聚焦的时候自动展开      |
| autoFocus            | `boolean`    | false            | 可选，实例化后自动聚焦      |

## dDropDownMenu

用在需要展开和关闭的菜单内容上，参考demo
