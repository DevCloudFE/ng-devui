# How to use

Import into module:

```ts
import { UploadModule } from 'ng-devui/upload';
```

In the page:

```xml
//Single file upload
<d-single-upload></d-single-upload>
//Multiple files upload
<d-multiple-upload></d-multiple-upload>
//use dUpload directive
<div dUpload></div>
```

## d-single-upload

### d-single-upload Parameter

| Parameter              | Type                                                 | Default       | Description                                                                                                                                                | Jump to Demo                         | Global Config |
| ---------------------- | ---------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --            | Required. Configuration of the file to be uploaded                                                                                                         | [Basic Usage](demo#basic-usage)      |
| filePath               | `string`                                             | --            | Required. File path                                                                                                                                        | [Basic Usage](demo#basic-usage)      |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --            | Required. Upload configuration                                                                                                                             | [Basic Usage](demo#basic-usage)      |
| autoUpload             | `boolean`                                            | false         | Optional. Indicating whether to automatically upload files                                                                                                 | [Basic Usage](demo#basic-usage)      |
| placeholderText        | `string`                                             | 'Select file' | Optional. This parameter is used to upload the Placeholder text in the text box                                                                            | [Basic Usage](demo#basic-usage)      |
| preloadFilesRef        | `TemplateRef<any>`                                   | --            | Optional. Used to create a customized template of the selected file list                                                                                   | [Customize](demo#custom)             |
| uploadText             | `string`                                             | 'Upload'      | Optional. This parameter specifies the text of the upload button                                                                                           | [Basic Usage](demo#basic-usage)      |
| uploadedFiles          | `Array<Object>`                                      | []            | Optional. Obtains the list of uploaded files                                                                                                               | [Basic Usage](demo#basic-usage)      |
| uploadedFilesRef       | `TemplateRef<any>`                                   | --            | Optional. Used to create a customized template for the list of uploaded files                                                                              | [Customize](demo#custom)             |
| withoutBtn             | `boolean`                                            | false         | Optional. Whether to discard the button                                                                                                                    | [Basic Usage](demo#basic-usage)      |
| enableDrop             | `boolean`                                            | false         | Optional. Indicating whether drag is supported                                                                                                             | [Basic Usage](demo#basic-usage)      |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --            | Optional. It is a callback before upload. The return value is true or false to control whether to upload a file, file information and upload configuration | [Basic Usage](demo#basic-usage)      |
| dynamicUploadOptionsFn | [`IUploadOptions`](#iuploadoptions)                  | --            | Set upload parameters dynamically for file. The parameters are the currently selected file and the value of `uploadOptions`                                | [Basic Usage](demo#basic-usage)      |
| disabled               | `boolean`                                            | false         | Optional. Specifies whether to disable the upload component.                                                                                               | [Basic Usage](demo#basic-usage)      |
| showTip                | `boolean`                                            | false         | Optional. Indicating whether to display the upload message.                                                                                                | [Automatic Upload](demo#auto-upload) |
| showGlowStyle          | `boolean`                                            | true          | (Optional) Indicates whether to display the floating glow effect.                                                                                          |

### d-single-upload event

| Parameter               | Type                                               | Description                                                                                                                                                                                                                                      | Jump to Demo                          |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| fileOver                | `EventEmitter<boolean>`                            | Supports drag-and-drop upload. When a file is moved to a drag-and-drop area, an event is triggered. If a drag-and-drop element is moved out of the target, `false` is returned. If an element is being dragged to the target, `true` is returned | [Basic Usage](demo#basic-usage)       |
| fileDrop                | `EventEmitter<any>`                                | Supports the callback of the list of dragged files during upload. The first file is returned by default when a single file is uploaded                                                                                                           | [Basic Usage](demo#basic-usage)       |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | Callback function when the upload is successful. It returns the file and Xhr response information                                                                                                                                                | [Basic Usage](demo#basic-usage)       |
| errorEvent              | `EventEmitter<{file: File; response: any}>`        | Callback function when an upload error occurs. The error information about the upload failure is returned                                                                                                                                        | [Basic Usage](demo#basic-usage)       |
| errorChunkEvent         | `EventEmitter<{ file: File; response: any }>`      | Callback function when an slice upload error occurs. An slice upload failure error message is returned                                                                                                                                           | [Uploading Slice](demo#upload-slice) |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | Callback function for deleting uploaded files. The callback function returns the path information of the deleted files                                                                                                                           | [Basic Usage](demo#basic-usage)       |
| fileSelect              | `EventEmitter<File>`                               | Callback function for selecting files. The callback function returns the path information of the selected files                                                                                                                                  | [Basic Usage](demo#basic-usage)       |

## d-multiple-upload

### d-multiple-upload Parameter

| Parameter              | Type                                                 | Default                 | Description                                                                                                                                                  | Jump to Demo                                             |
| ---------------------- | ---------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --                      | Required. Configuration of the file to be uploaded                                                                                                           | [Upload Multiple Files](demo#multi-files)                |
| filePath               | `string`                                             | --                      | Required. File path                                                                                                                                          | [Multiple file upload](demo#multi-files)                 |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --                      | Required. Upload configuration                                                                                                                               | [Upload Multiple Files](demo#multi-files)                |
| autoUpload             | `boolean`                                            | false                   | Optional. Indicating whether to automatically upload the file                                                                                                | [Automatic Upload](demo#auto-upload)                     |
| placeholderText        | `string`                                             | 'Select multiple files' | Optional. Upload the Placeholder text in the text box                                                                                                        | [Basic Usage](demo#basic-usage)                          |
| preloadFilesRef        | `TemplateRef<any>`                                   | --                      | Optional. Used to create a customized template of the selected file list                                                                                     | [Customize](demo#custom)                                 |
| uploadText             | `string`                                             | 'Upload'                | Optional. This parameter specifies the text of the upload button                                                                                             | [Basic Usage](demo#basic-usage)                          |
| uploadedFiles          | `Array<Object>`                                      | []                      | Optional. Obtains the list of uploaded files                                                                                                                 | [Upload Multiple Files](demo#multi-files)                |
| uploadedFilesRef       | `TemplateRef<any>`                                   | --                      | Optional. Used to create a customized template for the list of uploaded files                                                                                | [Customize](demo#custom)                                 |
| withoutBtn             | `boolean`                                            | false                   | Optional. Whether to discard the button                                                                                                                      | [Customize](demo#custom)                                 |
| enableDrop             | `boolean`                                            | false                   | Optional. Indicating whether dragging is supported                                                                                                           | [Upload Multiple Files](demo#multi-files)                |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --                      | Callback before upload. The return value `true` or `false` determines whether to upload a file, the parameters are file information and upload configuration | [Dynamic Upload Parameters](demo#dynamic-upload-options) |
| setCustomUploadOptions | [`IUploadOptions`](#iuploadoptions)                  | --                      | Set customized upload parameters for each file. The parameters are the currently selected file and the value of `uploadOptions`                              | [Customize](demo#custom)                                 |
| oneTimeUpload          | `boolean`                                            | false                   | Optional. Indicates whether to invoke the interface only once to upload all files                                                                            | [Upload Multiple Files](demo#multi-files)                |
| disabled               | `boolean`                                            | false                   | Optional. Specifies whether to disable the upload component                                                                                                  | [Upload Multiple Files](demo#multi-files)                |
| showTip                | `boolean`                                            | false                   | Optional. indicating whether to display the upload message                                                                                                   | [Upload Multiple Files](demo#multi-files)                |

### d-multiple-upload event

| Parameter               | Type                                               | Description                                                                                                                                                                                                                                                  | Jump to Demo                              |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| fileOver                | `EventEmitter<boolean>`                            | Supports dragging and uploading. When a file is moved to a dragable area, an event is triggered. If a dragable element is moved out of the target, the value `false` is returned. If an element is being dragged to the target, the value `true` is returned | [Upload Multiple Files](demo#multi-files) |
| fileDrop                | `EventEmitter<any>`                                | Supports the callback of the list of dragged files during upload. The first file is returned by default when a single file is uploaded                                                                                                                       | [Upload Multiple Files](demo#multi-files) |
| successEvent            | `EventEmitter<Array<{file: File; response: any}>>` | Callback function when the upload is successful, which returns the file and Xhr response information                                                                                                                                                         | [Upload Multiple Files](demo#multi-files) |
| errorEvent              | `EventEmitter<Array<{file: File; response: any}>>` | Callback function when an upload error occurs. The error information about the upload failure is returned                                                                                                                                                    | [Upload Multiple Files](demo#multi-files) |
| errorChunkEvent         | `EventEmitter<{ file: File; response: any }>`      | Callback function when an slice upload error occurs. An slice upload failure error message is returned                                                                                                                                                       | [Uploading Slice](demo#upload-slice)     |
| deleteUploadedFileEvent | `EventEmitter<string>`                             | Callback function for deleting uploaded files. The file path information is returned                                                                                                                                                                         | [Upload Multiple Files](demo#multi-files) |
| fileSelect              | `EventEmitter<File>`                               | Callback function for selecting files. The callback function returns the path information of the selected files                                                                                                                                              | [Upload Multiple Files](demo#multi-files) |

## dUpload

### dUpload Directive

| Parameter              | Type                                                 | Default | Description                                                                                                                                                | Jump to Demo                                           |
| ---------------------- | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| fileOptions            | [`IFileOptions`](#ifileoptions)                      | --      | Required. Configuration of the file to be uploaded                                                                                                         | [Customize Area to Upload](demo#customize-area-upload) |
| uploadOptions          | [`IUploadOptions`](#iuploadoptions)                  | --      | Required. Upload configuration                                                                                                                             | [Customize Area to Upload](demo#customize-area-upload) |
| uploadedFiles          | `Array<Object>`                                      | []      | Optional. Obtain the list of uploaded files                                                                                                                | [Customize Area to Upload](demo#customize-area-upload) |
| fileUploaders          | `Array<Object>`                                      | []      | Optional. Obtain the list of selected files                                                                                                                | [Customize Area to Upload](demo#customize-area-upload) |
| enableDrop             | `boolean`                                            | false   | Optional. Indicating whether drag is supported                                                                                                             | [Customize Area to Upload](demo#customize-area-upload) |
| dynamicUploadOptionsFn | [`IUploadOptions`](#iuploadoptions)                  | --      | Set upload parameters dynamically for each file. The parameters are the currently selected file and the value of `uploadOptions`                           | [Customize Area to Upload](demo#customize-area-upload) |
| beforeUpload           | `boolean \| Promise<boolean> \| Observable<boolean>` | --      | Optional. It is a callback before upload. The return value is true or false to control whether to upload a file, file information and upload configuration |

### dUpload Event

| Parameter     | Type                                               | Description                                                                                                                                                                                                                                                            | Jump to Demo                                           |
| ------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| fileOver      | `EventEmitter<boolean>`                            | Supports dragging and uploading. When a file is moved to a dragable area, an event is triggered. If a dragable element is moved out of the target area, the value `false` is returned. If an element is being dragged to the target area, the value `true` is returned | [Customize Area to Upload](demo#customize-area-upload) |
| fileDrop      | `EventEmitter<any>`                                | Supports the callback of the list of dragged files during upload. The first file is returned by default when a single file is uploaded                                                                                                                                 | [Customize Area to Upload](demo#customize-area-upload) |
| successEvent  | `EventEmitter<Array<{file: File; response: any}>>` | Callback function when the upload is successful, which returns the file and Xhr response information                                                                                                                                                                   | [Customize Area to Upload](demo#customize-area-upload) |
| errorEvent    | `EventEmitter<{file: File; response: any}>`        | Callback function when an upload error occurs. An upload failure error message is returned                                                                                                                                                                             | [Customize Area to Upload](demo#customize-area-upload) |
| alertMsgEvent | `EventEmitter<Message[]>`                          | The file to be uploaded does not comply with the callback function used when uploadOptions is configured for the file to be uploaded. An error message is returned                                                                                                     | [Customize Area to Upload](demo#customize-area-upload) |
| fileSelect    | `EventEmitter<File>`                               | Callback function for selecting files. The callback function returns the path information of the selected files                                                                                                                                                        | [Customize Area to Upload](demo#customize-area-upload) |

### preloadFilesRef Template parameters

```xml
<ng-template
  let-fileUploaders="fileUploaders"
  let-UploadStatus="UploadStatus"
  let-deleteFile="deleteFile">
</ng-template>
```

Each value represents:

`fileUploaders`: array of the FileUploader type. FileUploader contains the send() and cancel() methods.

`UploadStatus`: upload status, which can be preLoad, uploading, uploaded, failed'.

`deleteFile`: transfer the file to be deleted.

### uploadedFilesRef Template parameters

```xml
<ng-template
  let-uploadedFiles="uploadedFiles"
  let-filePath="filePath"
  let-deleteFile="deleteFile">
</ng-template>
```

Each value represents:

`uploadedFiles`: list of uploaded files

`filePath`: file path

`deleteFile`: transfer the file to be deleted.

## Interface & Type Definition

### IUploadOptions

```ts
export class IUploadOptions {
  // isChunked(single file) The default is off
  isChunked?: boolean;
  // chunk Size (single file) The default is 20 MB.
  chunkSize?: number;
  // Upload interface address.
  uri: string;
  // HTTP request method
  method?: string;
  // Maximum size of the file to be uploaded.
  maximumSize?: number;
  // Maximum count of the files to be uploaded, use only for multiple files upload.
  maximumCount?: number;
  // Customize request headers.
  headers?: { [key: string]: any };
  // Authenticate the token.
  authToken?: string;
  // Authentication token header ID.
  authTokenHeader?: string;
  // Upload additional customized parameters.
  additionalParameter?: { [key: string]: any };
  // Field name of the file to be uploaded. The default value is file.
  fileFieldName?: string;
  // Indicates whether to check whether duplicate files are uploaded. If this parameter is set to true, duplicate files are not overwritten. Otherwise, duplicate files are overwritten.
  checkSameName?: boolean;
  // Indicates whether to use a certificate such as cookies, authorization headers (header authorization), or TLS client certificate to create a cross-site access-control request.
  withCredentials?: boolean;
}
```

### IFileOptions

```ts
export class IFileOptions {
  // Specify the type of files that can be submitted through file upload, for example, accept:' .xls, .xlsx, .pages, .mp3, .png'.
  accept?: string;
  // Multiple values can be selected for the input field.
  multiple?: boolean;
  // let the user select directories instead of files.
  webkitdirectory?: boolean;
}
```
