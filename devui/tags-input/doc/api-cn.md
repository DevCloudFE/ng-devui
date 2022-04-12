# 如何使用

在 module 中引入：

```ts
import { TagsInputModule } from 'ng-devui/tags-input';
```

在页面中使用：

```html
<d-tags-input
  (click)="$event.stopPropagation()"
  [tags]="tagList"
  [suggestionList]="suggestionList"
  [caseSensitivity]="taskTagConfig.caseSensitivity"
  (valueChange)="getTagValue($event)"
  [checkBeforeAdd]="customCheck"
>
</d-tags-input>
```

# TagsInput

## d-tags-input 参数

|      参数       |              类型               |          默认           |                                                 说明                                                  | 跳转 Demo                       | 全局配置项 |
| :-------------: | :-----------------------------: | :---------------------: | :---------------------------------------------------------------------------------------------------: | :------------------------------ | ---------- |
|      tags       |             `Array`             |           []            |                                 必选，记录输入的标签和选择的标签列表                                  | [基本用法](demo#basic-usage)    |
| displayProperty |            `string`             |         'name'          |                                       可选，列表项使用的属性名                                        | [基本用法](demo#basic-usage)    |
|   placeholder   |            `boolean`            |           ''            |                                      可选，输入框的 placeholder                                       | [基本用法](demo#basic-usage)    |
|    minLength    |            `number`             |            3            |                                     可选，输入标签内容的最小长度                                      | [基本用法](demo#basic-usage)    |
|    maxLength    |            `number`             | Number.MAX_SAFE_INTEGER |                                     可选，输入标签内容的最大长度                                      | [基本用法](demo#basic-usage)    |
|     minTags     |            `number`             |            0            |                                      可选，可输入标签的最小个数                                       | [基本用法](demo#basic-usage)    |
|     maxTags     |            `number`             | Number.MAX_SAFE_INTEGER |                                      可选，可输入标签的最大个数                                       | [基本用法](demo#basic-usage)    |
| caseSensitivity |            `boolean`            |          false          |                                   可选，大小写敏感，默认忽略大小写                                    | [基本用法](demo#basic-usage)    |            |
|   spellcheck    |            `boolean`            |          true           |                                 可选，input 输入框是否开启拼写检查的                                  | [基本用法](demo#basic-usage)    |            |
|  isAddBySpace   |            `boolean`            |          true           |                                     可选，是否支持空格键输入标 签                                     | [基本用法](demo#basic-usage)    |            |
| suggestionList  |             `Array`             |           []            |                                 可选，下拉选项，默认可选择的标签列表                                  | [基本用法](demo#basic-usage)    |
| checkBeforeAdd  | `Function\|Promise\|Observable` |           无            | 可选，自定义校验函数，类型为(newTag: string) => boolean 或者 Promise<boolean>或者 Observable<boolean> | [基本用法](demo#basic-usage)    |
|    disabled     |            `boolean`            |          false          |                                        可选，disabled 灰化状态                                        | [基本用法](demo#basic-usage)    |
|  showAnimation  |            `boolean`            |          true           |                                          可选，是否开启动画                                           |                                 | ✔          |
|  appendToBody   |            `boolean`            |          false          |                                   可选，下拉弹出是否 append to body                                   | [双向绑定](demo#ng-model)       |
|  itemTemplate   |          `TemplateRef`          |           --            |                                       可选，自定义选项展示模板                                        | [双向绑定](demo#ng-model)       |
|  virtualScroll  |            `boolean`            |          false          |                                 可选，是否虚拟滚动，大数据量场景使用                                  | [虚拟滚动](demo#virtual-scroll) |
| multiline | `boolean` | true | 可选，是否两行显示 |
| maxHeight | `string` | -- | 可选，已选中标签容器最大高度 |

备注：除传入`tags`方式实现外，还可采用`ngModel`绑定数组的方式，详细使用示例参考[双向绑定](demo#ng-model)。

## d-tags-input 事件

|    事件     |        类型         | 说明                                                                                                          | 跳转 Demo                    |
| :---------: | :-----------------: | :------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| valueChange | `EventEmitter<any>` | 当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请使用(ngModelChange) | [基本用法](demo#basic-usage) |
