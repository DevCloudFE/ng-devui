# How to use

Import into module

```ts
import { TooltipModule } from 'ng-devui/tooltip';
```

In the page

```html
<!-- xxx can be any elements -->
<xxx dTooltip></xxx>
```

# dTooltip

### dTooltip Parameter

|    Parameter    |                        Type                         |              Default               |                                    Description                                    | Jump to Demo                        |
| :-------------: | :-------------------------------------------------: | :--------------------------------: | :-------------------------------------------------------------------------------: | ----------------------------------- |
|     content     |                 `string\|DOMString`                 |                 --                 |                         Required. Tooltip display content                         | [Basic Usage](demo#basic-usage)     |
|    position     | [`PositionType`](#positiontype) `\| PositionType[]` | ['top', 'right', 'bottom', 'left'] |                        Optional. Tooltip display position                         | [Basic Usage](demo#basic-usage)     |
|   showAnimate   |                      `boolean`                      |               false                |                Optional. Whether to display the drawing animation                 | [Basic Usage](demo#basic-usage)     |
| mouseEnterDelay |                      `number`                       |                150                 | Optional. Delay for displaying Tooltip after the mouse is enter. The unit is `ms` | [Delay Trigger](demo#delay-trigger) |
| mouseLeaveDelay |                      `number`                       |                100                 |   Optional. Delay for hiding Tooltip after the mouse is leave, The unit is `ms`   | [Delay Trigger](demo#delay-trigger) |

# Interface & Type Definition

### PositionType

```ts
export type PositionType = 'left' | 'right' | 'top' | 'bottom';
```
