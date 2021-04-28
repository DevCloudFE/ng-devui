# 如何使用

在module中引入：

```ts
import { MentionModule } from 'ng-devui/mention';
```

在页面中使用：

```xml
<xxx dMention xxx [suggestions]="suggestions"></xxx>
```

# mention
## mention 参数

|    参数    |          类型          | 默认值 | 描述                                                                        | 跳转 Demo                                                     |
| :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
|  mentionPosition   |       `'top' \| 'bottom'`        | `bottom` | 可选，建议框位置                                                  | -- |
|   mentionSuggestions   | `[]` |  --  | 必选，建议数据源 | [基本用法](demo#basic-usage)     |
|    mentionNotFoundContent   |        `string`        |  `'No suggestion matched' ` | 可选，用于在没有匹配到数据的时候的提示                                                | --     |
|   mentionLoading    |        `boolean`        |  `false`  | 可选，异步加载数据源的时候是否显示loading效果                                           | [异步用法](demo#async-usage) |
|   mentionItemTemplate   |        `TemplateRef`        |  --  | 可选，自定义建议模板                                               | [自定义模板](demo#custom-template) |
|   dmValueParse   |        `(value: string) => string = (value) => value;`        |  --  | 可选，建议选项的取值方法                                              | [自定义模板](demo#custom-template) |
|   mentionTrigger   |        `string[]`        |  `['@']`  | 可选，触发组件的前缀符                                            | [自定义前缀](demo#custom-prefix) |

## mention 事件

|    参数    |          类型          | 默认值 | 描述                                                                        | 跳转 Demo                                                     |
| :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
|    mentionSelectItem    |      `any`          |  --  | 可选，触发选中建议                                               | [基本用法](demo#basic-usage)    |
|    mentionAfterMentionInit    |      --          |  --  | 可选，在指令初始化之后返回指令实例                                               | [基本用法](demo#basic-usage)     |
|    mentionSearchChange    |      [`EventEmitter<MentionOnSearchTypes>`](#MentionOnSearchTypes)          |  --  | 可选，输入框change事件                                              | [自定义前缀](demo#custom-prefix)     |

# 接口 & 类型定义

### MentionOnSearchTypes

```ts
export interface MentionOnSearchTypes {
  value: string;
  trigger: string;
}
```