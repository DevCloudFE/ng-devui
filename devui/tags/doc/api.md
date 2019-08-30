
### d-tag参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| tag       | `string`       |      --    | 必选，记录输入的标签和选择的标签 |
| titleContent       | `string`        | --         | 可选，设置鼠标悬浮时title的显示内容 |
| labelStyle    | `string`       | ''      | 可选，标签的样式 可使用'blue-w98'、'green-w98' 、'yellow-w98' 、'orange-w98'、'pink-w98'、'purple-w98'、'turquoise-w98','olivine-w98',或可传入自定义class |
| deletable    | `boolean`       | false      | 可选，设置标签是否可删除 |
| customViewTemplate    | `TemplateRef`       | --      | 可选，自定义标签模板 |

### d-tag事件
| 事件名称        | 类型      |   说明                 |
| :---------: | :----------: | :-------------------------|
| tagDelete    | { tag: tag }      | 删除tag的时候触发的事件 |

### d-tags参数
| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| tags        | `Array`        | []          | 必选，记录输入的标签和选择的标签 |
| displayProperty    | `string`      | ''      | 可选，设置属性名，使得标签名为该属性对应的值 |
| deletable    | `boolean`       | false      | 可选，设置标签是否可删除 |
| titleProperty    | `string`       | ''      | 可选，设置属性名，鼠标悬浮时title显示的值 |

### d-tags事件
| 事件名称        | 类型      |   说明                 |
| :---------: | :----------: | :-------------------------|
| tagDelete    | { tag: tag, index: index }      | 删除某个tag的时候触发的事件 |
