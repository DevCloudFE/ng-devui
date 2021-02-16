## d-sticky

A component is used to move with the visual area when the parent container or specified container appears in the visual area,
When a parent container or a specified container disappears from the visible area, the container moves out of the visible area with the parent container. If the parent container is equal to the visible window, the component does not disappear.
The content of the notepad must have its own width and height; otherwise, the width and height may be incorrect when floating.

Currently, only the vertical direction is supported.
Note that the parent container must have a height and do not collapse due to component floats, otherwise the component cannot follow the float.
Note that the page scrolling is monitored. Therefore, there should be no too many sticky elements on a page, which affects the performance.

### d-sticky parameter

|  Parameter   |              Type              |         Default          |                                                                                 Description                                                                                  | Jump to Demo                                                          |
| :----------: | :----------------------------: | :----------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------- |
|    zIndex    |            `number`            |            --            |                  Optional. This parameter specifies the z-index of the wrapping layer, which is used to control the stacking of the z axis during floating.                  | [Basic usage](demo#basic-usage)                    |
|  container   |         `HTMLElement`          |     Parent container     |                                               Optional. Triggered container, which can be different from the parent container.                                               | [Basic usage](demo#basic-usage)                    |
|     view     | `{top?:number,bottom?:number}` |     {top:0,bottom:0}     | Optional. It is used to adjust the visible region, for example, the head with a fixed position on the top. The value corresponds to the height of the blocked top or bottom. | [Basic usage](demo#basic-usage)                    |
| scrollTarget |         `HTMLElement`          | document.documentElement |                      Optional. Sets the container where the scroll bar is located. This parameter is optional when the scroll bar is on the home page.                       | [Replace rolling container](demo#scroll-target) |

Note: If the container range is greater than the scrollTarget range, only the scrollTarget range takes effect.

### D-sticky Event

|    Event     |             Type             |                                                                                                                                                                                                                         Description                                                                                                                                                                                                                         | Jump to Demo                                       |
| :----------: | :--------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
| statusChange | `EventEmitter<StickyStatus>` | Optional. It is triggered when the status changes. The value is the status after the change. The value normal indicates that the status is normal, the value follow indicates that the status is fixed when the page is scrolled, and the value stay indicates that the status is fixed when the page is scrolled horizontally, 'remain' indicates that the container is held up by the container and follows the container at the bottom of the container. | [Basic usage](demo#basic-usage) |

### StickyStatus Type Definition

```typescript
type StickyStatus = 'normal' | 'follow' | 'stay' | 'remain';
```
