# How to use

Import into module:

```ts
import { ToastModule } from 'ng-devui/toast';
```

In the page:

```xml
<d-toast></d-toast>
```

# d-toast

## d-toast Parameter

| Parameter  |             Type             | Default | Description                                                                                                                                                                                                                                                                                                             | Jump to Demo                                                  |
| :--------: | :--------------------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
|   value    | [`Array<Message>`](#message) |   --    | Required. Message content array. For details about the message object definition, see the following description.                                                                                                                                                                                                        | [Basic usage](demo#basic-usage)                               |
|    life    |           `number`           |  5000   | Optional. Timeout interval, in milliseconds. The timeout interval disappears automatically. You can move the mouse to stop the timeout interval. The default value is 5000 milliseconds for common, success, and info , and 10000 milliseconds for error and warn.                                                      | [Timeout interval](demo#life)                                 |
|  lifeMode  |           `string`           | global  | Optional. The default value is global or single. The default value is global, indicating that all messages use the preset timeout interval of life or the first message in a group. If this parameter is set to single, each message uses its own timeout interval. For details, see the definition of life in Message. | [Each message uses a separate timeout interval.](demo#single) |
|   sticky   |          `boolean`           |  false  | Optional. Indicating whether the database is permanently configured. This parameter is automatically disabled by default.                                                                                                                                                                                               |
|   style    |           `string`           |   --    | Optional. Style                                                                                                                                                                                                                                                                                                         |
| styleClass |           `string`           |   --    | Optional. Class name                                                                                                                                                                                                                                                                                                    |

## d-toast event

|  Parameter  |           Type            | Description                                                                                                                                                                                                |
| :---------: | :-----------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| closeEvent  |    `EventEmitter<any>`    | Optional. Indicates the content of a message that is manually closed or disappears automatically. This parameter is optional.                                                                              |
| valueChange | `EventEmitter<Message[]>` | Optional. Indicates the array of remaining message content after the change (manually closed or automatically disappears). For details about the Message object definition, see the following description. |

# 接口 & 类型定义

### Message

```ts
export interface Message {
  severity?: string; // The preset values include common, success, error, warn, and info. For details about the timeout interval, see the life description. If the timeout interval is not set or is not set, the timeout interval is 5000 ms, and the warn and error are 10000 ms.
  summary?: string; // Message title. If the timeout interval is set but no title is set, the title and close button are not displayed.
  detail?: string; // Message content, content replacement is recommended.
  content?: string | TemplateRef<any>; // Message content. Plain text and template are supported. Recommended.
  life?: number; // Timeout interval of a single message. Set lifeMode to single. Each message uses its own timeout interval. If this mode is enabled but is not set, the timeout interval is determined based on severity.
  id?: any; // Message ID.
}
```
