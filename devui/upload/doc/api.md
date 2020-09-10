## d-single-upload 参数

|       参数       |                         类型                         |    默认    | 说明                                                                                     | 跳转 Demo                                       |
| :--------------: | :--------------------------------------------------: | :--------: | :--------------------------------------------------------------------------------------- | ----------------------------------------------- |
|   fileOptions    |           `IFileOptions`，参考下方 options           |     --     | 必选，待上传文件配置                                                                     | [基本用法](/components/upload/demo#basic-usage) |
|     filePath     |                       `string`                       |     --     | 必选，文件路径                                                                           | [基本用法](/components/upload/demo#basic-usage) |
|  uploadOptions   |          `IUploadOptions`，参考下方 options          |     --     | 必选，上传配置                                                                           | [基本用法](/components/upload/demo#basic-usage) |
|    autoUpload    |                      `boolean`                       |   false    | 可选，是否自动上传                                                                       | [基本用法](/components/upload/demo#basic-usage) |
| placeholderText  |                       `string`                       | '选择文件' | 可选，上传输入框中的 Placeholder 文字                                                    | [基本用法](/components/upload/demo#basic-usage) |
| preloadFilesRef  |                 `TemplateRef <any >`                 |     --     | 可选，用于创建自定义 已选择文件列表模板                                                  | [自定义](/components/upload/demo#custom)        |
|    uploadText    |                       `string`                       |   '上传'   | 可选，上传按钮文字                                                                       | [基本用法](/components/upload/demo#basic-usage) |
|  uploadedFiles   |                   `Array <Object>`                   |     []     | 可选，获取已上传的文件列表                                                               | [基本用法](/components/upload/demo#basic-usage) |
| uploadedFilesRef |                 `TemplateRef <any>`                  |     --     | 可选，用于创建自定义 已上传文件列表模板                                                  | [自定义](/components/upload/demo#custom)        |
|    withoutBtn    |                      `boolean`                       |   false    | 可选，是否舍弃按钮                                                                       | [基本用法](/components/upload/demo#basic-usage) |
|    enableDrop    |                      `boolean`                       |   false    | 可选，是否支持拖拽                                                                       | [基本用法](/components/upload/demo#basic-usage) |
|   beforeUpload   | `boolean 、 Promise<boolean> 、 Observable<boolean>` |     --     | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [基本用法](/components/upload/demo#basic-usage) |
|     disabled     |                      `boolean`                       |   false    | 可选，是否禁用上传组件                                                                   | [基本用法](/components/upload/demo#basic-usage) |

## d-single-upload 事件

|          参数           |        类型         | 说明                                                                                                                   | 跳转 Demo                                       |
| :---------------------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
|        fileOver         | `EventEmitter<any>` | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [基本用法](/components/upload/demo#basic-usage) |
|        fileDrop         | `EventEmitter<any>` | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [基本用法](/components/upload/demo#basic-usage) |
|      successEvent       | `EventEmitter<any>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [基本用法](/components/upload/demo#basic-usage) |
|       errorEvent        | `EventEmitter<any>` | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [基本用法](/components/upload/demo#basic-usage) |
| deleteUploadedFileEvent | `EventEmitter<any>` | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [基本用法](/components/upload/demo#basic-usage) |

## d-multiple-upload 参数

|          参数          |                         类型                         |      默认      | 说明                                                                               | 跳转 Demo                                                      |
| :--------------------: | :--------------------------------------------------: | :------------: | :--------------------------------------------------------------------------------- | -------------------------------------------------------------- |
|      fileOptions       |           `IFileOptions`，参考下方 options           |       --       | 必选，待上传文件配置                                                               | [多文件上传](/components/upload/demo#multi-files)              |
|        filePath        |                       `string`                       |       --       | 必选，文件路径                                                                     | [多文件上传](/components/upload/demo#multi-files)              |
|     uploadOptions      |          `IUploadOptions`，参考下方 options          |       --       | 必选，上传配置                                                                     | [多文件上传](/components/upload/demo#multi-files)              |
|       autoUpload       |                      `boolean`                       |     false      | 可选，是否自动上传                                                                 | [自动上传](/components/upload/demo#auto-upload)                |
|    placeholderText     |                       `string`                       | '选择多个文件' | 可选，上传输入框中的 Placeholder 文字                                              | [基本用法](/components/upload/demo#basic-usage)                |
|    preloadFilesRef     |                  `TemplateRef<any>`                  |       --       | 可选，用于创建自定义 已选择文件列表模板                                            | [自定义](/components/upload/demo#custom)                       |
|       uploadText       |                       `string`                       |     '上传'     | 可选，上传按钮文字                                                                 | [基本用法](/components/upload/demo#basic-usage)                |
|     uploadedFiles      |                   `Array<Object>`                    |       []       | 可选，获取已上传的文件列表                                                         | [多文件上传](/components/upload/demo#multi-files)              |
|    uploadedFilesRef    |                  `TemplateRef<any>`                  |       --       | 可选，用于创建自定义 已上传文件列表模版                                            | [自定义](/components/upload/demo#custom)                       |
|       withoutBtn       |                      `boolean`                       |     false      | 可选，是否舍弃按钮                                                                 | [自定义](/components/upload/demo#custom)                       |
|       enableDrop       |                      `boolean`                       |     false      | 可选，是否支持拖拽                                                                 | [多文件上传](/components/upload/demo#multi-files)              |
|      beforeUpload      | `boolean 、 Promise<boolean> 、 Observable<boolean>` |       --       | 上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [动态上传参数](/components/upload/demo#dynamic-upload-options) |
| setCustomUploadOptions |          `IUploadOptions`，参考下方 options          |       --       | 为每个文件设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值            | [自动上传](/components/upload/demo#auto-upload)                |
|     oneTimeUpload      |                      `boolean`                       |     false      | 可选，是否只调用一次接口上传所有文件                                               | [多文件上传](/components/upload/demo#multi-files)              |
|        disabled        |                      `boolean`                       |     false      | 可选，是否禁用上传组件                                                             | [多文件上传](/components/upload/demo#multi-files)              |

## d-multiple-upload 事件

|          参数           |        类型         | 说明                                                                                                                   | 跳转 Demo                                         |
| :---------------------: | :-----------------: | :--------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
|        fileOver         | `EventEmitter<any>` | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [多文件上传](/components/upload/demo#multi-files) |
|        fileDrop         | `EventEmitter<any>` | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [多文件上传](/components/upload/demo#multi-files) |
|      successEvent       | `EventEmitter<any>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [多文件上传](/components/upload/demo#multi-files) |
|       errorEvent        | `EventEmitter<any>` | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [多文件上传](/components/upload/demo#multi-files) |
| deleteUploadedFileEvent | `EventEmitter<any>` | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [多文件上传](/components/upload/demo#multi-files) |

### options

```js
IUploadOptions {
 // 上传接口地址
 uri: string;
 // http 请求方法
 method?: string;
 // 上传文件大小限制
 maximumSize?: number;
 // 自定义请求headers
 headers?: {[key: string]: any};
 // 认证token
 authToken?: string;
 // 认证token header标示
 authTokenHeader?: string;
 // 上传额外自定义参数
 additionalParameter?: {[key: string]: any};
 // 上传文件字段名称，默认file
 fileFieldName?: string;
 // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
 checkSameName?: boolean;
 // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
 withCredentials?: boolean;
}
```

```js
IFileOptions {
 // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
 accept?: string;
 // 输入字段可选择多个值
 multiple?: boolean;
}
```

### preloadFilesRef 模板参数

```xml
<ng-template
 let-fileUploaders="fileUploaders"
 let-UploadStatus="UploadStatus"
 let-deleteFile="deleteFile">
</ng-template>
```

其中每项值代表：

fileUploaders：FileUploader 类型的数组，FileUploader 中包含 send() , cancel() 方法

UploadStatus：上传状态，存在 preLoad = 0,uploading,uploaded,failed' 四种状态

deleteFile: 传入需要删除的上传文件

### uploadedFilesRef 模板参数

```xml
<ng-template
  let-uploadedFiles="uploadedFiles"
  let-filePath="filePath"
  let-deleteFile="deleteFile">
</ng-template>
```

其中每项值代表：

uploadedFiles：上传的文件列表

filePath：文件路径

deleteFile: 传入需要删除的上传文件
