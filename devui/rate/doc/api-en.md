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
| readonly | `boolean` | false | Optional. This parameter specifies whether to enable read-only mode. In read-only mode, interaction is not supported. | [Read-only Mode](demo#read-only-mode) |
| count | `number` | 5 | Optional. Sets the total number of levels. | [Read-only Mode](demo#read-only-mode) |
| ~~type~~ | `'success'\|'warning'\|'error'` | -- | Optional. Set the current rating type. Different types correspond to different colors. (`Deprecated. You are advised to use color.`) | [Set Color](demo#using-the-type-parameter) |
| color | `string` | -- | Optional. Star color. | [Dynamic Mode-Custom](demo#dynamic-mode-Custom) |
| ~~icon~~ | `string` | -- | Optional. Style of the rating icon. Only all icons in the DevUI icon library are supported. (`Deprecated. You are advised to use character.`)| [Dynamic Mode](demo#dynamic-mode) |
| character | `string\|TemplateRef` | -- | Optional. Scoring icon style. Text or templates can be transferred. | [Dynamic Mode-Custom](demo#dynamic-mode-Custom) |
| allowHalf |            `boolean`             |  false   | Optional. Whether allow Half Selection in Dynamic Mode. | [Half Selection Mode](demo#rate-half)      |
