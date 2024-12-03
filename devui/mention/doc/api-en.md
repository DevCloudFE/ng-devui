# How to use

Import into module:

```ts
import { MentionModule } from 'ng-devui/mention';
```

In the page:

```xml
<xxx dMention xxx [suggestions]="suggestions"></xxx>
```

## mention

### mention parameters

| Parameter              | Type                                            | Default                            | Description                                                                                                                                  | Jump to Demo                            |
| ---------------------- | ----------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| mentionSuggestions     | `[]`                                            | --                                 | Required. Suggested Data Source                                                                                                              | [Basic Usage](demo#basic-usage)         |
| mentionPosition        | `'top' \| 'bottom'`                             | `bottom`                           | Optional. Recommended box location                                                                                                           | [Basic Usage](demo#basic-usage)         |
| mentionNotFoundContent | `string`                                        | `'No suggestion matched'`          | Optional. It is used for prompting when no data is matched.                                                                                  | --                                      |
| mentionLoading         | `boolean`                                       | `false`                            | Optional. Indicates whether to display the loading effect during asynchronous data source loading.                                           | [Async Usage](demo#async-usage)         |
| mentionHeaderTemplate  | `TemplateRef`                                   | --                                 | Optional. Custom recommendation list header template                                                                                         | [Custom Template](demo#custom-template) |
| mentionItemTemplate    | `TemplateRef`                                   | --                                 | Optional. Custom recommendation template                                                                                                     | [Custom Template](demo#custom-template) |
| dmValueParse           | `(value: string) => string = (value) => value;` | --                                 | Optional. Function that maps an suggestion's value                                                                                           | [Custom Prefix](demo#custom-prefix)     |
| mentionTrigger         | `string[]`                                      | `['@']`                            | Optional. Prefix for triggering components                                                                                                   | [Custom Prefix](demo#custom-prefix)     |
| mentionSeparator       | `string`                                        | --                                 | Optional. Used to separate the content of the triggering component from other content. The default value is a space.                         | [Use Separators](demo#use-separator)    |
| mentionSeparatorToggle | `{ prefix: boolean,`<br>`suffix: boolean }`     | `{ prefix: false, suffix: false }` | Optional. Controls whether components are separated from other content by spaces                                                             | [Use Separators](demo#use-separator)    |
| showGlowStyle          | `boolean`                                       | true                               | Optional. Indicates whether to display the floating glow effect.                                                                             |
| endWithCursorPos       | `boolean`                                       | false                              | Optional. Indicates whether to use the cursor position as the end point of the inserted content and not to replace the content following it. |

### mention Event

| Parameter               | Type                                                          | Default | Description                                                            | Jump to Demo                        |
| ----------------------- | ------------------------------------------------------------- | ------- | ---------------------------------------------------------------------- | ----------------------------------- |
| mentionSelectItem       | `any`                                                         | --      | Optional. Trigger Selection Suggestion.                                | [Basic Usage](demo#basic-usage)     |
| mentionAfterMentionInit | --                                                            | --      | Optional. Returns an directive instance after directive initialization | [Basic Usage](demo#basic-usage)     |
| mentionSearchChange     | [`EventEmitter<MentionOnSearchTypes>`](#MentionOnSearchTypes) | --      | Optional. Input box change event                                       | [Custom Prefix](demo#custom-prefix) |

## Interface & Type Definition

### MentionOnSearchTypes

```ts
export interface MentionOnSearchTypes {
  value: string;
  trigger: string;
}
```
