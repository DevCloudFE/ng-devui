# How to use

Import into module

```ts
import { LoadingModule } from 'ng-devui/loading';
```

In the page

```html
<!-- xxx can be any elements -->
<xxx dLoading></xxx>
```

# dLoading

## dLoading Parameters

|     Parameter      |             Type              |         Default         | Description                                                                                                                                            | Jump to Demo                           |Global Config| 
| :----------------: | :----------------: | :---------------------------: | :---------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
|      loading       | [`LoadingType`](#loadingtype) |           --            | Optional. Controlling the loading status                                                                                                               | [Basic Usage](demo#basic-usage)        |
|      message       |           `string`            |           --            | Optional. Prompt message during loading                                                                                                                | [Multipromise](demo#multi-promise)     |
| loadingTemplateRef |      `TemplateRef<any>`       |           --            | Optional. Custom loading template                                                                                                                      | [Custom Style](demo#custom-style)      |
|      backdrop      |           `boolean`           |           --            | Optional. Indicating whether to display the mask during loading                                                                                        | [Basic Usage](demo#basic-usage)        |
|    showLoading     |           `boolean`           |           --            | Optional. This parameter is used to manually enable or disable the loading status. This parameter cannot be used together with the `loading` parameter | [Using ShowLoading](demo#show-loading) |
|    positionType    |           `string`            |       'relative'        | Optional. This parameter specifies the positioning type of the `dLoading` host element. The value is the same as that of the css position attribute    | [Using ShowLoading](demo#show-loading) |
|        view        | `{top?:string,left?:string}`  | {top: '50%',left:'50%'} | Optional. Adjust the loading display position, that is, the distance between the top and left of the host element                                      | [Basic Usage](demo#basic-usage)        |
|       zIndex       |   `number`    | -- | Optional. Z-index value in the loading displayed. |  [Basic Usage](demo#basic-usage)       |
|       loadingStyle       |        [`LoadingStyle`](###LoadingStyle)      |   `'default'`   | Optional. Loading type `'default' \| 'infinity'`.      | [Basic Usage](demo#basic-usage)    |

### LoadingType

```ts
export type LoadingType = Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | Subscription | undefined;
```

### LoadingStyle

```ts
export type LoadingStyle = 'default' | 'infinity';
```

# LoadingService

Import into component

```ts
import { LoadingService } from 'ng-devui/loading';
```

In the constructor of component, declare:

```ts
constructor( private loadingService: LoadingService ) {}
```

In the page

```html
<d-button bsStyle="primary" (click)="openFullScreen()">click me show full screen loading!</d-button>
Invoke loadingService.open() in the openFullScreen function to enable loading. The return value is an instance. The instance invokes close() to disable loading.
```

```ts
// For example, const dm = document.querySelector('#me');
// For Example: @ViewChild('loadingTemplateRef1', {static: true}) loadingTemplateRef1: TemplateRef<any>;
  this.loadingService.open({
    target: dm,
    loadingTemplateRef: loadingTemplateRef1,
    backdrop: true,
    message: 'One moment please...',
    positionType: 'relative',
    view: {
      top: '50%',
      left: '50%'
    }
  });
```

## LoadingService Parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :----------------: | :--------------------------: | :--------------------: | :------------------------------------------------------------------ | ---------------------------------------------- |
| target | `Element`  | document.body | Optional. Loads the DOM nodes to be covered. | [Service function](demo#full-screen) |
| message | `string` | -- | Optional. Prompt message during loading | [Service function](demo#full-screen) |
| loadingTemplateRef | `TemplateRef<any>` | -- | Optional. Custom loading template | [Service function](demo#full-screen) |
| backdrop | `boolean` | true | Optional. Indicating whether to display the mask during loading | [Service function](demo#full-screen) |
| positionType | `'static' \| 'relative' \| 'absolute' \| 'fixed' \|'sticky'` | 'relative' | Optional. This parameter specifies the positioning type of the `dLoading` host element.  |[Service function](demo#full-screen)
| view | `{top?:string,left?:string}` | {top: '50%',left:'50%'} | Optional. Adjust the loading display position, that is, the distance between the top and left of the host element | [Service function](demo#full-screen) |
| zIndex | `number` | -- | Optional. Z-index value in the loading displayed. | [Service function](demo#full-screen) |
| injector | `Injector` | -- | Optional. You can specify the syringe that will be used as the parent of the component. |
|       loadingStyle       |        [`LoadingStyle`](###LoadingStyle)      |   `'default'`   | Optional. Loading type `'default' \| 'infinity'`.      |     |