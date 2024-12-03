# 如何使用

在 module 中引入：

```ts
import { UploadModule } from 'ng-devui/upload';
```

在页面中使用：

```xml
//单文件上传
<d-single-upload></d-single-upload>
//多文件上传
<d-multiple-upload></d-multiple-upload>
//使用dUpload指令
<div dUpload></div>
```

## d-single-upload

### d-single-upload 参数

| 参数                   | 类型                                                 | 默认       | 说明                                                                                     | 跳转 Demo                    | 全局配置项 |
| ---------------------- | ---------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------- | ---------------------------- | ---------- |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --         | 必选，待上传文件配置                                                                     | [基本用法](demo#basic-usage) |
| filePath               | `string`                                             | --         | 必选，文件路径                                                                           | [基本用法](demo#basic-usage) |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --         | 必选，上传配置                                                                           | [基本用法](demo#basic-usage) |
| autoUpload             | `boolean`                                            | false      | 可选，是否自动上传                                                                       | [基本用法](demo#basic-usage) |
| placeholderText        | `string`                                             | '选择文件' | 可选，上传输入框中的 Placeholder 文字                                                    | [基本用法](demo#basic-usage) |
| preloadFilesRef        | `TemplateRef<any>`                                   | --         | 可选，用于创建自定义 已选择文件列表模板                                                  | [自定义](demo#custom)        |
| uploadText             | `string`                                             | '上传'     | 可选，上传按钮文字                                                                       | [基本用法](demo#basic-usage) |
| uploadedFiles          | `Array<Object>`                                      | []         | 可选，获取已上传的文件列表                                                               | [基本用法](demo#basic-usage) |
| uploadedFilesRef       | `TemplateRef<any>`                                   | --         | 可选，用于创建自定义 已上传文件列表模板                                                  | [自定义](demo#custom)        |
| withoutBtn             | `boolean`                                            | false      | 可选，是否舍弃按钮                                                                       | [基本用法](demo#basic-usage) |
| enableDrop             | `boolean`                                            | false      | 可选，是否支持拖拽                                                                       | [基本用法](demo#basic-usage) |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --         | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [基本用法](demo#basic-usage) |
| dynamicUploadOptionsFn | [`IUploadOptions`](#iuploadoptions)                  | --         | 为文件动态设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值                  | [基本用法](demo#basic-usage) |
| disabled               | `boolean`                                            | false      | 可选，是否禁用上传组件                                                                   | [基本用法](demo#basic-usage) |
| showTip                | `boolean`                                            | false      | 可选，是否显示上传提示信息                                                               | [自动上传](demo#auto-upload) |
| showGlowStyle          | `boolean`                                            | true       | 可选，是否显示悬浮发光效果                                                               |

### d-single-upload 事件

| 参数                    | 类型                                               | 说明                                                                                                                   | 跳转 Demo                     |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| fileOver                | `EventEmitter<boolean>`                            | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [基本用法](demo#basic-usage)  |
| fileDrop                | `EventEmitter<any>`                                | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [基本用法](demo#basic-usage)  |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [基本用法](demo#basic-usage)  |
| errorEvent              | `EventEmitter<{ file: File; response: any}>`       | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [基本用法](demo#basic-usage)  |
| errorChunkEvent         | `EventEmitter<{ file: File; response: any }>`      | 分片上传错误时的回调函数，返回上传失败的错误信息                                                                       | [分片上传](demo#upload-slice) |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [基本用法](demo#basic-usage)  |
| fileSelect              | `EventEmitter<File>`                               | 文件选择后的回调函数，返回已选择文件信息                                                                               | [基本用法](demo#basic-usage)  |

## d-multiple-upload

### d-multiple-upload 参数

| 参数                   | 类型                                                 | 默认           | 说明                                                                               | 跳转 Demo                                   |
| ---------------------- | ---------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --             | 必选，待上传文件配置                                                               | [多文件上传](demo#multi-files)              |
| filePath               | `string`                                             | --             | 必选，文件路径                                                                     | [多文件上传](demo#multi-files)              |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --             | 必选，上传配置                                                                     | [多文件上传](demo#multi-files)              |
| autoUpload             | `boolean`                                            | false          | 可选，是否自动上传                                                                 | [自动上传](demo#auto-upload)                |
| placeholderText        | `string`                                             | '选择多个文件' | 可选，上传输入框中的 Placeholder 文字                                              | [基本用法](demo#basic-usage)                |
| preloadFilesRef        | `TemplateRef<any>`                                   | --             | 可选，用于创建自定义 已选择文件列表模板                                            | [自定义](demo#custom)                       |
| uploadText             | `string`                                             | '上传'         | 可选，上传按钮文字                                                                 | [基本用法](demo#basic-usage)                |
| uploadedFiles          | `Array<Object>`                                      | []             | 可选，获取已上传的文件列表                                                         | [多文件上传](demo#multi-files)              |
| uploadedFilesRef       | `TemplateRef<any>`                                   | --             | 可选，用于创建自定义 已上传文件列表模版                                            | [自定义](demo#custom)                       |
| withoutBtn             | `boolean`                                            | false          | 可选，是否舍弃按钮                                                                 | [自定义](demo#custom)                       |
| enableDrop             | `boolean`                                            | false          | 可选，是否支持拖拽                                                                 | [多文件上传](demo#multi-files)              |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --             | 上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 | [动态上传参数](demo#dynamic-upload-options) |
| setCustomUploadOptions | [`IUploadOptions`](#iuploadoptions)                  | --             | 为每个文件设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值            | [自定义](demo#custom)                       |
| oneTimeUpload          | `boolean`                                            | false          | 可选，是否只调用一次接口上传所有文件                                               | [多文件上传](demo#multi-files)              |
| disabled               | `boolean`                                            | false          | 可选，是否禁用上传组件                                                             | [多文件上传](demo#multi-files)              |
| showTip                | `boolean`                                            | false          | 可选，是否显示上传提示信息                                                         | [多文件上传](demo#multi-files)              |

### d-multiple-upload 事件

| 参数                    | 类型                                               | 说明                                                                                                                   | 跳转 Demo                      |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| fileOver                | `EventEmitter<boolean>`                            | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [多文件上传](demo#multi-files) |
| fileDrop                | `EventEmitter<any>`                                | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [多文件上传](demo#multi-files) |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [多文件上传](demo#multi-files) |
| errorEvent              | `EventEmitter<Array<{file: File; response: any}>>` | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [多文件上传](demo#multi-files) |
| errorChunkEvent         | `EventEmitter<{ file: File; response: any }>`      | 分片上传错误时的回调函数，返回上传失败的错误信息                                                                       | [分片上传](demo#upload-slice)  |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | 删除上传文件的回调函数，返回删除文件的路径信息                                                                         | [多文件上传](demo#multi-files) |
| fileSelect              | `EventEmitter<File>`                               | 文件选择后的回调函数，返回已选择文件信息                                                                               | [多文件上传](demo#multi-files) |

## dUpload

### dUpload 指令

| 参数                   | 类型                                                 | 默认  | 说明                                                                                     | 跳转 Demo                                  | 全局配置项 |
| ---------------------- | ---------------------------------------------------- | ----- | ---------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --    | 必选，待上传文件配置                                                                     | [任意区域上传](demo#customize-area-upload) |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --    | 必选，上传配置                                                                           | [任意区域上传](demo#customize-area-upload) |
| uploadedFiles          | `Array<Object>`                                      | []    | 可选，获取已上传的文件列表                                                               | [任意区域上传](demo#customize-area-upload) |
| fileUploaders          | `Array<Object>`                                      | []    | 可选，获取已选择的文件列表                                                               | [任意区域上传](demo#customize-area-upload) |
| enableDrop             | `boolean`                                            | false | 可选，是否支持拖拽                                                                       | [任意区域上传](demo#customize-area-upload) |
| dynamicUploadOptionsFn | [`IUploadOptions`](#iuploadoptions)                  | --    | 为文件动态设置自定义的上传参数, 参数为当前选中文件及`uploadOptions`的值                  | [任意区域上传](demo#customize-area-upload) |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --    | 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传,参数为文件信息及上传配置 |

### dUpload 事件

| 参数          | 类型                                               | 说明                                                                                                                   | 跳转 Demo                                  |
| ------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| fileOver      | `EventEmitter<boolean>`                            | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true` | [任意区域上传](demo#customize-area-upload) |
| fileDrop      | `EventEmitter<any>`                                | 支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件                                                   | [任意区域上传](demo#customize-area-upload) |
| successEvent  | `EventEmitter<Array<{file: File; response: any}>>` | 上传成功时的回调函数,返回文件及 xhr 的响应信息                                                                         | [任意区域上传](demo#customize-area-upload) |
| errorEvent    | `EventEmitter<{file: File; response: any}>`        | 上传错误时的回调函数，返回上传失败的错误信息                                                                           | [任意区域上传](demo#customize-area-upload) |
| alertMsgEvent | `EventEmitter<Message[]>`                          | 上传文件不符合上传文件配置 uploadOptions 时的回调函数，返回错误提示信息息                                              | [任意区域上传](demo#customize-area-upload) |
| fileSelect    | `EventEmitter<File>`                               | 文件选择后的回调函数，返回已选择文件信息                                                                               | [任意区域上传](demo#customize-area-upload) |

### preloadFilesRef 模板参数

```xml
<ng-template
  let-fileUploaders="fileUploaders"
  let-UploadStatus="UploadStatus"
  let-deleteFile="deleteFile">
</ng-template>
```

其中每项值代表：

`fileUploaders`：FileUploader 类型的数组，FileUploader 中包含 send()， cancel()方法

`UploadStatus`：上传状态，存在 preLoad，uploading，uploaded，failed 四种状态

`deleteFile`: 传入需要删除的上传文件

### uploadedFilesRef 模板参数

```xml
<ng-template
  let-uploadedFiles="uploadedFiles"
  let-filePath="filePath"
  let-deleteFile="deleteFile">
</ng-template>
```

其中每项值代表：

`uploadedFiles`：上传的文件列表

`filePath`：文件路径

`deleteFile`: 传入需要删除的上传文件

## 接口 & 类型定义

### IUploadOptions

```ts
export class IUploadOptions {
  // 是否开启分片上传 (单文件) 默认是关闭
  isChunked?: boolean;
  // 分片大小 (单文件) 默认分片大小 20兆。
  chunkSize?: number;
  // 上传接口地址
  uri: string;
  // http 请求方法
  method?: string;
  // 上传文件大小限制
  maximumSize?: number;
   // 上传文件个数限制，多文件上传时可用
  maximumCount?: number;
  // 自定义请求headers
  headers?: { [key: string]: any };
  // 认证token
  authToken?: string;
  // 认证token header标示
  authTokenHeader?: string;
  // 上传额外自定义参数
  additionalParameter?: { [key: string]: any };
  // 上传文件字段名称，默认file
  fileFieldName?: string;
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean;
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean;
  //  手动设置返回数据类型
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
```

### IFileOptions

```ts
export class IFileOptions {
  // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
  accept?: string;
  // 输入字段可选择多个值
  multiple?: boolean;
  // 是否允许用户选择文件目录，而不是文件
  webkitdirectory?: boolean;
}
```
