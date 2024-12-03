# 如何使用

在 module 中引入：

```ts
import { TagsInputModule } from 'ng-devui/tags-input';
```

在页面中使用：

```html
<d-tags-input></d-tags-input>
```

## TagsInput

### d-tags-input 参数

| 参数                                                        | 类型                            | 默认                    | 说明                                                                                                  | 跳转 Demo                       | 全局配置项 |
| ----------------------------------------------------------- | ------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| tags                                                        | `Array`                         | []                      | 必选，记录输入的标签和选择的标签列表                                                                  | [基本用法](demo#basic-usage)    |
| displayProperty                                             | `string`                        | 'name'                  | 可选，列表项使用的属性名                                                                              | [基本用法](demo#basic-usage)    |
| placeholder                                                 | `string`                        | ''                      | 可选，输入框的 placeholder                                                                            | [基本用法](demo#basic-usage)    |
| maxPlaceholder                                              | `string`                        | '已达到最大个数：'      | 可选，当输入标签达到最大个数时输入框的 placeholder，设置为空字符串时不显示                            |                                 |
| minLength                                                   | `number`                        | 3                       | 可选，输入标签内容的最小长度                                                                          | [基本用法](demo#basic-usage)    |
| maxLength                                                   | `number`                        | 524288                  | 可选，输入标签内容的最大长度                                                                          | [基本用法](demo#basic-usage)    |
| minTags                                                     | `number`                        | 0                       | 可选，可输入标签的最小个数                                                                            | [基本用法](demo#basic-usage)    |
| maxTags                                                     | `number`                        | Number.MAX_SAFE_INTEGER | 可选，可输入标签的最大个数                                                                            | [基本用法](demo#basic-usage)    |
| caseSensitivity                                             | `boolean`                       | false                   | 可选，大小写敏感，默认忽略大小写                                                                      | [基本用法](demo#basic-usage)    |
| spellcheck                                                  | `boolean`                       | true                    | 可选，input 输入框是否开启拼写检查的                                                                  | [基本用法](demo#basic-usage)    |
| isAddBySpace                                                | `boolean`                       | true                    | 可选，是否支持空格键输入标签                                                                          | [基本用法](demo#basic-usage)    |
| isAddBySpace                                                | `boolean`                       | true                    | 可选，是否支持空格键输入标签                                                                          | [基本用法](demo#basic-usage)    |
| showSuggestion                                              | `boolean`                       | true                    | 可选，是否不显示下拉列表，只能通过输入添加标签                                                        | [基本用法](demo#basic-usage)    |
| suggestionList                                              | `Array`                         | []                      | 可选，下拉选项，默认可选择的标签列表                                                                  | [基本用法](demo#basic-usage)    |
| <span style="white-space:nowrap">checkBeforeGenerate</span> | `Function`                      | --                      | 可选，自定义校验函数，类型为(newTag: string) => boolean，用于判断是否允许生成选项                     | [自定义](demo#customize)        |
| checkBeforeAdd                                              | `Function\|Promise\|Observable` | --                      | 可选，自定义校验函数，类型为(newTag: string) => boolean 或者 Promise<boolean>或者 Observable<boolean> | [自定义](demo#customize)        |
| disabled                                                    | `boolean`                       | false                   | 可选，disabled 灰化状态                                                                               | [基本用法](demo#basic-usage)    |
| showAnimation                                               | `boolean`                       | true                    | 可选，是否开启动画                                                                                    |                                 | ✔          |
| appendToBody                                                | `boolean`                       | false                   | 可选，下拉弹出是否 append to body                                                                     | [自定义](demo#customize)        |
| itemTemplate                                                | `TemplateRef`                   | --                      | 可选，自定义选项展示模板                                                                              | [自定义](demo#customize)        |
| tagTemplate                                                 | `TemplateRef`                   | --                      | 可选，自定义标签展示模板                                                                              | [自定义](demo#customize)        |
| noResultItemTemplate                                        | `TemplateRef`                   | --                      | 可选，自定义没有匹配项的展示结果                                                                      |                                 |
| virtualScroll                                               | `boolean`                       | false                   | 可选，是否虚拟滚动，大数据量场景使用                                                                  | [虚拟滚动](demo#virtual-scroll) |
| multiline                                                   | `boolean`                       | true                    | 可选，组件是否按两行显示。为 true 时配合 maxHeight 使用，可控制选中标签是否按多行显示                 | [基本用法](demo#basic-usage)    |
| maxHeight                                                   | `string`                        | --                      | 可选，已选中标签容器最大高度                                                                          | [基本用法](demo#basic-usage)    |
| generateOptionFromInput                                     | `boolean`                       | true                    | 可选，是否允许将输入内容添加为新选项                                                                  | [基本用法](demo#basic-usage)    |

### d-tags-input 事件

| 事件         | 类型                | 说明                                                                                                          | 跳转 Demo                    |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| valueChange  | `EventEmitter<any>` | 当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请使用(ngModelChange) | [基本用法](demo#basic-usage) |
| searchChange | `EventEmitter<any>` | 输入框内容变化时触发，返回输入值                                                                              | [自定义](demo#customize)     |
