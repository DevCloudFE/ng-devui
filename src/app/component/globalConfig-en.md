# Global Configuration

## How to use

Using the global configuration item function, you can define the default behavior of components to reduce repeated parameter settings.
## Method 1

Provide an object that complies with the `DevUIGlobalConfig` interface in the root injector based on the injection token DevUIGlobalConfigToken. For example:

```typescript
// src/app/app.module.ts
import { DevUIGlobalConfig, DevUIGlobalConfigToken } from 'ng-devui/utils';
const custom_global_config: DevUIGlobalConfig = {
  global: {
    showAnimation: false,
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: DevUIGlobalConfigToken,
      useValue: custom_global_config
    }
  ],
  bootstrap: [AppComponent]
})
```

## Method 2

Dynamically changing global configuration items

```typescript
import { DevConfigService } from 'ng-devui/utils';

constructor(private devConfigService: DevConfigService) {}

ngOnInit() {
  this.devConfigService.set('global', {
    'showAnimation': false
  })
}

```

### Priority of global configuration items

For attributes that support global configuration, the priority of attribute values is as follows:

###### Value set separately for an instance of a component (via directives, components, or methods similar to service.open) > &nbsp; Global default values (including set methods) provided for components within the custom_global_config object > &nbsp; Global default values (including set methods) provided through the global key within the custom_global_config object > &nbsp; Default values built into the DevUI component library.

For example, you want to set an effect for the Tooltip widget:

1.Transfer the parameter [showAnimation]="false" when the dTooltip command is used.

2.Set {tooltip: {showAnimation: true}} through custom_global_config.

3.Set global default values through custom_global_config {global: {showAnimation: false}}

4.Default value of the DevUI component library: showAnimation = true

Finally, the Tooltip turns off the animation because step 1 has the highest priority.




### Display all available global configuration items.
The type definition information provided by the `DevUIGlobalConfig` interface helps you find all components and attributes that support global configuration items. In addition, the API documentation for each component indicates which properties support global configuration in the `Global Configuration Item' column.
