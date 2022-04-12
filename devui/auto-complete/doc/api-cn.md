# 如何使用

在 module 中引入：

```ts
import { AutoCompleteModule } from 'ng-devui/auto-complete';
```

在页面中使用：

```html
<xxx dAutoComplete></xxx>
```

# dAutoComplete

## dAutoComplete 参数

|          参数          |                        类型                         |                       默认                       |                                                                              说明                                                                               | 跳转 Demo                              | 全局配置项 |
| :--------------------: | :-------------------------------------------------: | :----------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------- | ---------- |
|         source         |                    `Array<any>`                     |                        --                        |                                                              必选，有 searchFn 的情况下可以不必选                                                               | [基本用法](demo#basic-usage)           |
| allowEmptyValueSearch  |                      `boolean`                      |                      false                       |                                                     可选，在绑定的输入框 value 为空时，是否进行搜索提示操作                                                     | [自定义模板展示](demo#auto-custom)     |
|      appendToBody      |                      `boolean`                      |                      false                       |                                                                可选，下拉弹出是否 append to body                                                                | [自定义模板展示](demo#auto-custom)     |
| appendToBodyDirections | `Array<AppendToBodyDirection \| ConnectedPosition>` | `['rightDown', 'leftDown', 'rightUp', 'leftUp']` |                               可选，方向数组优先采用数组里靠前的位置，AppendToBodyDirection 和 ConnectedPosition 请参考 dropdown                                | [自定义模板展示](demo#auto-custom)     |
|        disabled        |                      `boolean`                      |                      false                       |                                                                       可选，是否禁止指令                                                                        | [设置禁用](demo#auto-disable)          |
|         delay          |                      `number`                       |                       300                        |                                                 可选，只有在 delay 时间经过后并且输入新值，才做搜索查询（`ms`）                                                 | [自定义模板展示](demo#auto-custom)     |
|      disabledKey       |                      `string`                       |                        --                        | 可选，禁用单个选项，当传入资源 source 选项类型为对象，比如设置为'disabled'，则当对象的 disable 属性为 true 时，比如{ label: xxx, disabled: true }，该选项将禁用 | [设置禁用](demo#auto-disable)          |
|      itemTemplate      |                    `TemplateRef`                    |                        --                        |                                                                      可选，自定义展示模板                                                                       | [自定义模板展示](demo#auto-custom)     |
|  noResultItemTemplate  |                    `TemplateRef`                    |                        --                        |                                                                   可选，没有匹配项的展示结果                                                                    | [自定义模板展示](demo#auto-custom)     |
|       formatter        |               `(item: any) => string`               |     [`defaultFormatter`](#defaultformatter)      |                                                                        可选，格式化函数                                                                         | [设置禁用](demo#auto-disable)          |
|      isSearching       |                      `boolean`                      |                      false                       |                                                     可选，是否在搜索中，用于控制 searchingTemplate 是否显示                                                     | [自定义模板展示](demo#auto-custom)     |
|   searchingTemplate    |                    `TemplateRef`                    |                        --                        |                                                                   可选，自定义搜索中显示模板                                                                    | [自定义模板展示](demo#auto-custom)     |
|       sceneType        |                      `string`                       |                        --                        |                                                                 可选，值为 'select'、'suggest'                                                                  | [启用懒加载](demo#auto-lazy-load)      |
|        searchFn        |        `(term: string) => Observable<any[]>`        |      [`defaultSearchFn`](#defaultsearchfn)       |                                                                      可选，自定义搜索过滤                                                                       | [自定义数据匹配方法](demo#auto-object) |
|        tipsText        |                      `string`                       |                    '最近输入'                    |                                                                         可选，提示文字                                                                          | [设置禁用](demo#auto-disable)          |
|      latestSource      |                    `Array<any>`                     |                        --                        |                                                                         可选， 最近输入                                                                         | [最近输入](demo#auto-latest)           |
|      valueParser       |                `(item: any) => any`                 |    [`defaultValueParse`](#defaultvalueparse)     |                                                                   可选， 对选中后数据进行处理                                                                   | [启用懒加载](demo#auto-lazy-load)      |
|     enableLazyLoad     |                      `boolean`                      |                      false                       |                                                                      可选，是否允许懒加载                                                                       | [启用懒加载](demo#auto-lazy-load)      |
|   dAutoCompleteWidth   |                      `number`                       |                        --                        |                                                                     可选，调整宽度（`px`）                                                                      |
|     showAnimation      |                      `boolean`                      |                       true                       |                                                                       可选，是否开启动画                                                                        |                                        | ✔          |
|       maxHeight        |                      `number`                       |                      `300`                       |                                                                     可选，提示框的最大高度                                                                      |                                        |
|   cdkOverlayOffsetY    |                      `number`                       |                       `0`                        |                                                           可选，appendToBody 为 true 时，Y 轴的偏移量                                                           |

## dAutoComplete 事件

|        参数         |                                         类型                                         |                                                                     说明                                                                     | 跳转 Demo                         |
| :-----------------: | :----------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------- |
|      loadMore       |               `EventEmitter<ComponentRef<AutoCompletePopupComponent>>`               | 可选，懒加载触发事件，配合`enableLazyLoad`使用，使用`$event.loadFinish()`关闭 loading 状态，其中\$event 为 AutoCompletePopupComponent 的实例 | [启用懒加载](demo#auto-lazy-load) |
|     selectValue     |                                 `EventEmitter<any>`                                  |                                                         可选，选择选项之后的回调函数                                                         | [启用懒加载](demo#auto-lazy-load) |
| transInputFocusEmit | `EventEmitter<{focus: boolean, popupRef: ComponentRef<AutoCompletePopupComponent>}>` |                                                         可选，Input focus 时回调函数                                                         | [启用懒加载](demo#auto-lazy-load) |
|    toggleChange     |                               `EventEmitter<boolean>`                                |                                                    可选，触发下拉开关时，返回下拉是否开启                                                    |

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
