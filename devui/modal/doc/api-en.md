## Modal Description

**Open the modal**: modalService.**open** (~: **IModalOptions**).

### IModalOptions

| Parameter | Type | Default | Description | Jump to Demo |
| :----------------------: | :-----------------------------: | :------: | :--------------------------------------------- | --------------------------------------------------------------- |
| id | `string` | -- | Required. ID of the dialog box displayed. | [Custom Dialog Box](demo#custom-dialog) |
| width | `string` | -- | Optional. Width of the pop-up box (e.g 300px). | [Custom Dialog Box](demo#custom-dialog) |
| zIndex | `number` | 1050 | Optional. Z-index value in the dialog box displayed. |
| component | `Component` | -- | Optional. Pop-up component. The component content is displayed in the pop-up box. | [Custom Dialog Box](demo#custom-dialog) |
| injector | `Injector` | true | Optional. You can specify the syringe that will be used as the parent of the component. |
| data | `object` | -- | Optional. The attribute of the component instance is transferred. | [Custom Dialog Box](demo#custom-dialog) |
| showAnimate | `boolean` | -- | Optional. Indicating whether to display animations. | [Custom Dialog Box](demo#custom-dialog) |
| backdropCloseable | `boolean` | true | Optional. Can the dialog box be closed when you click a blank area? | [Custom Dialog Box](demo#custom-dialog) |
| componentFactoryResolver | `ComponentFactoryResolver` | -- | Optional. Customized dynamic rendering component parser. |
| onClose | `function` | -- | Optional. Function called back after the dialog box is closed. | [Custom Dialog Box](demo#custom-dialog) |
| beforeHidden | `function, Promise, Observable` | -- | Optional. Callback before closing a window. |
| placement | enum('center', 'top', 'bottom') | 'center' | Optional. This parameter is optional and specifies the position where the dialog box is displayed. |
| offsetX | `string` | '0px' | Optional. Horizontal offset of the pop-up box. |
| offsetY | `string` | '0px' | Optional. Vertical offset of the pop-up box. |
| bodyScrollable | `boolean` | true |Optional. Specifies whether the body can scroll after modal is enabled. The default value is false. The scroll bar is hidden. Hiding the scroll bar may cause jitter. You can set the outer fixed to avoid scrolling and jitter.  |[The outer layer is fixed to solve the jitter and scrolling problem](demo#template-fixed) |
| contentTemplate | `TemplateRef<any>` | -- | Optional. It is a dialog box content template, which is incompatible with the component. | [Customizing a pop-up box content template](demo#template-content) |
| escapable | `boolean` | true | Optional. Specifies whether to support pop-up window closure by pressing the Esc key. |

## Dialog Description

**open dialog**:dialogService.**open** ( ~ : **IDialogOptions** )

### IDialogOptions

| Parameter | Type | Default | Description | Jump to Demo |
| :----------------------: | :-----------------------------: | :--------: | :----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| id | `string` | -- | Required. The ID of the dialog box is displayed. | [Standard Dialog Box](demo#standard-dialog) |
| width | `string` | -- | Optional. Width of the dialog box (e.g 300px). | [Standard Dialog Box](demo#standard-dialog) |
| zIndex | `number` | 1050 | Optional. Z-index value in the dialog box displayed. | [Information](demo#message-hint) |
| maxHeight | `string` | -- | Optional. The maximum height of the dialog box (e.g 600px). | [Standard Dialog Box](demo#standard-dialog) |
| title | `string` | -- | Optional. Pop-up box title. | [Standard Dialog Box](demo#standard-dialog) |
| content | `string, Component` | -- | Optional. Pop-up box content. Character strings and components are supported. | [Standard Dialog Box](demo#standard-dialog) |
| html | `boolean` | -- | Optional. Whether content is HTML code. | [Warning Dialog Box](demo#warning-pop-up) |
| injector | `Injector` | true | Optional. You can specify the syringe that will be used as the parent of the component. |
| data | `object` | -- | Optional. When content is set to Component, the attribute is transferred to the Component instance. | [Standard Dialog Box](demo#standard-dialog) |
| buttons | `array` | -- | Optional. Pop-up box button, which supports custom text, style, disabling, and click events. | [Standard Dialog Box](demo#standard-dialog) |
| showAnimate | `boolean` | -- | Optional. Whether to display animation. | [Blocking dialog box closed](demo#intercept-dialog-closed) |
| backdropCloseable | `boolean` | true | Optional. Can the dialog box be closed when you click a blank area? | [Blocking dialog box closed](demo#intercept-dialog-closed) |
| componentFactoryResolver | `ComponentFactoryResolver` | -- | Optional. Customized dynamic rendering component parser. |
| onClose | `Function` | -- | Optional, Function called back after the dialog box is closed. | [Standard Dialog Box](demo#standard-dialog) |
| beforeHidden | `Function, Promise, Observable` | -- | Optional. It can prevent dialog boxes from closing. | [Blocking dialog box closed](demo#intercept-dialog-closed) |
| dialogtype | `string` | 'standard' | Optional. The options are standard, success, failed, warning, and info. | [Standard Dialog Box](demo#standard-dialog) |
| draggable | `boolean` | true | Optional. Whether the pop-up box can be dragged. |
| placement | enum('center', 'top', 'bottom') | 'center' | Optional. This parameter is optional and specifies the position where the dialog box is displayed. |
| offsetX | `string` | '0px' | Optional. Horizontal offset of the pop-up box. |
| offsetY | `string` | '0px' | Optional. Vertical offset of the pop-up box. |
| bodyScrollable | `boolean` | true |Optional. Specifies whether the body can scroll after dialog is enabled. The default value is false. The scroll bar is hidden. Hiding the scroll bar may cause jitter. You can set the outer fixed to avoid scrolling and jitter. |[The outer layer is fixed to solve the jitter and scrolling problem](demo#template-fixed) |
| contentTemplate | `TemplateRef<any>` | -- | Optional. It is a pop-up box content template, which is incompatible with content. | [Customizing a pop-up box content template](demo#template-content) |
| escapable | `boolean` | true | Optional. Specifies whether to support the ESC key to close the pop-up window.|                                              |

### ModalOpenResult

| Attribute | Type | Description | Jump to Demo |
| :------------------: | :--------------: | :-----------------------------------------------: | :--------------------------------------------------: |
| modalInstance | `ModalComponent` | Returns a Modal object. Which can be used as the context of the content template. | [Standard Dialog Box](demo#standard-dialog) |
| modalContentInstance | `Type<any>` | Returns the object of Modal content. | [Standard Dialog Box](demo#standard-dialog) |

### modalInstance 公共方法
| Method name | Parameter | Default value | Description | Jump to Demo |
| :----: | :---: | :----- | :-------: | :-------: |
| hide | -- | -- | Close modal. | [Standard Dialog Box](demo#standard-dialog) |
| updateButtonOptions | buttons | [] | Dynamically updates the button configuration item in the dialog, for example, disabled. | [Update the button status in the dialog box](demo#update-button-options) |

### buttons Type Definition

```javascript
buttons: Array<{
    id?: string;
    cssClass?: string;
    text: string;
    handler: ($event: Event) => void;
    btnwidth?: string;
    autofocus?: boolean;
    disabled?: boolean;
  }>;
```

## dMoveable directive

| Parameter | Type | Default | Description | Jump to Demo |
| :-------: | :-----------: | :---: | :-------------------------------------------------- | --------- |
| dMoveable | `boolean` | false | Optional. Whether to enable the drag function. | [Custom Dialog Box](demo#custom-dialog)|
| handle | `HTMLElement` | -- | Optional. Elements that can be dragged. | [Custom Dialog Box](demo#custom-dialog)|
| moveEl | `HTMLElement` | -- | Optional. Dragged block. By default, the element using the dMoveable instruction is used. | [Custom Dialog Box](demo#custom-dialog)|
