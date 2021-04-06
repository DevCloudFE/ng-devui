# How To Use
Import in module：
```ts
import { ImagePreviewModule } from 'ng-devui/image-preview';
```
In the page：
```html
<div dImagePreview></div>
```

# dImagePreview

## dImagePreview Parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :------------: | :--------------------: | :---: | :------------------------------------: | ------------------------------------------------- |
| customSub | `Subject<HTMLElement>` | -- | Optional. When customsub triggers next, preview is opened. | [Customized preview window opening](demo#custom-usage) |
| disableDefault | `boolean` | false | Optional. Disable the default image preview mode triggered by clicking. | [Customized preview window enabling](demo#custom-usage) |
| zIndex | `number` | 1050 | Optional. Sets the z-index value of the image during preview. | [Setting zIndex](demo#z-index-usage) |
| backDropZIndex | `number` |  1040   | Optional. Sets the z-index value of the back drop of the image during preview. | [Setting zIndex](demo#z-index-usage) |
