# How to use

Import into module:

```ts
import { TagsInputModule } from 'ng-devui/tags-input';
```

In the page:

```html
<d-tags-input></d-tags-input>
```

## TagsInput

### d-tags-input parameter

| Parameter       | Type                            | Default                   | Description                                                                                                                                                                                                            | Jump to Demo                             | Global Config |
| --------------- | ------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------- |
| tags            | `Array`                         | []                        | Required. This parameter records the entered tag and selected tag list.                                                                                                                                                | [Basic Usage](demo#basic-usage)          |
| displayProperty | `string`                        | 'name'                    | Optional. Attribute name used by a list item                                                                                                                                                                           | [Basic Usage](demo#basic-usage)          |
| placeholder     | `string`                        | ''                        | Optional. This parameter specifies the placeholder in the text box.                                                                                                                                                    | [Basic Usage](demo#basic-usage)          |
| maxPlaceholder  | `string`                        | 'Maximum number reached:' | Optional. Placeholder in the text box when the number of input tags reaches the maximum. This parameter is not displayed when the number of input tags is set to an empty string.                                      |                                          |
| minLength       | `number`                        | 3                         | Optional. Enter the minimum length of the tag content.                                                                                                                                                                 | [Basic Usage](demo#basic-usage)          |
| maxLength       | `number`                        | Number.MAX_SAFE_INTEGER   | Optional. Enter the maximum length of the tag content.                                                                                                                                                                 | [Basic Usage](demo#basic-usage)          |
| minTags         | `number`                        | 0                         | Optional. Minimum number of tags that can be entered                                                                                                                                                                   | [Basic Usage](demo#basic-usage)          |
| maxTags         | `number`                        | Number.MAX_SAFE_INTEGER   | Optional. Maximum number of tags that can be entered                                                                                                                                                                   | [Basic Usage](demo#basic-usage)          |
| caseSensitivity | `boolean`                       | false                     | Optional. Is case sensitive. The default value is ignoring.                                                                                                                                                            | [Basic Usage](demo#basic-usage)          |
| spellcheck      | `boolean`                       | true                      | Optional. Indicates whether to enable spelling check in the input text box.                                                                                                                                            | [Basic Usage](demo#basic-usage)          |
| isAddBySpace    | `boolean`                       | true                      | Optional. Whether to support the space bar.                                                                                                                                                                            | [Basic Usage](demo#basic-usage)          |
| showSuggestion  | `boolean`                       | true                      | Optional. Indicates whether the drop-down list is not displayed. You can add tags only by entering.                                                                                                                    | [Basic Usage](demo#basic-usage)          |               |
| suggestionList  | `Array`                         | []                        | Optional. This parameter is a drop-down list box. The default tag list can be selected.                                                                                                                                | [Basic Usage](demo#basic-usage)          |
| checkBeforeAdd  | `Function\|Promise\|Observable` | None                      | Optional. User-defined verification function whose type is (newTag: string) => boolean, Promise<boolean>, or Observable<boolean>                                                                                       | [Customize](demo#customize)              |
| disabled        | `boolean`                       | false                     | Optional. Disabled is unavailable.                                                                                                                                                                                     | [Basic Usage](demo#basic-usage)          |
| showAnimation   | `boolean`                       | true                      | optional. Whether to enable animation.                                                                                                                                                                                 |                                          | ✔             |
| appendToBody    | `boolean`                       | false                     | Optional. Whether to append to body is displayed in the drop-down list box.                                                                                                                                            | [Customize](demo#customize)              |
| itemTemplate    | `TemplateRef`                   | --                        | Optional. Customized option display template.                                                                                                                                                                          | [Customize](demo#customize)              |
| virtualScroll   | `boolean`                       | false                     | Optional. Whether to use virtual scrolling. This parameter is used in scenarios with a large amount of data.                                                                                                           | [Virtual scrolling](demo#virtual-scroll) |
| multiline       | `boolean`                       | true                      | Optional. Indicates whether the component is displayed in two lines. When this parameter is true, this parameter is used together with maxHeight to control whether the selected label is displayed in multiple lines. | [Basic Usage](demo#basic-usage)          |
| maxHeight       | `string`                        | --                        | Optional. Maximum height of the selected label container.                                                                                                                                                              | [Basic Usage](demo#basic-usage)          |

Note: In addition to the "tags" mode, you can also use the "ngModel" mode to bind arrays. For details, see [Customize](demo#customize).

### d-tags-input event

| Event       | Type                | Description                                                                                                                                                               | Jump to Demo                    |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| valueChange | `EventEmitter<any>` | This function is invoked when an option is selected. The parameter is the value of the selected option. To obtain the values of all selection states, use (ngModelChange) | [Basic Usage](demo#basic-usage) |
