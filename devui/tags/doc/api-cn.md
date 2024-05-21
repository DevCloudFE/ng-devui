# 如何使用

在 module 中引入：

```ts
import { TagsModule } from 'ng-devui/tags';
```

在页面中使用：

```html
<d-tag [tag]="'默认标签颜色'"></d-tag>
```

## Tags

### d-tag 参数

| 参数               | 类型                                                             | 默认值                                            | 描述                                                                                                                                                                | 跳转 Demo                   | 全局配置项 |
| ------------------ | ---------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------- |
| tag                | `string`                                                         | --                                                | 必选，记录输入的标签和选择的标签                                                                                                                                    | [单个标签](demo#single-tag) |
| mode               | `ITagMode`                                                       | <span style="white-space:nowrap">'default'</span> | 可选，标签的类型，可选值：`'default' \| 'checkable' \| 'closeable'`                                                                                                 | [单个标签](demo#single-tag) |
| size               | `ITagSize`                                                       | 'md'                                              | 可选，标签的尺寸，可选值：`'md' \| 'lg'`                                                                                                                            | [单个标签](demo#single-tag) |
| titleContent       | `string`                                                         | --                                                | 可选，设置鼠标悬浮时 title 的显示内容                                                                                                                               | [单个标签](demo#single-tag) |
| labelStyle         | `string`                                                         | ''                                                | 可选，标签的样式，可使用'blue-w98'、'aqua-w98' 、'olivine-w98' 、'green-w98' 、'yellow-w98' 、'orange-w98'、'pink-w98'、'red-w98'、'purple-w98'，或传入自定义 class | [单个标签](demo#single-tag) |
| deletable          | `boolean`                                                        | false                                             | 可选，设置标签是否可删除                                                                                                                                            | [单个标签](demo#single-tag) |
| customViewTemplate | `TemplateRef`                                                    | --                                                | 可选，自定义标签模板                                                                                                                                                | [单个标签](demo#single-tag) |
| checked            | `boolean`                                                        | false                                             | 可选，标签选中的初始状态                                                                                                                                            | [单个标签](demo#single-tag) |
| customColor        | `string`                                                         | ''                                                | 可选，传入颜色字符串（如'#f50'），自定义彩色标签的颜色                                                                                                              | [单个标签](demo#single-tag) |
| maxWidth           | `string`                                                         | --                                                | 可选，标签最大宽度，超出文字会省略并出现省略号                                                                                                                      | [单个标签](demo#single-tag) |
| beforeDelete       | `(tag?: string)=>boolean\|Promise<boolean>\|Observable<boolean>` | --                                                | 可选，删除之前的回调                                                                                                                                                |

### d-tag 事件

| 事件名称      | 类型                                       | 描述                         | 跳转 Demo                   |
| ------------- | ------------------------------------------ | ---------------------------- | --------------------------- |
| tagDelete     | `EventEmitter<{ tag: tag, event: event }>` | 删除标签时触发事件           | [单个标签](demo#single-tag) |
| checkedChange | `EventEmitter<boolean>`                    | 标签的选中状态改变时触发事件 |                             |

### d-tags 参数

| 参数            | 类型                                                             | 默认值    | 描述                                                       | 跳转 Demo                        |
| --------------- | ---------------------------------------------------------------- | --------- | ---------------------------------------------------------- | -------------------------------- |
| tags            | `Array`                                                          | []        | 必选，记录输入的标签和选择的标签                           | [标签组](demo#tags-group)        |
| mode            | `ITagMode`                                                       | 'default' | 可选，标签的类型 `'default' \| 'checkable' \| 'closeable'` | [标签组](demo#tags-group)        |
| size            | `ITagSize`                                                       | 'md'      | 可选，标签的尺寸，可选值：`'md' \| 'lg'`                   | [标签组](demo#single-tag)        |
| displayProperty | `string`                                                         | ''        | 可选，设置属性名，使得标签名为该属性对应的值               | [标签组](demo#tags-group)        |
| deletable       | `boolean`                                                        | false     | 可选，设置标签是否可删除                                   | [标签组](demo#tags-group)        |
| titleProperty   | `string`                                                         | ''        | 可选，设置属性名，鼠标悬浮时 title 显示的值                | [标签组](demo#tags-group)        |
| hideBeyondTags  | `boolean`                                                        | false     | 可选，标签组总宽度超过父级宽度是否隐藏超出标签             | [多标签超出隐藏](demo#hide-tags) |
| beforeDelete    | `(tag?: string)=>boolean\|Promise<boolean>\|Observable<boolean>` | --        | 可选，删除之前的回调                                       |

### d-tags 事件

| 事件名称      | 类型                                                       | 描述                         | 跳转 Demo                 |
| ------------- | ---------------------------------------------------------- | ---------------------------- | ------------------------- |
| tagDelete     | `EventEmitter<{ tag: tag, index: index, event: event }>`   | 删除标签时触发事件           | [标签组](demo#tags-group) |
| checkedChange | `EventEmitter<{ tag: tag, index: index, checked: event }>` | 标签的选中状态改变时触发事件 |                           |
