# 如何使用

在 module 中引入：

```ts
import { FullscreenModule } from 'ng-devui/fullscreen';
```

在页面中使用：

```html
<d-fullscreen>
  <div fullscreen-target>
    <div fullscreen-launch></div>
  </div>
</d-fullscreen>
```

## d-fullscreen

### d-fullscreen 参数

| 参数         | 类型                            | 默认        | 说明                                                                                                                               | 跳转 Demo                               | 全局配置项 |
| ------------ | ------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------- |
| mode         | `'immersive' \| 'normal'`       | 'immersive' | 可选，设置全屏模式                                                                                                                 | [普通全屏](demo#general-full-screen)    |
| zIndex       | `number`                        | 10          | 可选，设置全屏层级                                                                                                                 | [普通全屏](demo#general-full-screen)    |
| beforeChange | `Function\|Promise\|Observable` | --          | 可选，触发全屏切换前的回调函数，返回 boolean 类型，返回 false 可以阻止全屏切换。请注意沉浸式全屏通过 ESC 或 F11 按键退出无法被阻止 | [函数方式调用](demo#custom-full-screen) |

### d-fullscreen 事件

| 事件             | 类型                    | 说明                 | 跳转 Demo                                |
| ---------------- | ----------------------- | -------------------- | ---------------------------------------- |
| fullscreenLaunch | `EventEmitter<boolean>` | 可选，全屏之后的回调 | [沉浸式全屏](demo#immersive-full-screen) |

### fullscreen-target 选择器

必含指令，内容投影，设置需要全屏的元素[沉浸式全屏](demo#immersive-full-screen)。

### fullscreen-launch 选择器

必含指令，内容投影，设置触发进入全屏的按钮[沉浸式全屏](demo#immersive-full-screen)。
