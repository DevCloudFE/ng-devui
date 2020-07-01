## d-splitter 参数

|      参数       |            类型            |     默认     | 说明                                                        | 跳转 Demo                                         |
| :-------------: | :------------------------: | :----------: | :---------------------------------------------------------- | ------------------------------------------------- |
|   orientation   | `'vertical'\|'horizontal'` | 'horizontal' | 可选，指定 Splitter 分割方向,可选值'vertical'\|'horizontal' | [基本用法](/components/splitter/demo#basic-usage) |
|  splitBarSize   |          `string`          |    '2px'     | 可选，分隔条大小，默认 2px                                  | [基本用法](/components/splitter/demo#basic-usage) |
| disabledBarSize |          `string`          |    '1px'     | 可选，pane 设置不可调整宽度时生效                           | [垂直布局用法](/components/splitter/demo#vertical-layout)              |

## d-splitter-pane 参数

|       参数        |            类型             |  默认  | 说明                                                  | 跳转 Demo                                                              |
| :---------------: | :-------------------------: | :----: | :---------------------------------------------------- | ---------------------------------------------------------------------- |
|       size        |          `string`           |   --   | 可选，指定 pane 宽度，设置像素值或者百分比            | [基本用法](/components/splitter/demo#basic-usage)                      |
|      minSize      |          `string`           |   --   | 可选，指定 pane 最小宽度，设置像素值或者百分比        | [基本用法](/components/splitter/demo#basic-usage)                      |
|      maxSize      |          `string`           |   --   | 可选，指定 pane 最大宽度，设置像素值或者百分比        | [基本用法](/components/splitter/demo#basic-usage)                      |
|     resizable     |          `boolean`          |  true  | 可选，指定 pane 是否可调整大小，会影响相邻 pane       | [垂直布局用法](/components/splitter/demo#vertical-layout)              |
|    collapsible    |          `boolean`          | false  | 可选，指定 pane 是否可折叠收起                        | [基本用法](/components/splitter/demo#basic-usage)                      |
|     collapsed     |          `boolean`          | false  | 可选，指定 pane 初始化是否收起，配合`collapsible`使用 | [垂直布局用法](/components/splitter/demo#vertical-layout)              |
| collapseDirection | `'before'\|'after'\|'both'` | 'both' | 可选，指定非边缘 pane 收起方向，配合`collapsible`使用 | [指定折叠收起方向](/components/splitter/demo#certain-unfold-direction) |

## d-splitter-pane 事件

|      事件       |          类型           |                    说明                     | 跳转 Demo                                         |
| :-------------: | :---------------------: | :-----------------------------------------: | ------------------------------------------------- |
|   sizeChange    | `EventEmitter<string>`  | 大小变动时，返回改变后的值,像素值或者百分比 | [基本用法](/components/splitter/demo#basic-usage) |
| collapsedChange | `EventEmitter<boolean>` |    折叠和展开时，返回当前 pane 是否折叠     | [基本用法](/components/splitter/demo#basic-usage) |
