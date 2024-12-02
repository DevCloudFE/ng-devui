# How to use

Import into module:

```ts
import { PopoverModule } from 'ng-devui/popover';
```

In the page:

```html
<xxx dPopover></xxx>
```

# dPopover

## dPopover parameters

| Parameter           | Type                                                       | Default                            | Description                                                                                                                                                                                                                                                                                                        | Jump to Demo                                                | Global Config |
| ------------------- | ---------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------- |
| content             | `string\|TemplateRef`                                      | --                                 | Required. The display content of the pop-up box or template reference                                                                                                                                                                                                                                              | [Basic Usage](demo#basic-usage)                             |
| visible             | `boolean`                                                  | false                              | Optional. Initial pop-up status of the pop-up dialog box                                                                                                                                                                                                                                                           | [Manual Control Display ](demo#manual-control-display)      |
| trigger             | `hover'\|'click'`                                          | 'click'                            | Optional. Pop-up message triggering mode                                                                                                                                                                                                                                                                           | [Delay Trigger](demo#hover-delay-time)                      |
| controlled          | `boolean`                                                  | false                              | Optional. Specifies whether to trigger a dialog box in `trigger` mode                                                                                                                                                                                                                                              | [Basic Usage](demo#basic-usage)                             |
| position            | [`PositionType`](#positiontype) `\| PositionType[]`        | ['top', 'right', 'bottom', 'left'] | Optional. Specifies the content pop-up direction. For example, top-left indicates the content pop-up direction, and left indicates the left-aligned content. If the alignment direction is not set, the default value is centered. If an array is passed in, a direction is selected adaptively in the array order | [Position](demo#position)                                   |
| popType             | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | 'default'                          | Optional. Which indicates the type of the pop-up box with different styles                                                                                                                                                                                                                                         | [Basic Usage](demo#basic-usage)                             |
| popMaxWidth         | `number`                                                   | --                                 | Optional. Limit the maximum width of the pop-up box (`px`)                                                                                                                                                                                                                                                         | [Custom Tips](demo#custom-prompt-content)                   |
| showAnimation       | `boolean`                                                  | true                               | Optional. Whether to display animation                                                                                                                                                                                                                                                                             | [Basic Usage](demo#basic-usage)                             | ✔             |
| appendToBody        | `boolean`                                                  | true                               | Optional. The default value is true. If the width and height of the outer layer of the element bound to the popover are insufficient, the overflow is hidden and the popover dialog box is not hidden                                                                                                              | [Basic Usage](demo#basic-usage)                             |
| zIndex              | `number`                                                   | 1060                               | Optional. Z-index value, which is used to manually control the height of the layer                                                                                                                                                                                                                                 | [Custom Tips](demo#custom-prompt-content)                   |
| scrollElement       | `Element`                                                  | window                             | Optional. The default value is `window`. This parameter needs to be transferred only when the page scrolling is not on `window` and the attribute of `appendToBody` is `true`                                                                                                                                      | [Parent Container Settings](demo#parent-container-settings) |
| ~~hoverToContent~~  | `boolean`                                                  | false                              | Optional. Whether to allow the cursor to be moved from the host to the content. This parameter is set only when trigger is set to hover （`deprecated`）                                                                                                                                                           | [Delay Trigger](demo#hover-delay-time)                      |
| ~~hoverDelayTime~~  | `number`                                                   | 0                                  | Optional. You need to set the delay from moving the cursor to hiding the popover only when trigger is set to hover so that the cursor can be moved to the content. The unit is `ms` （`deprecated，Use mouseLeaveDelay`）                                                                                          | [Delay Trigger](demo#hover-delay-time)                      |
| ~~showAnimate~~     | `boolean`                                                  | true                               | Optional. Whether to display animation （`deprecated，Use showAnimation`）                                                                                                                                                                                                                                         | [Basic Usage](demo#basic-usage)                             |
| mouseEnterDelay     | `number`                                                   | 150                                | Optional. Only when the type of trigger is hover. Delay for displaying Popover after the mouse is enter. The unit is `ms`                                                                                                                                                                                          | [Delay Trigger](demo#hover-delay-time)                      |
| mouseLeaveDelay     | `number`                                                   | 100                                | Optional. Only when the type of trigger is hover. Delay for hiding Tooltip after the mouse is leave. The unit is `ms`                                                                                                                                                                                              | [Delay Trigger](demo#hover-delay-time)                      |
| popoverStyle        | `{[klass:string]:any;}`                                    | --                                 | Optional. When you need to change the style of the pop-up layer, the same background color is applied to the arrows. Style. Refer to [ngStyle](https://angular.io/api/common/NgStyle)                                                                                                                              | [Custom Tips](demo#custom-prompt-content)                   |
| autoHideCoefficient | `number`                                                   | 0                                  | Optional. The value indicates the percentage of the pop-up box that exceeds the configured scrollELement container boundary. If the value is less than 0, the pop-up box is not automatically hidden.                                                                                                              |                                                             |

## Interface & Type Definition

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
