| 参数        | 说明                                            | 类型        |   默认值    |
| :---------: | :--------------------------------------------: | :---------: | :-----------|
| options     | 可选参数, 和searchFn互斥，两者必须有且只有一个。下拉选项资源`string` `object`           |  Array      | `[]`        |
| isSearch    | 可选参数,是否支持过滤搜索                        | boolean      | `false`      |
| scrollHight | 可选参数,下拉菜单高度,建议使用px作为高度单位       | string       | `'300px'`    |
| hightLightItemClass | 可选参数,下拉高亮css                     | string      | `'bg-grey'`  |
| filterKey   | 当传入资源options类型为object时,必选,针对传入资源options的每项对应字段做过滤操作| string | `无`|
| multiple    | 可选参数,是否支持多选                            | boolean      | `false`      |
| isSelectAll | 可选参数,是否显示全选                            | boolean      | `false`      |
| readonly    | 可选参数,是否可以输入                            | boolean      | `true`       |
| size        | 可选参数,下拉选框尺寸,有三种选择`'lg'`,`''`,`'sm'`| string       | `''`         |
| disabled    | 可选参数,是否禁用下拉框                          | boolean      | `false`      |
| placeholder | 可选参数,输入框的placeholder                     | string      | `'Please Input keywords'`|
| searchFn    | 可选参数,搜索函数,当需要自定义下拉选择过滤规则时可以使用| function | `无`         |
| valueParser | 可选参数,决定选择框文字如何显示,默认显示filterKey字段或者本身的值  | function     | `无`         |
| formatter   | 可选参数,决定下拉框每项文字如何显示,默认显示filterKey字段或者本身的值| function     | `无`         |
| direnction  | 可选参数,下拉选框尺寸,有三种选择`'up'`,`'down'`,`'auto'`| string | `''`         |
| overview    | 可选参数,决定选择框样式显示,默认有边框`'border'`,`'underlined'`  | string      | `'border'`         |
| enableLazyLoad |可选参数,是否支持数据懒加载，用于滚动到底部时动态请求数据| boolean | `false`         |
| valueChange | 可选参数,输出函数,当选中某个选项项后,将会调用此函数,参数为当前选择项的值 | function      | `无`         |
| toggleChange|>可选参数,输出函数,下拉打开关闭toggle事件 | function      | `无`         |
| loadMore    | 懒加载触发事件，配合`enableLazyLoad`使用，使用`$event.instance.loadFinish()`结束本次加载 | function      | `无`         |
| extraConfig | 可选参数, 可输入配置项 参考示例                  | Object      | 不适用         |
| extraConfig.labelization | 可选参数, 标签化多选结果的配置项,参考示例 | Object      | 不适用         |
| extraConfig.labelization.enable | 可选参数下的必填参数, 是否启用标签化,使用必须置为true,参考示例 | boolean      | `false`         |
| extraConfig.labelization.overflow | 可选参数, 多个标签超出容器时候的预处理行为,值为`'normal' | 'scroll-y' | 'multiple-line' | string` 对应默认隐藏,纵向滚动、自动变多行 和自定义类| string      | `''`         |
| extraConfig.labelization.containnerMaxHeight | 可选参数, 限制容器最高高度。 多行模式下默认不限制高度,单行模式下默认为1.8em | string      | `'1.8em'`/`不限制`         |
| extraConfig.labelization.labelMaxWidth | 可选参数下, 限制标签宽度,默认值为行宽的100% | string      | `'100%'`         |
| extraConfig.selectedItemWithTemplate|可选参数,在单选情况下,显示选项使用了template的情况下,顶部选中的内容是否也以template展示,参考示例| Object      | 不适用        |
| extraConfig.selectedItemWithTemplate.enable | 可选参数下的必填参数, 是否启用选中项使用模板,使用必须置为true,参考示例| boolean      | `无`         |
| optionDisabledKey| 可选,禁用单个选项;当传入资源options类型为`objectObj`,比如设置为`'disabled'`,则当对象的disable属性为true时,该选项将禁用;当设置为''时不禁用单个选项| string      | `''`         |
| optionImmutableKey|可选,禁用单个选项;当传入资源options类型为`objectObj`,比如设置为`'immutable'`,则当对象的immutable属性为true时,该选项将禁被禁止变更;当设置为''时不生效 | string      | `''`         |
| noResultItemTemplate | 可选,没有匹配项的展示结果 | TemplateRef      | `无`         |
| keepMultipleOrder | 可选,配置多选的时候是否维持原数组排序还是用户选择的顺序排序,默认是用户顺序| `'origin'`源数组排序,`'user-select'`用户选择顺序排序    | `'user-select'`         |
| customViewTemplate | 可选, 支持自定义区域显示内容定制 | TemplateRef      | `无`         |
