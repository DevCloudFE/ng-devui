### [dLoading] Parameters

| Parameter | Type | Default | Description | Jump to Demo |
| :----------------: | :--------------------------: | :--------------------: | :------------------------------------------------------------------ | ---------------------------------------------- |
| loading | `LoadingType` | -- | Optional. Controlling the loading status | [Basic Usage](demo#basic-usage) |
| message | `string` | -- | Optional. Prompt message during loading | [Multipromise](demo#multi-promise) |
| loadingTemplateRef | `TemplateRef<any>` | -- | Optional. Custom loading template | [Custom Style](demo#custom-style) |
| backdrop | `boolean` | -- | Optional. Indicating whether to display the mask during loading | [Basic Usage](demo#basic-usage) |
| showLoading | `boolean` | -- | Optional. This parameter is used to manually enable or disable the loading status. This parameter cannot be used together with the `loading` parameter | [Using ShowLoading](demo#show-loading)
| positionType | `string` | 'relative' | Optional. This parameter specifies the positioning type of the `dLoading` host element. The value is the same as that of the css position attribute | [Using ShowLoading](demo#show-loading)
| view | `{top?:string,left?:string}` | {top: '50%',left:'50%'} | Optional. Adjust the loading display position, that is, the distance between the top and left of the host element | [Basic Usage](demo#basic-usage) |

Loading Type is `Observable<any> | Promise<any> | Array<Promise<any>> | Array<Observable<any>> | undefined`
