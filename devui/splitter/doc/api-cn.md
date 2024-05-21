# 如何使用
在module中引入：
```ts
import { SplitterModule } from 'ng-devui/splitter';
```
在页面中使用：
```html
<d-splitter>
  <d-splitter-pane></d-splitter-pane>
  <d-splitter-pane></d-splitter-pane>
</d-splitter>
```

# d-splitter

## d-splitter 参数

|      参数          |            类型            |     默认值    | 描述                                                        | 跳转 Demo                                         |全局配置项| 
| :----------------: | :----------------: | :------------------------: | :----------: | :---------------------------------------------------------- | ------------------------------------------------- |
|     orientation    | `'vertical'\|'horizontal'` | 'horizontal' | 可选，指定 Splitter 分割方向,可选值'vertical'\|'horizontal' | [基本用法](demo#basic-usage) |
|    splitBarSize    |          `string`          |    '2px'     | 可选，分隔条大小，默认 2px                                  | [基本用法](demo#basic-usage) |
|  disabledBarSize   |          `string`          |    '1px'     | 可选，pane 设置不可调整宽度时生效                           | [垂直布局用法](demo#vertical-layout)              |
| showCollapseButton |          `boolean`         |    true      | 可选，是否显示收起/展开按钮                                 | [折叠收缩显示菜单](demo#shrink-show-menu) |

## d-splitter 实例方法

提供主动折叠展开的方法toggleCollapsed(index: number),index为展开bar的序号。

# d-splitter-pane

## d-splitter-pane 参数

|       参数        |            类型             |  默认值 | 描述                                                  | 跳转 Demo                                                              |全局配置项|
| :----------------: | :---------------: | :-------------------------: | :----: | :---------------------------------------------------- | ---------------------------------------------------------------------- |
|       size        |          `string`           |   --   | 可选，指定 pane 宽度，设置像素值或者百分比            | [基本用法](demo#basic-usage)                      |
|      minSize      |          `string`           |   --   | 可选，指定 pane 最小宽度，设置像素值或者百分比        | [基本用法](demo#basic-usage)                      |
|      maxSize      |          `string`           |   --   | 可选，指定 pane 最大宽度，设置像素值或者百分比        | [基本用法](demo#basic-usage)                      |
|     resizable     |          `boolean`          |  true  | 可选，指定 pane 是否可调整大小，会影响相邻 pane       | [垂直布局用法](demo#vertical-layout)              |
|    collapsible    |          `boolean`          | false  | 可选，指定 pane 是否可折叠收起                        | [基本用法](demo#basic-usage)                      |
|     collapsed     |          `boolean`          | false  | 可选，指定 pane 初始化是否收起，配合`collapsible`使用 | [垂直布局用法](demo#vertical-layout)              |
| collapseDirection | `'before'\|'after'\|'both'` | 'both' | 可选，指定非边缘 pane 收起方向，配合`collapsible`使用 | [指定折叠收起方向](demo#certain-unfold-direction) |
|      shrink       |          `boolean`          |  false | 可选，是否在 pane 进行折叠后收缩 pane 宽度而非收起    | [折叠收缩显示菜单](demo#shrink-show-menu) |
|   shrinkWidth     |          `number`           |  36    | 可选，折叠后收缩的 pane 宽度 （单位：px）            | [折叠收缩显示菜单](demo#shrink-show-menu) |

## d-splitter-pane 事件

|      事件          |          类型           |                    描述                     | 跳转 Demo                                                     |
| :----------------: | :---------------------: | :-----------------------------------------: | -------------------------------------------------            |
|      sizeChange    | `EventEmitter<string>`  | 大小变动时，返回改变后的值,像素值或者百分比    | [基本用法](demo#basic-usage)             |
|   collapsedChange  | `EventEmitter<boolean>` |    折叠和展开时，返回当前 pane 是否折叠       | [基本用法](demo#basic-usage)             |
| shrinkStatusChange | `EventEmitter<boolean>` |    收缩和展开时，返回当前 pane 是否收缩       | [折叠收缩显示菜单](demo#shrink-show-menu) |
