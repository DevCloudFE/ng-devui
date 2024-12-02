# How to use

Import into module:

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

In the page:

```xml
<textarea dTextarea></textarea>
<d-textarea-max-length></d-textarea-max-length>
```

## dTextarea

### dTextarea Parameter

| Parameter            | Type                                                | Default   | Description                                                                                                                                                       | Jump to Demo                                              | Global Config |
| -------------------- | --------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------- |
| error                | `boolean`                                           | false     | Optional. Indicating whether an input error occurs in the textarea.                                                                                               | [Basic Usage](demo#basic-usage)                           |               |
| maxLengthBlocker     | `boolean`                                           | false     | Optional. This function can be enabled when the number of IME Composition symbols entered in the text box exceeds the limit specified by maxLength.               |                                                           |               |
| ~~maxLengthCounter~~ | `boolean`                                           | false     | Optional. Length statistics of textarea input content.                                                                                                            | [Listening input and maximum number of words](demo#count) |               |
| resize               | `none \| vertical \| horizontal \| both \| inherit` | none      | Optional. Indicates whether the textarea can be resized. The options are as follows: Unadjustable, Horizontal, Vertical, and Free. The default value is inherited | [Resizable](demo#resize)                                  |               |
| showGlowStyle        | `boolean`                                           | true      | Optional. Indicates whether to display the floating glow effect.                                                                                                  |                                                           | ✔             |
| styleType            | `'default' \| 'gray'`                               | 'default' | Optional. Default indicates the white background style of the wire frame, and gray indicates the gray background style of the wireless frame.                     |                                                           | ✔             |

## dTextareaMaxLength

### dTextareaMaxLength Parameter

| Parameter        | Type                                                | Default   | Description                                                                                                                                                       | Jump to Demo                                              | Global Config |
| ---------------- | --------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------- |
| disabled         | `boolean`                                           | false     | Optional. Indicating whether the textarea is disabled.                                                                                                            |                                                           |               |
| error            | `boolean`                                           | false     | Optional. Indicating whether an input error occurs in the textarea.                                                                                               |                                                           |               |
| maxWidth         | `string`                                            | --        | Optional. Maximum width of the textarea.                                                                                                                          | [监听输入及最大字数](demo#count)                          |               |
| maxHeight        | `string`                                            | --        | Optional. Maximum height of the textarea.                                                                                                                         | [监听输入及最大字数](demo#count)                          |               |
| maxLength        | `number`                                            | --        | Optional. Maximum length of the textarea.                                                                                                                         | [Listening input and maximum number of words](demo#count) |               |
| maxLengthBlocker | `boolean`                                           | false     | Optional. This function can be enabled when the number of IME Composition symbols entered in the text box exceeds the limit specified by maxLength.               |                                                           |               |
| placeholder      | `string`                                            | --        | Optional. Textarea placeholder.                                                                                                                                   | [Listening input and maximum number of words](demo#count) |               |
| rows             | `number`                                            | 3         | Optional. Number of lines in textarea.                                                                                                                            |                                                           |               |
| resize           | `none \| vertical \| horizontal \| both \| inherit` | none      | Optional. Indicates whether the textarea can be resized. The options are as follows: Unadjustable, Horizontal, Vertical, and Free. The default value is inherited | [Listening input and maximum number of words](demo#count) |               |
| showGlowStyle    | `boolean`                                           | true      | Optional. Indicates whether to display the floating glow effect.                                                                                                  |                                                           | ✔             |
| styleType        | `'default' \| 'gray'`                               | 'default' | Optional. Default indicates the white background style of the wire frame, and gray indicates the gray background style of the wireless frame.                     |                                                           | ✔             |
