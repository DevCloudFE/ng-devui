# How to use

Import into module:

```ts
import { MentionModule } from 'ng-devui/mention';
```

In the page:

```html
<xxx dMention xxx [suggestions]="suggestions"></xxx>
```

# mention

## mention parameters

| Parameter              | Type                                            | Default                            | Description                                                                                                       | Jump to Demo                                                |
| ---------------------- | ----------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| mentionPosition        | `'top' \| 'bottom'`                             | `bottom`                           | Option. Recommended box location                                                                                  | [Basic Usage](demo#basic-usage)                             |
| mentionSuggestions     | `[]`                                            | --                                 | required. Suggested Data Source                                                                                   | [Basic Usage](demo#basic-usage)                             |
| mentionNotFoundContent | `string`                                        | `'No suggestion matched'`          | Option. It is used for prompting when no data is matched.                                                         | --                                                          |
| mentionLoading         | `boolean`                                       | `false`                            | Option.Indicates whether to display the loading effect during asynchronous data source loading.                   | [Async Usage](demo#async-usage)                             |
| mentionItemTemplate    | `TemplateRef`                                   | --                                 | Option. Custom Recommendation Template                                                                            | [Custom Template](demo#custom-template)                     |
| dmValueParse           | `(value: string) => string = (value) => value;` | --                                 | Option. Function that maps an suggestion's value                                                                  | [Custom Prefix](demo#custom-prefix)                         |
| mentionTrigger         | `string[]`                                      | `['@']`                            | Option. Prefix for triggering components                                                                          | [Custom Prefix](demo#custom-prefix)                         |
| mentionSeparator         | `string`                                        | --                                 | Option.Used to separate the content of the triggering component from other content. The default value is a space. | [Use Separators](demo#use-separator) |
| mentionSeparatorToggle   | `{ prefix: boolean,`<br>`suffix: boolean }`     | `{ prefix: false, suffix: false }` | Option.Controls whether components are separated from other content by spaces                                     | [Use Separators](demo#use-separator) |

## mention Event

| Parameter               | Type                                                          | Default | Description                                                          | Jump to Demo                        |
| ----------------------- | ------------------------------------------------------------- | ------- | -------------------------------------------------------------------- | ----------------------------------- |
| mentionSelectItem       | `any`                                                         | --      | Option. Trigger Selection Suggestion.                                | [Basic Usage](demo#basic-usage)     |
| mentionAfterMentionInit | --                                                            | --      | Option. Returns an directive instance after directive initialization | [Basic Usage](demo#basic-usage)     |
| mentionSearchChange     | [`EventEmitter<MentionOnSearchTypes>`](#MentionOnSearchTypes) | --      | Option. Input box change event                                       | [Custom Prefix](demo#custom-prefix) |

# Interface & Type Definition

### MentionOnSearchTypes

```ts
export interface MentionOnSearchTypes {
  value: string;
  trigger: string;
}
```
