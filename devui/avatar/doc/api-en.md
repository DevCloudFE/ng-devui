### d-avatar parameter

| Parameter | Type | Default | Description | Jump to Demo |
| :--------: | :--------------------: | :--: | :-------------------------------------------------------------------------- | ------------------------------------------------------------- |
| name | `string` | -- | Required. The input character string is used to create a profile picture. | [Basic Rules](demo#basic-rules) |
| gender | `string\|male\|female` | -- | Optional. The profile picture color is differentiated by gender. The input string can be in the format of `female\|male`. | [Basic Rules](demo#basic-rules) |
| width | `number` | 40 | Optional. Width of the avatar, in px. | [Basic Configuration](demo#basic-configuration) |
| height | `number` | 40 | Optional. Set the height of the avatar, in px. | [Basic Configuration](demo#basic-configuration) |
| isRound | `boolean` | true | Optional. Indicating whether to display a circular avatar. | [Basic Configuration](demo#basic-configuration) |
| imgSrc | `string` | -- | Optional. Import a customized image as the avatar. | [Basic Configuration](demo#basic-configuration) |
| customText | `string` | -- | Optional. Input the customized display text. | [Basic Configuration](demo#basic-configuration) |

#### Display Priority

imgSrc > customText > name
