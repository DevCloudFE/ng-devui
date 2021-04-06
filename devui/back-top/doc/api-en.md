# How to use

Import into module:

```ts
import { BackTopModule } from 'ng-devui/back-top';
```

In the page:

```xml
<d-back-top></d-back-top>
```
# d-back-top
## d-back-top Parameter

|    Parameter   |   Type   |      Default        |       Description      |           Jump to Demo         |Global Config| 
| :----------------: | :---------: | :------------: | :-----: | :--------------------------------------------------------------------------- | |
| customTemplate | `TemplateRef<any>` | -- | Optional. Custom button style | [Customize](demo#back-top-customize) |
| bottom | `string` | '50px' | Optional. Position between the button and the bottom of the page | [Customize](demo#back-top-customize) |
| right | `string` | '30px' | Optional. It is the right margin between the button and the page | [Customize](demo#back-top-customize) |
| visibleHeight | `number` | 300 | Optional. When the scrolling height reaches the value of visibleHeight, the button is displayed to the top. The unit is `px` | [Customize](demo#back-top-customize) |
| scrollTarget | `HTMLElement` | Window | Optional. Object that triggers scrolling | [Scrolling Container](demo#back-top-scroll-container) |

## d-back-top Event

| Parameter | Type | Description | Jump to Demo |
| :------: | :-----------------: | :-------------------------------------------------------------------------------------- | ---------------------------------------------- |
| backTopEvent | `EventEmitter<boolean>` | Optional. Callback function for clicking the button to return to the top | [Basic Usage](demo#back-top-basic) |
