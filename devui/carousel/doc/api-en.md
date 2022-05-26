# How To Use

Import in module：

```ts
import { CarouselModule } from 'ng-devui/carousel';
```

In the page：

```html
<d-carousel>
  <d-carousel-item></d-carousel-item>
</d-carousel>
```

# d-carousel

## d-carousel parameter

|    Parameter    |             Type             | Default  |                                                       Description                                                       | Jump to Demo                                   | Global Config |
| :-------------: | :--------------------------: | :------: | :---------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------- | ------------- |
|  arrowTrigger   | `'hover'\|'never'\|'always'` | 'hover'  |                              Optional. Specifying the display mode of the switching arrow                               | [Indicator & Toggle Arrow](demo#trigger-usage) |
|    autoplay     |          `boolean`           |  false   |                                 Optional. Indicating whether to enable automatic NVOD.                                  | [Automatic NVOD](demo#autoplay-usage)          |
|  autoplaySpeed  |           `number`           |   3000   |                 Optional. Automatic NVOD speed, in ms. This parameter is used together with `autoplay'.                 | [Automatic NVOD](demo#autoplay-usage)          |
| transitionSpeed |           `number`           |   500    |                                    Optional. Card switch animation interval, in ms.                                     | [Automatic NVOD](demo#autoplay-usage)          |
|     height      |           `string`           |  '100%'  |                                             Optional. NVOD container height                                             | [Basic usage](demo#basic-usage)                |
|    showDots     |          `boolean`           |   true   |                               Optional. Indicating whether to display the panel indicator                               | [Automatic NVOD](demo#autoplay-usage)          |
|   dotPosition   |      `'top'\|'bottom'`       | 'bottom' |                                        Optional. Indicator position on the panel                                        | [Indicator & Toggle Arrow](demo#trigger-usage) |
|   dotTrigger    |      `click'\|'hover'`       | 'click'  |                                     Optional. The indicator triggers the NVOD mode                                      | [Indicator & Toggle Arrow](demo#trigger-usage) |
|   activeIndex   |           `number`           |    0     | Optional. Initializes the activation card index, starting from 0. `[(activeIndex)]` bidirectional binding is supported. | [Basic usage](demo#basic-usage)                |

## d-carousel event

|       Event       |          Type          |                                        Description                                        | Jump to Demo                    |
| :---------------: | :--------------------: | :---------------------------------------------------------------------------------------: | ------------------------------- |
| activeIndexChange | `EventEmitter<number>` | Returns the index of the current card when the card is switched. The index starts from 0. | [Basic usage](demo#basic-usage) |

## d-carousel method

|   Method    | Description                                                         | Jump to Demo                           |
| :---------: | :------------------------------------------------------------------ | :------------------------------------- |
|   prev()    | Switch to the previous card                                         | [Custom Operations](demo#custom-usage) |
|   next()    | Switch to the next card                                             | [Custom Operations](demo#custom-usage) |
| goTo(index) | Switch to the card with a specified index. The index starts from 0. | [Custom Operations](demo#custom-usage) |
