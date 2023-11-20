# How to use
Import into module:
```ts
import { DrawerModule } from 'ng-devui/drawer';
```

In the page:
```html
<d-button (click)="openDrawer()">click me!</d-button>
Call drawerService.open() in the openDrawer function to open the drawer board.
```
**Open the drawer layer**: drawerService.**open** (~: **IDrawerOptions**): **IDrawerOpenResult**

```ts
openDrawer() {
    this.results = this.drawerService.open({
      drawerContentComponent: DrawerContentComponent,
      width: '50%',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      onClose: () => {
        console.log('on drawer closed');
      },
      data: {
        text: 'hello',
        name: 'tom1'
      }
    });
  }
```
Note: Components passed to drawerContentComponent in the API need to be registered in the \`declarations\` and \`entryComponents\` properties of the current module.

# Drawer


## IDrawerOptions Parameter

| Attribute | Type | Default | Description | Jump to Demo |Global Config|
| :----------------: | :----------------------: | :------------------------: | :------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------- |
| drawerContentComponent | `Type<any>` | -- | Optional. The user-defined component is transferred. | [Basic Usage](demo#basic-usage) |
|     contentTemplate      |       `TemplateRef<any>`        |    --    | Optional. Customized template, incompatible with drawerContentComponent.       | [Custom Template](demo#template) |
| componentFactoryResolver | `ComponentFactoryResolver` | Built-in | Optional. Generally this parameter is not required. |
| injector | `Injector` | -- | Optional. You do not need to set this parameter. |
| width | `string` | '300px' | Optional. Sets the width of the drawer. | [Basic Usage](demo#basic-usage) |
| zIndex | `number` | 1000 | Optional. Sets the z-index value of the drawer. | [Basic Usage](demo#basic-usage) |
| isCover | `boolean` | true | Optional. Indicating whether a mask is available. | [Basic Usage](demo#basic-usage) |
| data | `any` | -- | Optional. Any object can be transferred for the drawerContentComponent. | [Basic Usage](demo#basic-usage) |
| backdropCloseable | `boolean` | true | Optional. Specifies whether to close the drawer layer by clicking the background. | [Basic Usage](demo#basic-usage) |
| escKeyCloseable | `boolean` | true | Optional. Sets whether the drawer layer can be closed by pressing the esc key. | [Basic Usage](demo#basic-usage) |
| onClose | `Function` | -- | Optional. This command is invoked when the drawer is disabled. | [Basic Usage](demo#basic-usage) |
| afterOpened | `Function` | -- | This command is optional. It is invoked when the drawer is opened. |
| beforeHidden | `Function\|Promise\|()=> Observable<boolean>` | -- | Optional. This API is invoked before the drawer is disabled. The value of the boolean type is returned. The value false can prevent the drawer layer from being disabled. | [basic usage](demo#basic-usage) |
| clickDoms | `array` | [] | Optional. When isCover is set to false, click Dom to close the side slide bar. | [Do not destroy after being closed](demo#do-not-destroy-after-closing) |
| destroyOnHide | `boolean` | true | Optional. Whether to destroy the drawer component when the drawer is disabled. The default value is yes. | [Do not destroy after being closed](demo#do-not-destroy-after-closing) |
| position | `string` | 'right' | Optional. The value can be left or right. | [Basic Usage](demo#basic-usage) |
| bodyScrollable | `boolean` | true | Optional. Whether the body can be scrolled when the drawer opens. The default value is false. If the scroll bar is hidden, the scroll bar may jitter. You need to resolve the problem in the page layout. |s
| showAnimation | `boolean` | true | optional. Whether to enable animation. |
| id | `string` | -- | Optional. Id of the drawer. |
| resizable | `boolean` | false | Optional. Whether the drawer's width can be dynamically adjusted. |

## IDrawerOpenResult Parameter

| Attribute | Type | Description | Jump to Demo |
| :-------------------: | :---------------: | :-------------------------------------------: | ----------------------------------------------- |
| drawerInstance | `DrawerComponent` | Returns a Drawer object. | [Basic Usage](demo#basic-usage) |
| drawerContentInstance | `Type<any>` | Returns the object that carries the content of the Drawer, including the incoming data. | [Basic Usage](demo#basic-usage) |

## drawerInstance API

- **Switch the full screen status of the drawer**: drawerInstance.**toggleFullScreen**(): void

- **Set the full-screen status of the drawer**: drawerInstance.**setFullScreen**(fullScreen: boolean): void

- **Trigger opening of the drawer layer**:drawerInstance.**show**(): void

- **Trigger the drawer layer to be disabled**: drawerInstance.**hide**(): void. This function checks beforeHidden first. If true is returned, the function is disabled.

- **Close drawer layer directly**：drawerInstance.**hideDirectly**(): void，Skip all hook functions and close directly.

- **Trigger the destruction of the drawer layer**: drawerInstance.**destroy**(): void. When destroyOnHide is set to false and the drawer layer is disabled, the destroy method can be invoked to destroy the drawer layer.
- **Set the width**: drawerInstance.**setWidth**(width: string): void
