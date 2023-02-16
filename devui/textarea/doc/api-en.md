# How to use

Import into module:

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

In the page:

```xml
<textarea dTextarea></textarea>
```

## dTextarea

### dTextarea Parameter

| Parameter        | Type                                                | Default | Description                                                                                                                                                       | Jump to Demo                                                | Global Config |
| ---------------- | --------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| error            | `boolean`                                           | false   | Optional. Indicating whether an input error occurs in the textarea                                                                                                | [Basic Usage](demo#basic-usage)                             |
| maxLengthBlocker | `boolean`                                           | false   | Optional. This function can be enabled when the number of IME Composition symbols entered in the text box exceeds the limit specified by maxLength.               | [Listening input and maximum number of words](demo#count) |
| resize           | `none \| vertical \| horizontal \| both \| inherit` | none    | Optional. Indicates whether the textarea can be resized. The options are as follows: Unadjustable, Horizontal, Vertical, and Free. The default value is inherited | [Resizable](demo#resize)                                    |
