# How to use

Import into module:

```ts
import { TextareaModule } from 'ng-devui/textarea';
```

In the page:

```xml
<textarea dTextarea></textarea>
```
# dTextarea
## dTextarea Parameter

|  Parameter  |          Type         |           Default           |          Description          |         Jump to Demo         |
| :---------: | :-----------------------------------------: | :---: | :----------------------------------------------------------------------------------: | --------------------------------------------- |
| id          |                        `string`                            |    --    | Optional. Textarea ID |  [Basic Usage](demo#basic-usage) |
| placeholder |                        `string`                            |    --    | Optional. Textarea placeholder | [Basic Usage](demo#basic-usage) |
|   disabled  |                        `boolean`                           |   false  | Optional. Indicating whether the textarea is disabled | [Basic Usage](demo#basic-usage) |
|    error    |                        `boolean`                           |   false  | Optional. Indicating whether an input error occurs in the textarea | [Basic Usage](demo#basic-usage) |
|   resize    |     `none \| vertical \| horizontal \| both \| inherit`    |   none   | Optional. Indicates whether the textarea can be resized. The options are as follows: Unadjustable, Horizontal, Vertical, and Free. The default value is inherited | [Resizable](demo#resize) |
