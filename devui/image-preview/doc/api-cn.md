# 如何使用
在module中引入：
```ts
import { ImagePreviewModule } from 'ng-devui/image-preview';
```
在页面中使用：
```html
<div dImagePreview></div>
```

# dImagePreview

## dImagePreview 参数

|      参数      |          类型          | 默认值  |                  描述                  | 跳转 Demo                                         |
| :------------: | :--------------------: | :---: | :------------------------------------: | ------------------------------------------------- |
|   customSub    | `Subject<HTMLElement>` |  --   | 可选，customsub 触发 next 时，打开预览 | [自定义开启预览窗口](demo#custom-usage) |
| disableDefault |       `boolean`        | false |   可选，关闭默认点击触发图片预览方式   | [自定义开启预览窗口](demo#custom-usage) |
|     zIndex     |       `number`         | 1050  |   可选，设置预览时图片的z-index值     | [设置zIndex](demo#z-index-usage) |
| backDropZIndex |       `number`         | 1040  |   可选，设置预览时图片背景的z-index值 | [设置zIndex](demo#z-index-usage) |
