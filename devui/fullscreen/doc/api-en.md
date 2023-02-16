# How To Use

Import in module：

```ts
import { FullscreenModule } from 'ng-devui/fullscreen';
```

In the page：

```html
<d-fullscreen>
  <div fullscreen-target>
    <div fullscreen-launch></div>
  </div>
</d-fullscreen>
```

## d-fullscreen

### d-fullscreen parameters

| Parameter    | Type                            | Default     | Description                                                                                                                                                                                                                                           | Jump to Demo                                   | Global Config |
| ------------ | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------- |
| mode         | `'immersive' \|'normal'`        | 'immersive' | Optional. Set the full-screen mode.                                                                                                                                                                                                                   | [Common full screen](demo#general-full-screen) |
| zIndex       | `number`                        | 10          | Optional. Set the full-screen level.                                                                                                                                                                                                                  | [Common full screen](demo#general-full-screen) |
| beforeChange | `Function\|Promise\|Observable` | --          | Optional. Callback function before full-screen switchover is triggered. The return type is boolean. The return value is false to prevent full-screen switchover. Please note that immersive full-screen exit by pressing ESC or F11 cannot be blocked | [Custom full Screen](demo#custom-full-screen)  |
| container    | `HTMLElement`                   | --          | Optional. Full screen based on a specified container. This parameter can be used only in normal mode.                                                                                                                                                 | [Custom full Screen](demo#custom-full-screen)  |

### d-fullscreen event

| Event            | Type                    | Description                          | Jump to Demo                                        |
| ---------------- | ----------------------- | ------------------------------------ | --------------------------------------------------- |
| fullscreenLaunch | `EventEmitter<boolean>` | Optional. Callback after full screen | [Immersive full screen](demo#immersive-full-screen) |

### fullscreen-target directive

Required directive. Content projection, set the elements to be displayed in full screen.[Immersive full screen](demo#immersive-full-screen)

### fullscreen-launch directive

Required directive. Content projection, set the button to trigger the full screen.[Immersive full screen](demo#immersive-full-screen)
