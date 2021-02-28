# How to use

Import into module:
```ts
import { StickyModule } from 'ng-devui';
```

In the page:
```html
<d-sticky></d-sticky>
```

# d-sticky

A component is used to move with the visual area when the parent container or specified container appears in the visual area, when a parent container or a specified container disappears from the visible area, the container moves out of the visible area with the parent container. If the parent container is equal to the visible window, the component does not disappear.

The content of the notepad must have its own width and height; otherwise, the width and height may be incorrect when floating.

Currently, only the vertical direction is supported.

**Note**: that the parent container must have a height and do not collapse due to component floats, otherwise the component cannot follow the float.

**Note**: that the page scrolling is monitored. Therefore, there should be no too many sticky elements on a page, which affects the performance.

## d-sticky Parameters

|  Parameter   |              Type              |         Default          |                                                                                 Description                                                                                  | Jump to Demo                                                          |
| :----------: | :----------------------------: | :----------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------------------- |
|    zIndex    |            `number`            |            --            |                  Optional. This parameter specifies the z-index of the wrapping layer, which is used to control the stacking of the z axis during floating.                  | [Basic Usage](demo#basic-usage)                    |
|  container   |         `HTMLElement`          |     Parent container     |                                               Optional. Triggered container, which can be different from the parent container.                                               | [Basic Usage](demo#basic-usage)                    |
|     view     | `{top?:number,bottom?:number}` |     {top:0,bottom:0}     | Optional. It is used to adjust the visible region, for example, the head with a fixed position on the top. The value corresponds to the height of the blocked top or bottom. | [Basic Usage](demo#basic-usage)                    |
| scrollTarget |         `HTMLElement`          | document.documentElement |                      Optional. Sets the container where the scroll bar is located. This parameter is optional when the scroll bar is on the home page.                       | [Replace Rolling Container](demo#scroll-target) |

Note: If the container range is greater than the scrollTarget range, only the scrollTarget range takes effect.

## d-sticky Event

|    Event     |             Type             |                                                                                                                                                                                                                         Description                                                                                                                                                                                                                         | Jump to Demo                                       |
| :----------: | :--------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
| statusChange | [`EventEmitter<StickyStatus>`](#stickystatus) | Optional. It is triggered when the status changes. The value is the status after the change. | [Basic Usage](demo#basic-usage) |

# Interface & Type Definition

### StickyStatus
```ts
/**
 * normal: Normal state.
 * follow: Indicates that the page is scrolled to a fixed position.
 * stay: Indicates the following fixed status during horizontal scrolling.
 * remain: Represents being lifted by the container in the condition of following the container at the bottom of the container.
 */ 
export type StickyStatus = 'normal' | 'follow' | 'stay' | 'remain';
```
