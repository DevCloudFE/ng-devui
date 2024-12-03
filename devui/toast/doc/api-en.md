# How to use

Import into module:

```ts
import { ToastModule } from 'ng-devui/toast';
```

In the page:

```xml
<d-toast></d-toast>
```

## d-toast

### d-toast Parameter

| Parameter                                                 | Type                         | Default | Description                                                                                                                                                                                                                                                                                                             | Jump to Demo                                                  | Global Config |
| --------------------------------------------------------- | ---------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------- |
| value                                                     | [`Array<Message>`](#message) | --      | Required. Message content array. For details about the message object definition, see the following description.                                                                                                                                                                                                        | [Basic usage](demo#basic-usage)                               |
| life                                                      | `number`                     | 5000    | Optional. Timeout interval, in milliseconds. The timeout interval disappears automatically. You can move the mouse to stop the timeout interval. The default value is 5000 milliseconds for common, success, and info , and 10000 milliseconds for error and warn.                                                      | [Timeout interval](demo#life)                                 |
| lifeMode                                                  | `string`                     | global  | Optional. The default value is global or single. The default value is global, indicating that all messages use the preset timeout interval of life or the first message in a group. If this parameter is set to single, each message uses its own timeout interval. For details, see the definition of life in Message. | [Each message uses a separate timeout interval.](demo#single) |
| sticky                                                    | `boolean`                    | false   | Optional. Indicating whether the database is permanently configured. This parameter is automatically disabled by default.                                                                                                                                                                                               |
| style                                                     | `{[klass:string]:any;}`      | --      | Optional. Style. Refer to [ngStyle](https://angular.io/api/common/NgStyle)                                                                                                                                                                                                                                              | [Custom Style](demo#style)                                    |
| styleClass                                                | `string`                     | --      | Optional. Class name                                                                                                                                                                                                                                                                                                    | [Custom Style](demo#style)                                    |
| <span style="white-space:nowrap;">appendUpperLimit</span> | `number`                     | 0       | Optional. Adds a new message within the value range instead of clearing the original message. Note that the duration of the existing message is reset after the new message is inserted. Set to 0 to disable.                                                                                                           | [Display in appending mode](demo#append)                      |

## d-toast event

| Parameter   | Type                      | Description                                                                                                                                                                                                |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| closeEvent  | `EventEmitter<any>`       | Optional. Indicates the content of a message that is manually closed or disappears automatically. This parameter is optional.                                                                              |
| valueChange | `EventEmitter<Message[]>` | Optional. Indicates the array of remaining message content after the change (manually closed or automatically disappears). For details about the Message object definition, see the following description. |

## Interface & Type Definition

### Message

```ts
export interface Message {
  severity?: string; // The preset values include common, success, error, warn, and info. For details about the timeout interval, see the life description. If the timeout interval is not set or is not set, the timeout interval is 5000 ms, and the warn and error are 10000 ms.
  summary?: string; // Message title. If the timeout interval is set but no title is set, the title and close button are not displayed.
  content?: string | TemplateRef<any>; // Message content. Plain text and template are supported. Recommended.
  life?: number; // Timeout interval of a single message. Set lifeMode to single. Each message uses its own timeout interval. If this mode is enabled but is not set, the timeout interval is determined based on severity.
  id?: any; // Message ID.
}
```

## ToastService

The following information is added to the component:

```ts
import { ToastService } from 'ng-devui/toast';
```

In the constructor of the component, declare the following:

```ts
constructor(private toastService: ToastService) {}
```

Use in the page:

```html
<d-button (click)="openToast()">click me show simplest toast!</d-button> Invoke toastService.open() in the openToast function to enable
global toast notifications and obtain an instance. The sticky value of this instance is false by default, indicating that the instance is
automatically disabled. If sticky is set to true, it is resident, close() of the instance is called, Disable global toast notification.
```

```ts
this.toastService.open({
  value: [{ severity: 'info', summary: 'summary', content: 'details' }],
});
```

### ToastService Parameters

| Parameter                | Type                         | Default | Description                                                                                                                                                                                                                                                                                                             | Jump to Demo                           |
| ------------------------ | ---------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| value                    | [`Array<Message>`](#message) | --      | Required. Message content array. For details about the message object definition, see the following description.                                                                                                                                                                                                        | [Service Function](demo#toast-service) |
| life                     | `number`                     | 5000    | Optional. Timeout interval, in milliseconds. The timeout interval disappears automatically. You can move the mouse to stop the timeout interval. The default value is 5000 milliseconds for common, success, and info , and 10000 milliseconds for error and warn.                                                      | [Service Function](demo#toast-service) |
| lifeMode                 | `string`                     | global  | Optional. The default value is global or single. The default value is global, indicating that all messages use the preset timeout interval of life or the first message in a group. If this parameter is set to single, each message uses its own timeout interval. For details, see the definition of life in Message. | [Service Function](demo#toast-service) |
| sticky                   | `boolean`                    | false   | Optional. Indicating whether the database is permanently configured. This parameter is automatically disabled by default.                                                                                                                                                                                               | [Service Function](demo#toast-service) |
| style                    | `{[klass:string]:any;}`      | --      | Optional. Style. Refer to [ngStyle](https://angular.io/api/common/NgStyle)                                                                                                                                                                                                                                              | [Service Function](demo#toast-service) |
| styleClass               | `string`                     | --      | Optional. Class name                                                                                                                                                                                                                                                                                                    | [Service Function](demo#toast-service) |
| injector                 | `Injector`                   | --      | Optional. You can specify the syringe that will be used as the parent of the component.                                                                                                                                                                                                                                 |
| componentFactoryResolver | `ComponentFactoryResolver`   | --      | Optional. Customized dynamic rendering component parser.                                                                                                                                                                                                                                                                |

Receives sent data. CloseEvent returns the content of a single message that is manually closed or automatically disappeared. ValueChange returns the content array of the remaining message after the change (manually closed or automatically disappeared). For the definition of the [`Array<Message>`](#message) object, see the definition of the interface and type.

```ts
const results = this.toastService.open({
  value: [
    { severity: 'info', summary: 'summary', content: 'details in the first line' },
    { severity: 'error', summary: 'summary', content: 'details in the second line' },
    { severity: 'error', summary: 'summary', content: 'details in the third line' },
  ],
  sticky: true,
  style: { width: '600px', color: 'red' },
  styleClass: 'myCustom-toast',
  life: 5000,
  lifeMode: 'single',
});
//Receive the data sent by closeEvent.
results.toastInstance.closeEvent.subscribe((value: any) => {
  console.log('closeEvent', value);
});
//Receive the data transmitted by valueChange.
results.toastInstance.valueChange.subscribe((value: any) => {
  console.log('valueChange', value);
});
this.results = results;
console.log('results', this.results);

//The resident prompt set by sticky: true needs to be manually closed. Invoke close() of the returned instance to close the global prompt.
this.results.toastInstance.close();
```
