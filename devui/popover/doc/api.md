## popover 说明 


| 参数        | 类型          | 默认        |   说明                 |
| :---------: | :----------: | :---------: | :------------------------------------------|
| visible           | boolean     | false       | 手动控制弹出框的显示 |
| content          | string       | (none)      | 弹出框的显示内容 |
| showAnimate      | boolean      | (none)      | 可选，是否显示动画  |
| position         | string       | (none)      | 弹出框的位置 包括 'top'\|'right'\|'bottom'\|'left' |
| trigger          | 'manual'|'click' |  'manual' | 触发方式
| appendToBody     | boolean      | true      | 默认为true可以不传，仅当popover绑定元素外层宽高不够时，overflow为hidden，不想popover的弹出框被一并隐藏掉。 |
| scrollElement    | string       | window      | 在这里默认是`window` , 默认可以不传，只有当页面的滚动不在`window`上且`appendToBody`的属性为`true`时候才需要传值 |
