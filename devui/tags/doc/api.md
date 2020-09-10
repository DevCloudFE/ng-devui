### d-tag 参数

|        参数        |     类型      | 默认  | 说明                                                                                                                                                                | 跳转 Demo                                |
| :----------------: | :-----------: | :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
|        tag         |   `string`    |  --   | 必选，记录输入的标签和选择的标签                                                                                                                                    | [单个标签](/components/tags/demo#single-tag) |
|    titleContent    |   `string`    |  --   | 可选，设置鼠标悬浮时 title 的显示内容                                                                                                                               | [单个标签](/components/tags/demo#single-tag) |
|     labelStyle     |   `string`    |  ''   | 可选，标签的样式 可使用'blue-w98'、'aqua-w98' 、'olivine-w98' 、'green-w98' 、'yellow-w98' 、'orange-w98'、'pink-w98'、'red-w98'、'purple-w98',或可传入自定义 class | [单个标签](/components/tags/demo#single-tag) |
|     deletable      |   `boolean`   | false | 可选，设置标签是否可删除                                                                                                                                            | [单个标签](/components/tags/demo#single-tag) |
| customViewTemplate | `TemplateRef` |  --   | 可选，自定义标签模板                                                                                                                                                | [单个标签](/components/tags/demo#single-tag) |

### d-tag 事件

| 事件名称  |             类型             | 说明                      | 跳转 Demo                                |
| :-------: | :--------------------------: | :------------------------ | ---------------------------------------- |
| tagDelete | `EventEmitter<{ tag: tag }>` | 删除 tag 的时候触发的事件 | [单个标签](/components/tags/demo#single-tag) |

### d-tags 参数

|      参数       |   类型    | 默认  | 说明                                         | 跳转 Demo                                |
| :-------------: | :-------: | :---: | :------------------------------------------- | ---------------------------------------- |
|      tags       |  `Array`  |  []   | 必选，记录输入的标签和选择的标签             | [标签组](/components/tags/demo#tags-group) |
| displayProperty | `string`  |  ''   | 可选，设置属性名，使得标签名为该属性对应的值 | [标签组](/components/tags/demo#tags-group) |
|    deletable    | `boolean` | false | 可选，设置标签是否可删除                     | [标签组](/components/tags/demo#tags-group) |
|  titleProperty  | `string`  |  ''   | 可选，设置属性名，鼠标悬浮时 title 显示的值  | [标签组](/components/tags/demo#tags-group) |

### d-tags 事件

| 事件名称  |                    类型                    | 说明                          | 跳转 Demo                                |
| :-------: | :----------------------------------------: | :---------------------------- | ---------------------------------------- |
| tagDelete | `EventEmitter<{ tag: tag, index: index }>` | 删除某个 tag 的时候触发的事件 | [标签组](/components/tags/demo#tags-group) |
