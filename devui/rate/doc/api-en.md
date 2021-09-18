# How to use
Import into module:
```ts
import { RateModule } from 'ng-devui/rate';
```

In the page:
```html
<d-rate [ngModel]="value" [count]="5"></d-rate>
```
# Rate

## d-rate parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :-------: | :-----------------------------: | :---: | :------------------------------------------------------- | ------------------------------------------------------ |
| read | `boolean` | false | Optional. This parameter specifies whether to enable read-only mode. In read-only mode, interaction is not supported. | [Read-only Mode](demo#read-only-mode) |
| count | `number` | 5 | Optional. Sets the total number of levels. | [Read-only Mode](demo#read-only-mode) |
| type | `'success'\|'warning'\|'error'` | -- | Optional. Set the current rating type. Different types correspond to different colors. | [Use the type parameter](demo#using-the-type-parameter) |
| color | `string` | -- | Optional. Star color. | [Dynamic Mode-Custom](demo#dynamic-mode-Custom) |
| icon | `string` | -- | Optional. Style of the rating icon. Only all icons in the DevUI icon library are supported. | [Dynamic Mode](demo#dynamic-mode) |
| character | `string` | -- | Optional. Scoring icon style. Only one of icon and character can be set. | [Dynamic Mode-Custom](demo#dynamic-mode-Custom) |
| allowHalf |            `boolean`             |  false   | Optional. Whether allow Half Selection in Dynamic Mode. | [Half Selection Mode](demo#rate-half)      |
