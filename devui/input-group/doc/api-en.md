# How to -use

Import into module:

```ts
import { InputGroupModule } from 'ng-devui/input-group';
```

In the page:

```xml
<d-input-group></d-input-group>
```

## d-input-group

### d-input-group Parameter

| Attributes    | Type                         | Default                 | Description                                                                                        | Jump to Demo                    | Global Config |
| ------------- | ---------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------- | ------------- |
| prefixContent | `'string \| TemplateRef<any` | --                      | Optional. Set the prefix.                                                                          | [Basic usage](demo#basic-usage) |
| suffixContent | `'string\| TemplateRef<any`  | --                      | Optional. Set the suffix.                                                                          | [Basic usage](demo#basic-usage) |
| spliceType    | `ISpliceType`                | <pre>'standalone'</pre> | Optional. Set the adaptive splicing type. Note that both splicing parties must set this parameter. | [Basic usage](demo#basic-usage) |
| isEmbed       | `boolean`                    | false                   | Optional. It is used together with dTextInput to embed the prefix and suffix into the text box.    | [嵌入用法](demo#embed-usage)    |
| disabled      | `boolean`                    | false                   | Optional. This parameter is used together with isEmbed to disable the function.                    | [嵌入用法](demo#embed-usage)    |

## Interface & Type Definition

### ISpliceType

The default value is 'standalone', indicating that the auto-adaptive stitching type must be set for both stitching parties.

```ts
export type ISpliceType = 'standalone' | 'left' | 'right' | 'both';
```
