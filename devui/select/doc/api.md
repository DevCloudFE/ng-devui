### d-select 参数
| 参数 | 类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---|
| options     |  `array`      | []        | 可选, 和searchFn互斥，两者必须有且只有一个。下拉选项资源`string` `object`           |
| isSearch    | `boolean`      | false      | 可选,是否支持过滤搜索                        |
| scrollHight | `string`       | '300px'    | 可选,下拉菜单高度,建议使用px作为高度单位       |
| hightLightItemClass | `string`      | 'bg-grey'  | 可选,下拉高亮css                     |
| filterKey   | `string` | -- | 当传入资源options类型为object时,必选,针对传入资源options的每项对应字段做过滤操作 | 
| multiple    | `boolean`      | false      | 可选,是否支持多选                            |
| isSelectAll | `boolean`      | false      | 可选,是否显示全选                            |
| readonly    | `boolean`      | true       | 可选,是否可以输入                            |
| size        | `string`       | ''         | 可选,下拉选框尺寸,有三种选择`'lg'`,`''`,`'sm'` |
| disabled    | `boolean`      | false      | 可选,是否禁用下拉框                          |
| placeholder | `string`      | 'Please Input keywords' | 可选,输入框的placeholder                     |
| searchFn    | `function` | --         | 可选,搜索函数,当需要自定义下拉选择过滤规则时可以使用 |
| valueParser | `function`     | --         | 可选,决定选择框文字如何显示,默认显示filterKey字段或者本身的值  |
| formatter   | `function`     | --         | 可选,决定下拉框每项文字如何显示,默认显示filterKey字段或者本身的值 |
| direction  | `string` | ''         | 可选,下拉选框尺寸,有三种选择`'up'`,`'down'`,`'auto'`|
| overview    | `string`      | 'border'         | 可选,决定选择框样式显示,默认有边框`'border'`,`'underlined'`  |
| enableLazyLoad | `boolean` | false         | 可选,是否支持数据懒加载，用于滚动到底部时动态请求数据 |
| extraConfig | `object`      | N/A         | 可选, 可输入配置项 参考示例                  |
| extraConfig.labelization | `object`      | N/A          | 可选, 标签化多选结果的配置项,参考示例 |
| extraConfig.labelization.enable  | `boolean`      | false         | 可选下的必填参数, 是否启用标签化,使用必须置为true,参考示例 |
| extraConfig.labelization.overflow | `string` | '' | 可选, 多个标签超出容器时候的预处理行为,值为`'normal' \| 'scroll-y' \| 'multiple-line' \| 'string'` 对应默认隐藏,纵向滚动、自动变多行和自定义类 |
| extraConfig.labelization.containnerMaxHeight  | `string`      | '1.8em'        | 可选, 限制容器最高高度。 多行模式下默认不限制高度,单行模式下默认为1.8em |
| extraConfig.labelization.labelMaxWidth  | `string`      | '100%'      | 可选下, 限制标签宽度,默认值为行宽的100% |
| extraConfig.selectedItemWithTemplate | `object`   | N/A    |可选,在单选情况下,显示选项使用了template的情况下,顶部选中的内容是否也以template展示,参考示例 |
| extraConfig.selectedItemWithTemplate.enable | `boolean`      | --        | 可选下的必填参数, 是否启用选中项使用模板,使用必须置为true,参考示例 |
| optionDisabledKey | `string`      | ''   | 可选,禁用单个选项;当传入资源options类型为`objectObj`,比如设置为`'disabled'`,则当对象的disable属性为true时,该选项将禁用;当设置为''时不禁用单个选项 |
| optionImmutableKey | `string`      | ''         |可选,禁用单个选项;当传入资源options类型为`objectObj`,比如设置为`'immutable'`,则当对象的immutable属性为true时,该选项将禁被禁止变更;当设置为''时不生效 |
| noResultItemTemplate | `TemplateRef`      | --         | 可选,没有匹配项的展示结果 |
| keepMultipleOrder | `string`    | 'user-select'         | 可选,`'user-select' \| 'origin'`,配置多选的时候是否维持原数组排序还是用户选择的顺序排序,默认是用户顺序 |
| customViewTemplate | `TemplateRef`      | --        | 可选,支持自定义区域显示内容定制,可以使用choose来选择某项,choose需要传两个必填参数,第一个为选择的选项,第二个为选项在列表的index值,event参数选填,若不填请自行处理冒泡,详见demo |
| customViewDirection | `'bottom' \| 'right'\| 'left'`     | 'bottom'         | customViewTemplate所处的相对下拉列表的位置 |
| appendToBody    | `boolean`      | false      | 可选,true会被附加到body                     |
| appendToBodyDirections| `Array<AppendToBodyDirection \| ConnectedPosition>`   |`['rightDown', 'leftDown', 'rightUp', 'leftUp']` |可选， 方向数组优先采用数组里靠前的位置，AppendToBodyDirection和 ConnectedPosition请参考dropdown|
| width    | `number`      | --     | 可选,搭配appendToBody使用，设置下拉宽度       
| virtualScroll    | `boolean`      | false      | 可选,是否虚拟滚动，大数据量场景试用                     |
|allowClear|  `boolean`      | false      | 可选, 配置是否允许清空选值，仅单选场景适用     |
|inputItemTemplate| `TemplateRef` | --   |可选参数,自定义模板，若传入，会忽略ContentChild |

### d-select 事件
| 事件 | 类型  | 说明 |
| :---: | :---:| :---|
| valueChange | `EventEmitter<Array<any>|any>`      | 可选,输出函数,当选中某个选项项后,将会调用此函数,参数为当前选择项的值 |
| toggleChange| `EventEmitter<boolean>`         | 可选,输出函数,下拉打开关闭toggle事件                              |
| loadMore    | `EventEmitter<{instance: Selectcomponent, event: ScrollEvent}>`          | 懒加载触发事件，配合`enableLazyLoad`使用，使用`$event.instance.loadFinish()`结束本次加载, event为懒加载监听的滚动事件，参考dLazyLoad |


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
