### d-fullscreen 参数

|       参数        |           类型            |    默认     |                  说明                  | 跳转 Demo                                                 |
| :---------------: | :-----------------------: | :---------: | :------------------------------------: | --------------------------------------------------------- |
| fullscreen-target |       `HTMLElement`       |     --      |   必选，内容投影，设置需要全屏的元素   | [沉浸式全屏](demo#immersive-full-screen) |
| fullscreen-launch |       `HTMLElement`       |     --      | 必选，内容投影，设置触发进入全屏的按钮 | [沉浸式全屏](demo#immersive-full-screen) |
|       mode        | `'immersive' \| 'normal'` | 'immersive' |           可选，设置全屏模式           | [普通全屏](demo#general-full-screen)   |
|      zIndex       |         `number`          |     10      |           可选，设置全屏层级           |[普通全屏](demo#general-full-screen)   |

### d-fullscreen 事件

|       事件       |          类型           | 说明                 | 跳转 Demo                                                 |
| :--------------: | :---------------------: | :------------------- | --------------------------------------------------------- |
| fullscreenLaunch | `EventEmitter<boolean>` | 可选，全屏之后的回调 | [沉浸式全屏](demo#immersive-full-screen) |
