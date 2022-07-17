# How to use

Import into module:

```ts
import { AvatarModule } from 'ng-devui/avatar';
```

In the page:

```xml
<d-avatar></d-avatar>
```
# d-avatar
## d-avatar Parameter

| Parameter          |        Type           |          Default        |       Description         |      Jump to Demo        |Global Config| 
| :----------------: | :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
|        name      |         `string`        |   --   | Required. The input character string is used to create a profile picture. | [Basic Rules](demo#basic-rules) |
|    gender        | `string \| male \| female`  |   --   | Optional. The profile picture color is differentiated by gender. The input string can be in the format of `female \| male`. | [Basic Rules](demo#basic-rules) |
|      width       |         `number`        |   40   | Optional. Width of the avatar(`px`) | [Basic Configuration](demo#basic-configuration) |
|       height     |         `number`        |   40   | Optional. Set the height of the avatar(`px`) | [Basic Configuration](demo#basic-configuration) |
|      isRound     |        `boolean`        |   true | Optional. Indicating whether to display a circular avatar | [Basic Configuration](demo#basic-configuration)     |
|      imgSrc      |         `string`        |   --   | Optional. Import a customized image as the avatar | [Basic Configuration](demo#basic-configuration) |
|    customText    |         `string`        |   --   | Optional. Input the customized display text | [Basic Configuration](demo#basic-configuration) |
|  referrerPolicy  |        `string`        |  no-referrer-when-downgrade  | Specifies which referrer information to use when fetching an image. |   |


### Basic Profile Picture Display Rules

- `Begin with Chinese `: Use the last two characters.
- `Begin with English `: Use the first two characters.
- `Use multiple English names together`: Use the first two letters of the first English name.
- `Not starting with Chinese or English `: Use the first two characters.

### Special avatar display rules

- If `name`, `customText`, and `imgSrc` are not transferred, the user who uses the avatar does not exist.
- If the values of `name`, `customText`, and `imgSrc` are empty, the user who uses the avatar does not have a nickname and the default avatar is used.

### Display Priority

imgSrc > customText > name
