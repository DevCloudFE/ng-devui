### d-single-upload 参数
| 参数             | 类型             | 默认   |   说明                 |
| :--------------: | :--------------: | :----: | :------------------------------------------|
| fileOptions      | `IFileOptions`，参考下方options    | -- | 必选，待上传文件配置 |
| filePath         | `string `          | -- | 必选，文件路径 |
| uploadOptions    | `IUploadOptions`，参考下方options   | -- | 必选，上传配置 |
| autoUpload       | `boolean`          |  false   | 可选，是否自动上传 |
| CHOOSE_FILE      | `string`           |  '选择文件' | 可选，上传输入框中的Placeholder文字 |
| confirmText               | `string`           |  '确定'  | 可选，错误信息弹出框中确认按钮文字 |
| preloadFilesRef  | `TemplateRef <any >` | -- | 可选，用于创建自定义 已选择文件列表模板  |
| uploadText           | `string `          |  '上传' | 可选，上传按钮文字 |
| uploadedFiles    | `Array <Object>`        | []| 可选，获取已上传的文件列表 |
| uploadedFilesRef | `TemplateRef <any>` | -- | 可选，用于创建自定义 已上传文件列表模板  |
| withoutBtn       | `boolean `         |  false   | 可选，是否舍弃按钮 |
| enableDrop       | `boolean `         |  false   | 可选，是否支持拖拽 |   

### d-single-upload 事件
| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| beforeUpload | `boolean 、 Promise<boolean> 、 Observable<boolean>`| 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传 |
| fileOver         | `EventEmitter<any> `       | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true`|
| fileDrop         | `EventEmitter<any> `          |  支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件|
| successEvent         | `EventEmitter<any> `      | 上传成功时的回调函数,返回文件及xhr的响应信息|
| errorEvent         | `EventEmitter<any> `          |  上传错误时的回调函数，返回上传失败的错误信息|
| deleteUploadedFileEvent         | `EventEmitter<any> `        | 删除上传文件的回调函数，返回删除文件的路径信息|

## d-multiple-upload 参数 

| 参数             | 类型             | 默认   |   说明                 |
| :--------------: | :--------------: | :----: | :------------------------------------------|
| fileOptions      | `IFileOptions`，参考下方options     | -- | 必选，待上传文件配置 |
| filePath         | `string`           | -- | 必选，文件路径 |
| uploadOptions    | `IUploadOptions`，参考下方options   | -- | 必选，上传配置 |
| autoUpload       | `boolean`          |  false   | 可选，是否自动上传 |
| CHOOSE_FILES     | `string`           |  '选择多个文件'  | 可选，上传输入框中的Placeholder文字 |
| confirmText               | `string`           |  '确定' | 可选，错误信息弹出框中确认按钮文字 |
| preloadFilesRef  | `TemplateRef<any>` | -- | 可选，用于创建自定义 已选择文件列表模板 |
| uploadText           | `string `          |  '上传'  | 可选，上传按钮文字 |
| uploadedFiles    | `Array<Object> `       | [] | 可选，获取已上传的文件列表 |
| uploadedFilesRef | `TemplateRef<any>` | -- | 可选，用于创建自定义 已上传文件列表模版  |
| withoutBtn       | `boolean`          |  false   | 可选，是否舍弃按钮 |
| enableDrop       | `boolean`          |  false   | 可选，是否支持拖拽 |   


### d-multiple-upload 事件
| 参数 | 类型  | 说明 |
| :---: | :---:| :---|
| beforeUpload | `boolean 、 Promise<boolean> 、 Observable<boolean>`| 可选，上传前的回调，通过返回`true` or `false` ,控制文件是否上传 |
| fileOver         | `EventEmitter<any> `       | 支持拖拽上传时，文件移动到可拖放区域触发事件,可拖动的元素移出放置目标时返回`false`，元素正在拖动到放置目标时返回`true`|
| fileDrop         | `EventEmitter<any> `          |  支持拖拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件|
| successEvent         | `EventEmitter<any> `      | 上传成功时的回调函数,返回文件及xhr的响应信息|
| errorEvent         | `EventEmitter<any> `          |  上传错误时的回调函数，返回上传失败的错误信息|
| deleteUploadedFileEvent         | `EventEmitter<any> `        | 删除上传文件的回调函数，返回删除文件的路径信息|




### options
 ```  js
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
}
 ```  
 ```  js
IFileOptions {
  // 规定能够通过文件上传进行提交的文件类型,例如 accept: '.xls,.xlsx,.pages,.mp3,.png'
  accept?: string;
  // 输入字段可选择多个值
  multiple?: boolean;
}
 ```  

### preloadFilesRef模板参数
 ```  xml
<ng-template 
  let-fileUploaders="fileUploaders"
  let-UploadStatus="UploadStatus"
  let-deleteFile="deleteFile">
</ng-template>
 ```  
其中每项值代表：

fileUploaders：FileUploader类型的数组，FileUploader中包含 send() , cancel() 方法

UploadStatus：上传状态，存在 preLoad = 0,uploading,uploaded,failed' 四种状态

deleteFile:  传入需要删除的上传文件


### uploadedFilesRef模板参数
```   xml
<ng-template 
  let-uploadedFiles="uploadedFiles"
  let-filePath="filePath"
  let-deleteFile="deleteFile">
</ng-template>
 ```  
其中每项值代表：

uploadedFiles：上传的文件列表

filePath：文件路径

deleteFile:  传入需要删除的上传文件
