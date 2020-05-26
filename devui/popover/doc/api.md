### d-popover参数

| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| content          | `string\|HTMLElement\|TemplateRef`      | --      | 必选，弹出框的显示内容或模板引用 |
| visible          | `boolean`     | false   | 可选，弹框的初始化弹出状态 |
| trigger          | `'hover'\|'click'` |  'click' | 弹框触发方式|
| controlled       | `boolean`     | false   | 可选，是否通过`trigger`方式触发弹框 |
| position         | `'top'\|'right'\|'bottom'\|'left'`  | 'top'  | 可选，内容弹出方向|
| popType         | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'`  | 'default'  | 可选，弹出框类型，样式不同|
| showAnimate      | `boolean`      | false      | 可选，是否显示动画  |
| appendToBody     | `boolean`      | true      | 可选，默认为true，仅当popover绑定元素外层宽高不够时，overflow为hidden，popover的弹出框不会被一并隐藏掉。 |
| zIndex           | `number`      | 1060      | 可选，z-index值，用于手动控制层高 |
| scrollElement    | `Element`       | window      | 可选，在这里默认是`window` , 只有当页面的滚动不在`window`上且`appendToBody`的属性为`true`时候才需要传值 |
| hoverToContent    | `boolean`       | false      | 可选，是否允许鼠标从宿主移动到内容上，仅需要在trigger为hover的时候设置 |

