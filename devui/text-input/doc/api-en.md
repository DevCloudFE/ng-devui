# How to use

Import into module:

```ts
import { TextInputModule } from 'ng-devui/text-input';
```

In the page:

```xml
<input dTextInput />
```

# dTextInput
### dTextInput Parameter

| Parameter | Type | Default | Description | Jump to Demo |Global Config| 
| :----------------: | :---------: | :-------: | :---: | :--------------------------: | ----------------------------------------------- |
| error | `boolean` | false | Optional. Indicating whether an input error occurs in the Text-input. | [Basic Usage](demo#basic-usage) |
|    size     | `'sm'\|''\|'lg'`  |  ''   | Optional. Size of the text box. The value can be `'lg'`,`''`,`'sm'` | [Size](demo#size) |
| showGlowStyle | `boolean` | true | (Optional) Indicates whether to display the floating glow effect.|
| styleType  | `'default' \| 'gray'` |          'default'          | Optional. Default indicates the white background style of the wire frame, and gray indicates the gray background style of the wireless frame. | [Basic Usage](demo#basic-usage) | ✔ |
