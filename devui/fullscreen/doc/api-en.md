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

# d-fullscreen

## d-fullscreen parameters

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------------: | :-----------------------: | :---------: | :------------------------------------: | --------------------------------------------------------- |
| fullscreen-target | `HTMLElement` | -- | Required. Content projection, set the elements to be displayed in full screen. | [Immersive full screen](demo#immersive-full-screen) |
| fullscreen-launch | `HTMLElement` | -- | Required. Content projection, set the button to trigger the full screen. | [Immersive full screen](demo#immersive-full-screen) |
| mode | `'immersive' \|'normal'` | 'immersive' | Optional. Set the full-screen mode. | [Common full screen](demo#general-full-screen) |
| zIndex | `number` | 10 | Optional. Set the full-screen level. | [Common full screen](demo#general-full-screen) |

## d-fullscreen event

| Event | Type | Description | Jump to Demo |
| :--------------: | :---------------------: | :------------------- | --------------------------------------------------------- |
| fullscreenLaunch | `EventEmitter<boolean>` | Optional. Callback after full screen | [Immersive full screen](demo#immersive-full-screen) |

### fullscreen-target directive
Required directive. Content projection, set the elements to be displayed in full screen.[Immersive full screen](demo#immersive-full-screen)

### fullscreen-launch directive
Required directive. Content projection, set the button to trigger the full screen.[Immersive full screen](demo#immersive-full-screen)
