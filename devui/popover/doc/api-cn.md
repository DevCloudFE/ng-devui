# 如何使用

在 module 中引入：

```ts
import { PopoverModule } from 'ng-devui/popover';
```

在页面中使用：

```html
<xxx dPopover></xxx>
```

# dPopover

## dPopover 参数

| 参数                | 类型                                                       | 默认                               | 说明                                                                                                                                                                    | 跳转 Demo                                    | 全局配置项 |
| ------------------- | ---------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---------- |
| content             | `string\|TemplateRef`                                      | --                                 | 必选，弹出框的显示内容或模板引用                                                                                                                                        | [基本用法](demo#basic-usage)                 |
| visible             | `boolean`                                                  | false                              | 可选，弹出框的初始化弹出状态                                                                                                                                            | [手动控制显示](demo#manual-control-display)  |
| trigger             | `'hover'\|'click'`                                         | 'click'                            | 可选，弹出框触发方式                                                                                                                                                    | [延时触发](demo#hover-delay-time)            |
| controlled          | `boolean`                                                  | false                              | 可选，是否通过`trigger`方式触发弹出框                                                                                                                                   | [基本用法](demo#basic-usage)                 |
| position            | [`PositionType`](#positiontype) `\| PositionType[]`        | ['top', 'right', 'bottom', 'left'] | 可选，内容弹出方向，以 top-left 为例，top 是指从上边弹出，left 是指左对齐，若不设置对齐方向默认为居中。如果传入数组形式，则当前将按照传入数组次序，自适应选取一个方向。 | [弹出位置](demo#position)                    |
| popType             | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | 'default'                          | 可选，弹出框类型，样式不同                                                                                                                                              | [基本用法](demo#basic-usage)                 |
| popMaxWidth         | `number`                                                   | --                                 | 可选，限制弹出框最大宽度（`px`）                                                                                                                                        | [自定义提示内容](demo#custom-prompt-content) |
| showAnimation       | `boolean`                                                  | true                               | 可选，是否显示动画                                                                                                                                                      | [基本用法](demo#basic-usage)                 | ✔          |
| appendToBody        | `boolean`                                                  | true                               | 可选，默认为 true，仅当 popover 绑定元素外层宽高不够时，overflow 为 hidden，popover 的弹出框不会被一并隐藏掉。                                                          | [基本用法](demo#basic-usage)                 |
| zIndex              | `number`                                                   | 1060                               | 可选，z-index 值，用于手动控制层高                                                                                                                                      | [自定义提示内容](demo#custom-prompt-content) |
| scrollElement       | `Element`                                                  | window                             | 可选，在这里默认是`window` , 只有当页面的滚动不在`window`上且`appendToBody`的属性为`true`时候才需要传值                                                                 | [父容器设置](demo#parent-container-settings) |
| ~~hoverToContent~~  | `boolean`                                                  | false                              | 可选，是否允许鼠标从宿主移动到内容上，仅需要在 trigger 为 hover 的时候设置（`已废弃`）                                                                                  | [延时触发](demo#hover-delay-time)            |
| ~~hoverDelayTime~~  | `number`                                                   | 0                                  | 可选，仅需要在 trigger 为 hover 的时候设置鼠标从宿主移开后到隐藏 popover 的延迟时间，以便鼠标移动到内容上，单位`ms` （`已废弃，请使用mouseLeaveDelay`）                 | [延时触发](demo#hover-delay-time)            |
| ~~showAnimate~~     | `boolean`                                                  | true                               | 可选，是否显示动画（`已废弃，请使用showAnimation`）                                                                                                                     | [基本用法](demo#basic-usage)                 |
| mouseEnterDelay     | `number`                                                   | 150                                | 可选，仅需要在 trigger 为 hover 的时候，设置鼠标移入后延时多少才显示 Popover，单位是 `ms`                                                                               | [延时触发](demo#hover-delay-time)            |
| mouseLeaveDelay     | `number`                                                   | 100                                | 可选，仅需要在 trigger 为 hover 的时候，设置鼠标移出后延时多少才隐藏 popover，单位是 `ms`                                                                               | [延时触发](demo#hover-delay-time)            |
| popoverStyle        | `{[klass:string]:any;}`                                    | --                                 | 可选，在需要改变弹出层样式时设置，箭头会应用同样的背景色。样式，参见 [ngStyle](https://angular.cn/api/common/NgStyle)。                                                 | [自定义提示内容](demo#custom-prompt-content) |
| autoHideCoefficient | `number`                                                   | 0                                  | 可选，该值表示弹出框超出已设置的 scrollELement 容器边界达到多少百分比后会自动隐藏，小于 0 时不会触发自动隐藏                                                          |                                              |

## 接口 & 类型定义

### PositionType

```ts
export type PositionType =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';
```
