### d-popover 参数

|      参数      |                                    类型                                    |   默认    | 说明                                                                                                           | 跳转 Demo                                                  |
| :------------: | :------------------------------------------------------------------------: | :-------: | :------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
|    content     |                     `string\|HTMLElement\|TemplateRef`                     |    --     | 必选，弹出框的显示内容或模板引用                                                                               | [基本用法](demo#basic-usage)               |
|    visible     |                                 `boolean`                                  |   false   | 可选，弹框的初始化弹出状态                                                                                     | [手动控制显示](demo#manual-control-display)    |
|    trigger     |                             `'hover'\|'click'`                             |  'click'  | 弹框触发方式                                                                                                   | [鼠标移出宿主延迟时间](demo#hover-delay-time) |
|   controlled   |                                 `boolean`                                  |   false   | 可选，是否通过`trigger`方式触发弹框                                                                            | [基本用法](demo#basic-usage)               |
|    position    | `PositionType\|[PositionType]` |   ['top', 'right', 'bottom', 'left']  | 可选，内容弹出方向，以top-left为例，top是指从上边弹出，left是指左对齐，若不设置对齐方向默认为居中。如果传入数组形式，则当前将按照传入数组次序，自适应选取一个方向。                             | [弹出位置](demo#position)               |
|    popType     |         `'success' \| 'error' \| 'warning' \| 'info' \| 'default'`         | 'default' | 可选，弹出框类型，样式不同                                                                                     | [基本用法](demo#basic-usage)               |
|  popMaxWidth   |                                  `number`                                  |    --     | 可选，限制弹出框最大宽度（`px`）                                                                               | [自定义提示内容](demo#custom-prompt-content) |
|  showAnimate   |                                 `boolean`                                  |   false   | 可选，是否显示动画                                                                                             | [基本用法](demo#basic-usage)               |
|  appendToBody  |                                 `boolean`                                  |   true    | 可选，默认为 true，仅当 popover 绑定元素外层宽高不够时，overflow 为 hidden，popover 的弹出框不会被一并隐藏掉。 | [基本用法](demo#basic-usage)               |
|     zIndex     |                                  `number`                                  |   1060    | 可选，z-index 值，用于手动控制层高                                                                             | [自定义提示内容](demo#custom-prompt-content) |
| scrollElement  |                                 `Element`                                  |  window   | 可选，在这里默认是`window` , 只有当页面的滚动不在`window`上且`appendToBody`的属性为`true`时候才需要传值        | [父容器设置](demo#parent-container-settings) |
|hoverToContent(废弃)|                                 `boolean`                                  |   false   | 可选，是否允许鼠标从宿主移动到内容上，仅需要在 trigger 为 hover 的时候设置                                     | [鼠标移出宿主延迟时间](demo#hover-delay-time) |
| hoverDelayTime |                                 `number`                                   |     0     | 可选，仅需要在 trigger 为 hover 的时候设置鼠标从宿主移开后到隐藏popover的延迟时间，以便鼠标移动到内容上，单位毫秒(ms)                | [鼠标移出宿主延迟时间](demo#hover-delay-time) |

### PositionType 类型定义
```typescript
export type PositionType =  'left' | 'right' | 'top' | 'bottom' | 'bottom-left'| 'bottom-right'| 'top-left'| 'top-right'|
    'left-top'| 'left-bottom'| 'right-top'| 'right-bottom';
```
