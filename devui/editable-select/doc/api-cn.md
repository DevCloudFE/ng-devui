# 如何使用

在 module 中引入：

```ts
import { EditableSelectModule } from 'ng-devui/editable-select';
```

在页面中使用：

```html
<d-editable-select></d-editable-select>
```

# d-editable-select

## d-editable-select 参数

| 参数                   | 类型                                                | 默认                                             | 说明                                                                                               | 跳转 Demo                                     | 全局配置项 |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------- |
| appendToBody           | `boolean`                                           | false                                            | 可选，下拉是否 appendToBody                                                                        | [基本用法](demo#basic-usage)                  |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 可选，方向数组优先采用数组里靠前的位置，AppendToBodyDirection 和 ConnectedPosition 请参考 dropdown | [基本用法](demo#basic-usage)                  |
| width                  | `number`                                            | --                                               | 可选，控制下拉框宽度，搭配 appendToBody 使用（`px`）                                               |
| ngModel                | `any`                                               | --                                               | 可选，绑定选中对象，可双向绑定                                                                     | [基本用法](demo#basic-usage)                  |
| source                 | `Array<any>`                                        | --                                               | 必选，数据列表                                                                                     | [基本用法](demo#basic-usage)                  |
| allowClear             | `boolean`                                           | false                                            | 可选，是否允许清除                                                                                 | [基本用法](demo#basic-usage)                  |
| disabled               | `boolean`                                           | false                                            | 可选，值为 true 禁用下拉框                                                                         |
| disabledKey            | `string`                                            | --                                               | 可选，设置禁用选项的 Key 值                                                                        | [设置禁用选项](demo#disable-data-with-source) |
| formatter              | `(item: any) => string`                             | [`defaultFormatter`](#defaultformatter)          | 可选，格式化函数                                                                                   |                                               |
| valueParser            | `(item: any) => any`                                | [`defaultValueParse`](#defaultvalueparse)        | 可选， 对选中后数据进行处理                                                                        |                                               |
| placeholder            | `string`                                            | ''                                               | 可选，没有选中项的时候提示文字                                                                     |
| itemTemplate           | `TemplateRef`                                       | --                                               | 可选，下拉菜单条目的模板                                                                           |
| noResultItemTemplate   | `TemplateRef`                                       | --                                               | 可选，下拉菜单条目搜索后没有结果的模板                                                             |
| maxHeight              | `number`                                            | --                                               | 可选，下拉菜单的最大高度（`px`）                                                                   | [基本用法](demo#basic-usage)                  |
| searchFn               | `(term: string) => Observable<any[]>`               | [`defaultSearchFn`](#defaultsearchfn)            | 可选，自定义搜索函数                                                                               | [自定义匹配方法](demo#with-search-function)   |
| enableLazyLoad         | `boolean`                                           | false                                            | 可选，是否允许懒加载                                                                               | [数据懒加载](demo#lazy-load)                  |
| showAnimation          | `boolean`                                           | true                                             | 可选，是否开启动画                                                                                 |                                               | ✔          |

## d-editable-select 事件

| 事件         | 类型                                                     | 说明                                                                                                                                   | 跳转 Demo                    |
| ------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| loadMore     | `EventEmitter<ComponentRef<AutoCompletePopupComponent>>` | 懒加载触发事件，配合`enableLazyLoad`使用，使用`$event.loadFinish()`关闭 loading 状态，其中\$event 为 AutoCompletePopupComponent 的实例 | [数据懒加载](demo#lazy-load) |
| toggleChange | `EventEmitter<boolean>`                                  | 可选，输出函数，下拉打开关闭 toggle 事件                                                                                               | [基本用法](demo#basic-usage) |

# 接口 & 类型定义

### defaultSearchFn

```ts
defaultSearchFn = (term) => {
  return of(this.source.filter((lang) => this.formatter(lang).toLowerCase().indexOf(term.toLowerCase()) !== -1));
};
```

term 为输入的关键字。

### defaultFormatter

```ts
defaultFormatter = (item) => (item ? item.label || item.toString() : '');
```

item 为数据项。

### defaultValueParse

```ts
defaultValueParse = (item) => item;
```

item 为数据项。
