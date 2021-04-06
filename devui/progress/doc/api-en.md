# How To Use
Import in module：
```ts
import { ProgressModule } from 'ng-devui/progress';
```
In the page：
```html
<d-progress></d-progress>
```

# d-progress

## d-progress parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :------------: | :-------: | :-------: | :------------------------------------------------------- | ---------------------------------------------- |
| percentage | `number` | 0 | Optional. The maximum value of the progress bar is 100. | [Basic Usage](demo#basic-usage) |
| percentageText | `string` | -- | Optional. Text description of the current value of the progress bar, for example, '30%'\| '4/5' | [Basic Usage](demo#basic-usage) |
| barbgcolor | `string` | '#5170ff' | Optional. Color of the progress bar. The default value is sky blue. | [Basic Usage](demo#basic-usage) |
| height | `string` | '20px' | Optional. The default value is 20px. | [Basic Usage](demo#basic-usage) |
| isCircle | `boolean` | false | Optional. Whether the progress bar is displayed in a circle. | [Circle Usage](demo#circle-usage) |
| strokeWidth | `number` | 6 | Optional. Sets the width of the progress bar. The unit is the percentage of the progress bar to the width of the canvas. | [Circle Usage](demo#circle-usage) |
| showContent | `boolean` | true | Optional. Sets whether to display content in the circle progress bar. | [Circle Usage](demo#circle-usage) |
