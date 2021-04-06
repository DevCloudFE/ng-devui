# How To Use
Import into module：
```ts
import { SliderModule } from 'ng-devui/slider';
```
In the page：
```html
<d-slider></d-slider>
```

# d-slider

## d-slider parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :----------: | :----------------: | :----------------------: | :------------------------------------------------------------------ | --------------------------------------------------- |
| min | `number` | 0 | Optional. Minimum value of the sliding input bar | [Basic Usage](demo#basic-usage) |
| max | `number` | 100 | Optional. Maximum value of the sliding input bar | [Basic Usage](demo#basic-usage) |
| step | `number` | 1 | Optional. Step of the sliding input bar. The value must be greater than or equal to 0 and must be divisible by (max-min). | [Basic Usage](demo#basic-usage) |
| disabled | `boolean` | false | Optional. When the value is true, users are not allowed to enter. | [Input forbidden state](demo#slider-disabled) |
| tipsRenderer | `function \| null` | (value) => String(value) | Optional. This parameter indicates the function for rendering popover content. If null is transferred, popover content is not displayed. | [Customized popover content displayed](demo#slider-custom) |

## d-slider event

| Event | Type | Description | Jump to Demo |
| :----------------: | :---------------------: | :-----------------------------------------: | ------------------------------------------------- |
| afterChange | `EventEmitter<number>` | Sliding end event, which is triggered at the same time as `onmouseup`. The current value is returned. | [Basic Usage](demo#basic-usage) |
