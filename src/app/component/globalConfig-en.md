# Global configuration item

## How to use

Supports global setting of showAnimation (whether to display animation effect) to reduce repeated code. You can set a default value, regardless of any default setting provided by the component library.

## Start

Angular CLI project. In src\app\app.module.ts, import the DevUI_global_config object as the object for setting global default values. The object type is DevUIGlobalConfig.

```typescript
// app.module.ts
import { DevUIGlobalConfigToken, DevUI_global_config } from 'ng-devui/utils/globalConfig';
  providers: [
    {
      provide: DevUIGlobalConfigToken,
      useValue: DevUI_global_config
    }
  ],
```

DevUI_global_config object:

```typescript
// for example
export const DevUI_global_config: DevUIGlobalConfig = {
  global: {
    showAnimation: false,
  }
};
```

If showAnimation is set to false in global, the dynamic effects of all components are disabled. That is, the values of all showAnimation parameters in the component library are changed to false in batches.

## Invoke the this.devConfigService.set function to change global configuration items.

```typescript
import { DevConfigService } from 'ng-devui/utils/globalConfig';

  constructor(private devConfigService: DevConfigService) {}
  ngOnInit() {
    this.devConfigService.set('global', {
      'showAnimation': false
    })
  }

```
