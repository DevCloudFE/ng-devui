# 如何使用

在 module 中引入：

```ts
import { MultiAutoCompleteModule } from 'ng-devui/multi-auto-complete';
```

在页面中使用：

```html
<d-multi-auto-complete></d-multi-auto-complete>
```

## d-multi-auto-complete

### d-multi-auto-complete 参数

- 本组件基于 dAutoComplete 实现，itemTemplate、noResultItemTemplate 等参数使用方式与 dAutoComplete 一致（此类参数使用 Demo 跳转参考 dAutoComplete 使用）。

| 参数                   | 类型                                                | 默认                                             | 说明                                                                                                                                                             | 跳转 Demo                                  | 全局配置项 |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| appendToBody           | `boolean`                                           | --                                               | 可选，是否 appendToBody                                                                                                                                          | [基本用法](demo#basic-usage)               |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` | 可选，方向数组优先采用数组里靠前的位置，AppendToBodyDirection 和 ConnectedPosition 请参考 dropdown                                                               | [基本用法](demo#basic-usage)               |
| width                  | `number`                                            | --                                               | 可选，控制下拉框宽度，搭配 appendToBody 使用（`px`）                                                                                                             |                                            |
| disabled               | `boolean`                                           | --                                               | 可选，是否禁用                                                                                                                                                   | [使用禁用](demo#auto-complete-disabled)    |
| disabledKey            | `string`                                            | --                                               | 可选，禁用单个选项，当传入资源 source 选项类型为对象，比如设置为'disabled'，则当对象的 disabled 属性为 true 时，比如{ label: xxx, disabled: true }，该选项将禁用 | [设置禁用](demo#auto-disable)              |
| source                 | `Array<any>`                                        | --                                               | 可选，数据列表                                                                                                                                                   | [基本用法](demo#basic-usage)               |
| itemTemplate           | `TemplateRef`                                       | --                                               | 可选，下拉选项模板                                                                                                                                               | [自定义模板展示](demo#auto-custom)         |
| noResultItemTemplate   | `TemplateRef`                                       | --                                               | 可选，结果不存在时的显示模板                                                                                                                                     | [自定义模板展示](demo#auto-custom)         |
| delay                  | `number`                                            | 300                                              | 可选，输入结束 delay 毫秒后启动查询（`ms`）                                                                                                                      | [自定义模板展示](demo#auto-custom)         |
| searchFn               | `(term: string) => Observable<any[]>`               | [`defaultSearchFn`](#defaultsearchfn)            | 可选，自定义搜索过滤                                                                                                                                             | [自定义匹配方法](demo#auto-complete-array) |
| formatter              | `(item: any) => string`                             | [`defaultFormatter`](#defaultformatter)          | 可选，对 item 的数据进行自定义显示内容，默认显示 item.label 或 item.toString()                                                                                   | [设置禁用](demo#auto-disable)              |
| valueParser            | `(item: any) => any`                                | [`defaultValueParse`](#defaultvalueparse)        | 可选，对选中数据进行转化                                                                                                                                         | [启用懒加载](demo#auto-lazy-load)          |
| tipsText               | `string`                                            | --                                               | 可选，提示文字                                                                                                                                                   | [设置禁用](demo#auto-disable)              |
| placeholder            | `string`                                            | --                                               | 可选，placeholder                                                                                                                                                | [基本用法](demo#basic-usage)               |
| latestSource           | `Array<any>`                                        | --                                               | 可选， 最近输入                                                                                                                                                  | [最近输入](demo#auto-latest)               |
| showAnimation          | `boolean`                                           | true                                             | 可选，是否开启动画                                                                                                                                               |                                            | ✔          |
| cssClass               | `string`                                            | --                                               | 可选，输入框的 className                                                                                                                                         |
| showGlowStyle          | `boolean`                                           | true                                             | 可选，是否显示悬浮发光效果                                                                                                                                       |
| retainInputValue       | `boolean`                                           | false                                            | 可选，是否在创建标签后清除输入                                                                                                                                   |

### d-multi-auto-complete 事件

| 参数       | 类型                | 默认 | 说明                                               | 跳转 Demo                                  |
| ---------- | ------------------- | ---- | -------------------------------------------------- | ------------------------------------------ |
| autoSubmit | `EventEmitter<any>` | --   | 可选，当前已选择数据发生变化时，回传当前已选择数据 | [自定义匹配方法](demo#auto-complete-array) |

## 接口 & 类型定义

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
