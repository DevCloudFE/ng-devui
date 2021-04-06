# How to use
Import into module:
```ts
import { ToggleModule } from 'ng-devui/toggle';
```

In the page:
```html
<d-toggle></d-toggle>
```
# Toggle

### d-toggle parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :----------: | :-----------------------------: | :---: | :-------------------------------------------------------------------------- | ------------------------------------------- |
| size | `'sm'\|''\|'lg'` |'' | Optional. Switch size. | [Basic Usage](demo#basic-usage) |
| color | `string` | -- | Optional. Customized color when the switch is enabled. | [Custom Style](demo#custom) |
| checked | `boolean` | false | Optional. Specifies whether to enable the function. The function is disabled by default. | [Basic Usage](demo#basic-usage) |
| ngModel | `boolean` | false | Optional. Specifies whether to enable the function. Bidirectional binding is supported. | [Two-way Binding](demo#two-binding) |
| disabled | `boolean` | false | Optional. Indicating whether to disable the function. | [Basic Usage](demo#basic-usage) |
| beforeChange | `Function\|Promise\|()=> Observable<boolean>` | -- |Optional. Callback function before a switch is changed. The return value is of the boolean type. If false is returned, the switch is not changed. | [Two-way Binding](demo#two-binding) |

### d-toggle event

| Event | Type | Description | Jump to Demo |
| :----: | :---------------------: | :------------------------------------ | ------------------------------------------- |
| change | `EventEmitter<boolean>` | Optional. If the function is enabled, true is returned. If the function is disabled, false is returned. | [Callback Event](demo#callback) |
