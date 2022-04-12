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
| type | `line \| circle` | false | Optional. This parameter indicates whether the progress bar is in a circle shape. | [circle usage](demo#circle-usage) |
| percentage | `number` | 0 | Optional. The maximum value of the progress bar is 100 | [Basic usage](demo#basic-usage) |
| percentageText | `string` | -- | Optional. The text description of the current value of the progress bar is as follows: '30%' \| '4/5' | [Basic usage](demo#basic-usage) |
| strokeColor | `string` | '#5170ff' | Optional. The color of the progress bar is sky blue by default. | [Basic usage](demo#basic-usage) |
| strokeWidth | `number` | 14 | Optional. Line width of the progress bar | [Circle usage](demo#circle-usage) |
