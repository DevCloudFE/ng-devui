### d-fullscreen 参数

| 参数              | 类型                         | 默认        |   说明                              |
| :---------------: | :-------------------------: | :---------: | :--------------------------------: |
| fullscreen-target | `HTMLElement`               | --          | 必选，内容投影，设置需要全屏的元素    |
| fullscreen-launch | `HTMLElement`               | --          | 必选，内容投影，设置触发进入全屏的按钮 |
| mode              | `'immersive' \| 'normal'`   | 'immersive' | 可选，设置全屏模式                   |
| zIndex            | `number`                    | 10          | 可选，设置全屏层级                   |

### d-fullscreen 事件

| 事件             | 类型                     |   说明             |
| :--------------: | :----------------------:| :------------------|
| fullscreenLaunch | `EventEmitter<boolean>` | 可选，全屏之后的回调 |
