# How To Use

Import in module：

```ts
import { ProgressModule } from 'ng-devui/progress';
```

In the page：

```html
<d-progress></d-progress>
```

## d-progress

### d-progress parameter

| Parameter           | Type                           | Default | Description                                                                                                                                                                                     | Jump to Demo                                           | Global Config |
| ------------------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------- |
| type                | `line \| circle`               | line    | Optional. This parameter indicates whether the progress bar is in a circle shape.                                                                                                               | [Circular progress bar](demo#circle-usage)             |
| percentage          | `number`                       | 0       | Optional. The maximum value of the progress bar is 100                                                                                                                                          | [Linear progress bar](demo#basic-usage)                |
| percentageText      | `string`                       | --      | Optional. The text description of the current value of the progress bar is as follows: '30%' \| '4/5'                                                                                           | [Linear progress bar](demo#basic-usage)                |
| showContent         | `boolean \| ShowContentConfig` | --      | Optional. Sets whether to display content in the circular progress bar.                                                                                                                         | [Custom multi-color progress bar](demo#multiple-usage) |
| strokeColor         | `string \| IGradientColor[]`   | --      | Optional. Color of the progress bar. The default value is --devui-brand. Gradient colors are supported.                                                                                         | [Custom multi-color progress bar](demo#multiple-usage) |
| strokeWidth         | `number`                       | 14      | Optional. Line width of the progress bar                                                                                                                                                        | [Circular progress bar](demo#circle-usage)             |
| multiProgressConfig | `IProgressItem[]`              | []      | Optional. Configuration data of the multi-segment progress bar. For details, see the definition of the IProgressItem type.                                                                      | [Custom multi-color progress bar](demo#multiple-usage) |
| isDynamic           | `boolean`                      | true    | Optional. Set false to static progress bar. By default, the dynamic progress bar is used. To ensure animation rendering, the data source is not reset, which may affect static data refreshing. | [Linear progress bar](demo#basic-usage)                |

## Interface & Type Definition

```typescript
export interface IProgressItem {
  color: string;
  percentage: number;
  percentageText?: string;
  percentageTextWidth?: string;
  [key: string]: any;
}

export interface IGradientColor {
  color: string; // Color value of the gradient color. The gradient color of the line progress bar is displayed from left to right. If no color is set, the gradient color range is set according to the line-gradient style rule.
  percentage: string;
}

export interface ShowContentConfig {
  showInnerContent?: boolean; // Indicates whether to display the text information on the progress bar. The default value is false.
  showOuterContent?: boolean; // Indicates whether to display the text information on the right of the progress bar. The default value is true.
}
```
