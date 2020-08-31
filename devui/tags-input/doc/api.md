### d-tags-input 参数

|      参数       |              类型               |          默认           | 说明                                                                                                  | 跳转 Demo                                       |
| :-------------: | :-----------------------------: | :---------------------: | :---------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
|      tags       |             `Array`             |           []            | 必选，记录输入的标签和选择的标签列表                                                                  | [基本用法](/components/tags-input/demo#basic-usage) |
| displayProperty |            `string`             |         'name'          | 可数，列表项使用的属性名                                                                              | [基本用法](/components/tags-input/demo#basic-usage) |
|   placeholder   |            `boolean`            |           ''            | 可选，输入框的 placeholder                                                                            | [基本用法](/components/tags-input/demo#basic-usage) |
|    minLength    |            `number`             |            3            | 可选，输入标签内容的最小长度                                                                          | [基本用法](/components/tags-input/demo#basic-usage) |
|    maxLength    |            `number`             | Number.MAX_SAFE_INTEGER | 可选，输入标签内容的最大长度                                                                          | [基本用法](/components/tags-input/demo#basic-usage) |
|     maxTags     |            `number`             | Number.MAX_SAFE_INTEGER | 可选，可输入标签的最大个数                                                                            | [基本用法](/components/tags-input/demo#basic-usage) |
| caseSensitivity |            `boolean`            |          false          | 可选，大小写敏感，默认忽略大小  | [基本用法](/components/tags-input/demo#basic-usage) |写                                                                      |
|   spellcheck    |            `boolean`            |          true           | 可选，input 输入框的 | [基本用法](/components/tags-input/demo#basic-usage) |spellcheck                                                                       |
|  isAddBySpace   |            `boolean`            |          true           | 可选，是否支持空格键输入标 | [基本用法](/components/tags-input/demo#basic-usage) |签                                                                          |
| suggestionList  |             `Array`             |           []            | 可选，下拉选项，默认可选择的标签列表                                                                  | [基本用法](/components/tags-input/demo#basic-usage) |
| checkBeforeAdd  | `Function\|Promise\|Observable` |           无            | 可选，自定义校验函数，类型为(newTag: string) => boolean 或者 Promise<boolean>或者 Observable<boolean> | [基本用法](/components/tags-input/demo#basic-usage) |
|    disabled     |            `boolean`            |          false          | 可选，disabled 灰化状态                                                                               | [基本用法](/components/tags-input/demo#basic-usage) |

备注：除传入`tags`方式实现外，还可采用`ngModel`绑定数组的方式，详细使用示例参考[双向绑定](/components/tags-input/demo#ng-model)。

### d-tags-input 事件

|    事件     |        类型         | 说明                                                                                                          | 跳转 Demo                                       |
| :---------: | :-----------------: | :------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| valueChange | `EventEmitter<any>` | 当选中某个选项项后，将会调用此函数，参数为当前选择项的值。如果需要获取所有选择状态的值，请使用(ngModelChange) | [基本用法](/components/tags-input/demo#basic-usage) |
